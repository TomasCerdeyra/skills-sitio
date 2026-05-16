"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/umami";

type CartItem = {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
  image?: string;
};

type ShippingOption = {
  carrier: string;
  service: string;
  price: number;
  estimated_delivery: string | null;
};

export default function CheckoutDatosPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState({ street: "", city: "", state: "", postal_code: "" });
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (!saved) { router.push("/"); return; }
    const parsed: CartItem[] = JSON.parse(saved);
    if (parsed.length === 0) { router.push("/"); return; }
    setCart(parsed);
    trackEvent("checkout_step", { step: "address", order_value: parsed.reduce((s, i) => s + i.price * i.quantity, 0) });
    trackEvent("start_checkout", { total: parsed.reduce((s, i) => s + i.price * i.quantity, 0), items: parsed.length });
  }, [router]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = coupon?.discount ?? 0;
  const shipping = selectedOption?.price ?? 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  async function handleCalculateShipping() {
    if (!address.postal_code || !address.city || !address.state) return;
    setLoadingShipping(true);
    trackEvent("checkout_step", { step: "shipping", order_value: subtotal });
    try {
      const res = await fetch("/api/shipping/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: address,
          items: cart.map((i) => ({ quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.options?.length) {
        setShippingOptions(data.options);
        setSelectedOption(data.options[0]);
      } else {
        setShippingOptions([]);
        setSelectedOption(null);
      }
    } catch {
      setShippingOptions([]);
    } finally {
      setLoadingShipping(false);
    }
  }

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setValidating(true);
    setCouponError(null);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setCoupon({ code: data.coupon.code, discount: data.discount });
        trackEvent("apply_coupon", { code: data.coupon.code, type: data.coupon.type });
      } else {
        setCouponError(data.error ?? "Cupón inválido");
      }
    } catch {
      setCouponError("Error validando el cupón");
    } finally {
      setValidating(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedOption) return;
    const form = e.currentTarget;
    const customer = {
      first_name: (form.elements.namedItem("first_name") as HTMLInputElement).value,
      last_name: (form.elements.namedItem("last_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || undefined,
    };
    const shippingInfo = {
      carrier: selectedOption.carrier,
      service: selectedOption.service,
      cost: selectedOption.price,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
    };
    localStorage.setItem("checkout_customer", JSON.stringify(customer));
    localStorage.setItem("checkout_shipping", JSON.stringify(shippingInfo));
    if (coupon) localStorage.setItem("checkout_coupon", JSON.stringify(coupon));
    else localStorage.removeItem("checkout_coupon");
    trackEvent("checkout_step", { step: "payment", order_value: total });
    router.push("/checkout");
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-neutral-900 mb-10">
          Datos del pedido
        </h1>

        <div className="grid lg:grid-cols-12 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            {/* Datos personales */}
            <section className="bg-white border border-neutral-200 p-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-neutral-900 mb-5">
                Tus datos
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre" name="first_name" required autoComplete="given-name" />
                <Field label="Apellido" name="last_name" required autoComplete="family-name" />
                <Field label="Email" name="email" type="email" required className="sm:col-span-2" autoComplete="email" />
                <Field label="Teléfono (opcional)" name="phone" type="tel" className="sm:col-span-2" autoComplete="tel" />
              </div>
            </section>

            {/* Dirección + envío Envia.com */}
            <section className="bg-white border border-neutral-200 p-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-neutral-900 mb-5">
                Envío
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Calle y número" name="street" required className="sm:col-span-2"
                  value={address.street} onChange={(v) => setAddress((a) => ({ ...a, street: v }))} />
                <Field label="Ciudad" name="city" required
                  value={address.city} onChange={(v) => setAddress((a) => ({ ...a, city: v }))} />
                <Field label="Provincia" name="state" required
                  value={address.state} onChange={(v) => setAddress((a) => ({ ...a, state: v }))} />
                <Field label="Código postal" name="postal_code" required inputMode="numeric"
                  value={address.postal_code} onChange={(v) => setAddress((a) => ({ ...a, postal_code: v }))} />
              </div>
              <button
                type="button"
                onClick={handleCalculateShipping}
                disabled={loadingShipping || !address.postal_code || !address.city}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-full font-body text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loadingShipping ? "Calculando..." : "Calcular envío"}
              </button>

              {shippingOptions.length > 0 && (
                <div className="mt-5 space-y-2">
                  {shippingOptions.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-colors ${
                        selectedOption?.carrier === opt.carrier && selectedOption?.service === opt.service
                          ? "border-neutral-900"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_option"
                          checked={selectedOption?.carrier === opt.carrier && selectedOption?.service === opt.service}
                          onChange={() => setSelectedOption(opt)}
                          className="sr-only"
                        />
                        <div>
                          <p className="font-body font-semibold text-sm text-neutral-900">{opt.carrier}</p>
                          <p className="font-body text-xs text-neutral-500">{opt.service}{opt.estimated_delivery ? ` · ${opt.estimated_delivery}` : ""}</p>
                        </div>
                      </div>
                      <span className="font-body font-semibold text-sm">${opt.price.toLocaleString("es-AR")}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            {/* Cupón */}
            <section className="bg-white border border-neutral-200 p-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-neutral-900 mb-4">
                ¿Tenés un cupón?
              </h2>
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="BIENVENIDA10"
                  disabled={!!coupon}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-sm font-body text-sm focus:border-neutral-900 focus:outline-none transition-colors uppercase"
                />
                {coupon ? (
                  <button type="button" onClick={() => { setCoupon(null); setCouponInput(""); }}
                    className="px-4 py-3 bg-neutral-200 text-neutral-700 rounded-sm font-body text-sm hover:bg-neutral-300 transition-colors">
                    Quitar
                  </button>
                ) : (
                  <button type="button" onClick={handleApplyCoupon} disabled={validating || !couponInput.trim()}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-sm font-body text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-40">
                    {validating ? "..." : "Aplicar"}
                  </button>
                )}
              </div>
              {couponError && <p className="font-body text-xs text-red-500 mt-2">{couponError}</p>}
              {coupon && <p className="font-body text-xs text-green-700 mt-2">✓ Cupón {coupon.code} aplicado: -${coupon.discount.toLocaleString("es-AR")}</p>}
            </section>

            <button
              type="submit"
              disabled={!selectedOption}
              className="w-full bg-neutral-900 text-white py-4 rounded-full font-body font-semibold text-sm hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar al pago →
            </button>
          </form>

          {/* Resumen */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-neutral-900 text-white p-6">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-5">
                Resumen
              </h3>
              <div className="space-y-3 mb-5">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-sm flex-shrink-0 opacity-80" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-sm text-white leading-tight">{item.name}</p>
                      {item.variant_name && <p className="font-body text-xs text-neutral-400">{item.variant_name}</p>}
                      <p className="font-body text-xs text-neutral-400 mt-0.5">{item.quantity} × ${item.price.toLocaleString("es-AR")}</p>
                    </div>
                    <p className="font-body text-sm font-semibold flex-shrink-0">${(item.price * item.quantity).toLocaleString("es-AR")}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-400"><span>Subtotal</span><span>${subtotal.toLocaleString("es-AR")}</span></div>
                {coupon && <div className="flex justify-between text-green-400"><span>Descuento ({coupon.code})</span><span>-${coupon.discount.toLocaleString("es-AR")}</span></div>}
                {selectedOption && <div className="flex justify-between text-neutral-400"><span>Envío ({selectedOption.carrier})</span><span>${selectedOption.price.toLocaleString("es-AR")}</span></div>}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                <span className="font-display font-bold uppercase">Total</span>
                <span className="font-display text-xl font-black">${total.toLocaleString("es-AR")}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
  autoComplete,
  inputMode,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-body text-xs text-neutral-600 mb-1 uppercase tracking-[0.1em]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full px-4 py-3 border border-neutral-300 rounded-sm font-body text-sm focus:border-neutral-900 focus:outline-none transition-colors"
      />
    </div>
  );
}
