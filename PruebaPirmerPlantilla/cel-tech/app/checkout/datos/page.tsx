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

type ShippingZone = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

function FormField({
  label,
  name,
  type = "text",
  required,
  className = "",
  placeholder = "",
  inputMode,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  autoComplete?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-body text-sm text-neutral-600 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
      />
    </div>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-body text-neutral-600">{label}</span>
      <span className={`font-body font-medium ${highlight ? "text-green-700" : "text-neutral-900"}`}>
        {value}
      </span>
    </div>
  );
}

export default function CheckoutDatosPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) { router.push("/"); return; }
    const parsed: CartItem[] = JSON.parse(savedCart);
    if (parsed.length === 0) { router.push("/"); return; }
    setCart(parsed);

    fetch("/api/shipping/zones")
      .then((r) => r.json())
      .then((data) => {
        const zonesList: ShippingZone[] = data.zones ?? [];
        setZones(zonesList);
        if (zonesList[0]) setSelectedZone(zonesList[0]);
      })
      .catch(() => {});

    const total = parsed.reduce((s, i) => s + i.price * i.quantity, 0);
    trackEvent("start_checkout", { total, items: parsed.length });
  }, [router]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = coupon?.discount ?? 0;
  const shipping = selectedZone?.price ?? 0;
  const total = Math.max(0, subtotal - discount) + shipping;

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
    if (!selectedZone) return;

    const form = e.currentTarget;
    const customer = {
      first_name: (form.elements.namedItem("first_name") as HTMLInputElement).value,
      last_name: (form.elements.namedItem("last_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || undefined,
    };

    const shippingInfo = {
      carrier: selectedZone.name,
      cost: selectedZone.price,
      street: (form.elements.namedItem("street") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      state: (form.elements.namedItem("state") as HTMLInputElement).value,
      postal_code: (form.elements.namedItem("postal_code") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value || undefined,
    };

    localStorage.setItem("checkout_customer", JSON.stringify(customer));
    localStorage.setItem("checkout_shipping", JSON.stringify(shippingInfo));
    if (coupon) localStorage.setItem("checkout_coupon", JSON.stringify(coupon));
    else localStorage.removeItem("checkout_coupon");

    router.push("/checkout");
  }

  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-sm mb-10">
          <span className="text-neutral-400">Carrito</span>
          <span className="text-neutral-300">→</span>
          <span className="text-neutral-900 font-semibold">Datos del pedido</span>
          <span className="text-neutral-300">→</span>
          <span className="text-neutral-400">Pago</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            {/* Datos del comprador */}
            <section className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-6">Tus datos</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Nombre *" name="first_name" required placeholder="Juan" autoComplete="given-name" />
                <FormField label="Apellido *" name="last_name" required placeholder="Pérez" autoComplete="family-name" />
                <FormField label="Email *" name="email" type="email" required className="sm:col-span-2" placeholder="juan@ejemplo.com" inputMode="email" autoComplete="email" />
                <FormField label="Teléfono (opcional)" name="phone" type="tel" className="sm:col-span-2" placeholder="11 1234 5678" inputMode="tel" autoComplete="tel" />
              </div>
            </section>

            {/* Zona de envío */}
            <section className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-6">Envío</h2>

              {zones.length === 0 ? (
                <p className="font-body text-sm text-neutral-400">Cargando zonas de envío...</p>
              ) : (
                <div className="space-y-3 mb-6">
                  {zones.map((zone) => (
                    <label
                      key={zone.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedZone?.id === zone.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="zone"
                          checked={selectedZone?.id === zone.id}
                          onChange={() => {
                            setSelectedZone(zone);
                            trackEvent("select_shipping_zone", { zone: zone.name, cost: zone.price });
                          }}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedZone?.id === zone.id ? "border-brand-primary" : "border-neutral-300"}`}>
                          {selectedZone?.id === zone.id && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-neutral-900 text-sm">{zone.name}</p>
                          {zone.description && <p className="font-body text-xs text-neutral-500 mt-0.5">{zone.description}</p>}
                        </div>
                      </div>
                      <span className="font-display font-bold text-neutral-900">
                        ${zone.price.toLocaleString("es-AR")}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Calle y número *" name="street" required className="sm:col-span-2" placeholder="Av. Corrientes 1234" autoComplete="street-address" />
                <FormField label="Ciudad *" name="city" required placeholder="Buenos Aires" autoComplete="address-level2" />
                <FormField label="Provincia *" name="state" required placeholder="CABA" autoComplete="address-level1" />
                <FormField label="Código postal *" name="postal_code" required placeholder="1043" inputMode="numeric" autoComplete="postal-code" />
              </div>
              <div className="mt-4">
                <label htmlFor="notes" className="block font-body text-sm text-neutral-600 mb-1.5">Notas para el envío</label>
                <textarea name="notes" id="notes" rows={2} className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors resize-none" placeholder="Piso, departamento, referencias..." />
              </div>
            </section>

            {/* Cupón */}
            <section className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-4">¿Tenés un cupón?</h2>
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="BIENVENIDA10"
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm uppercase focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                  disabled={!!coupon}
                />
                {coupon ? (
                  <button type="button" onClick={() => { setCoupon(null); setCouponInput(""); }} className="px-4 py-3 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 transition-colors font-body text-sm">
                    Quitar
                  </button>
                ) : (
                  <button type="button" onClick={handleApplyCoupon} disabled={validating || !couponInput.trim()} className="px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-brand-primary hover:text-neutral-900 transition-colors font-body text-sm font-medium disabled:opacity-50">
                    {validating ? "..." : "Aplicar"}
                  </button>
                )}
              </div>
              {couponError && <p className="font-body text-sm text-red-600 mt-2">{couponError}</p>}
              {coupon && <p className="font-body text-sm text-green-700 mt-2">✓ Cupón {coupon.code}: -${coupon.discount.toLocaleString("es-AR")}</p>}
            </section>

            <button
              type="submit"
              disabled={!selectedZone}
              className="w-full bg-brand-primary text-neutral-900 py-4 rounded-xl font-display font-bold hover:bg-brand-accent hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20"
            >
              Continuar al pago →
            </button>
          </form>

          {/* Resumen */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="font-display text-xl font-bold text-neutral-900 mb-6">Resumen</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-sm text-neutral-900 truncate">{item.name}</p>
                      {item.variant_name && <p className="font-body text-xs text-neutral-500">{item.variant_name}</p>}
                      <p className="font-body text-xs text-neutral-400 mt-0.5">{item.quantity} × ${item.price.toLocaleString("es-AR")}</p>
                    </div>
                    <p className="font-body text-sm font-semibold text-neutral-900 flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pb-4 border-b border-neutral-100 mb-4">
                <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString("es-AR")}`} />
                {coupon && <SummaryRow label={`Descuento (${coupon.code})`} value={`-$${coupon.discount.toLocaleString("es-AR")}`} highlight />}
                {selectedZone && <SummaryRow label={`Envío (${selectedZone.name})`} value={`$${selectedZone.price.toLocaleString("es-AR")}`} />}
              </div>

              <div className="flex justify-between items-baseline">
                <span className="font-display text-xl font-bold text-neutral-900">Total</span>
                <span className="font-display text-2xl font-extrabold text-brand-primary">
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
