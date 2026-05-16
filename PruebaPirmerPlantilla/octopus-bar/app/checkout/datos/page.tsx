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

// Zonas de fallback si la API no devuelve zonas
const FALLBACK_ZONES: ShippingZone[] = [
  { id: "z1", name: "CABA", description: "Capital Federal", price: 1500 },
  { id: "z2", name: "GBA Norte", description: "Vicente López, San Isidro, Tigre y zona", price: 2200 },
  { id: "z3", name: "GBA Sur y Oeste", description: "Lomas, Quilmes, Morón, La Matanza", price: 2500 },
];

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
        const z: ShippingZone[] = data.zones?.length > 0 ? data.zones : FALLBACK_ZONES;
        setZones(z);
        setSelectedZone(z[0]);
      })
      .catch(() => {
        setZones(FALLBACK_ZONES);
        setSelectedZone(FALLBACK_ZONES[0]);
      });

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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="font-body text-neutral-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h1 className="font-display text-4xl lg:text-5xl text-neutral-900 mb-12">
          Datos del pedido
        </h1>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            {/* Datos del comprador */}
            <section>
              <h2 className="font-display text-xl mb-6 text-neutral-900">Tus datos</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Nombre" name="first_name" required />
                <FormField label="Apellido" name="last_name" required />
                <FormField label="Email" name="email" type="email" required className="sm:col-span-2" />
                <FormField label="Teléfono (opcional)" name="phone" type="tel" className="sm:col-span-2" />
              </div>
            </section>

            {/* Zona de envío */}
            <section>
              <h2 className="font-display text-xl mb-6 text-neutral-900">Envío</h2>
              <div className="space-y-3">
                {zones.map((zone) => (
                  <label
                    key={zone.id}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedZone?.id === zone.id
                        ? "border-brand-primary bg-brand-primary/5"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start">
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
                        <p className="font-body font-semibold text-neutral-900">{zone.name}</p>
                        {zone.description && (
                          <p className="font-body text-sm text-neutral-500 mt-0.5">{zone.description}</p>
                        )}
                      </div>
                      <span className="font-body font-bold text-neutral-900">
                        ${zone.price.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <FormField label="Calle y número" name="street" required className="sm:col-span-2" />
                <FormField label="Ciudad" name="city" required />
                <FormField label="Provincia" name="state" required />
                <FormField label="Código postal" name="postal_code" required />
              </div>

              <div className="mt-4">
                <label className="block font-body text-sm text-neutral-600 mb-2">
                  Notas para el envío (opcional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors font-body bg-white"
                />
              </div>
            </section>

            {/* Cupón */}
            <section>
              <h2 className="font-display text-xl mb-4 text-neutral-900">¿Tenés un cupón?</h2>
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="BIENVENIDA10"
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none font-body uppercase bg-white"
                  disabled={!!coupon}
                />
                {coupon ? (
                  <button
                    type="button"
                    onClick={() => { setCoupon(null); setCouponInput(""); }}
                    className="px-4 py-3 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300 transition-colors font-body"
                  >
                    Quitar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={validating || !couponInput.trim()}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-brand-primary transition-colors disabled:opacity-50 font-body"
                  >
                    {validating ? "Validando..." : "Aplicar"}
                  </button>
                )}
              </div>
              {couponError && (
                <p className="font-body text-sm text-red-600 mt-2">{couponError}</p>
              )}
              {coupon && (
                <p className="font-body text-sm text-green-700 mt-2">
                  ✓ Cupón {coupon.code} aplicado: −${coupon.discount.toLocaleString("es-AR")}
                </p>
              )}
            </section>

            <button
              type="submit"
              disabled={!selectedZone}
              className="w-full bg-brand-primary text-white py-4 rounded-full font-body font-medium hover:scale-[1.01] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/30"
            >
              Continuar al pago →
            </button>
          </form>

          {/* Resumen sticky */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <h3 className="font-display text-xl mb-6 text-neutral-900">Resumen del pedido</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-sm text-neutral-900 truncate">{item.name}</p>
                      {item.variant_name && (
                        <p className="font-body text-xs text-neutral-500">{item.variant_name}</p>
                      )}
                      <p className="font-body text-xs text-neutral-400 mt-0.5">
                        {item.quantity} × ${item.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <p className="font-body text-sm font-semibold text-neutral-900 flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pb-4 border-b border-neutral-100 mb-4">
                <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString("es-AR")}`} />
                {coupon && (
                  <SummaryRow
                    label={`Descuento (${coupon.code})`}
                    value={`−$${coupon.discount.toLocaleString("es-AR")}`}
                    highlight
                  />
                )}
                {selectedZone && (
                  <SummaryRow
                    label={`Envío (${selectedZone.name})`}
                    value={`$${selectedZone.price.toLocaleString("es-AR")}`}
                  />
                )}
              </div>

              <div className="flex justify-between items-baseline">
                <span className="font-display text-xl text-neutral-900">Total</span>
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

function FormField({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-body text-sm text-neutral-600 mb-2">
        {label} {required && <span className="text-brand-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors font-body bg-white text-neutral-900"
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-body text-neutral-500">{label}</span>
      <span className={`font-body font-medium ${highlight ? "text-green-700" : "text-neutral-900"}`}>
        {value}
      </span>
    </div>
  );
}
