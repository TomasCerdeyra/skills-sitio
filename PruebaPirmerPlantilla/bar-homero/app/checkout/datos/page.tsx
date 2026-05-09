"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ShippingZone {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

interface CouponResult {
  valid: boolean;
  coupon?: { id: string; code: string; type: string; value: number };
  discount?: number;
  error?: string;
}

export default function CheckoutDatosPage() {
  const router = useRouter();
  const { items, total: subtotal } = useCart();
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<CouponResult | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    postal_code: "",
    city: "",
    state: "",
    street: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/shipping/zones")
      .then((r) => r.json())
      .then((d) => {
        if (d.zones?.length) {
          setZones(d.zones);
          setSelectedZone(d.zones[0]);
        }
      });
  }, []);

  const discount = couponResult?.valid ? (couponResult.discount ?? 0) : 0;
  const shippingCost = selectedZone?.price ?? 0;
  const orderTotal = Math.max(0, subtotal - discount) + shippingCost;

  async function validateCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponResult(null);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), subtotal }),
      });
      const data = await res.json();
      setCouponResult(data);
    } finally {
      setCouponLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedZone) {
      setError("Seleccioná una zona de envío");
      return;
    }
    if (items.length === 0) {
      setError("Tu carrito está vacío");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId,
          items: items.map((i) => ({
            id: i.id,
            variant_id: i.variant_id,
            name: i.name,
            variant_name: i.variant_name,
            price: i.price,
            quantity: i.quantity,
          })),
          customer: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone || undefined,
          },
          shipping: {
            carrier: selectedZone.name,
            cost: selectedZone.price,
            postal_code: form.postal_code || "0000",
            street: form.street || undefined,
            city: form.city || undefined,
            state: form.state || undefined,
            notes: form.notes || undefined,
          },
          coupon: couponResult?.valid && couponResult.coupon
            ? { code: couponResult.coupon.code, discount }
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al procesar");
      router.push(`/checkout?orderId=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">🛒</p>
          <h2 className="font-display text-xl text-neutral-900 mb-2">Tu carrito está vacío</h2>
          <Link href="/catalogo" className="text-brand-secondary underline text-sm">Ver carta</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 py-10 lg:py-16">
        <div className="mb-8">
          <Link href="/catalogo" className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1">
            ← Volver a la carta
          </Link>
          <h1 className="font-display text-3xl text-neutral-900 mt-3">Datos de entrega</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="font-display text-lg text-neutral-900 mb-5">Tus datos</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "first_name", label: "Nombre", required: true },
                  { name: "last_name", label: "Apellido", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "phone", label: "Teléfono", type: "tel" },
                ].map(({ name, label, type = "text", required }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      {label}{required && <span className="text-brand-accent ml-0.5">*</span>}
                    </label>
                    <input
                      type={type}
                      required={required}
                      value={form[name as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="font-display text-lg text-neutral-900 mb-5">Envío</h2>
              {zones.length === 0 ? (
                <p className="text-sm text-neutral-400">Cargando opciones...</p>
              ) : (
                <div className="space-y-3">
                  {zones.map((zone) => (
                    <label
                      key={zone.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                        selectedZone?.id === zone.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_zone"
                          checked={selectedZone?.id === zone.id}
                          onChange={() => setSelectedZone(zone)}
                          className="accent-brand-primary"
                        />
                        <div>
                          <p className="text-sm font-medium text-neutral-800">{zone.name}</p>
                          {zone.description && (
                            <p className="text-xs text-neutral-500 mt-0.5">{zone.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        {zone.price === 0 ? "Gratis" : `$${zone.price.toLocaleString("es-AR")}`}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {selectedZone && (
                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Código postal</label>
                    <input
                      type="text"
                      value={form.postal_code}
                      onChange={(e) => setForm((f) => ({ ...f, postal_code: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                      placeholder="1414"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Ciudad</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                      placeholder="Buenos Aires"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Dirección</label>
                    <input
                      type="text"
                      value={form.street}
                      onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                      placeholder="Av. Corrientes 1234, 2° A"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Notas (opcional)</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary resize-none"
                      placeholder="Instrucciones especiales para la entrega..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="font-display text-lg text-neutral-900 mb-4">Cupón de descuento</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponResult(null); }}
                  placeholder="CÓDIGO"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                />
                <button
                  type="button"
                  onClick={validateCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                  className="px-5 py-2.5 bg-brand-secondary text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-brand-secondary/90 transition-colors"
                >
                  {couponLoading ? "..." : "Aplicar"}
                </button>
              </div>
              {couponResult && (
                <p className={`text-sm mt-2 ${couponResult.valid ? "text-green-600" : "text-red-500"}`}>
                  {couponResult.valid
                    ? `✓ Descuento de $${(couponResult.discount ?? 0).toLocaleString("es-AR")} aplicado`
                    : couponResult.error}
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-primary text-white py-4 rounded-xl text-base font-semibold hover:bg-brand-primary/90 disabled:opacity-60 transition-colors"
            >
              {submitting ? "Procesando..." : `Continuar al pago · $${orderTotal.toLocaleString("es-AR")}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 sticky top-4">
              <h2 className="font-display text-lg text-neutral-900 mb-5">Tu pedido</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.variant_id ?? item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-neutral-800 font-medium leading-snug">
                        {item.name}{item.variant_name ? ` — ${item.variant_name}` : ""}
                      </p>
                      <p className="text-neutral-400 text-xs mt-0.5">× {item.quantity}</p>
                    </div>
                    <span className="text-neutral-700 font-medium whitespace-nowrap">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString("es-AR")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento</span>
                    <span>−${discount.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? "Gratis" : `$${shippingCost.toLocaleString("es-AR")}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-neutral-900 text-base pt-1">
                  <span>Total</span>
                  <span>${orderTotal.toLocaleString("es-AR")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
