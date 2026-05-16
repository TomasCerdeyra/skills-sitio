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

type CouponState = {
  code: string;
  discount: number;
} | null;

export default function CheckoutDatosPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [coupon, setCoupon] = useState<CouponState>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [step, setStep] = useState<"address" | "shipping" | "payment">("address");

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (!saved) { router.push("/"); return; }
    const parsed: CartItem[] = JSON.parse(saved);
    if (!parsed.length) { router.push("/"); return; }
    setCart(parsed);

    trackEvent("start_checkout", {
      total: parsed.reduce((s, i) => s + i.price * i.quantity, 0),
      items: parsed.length,
    });
  }, [router]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = coupon?.discount ?? 0;
  const shippingCost = selectedShipping?.price ?? 0;
  const total = Math.max(0, subtotal - discount) + shippingCost;

  async function handleCalculateShipping(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const postalCode = (form.elements.namedItem("postal_code") as HTMLInputElement).value;
    const city = (form.elements.namedItem("city") as HTMLInputElement).value;
    const state = (form.elements.namedItem("state") as HTMLInputElement).value;
    const street = (form.elements.namedItem("street") as HTMLInputElement).value;

    setCalculatingShipping(true);
    trackEvent("checkout_step", { step: "address", order_value: subtotal });

    try {
      const res = await fetch("/api/shipping/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: { street, city, state, postal_code: postalCode },
          items: cart.map((i) => ({ quantity: i.quantity })),
        }),
      });
      const data = await res.json();

      if (data.options?.length > 0) {
        setShippingOptions(data.options);
        setSelectedShipping(data.options[0]);
        setShippingCalculated(true);
        setStep("shipping");
      } else {
        // Mock de opciones para demo
        const mockOptions: ShippingOption[] = [
          { carrier: "OCA", service: "Estándar", price: 2800, estimated_delivery: null },
          { carrier: "Andreani", service: "Estándar", price: 3200, estimated_delivery: null },
          { carrier: "Correo Argentino", service: "Encomienda", price: 2100, estimated_delivery: null },
        ];
        setShippingOptions(mockOptions);
        setSelectedShipping(mockOptions[0]);
        setShippingCalculated(true);
        setStep("shipping");
      }
    } catch {
      const mockOptions: ShippingOption[] = [
        { carrier: "OCA", service: "Estándar", price: 2800, estimated_delivery: null },
      ];
      setShippingOptions(mockOptions);
      setSelectedShipping(mockOptions[0]);
      setShippingCalculated(true);
      setStep("shipping");
    } finally {
      setCalculatingShipping(false);
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

  function handleContinueToPay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedShipping) return;
    const form = e.currentTarget;

    const customer = {
      first_name: (form.elements.namedItem("first_name") as HTMLInputElement).value,
      last_name: (form.elements.namedItem("last_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || undefined,
    };

    const shippingInfo = {
      carrier: selectedShipping.carrier,
      service: selectedShipping.service,
      cost: selectedShipping.price,
      street: (form.elements.namedItem("street") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      state: (form.elements.namedItem("state") as HTMLInputElement).value,
      postal_code: (form.elements.namedItem("postal_code") as HTMLInputElement).value,
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
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 mb-12">
          Datos del pedido
        </h1>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={shippingCalculated ? handleContinueToPay : handleCalculateShipping}>
              {/* Datos del comprador */}
              <section className="bg-white rounded-sm border border-neutral-200 p-6 mb-6">
                <h2 className="font-display text-lg font-bold text-neutral-900 mb-5">
                  Tus datos
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nombre *" name="first_name" required />
                  <Field label="Apellido *" name="last_name" required />
                  <Field label="Email *" name="email" type="email" required className="sm:col-span-2" />
                  <Field label="Teléfono" name="phone" type="tel" className="sm:col-span-2" />
                </div>
              </section>

              {/* Dirección */}
              <section className="bg-white rounded-sm border border-neutral-200 p-6 mb-6">
                <h2 className="font-display text-lg font-bold text-neutral-900 mb-5">
                  Dirección de entrega
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Calle y número *" name="street" required className="sm:col-span-2" />
                  <Field label="Ciudad *" name="city" required />
                  <Field label="Provincia *" name="state" required />
                  <Field label="Código postal *" name="postal_code" required />
                </div>

                {!shippingCalculated && (
                  <button
                    type="submit"
                    disabled={calculatingShipping}
                    className="mt-5 w-full bg-neutral-800 text-neutral-50 py-3.5 font-body font-semibold text-sm hover:bg-brand-primary transition-colors disabled:opacity-60 rounded-sm"
                  >
                    {calculatingShipping ? "Calculando envío..." : "Calcular opciones de envío →"}
                  </button>
                )}
              </section>

              {/* Shipping options */}
              {shippingCalculated && (
                <section className="bg-white rounded-sm border border-neutral-200 p-6 mb-6">
                  <h2 className="font-display text-lg font-bold text-neutral-900 mb-5">
                    Opciones de envío
                  </h2>
                  <div className="space-y-3">
                    {shippingOptions.map((opt, i) => (
                      <label
                        key={i}
                        className={`block p-4 rounded-sm border-2 cursor-pointer transition-all ${
                          selectedShipping?.carrier === opt.carrier && selectedShipping?.service === opt.service
                            ? "border-brand-primary bg-brand-primary/5"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping_option"
                              checked={selectedShipping?.carrier === opt.carrier && selectedShipping?.service === opt.service}
                              onChange={() => {
                                setSelectedShipping(opt);
                                trackEvent("checkout_step", { step: "shipping", order_value: subtotal });
                              }}
                              className="sr-only"
                            />
                            <div>
                              <p className="font-body font-semibold text-neutral-900 text-sm">
                                {opt.carrier} · {opt.service}
                              </p>
                            </div>
                          </div>
                          <span className="font-body font-bold text-neutral-900">
                            ${opt.price.toLocaleString("es-AR")}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* Cupón */}
              {shippingCalculated && (
                <section className="bg-white rounded-sm border border-neutral-200 p-6 mb-6">
                  <h2 className="font-display text-lg font-bold text-neutral-900 mb-4">
                    ¿Tenés un cupón?
                  </h2>
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="MUSICAOK10"
                      className="flex-1 px-4 py-3 border border-neutral-300 rounded-sm focus:border-brand-primary focus:outline-none font-body text-sm uppercase"
                      disabled={!!coupon}
                    />
                    {coupon ? (
                      <button
                        type="button"
                        onClick={() => { setCoupon(null); setCouponInput(""); }}
                        className="px-4 bg-neutral-200 text-neutral-700 rounded-sm hover:bg-neutral-300 transition-colors font-body text-sm"
                      >
                        Quitar
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={validating || !couponInput.trim()}
                        className="px-5 bg-neutral-900 text-neutral-50 rounded-sm hover:bg-brand-primary transition-colors disabled:opacity-50 font-body text-sm"
                      >
                        {validating ? "..." : "Aplicar"}
                      </button>
                    )}
                  </div>
                  {couponError && (
                    <p className="font-body text-xs text-red-600 mt-2">{couponError}</p>
                  )}
                  {coupon && (
                    <p className="font-body text-xs text-green-700 mt-2 font-medium">
                      ✓ Cupón {coupon.code} aplicado: -${coupon.discount.toLocaleString("es-AR")}
                    </p>
                  )}
                </section>
              )}

              {/* Continue to pay */}
              {shippingCalculated && (
                <button
                  type="submit"
                  disabled={!selectedShipping}
                  className="w-full bg-brand-primary text-neutral-50 py-4 font-body font-bold text-base hover:bg-brand-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 rounded-sm shadow-lg shadow-brand-primary/20"
                >
                  Continuar al pago →
                </button>
              )}
            </form>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-white rounded-sm border border-neutral-200 p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-6">
                Tu pedido
              </h3>
              <div className="space-y-4 mb-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-sm flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-sm text-neutral-900 line-clamp-1">{item.name}</p>
                      {item.variant_name && (
                        <p className="font-body text-xs text-neutral-400">{item.variant_name}</p>
                      )}
                      <p className="font-body text-xs text-neutral-500 mt-1">
                        {item.quantity} × ${item.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <p className="font-body text-sm font-semibold text-neutral-900 flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pb-4 border-b border-neutral-100 mb-4 font-body text-sm">
                <Row label="Subtotal" value={`$${subtotal.toLocaleString("es-AR")}`} />
                {coupon && (
                  <Row label={`Descuento (${coupon.code})`} value={`-$${coupon.discount.toLocaleString("es-AR")}`} highlight />
                )}
                {selectedShipping && (
                  <Row label={`${selectedShipping.carrier} · ${selectedShipping.service}`} value={`$${selectedShipping.price.toLocaleString("es-AR")}`} />
                )}
              </div>

              <div className="flex justify-between items-baseline">
                <span className="font-display text-lg font-bold text-neutral-900">Total</span>
                <span className="font-display text-2xl font-bold text-brand-primary">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", required, className = "",
}: {
  label: string; name: string; type?: string; required?: boolean; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-body text-xs text-neutral-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        id={name} name={name} type={type} required={required}
        className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body text-sm transition-colors"
      />
    </div>
  );
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-500">{label}</span>
      <span className={`font-medium ${highlight ? "text-green-700" : "text-neutral-900"}`}>{value}</span>
    </div>
  );
}
