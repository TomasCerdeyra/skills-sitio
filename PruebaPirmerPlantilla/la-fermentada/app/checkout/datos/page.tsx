"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
        setZones(data.zones ?? []);
        if (data.zones?.[0]) setSelectedZone(data.zones[0]);
      })
      .catch(() => {});

    trackEvent("start_checkout", {
      total: parsed.reduce((s, i) => s + i.price * i.quantity, 0),
      items: parsed.length,
    });
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
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Nav volver */}
        <div className="mb-8">
          <Link
            href="/carrito"
            className="inline-flex items-center gap-2 font-body text-sm text-neutral-500 hover:text-brand-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver al carrito
          </Link>
        </div>

        <h1 className="font-display font-bold text-3xl lg:text-4xl text-brand-dark italic mb-12">
          Datos del pedido
        </h1>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">

            {/* Tus datos */}
            <section>
              <h2 className="font-display font-bold text-xl text-brand-dark italic mb-6">Tus datos</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre" name="first_name" autoComplete="given-name" required />
                <Field label="Apellido" name="last_name" autoComplete="family-name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required className="sm:col-span-2" />
                <Field label="Teléfono (opcional)" name="phone" type="tel" autoComplete="tel" className="sm:col-span-2" />
              </div>
            </section>

            {/* Envío */}
            <section>
              <h2 className="font-display font-bold text-xl text-brand-dark italic mb-6">Envío y retiro</h2>
              {zones.length === 0 && (
                <p className="font-body text-sm text-neutral-500 mb-4">Cargando opciones…</p>
              )}
              <div className="space-y-3 mb-6">
                {zones.map((zone) => (
                  <label
                    key={zone.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedZone?.id === zone.id
                        ? "border-brand-primary bg-brand-accent/40"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div>
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
                      <p className="font-body font-semibold text-brand-dark text-sm">{zone.name}</p>
                      {zone.description && (
                        <p className="font-body text-xs text-neutral-500 mt-0.5">{zone.description}</p>
                      )}
                    </div>
                    <span className="font-body font-semibold text-brand-dark text-sm">
                      {zone.price === 0 ? "Gratis" : `$${zone.price.toLocaleString("es-AR")}`}
                    </span>
                  </label>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Calle y número" name="street" autoComplete="street-address" required className="sm:col-span-2" />
                <Field label="Ciudad" name="city" autoComplete="address-level2" required />
                <Field label="Provincia" name="state" autoComplete="address-level1" required />
                <Field label="Código postal" name="postal_code" autoComplete="postal-code" inputMode="numeric" required />
              </div>
              <div className="mt-4">
                <label className="block font-body text-sm text-neutral-500 mb-1.5">
                  Notas para el envío (opcional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-colors font-body bg-white resize-none"
                />
              </div>
            </section>

            {/* Cupón */}
            <section>
              <h2 className="font-display font-bold text-xl text-brand-dark italic mb-4">¿Tenés un cupón?</h2>
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="PRIMERPAN"
                  disabled={!!coupon}
                  className="flex-1 px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none font-body uppercase bg-white"
                />
                {coupon ? (
                  <button
                    type="button"
                    onClick={() => { setCoupon(null); setCouponInput(""); }}
                    className="px-4 py-3 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300 transition-colors font-body text-sm"
                  >
                    Quitar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={validating || !couponInput.trim()}
                    className="px-5 py-3 bg-brand-dark text-neutral-50 rounded-xl hover:bg-brand-primary transition-colors font-body text-sm disabled:opacity-50"
                  >
                    {validating ? "..." : "Aplicar"}
                  </button>
                )}
              </div>
              {couponError && (
                <p className="font-body text-sm text-red-600 mt-2">{couponError}</p>
              )}
              {coupon && (
                <p className="font-body text-sm text-green-700 mt-2">
                  ✓ {coupon.code} — Descuento de ${coupon.discount.toLocaleString("es-AR")} aplicado
                </p>
              )}
            </section>

            <button
              type="submit"
              disabled={!selectedZone}
              className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-body font-semibold hover:bg-brand-dark transition-all disabled:opacity-50 shadow-lg shadow-brand-primary/20 hover:scale-[1.01] active:scale-95"
            >
              Continuar al pago →
            </button>
          </form>

          {/* Resumen */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-lg text-brand-dark italic">Tu pedido</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3 pb-3 border-b border-neutral-100 last:border-0 last:pb-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-sm text-brand-dark truncate">{item.name}</p>
                      {item.variant_name && <p className="font-body text-xs text-neutral-500">{item.variant_name}</p>}
                      <p className="font-body text-xs text-neutral-400 mt-0.5">
                        {item.quantity} × ${item.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <p className="font-body text-sm font-semibold flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <Row label="Subtotal" value={`$${subtotal.toLocaleString("es-AR")}`} />
                {coupon && <Row label={`Desc. (${coupon.code})`} value={`-$${coupon.discount.toLocaleString("es-AR")}`} green />}
                {selectedZone && (
                  <Row
                    label={`Envío (${selectedZone.name})`}
                    value={selectedZone.price === 0 ? "Gratis" : `$${selectedZone.price.toLocaleString("es-AR")}`}
                  />
                )}
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="font-display font-bold text-xl text-brand-dark italic">Total</span>
                <span className="font-display font-bold text-2xl text-brand-primary">
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
  label,
  name,
  type = "text",
  required,
  className = "",
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-body text-sm text-neutral-500 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-colors font-body bg-white"
      />
    </div>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between font-body text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className={`font-medium ${green ? "text-green-700" : "text-neutral-800"}`}>{value}</span>
    </div>
  );
}
