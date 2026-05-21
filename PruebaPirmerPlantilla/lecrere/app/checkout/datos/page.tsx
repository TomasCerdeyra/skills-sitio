"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ShippingZone {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

interface CartItem {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CheckoutDatosPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    setItems(cart);
    fetch("/api/shipping/zones")
      .then((r) => r.json())
      .then(setZones)
      .catch(() => {});
  }, []);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const selectedZone = zones.find((z) => z.id === selectedZoneId) ?? null;
  const total = subtotal + (selectedZone?.price ?? 0) - discount;

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setCouponError("");
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode.trim(), subtotal }),
    });
    const data = await res.json();
    if (!res.ok) {
      setCouponError(data.error);
    } else {
      setDiscount(data.discount);
      setAppliedCoupon(couponCode.trim().toUpperCase());
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedZoneId) {
      alert("Seleccioná una zona de envío");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          buyer: form,
          shippingZone: selectedZone,
          couponCode: appliedCoupon,
          discountAmount: discount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("pendingOrder", JSON.stringify({ orderId: data.orderId, preferenceId: data.preferenceId }));
      router.push(`/checkout?preferenceId=${data.preferenceId}&orderId=${data.orderId}`);
    } catch (err) {
      alert("Error al procesar. Intentá de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-32 pb-20">
      <div className="mb-10">
        <Link href="/carrito" className="font-body text-sm text-neutral-500 hover:text-brand-primary">
          ← Volver al carrito
        </Link>
        <h1 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mt-4">
          Tus datos.
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Datos personales */}
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-6">
                Datos de contacto
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Nombre completo", type: "text", placeholder: "María García" },
                  { key: "email", label: "Email", type: "email", placeholder: "maria@email.com" },
                  { key: "phone", label: "Teléfono", type: "tel", placeholder: "+54 9 11 1234 5678" },
                  { key: "postalCode", label: "Código postal", type: "text", placeholder: "1414" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors bg-transparent"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                    Dirección de entrega
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Av. Corrientes 1234, CABA"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Zona de envío */}
            {zones.length > 0 && (
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-4">
                  Zona de envío
                </p>
                <div className="space-y-3">
                  {zones.map((z) => (
                    <label
                      key={z.id}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        selectedZoneId === z.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="zone"
                          value={z.id}
                          checked={selectedZoneId === z.id}
                          onChange={() => setSelectedZoneId(z.id)}
                          className="accent-brand-primary"
                        />
                        <div>
                          <p className="font-body text-sm font-medium">{z.name}</p>
                          {z.description && (
                            <p className="font-body text-xs text-neutral-500">{z.description}</p>
                          )}
                        </div>
                      </div>
                      <p className="font-body text-sm font-medium">
                        ${z.price.toLocaleString("es-AR")}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Cupón */}
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-4">
                Cupón de descuento
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  placeholder="BIENVENIDA10"
                  className="flex-1 border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors bg-transparent uppercase"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-6 border border-neutral-300 font-body text-sm hover:border-brand-primary transition-colors"
                >
                  Aplicar
                </button>
              </div>
              {couponError && (
                <p className="font-body text-xs text-red-500 mt-2">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="font-body text-xs text-green-600 mt-2">
                  ✓ Cupón {appliedCoupon} aplicado — descuento: ${discount.toLocaleString("es-AR")}
                </p>
              )}
            </div>
          </div>

          {/* Resumen */}
          <div>
            <div className="bg-neutral-100 p-6 sticky top-28">
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Resumen del pedido
              </p>
              {items.map((item) => (
                <div key={`${item.id}-${item.variant_id}`} className="flex justify-between mb-3">
                  <span className="font-body text-sm text-neutral-700">
                    {item.name} {item.variant_name ? `(${item.variant_name})` : ""} ×{item.quantity}
                  </span>
                  <span className="font-body text-sm">
                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
              <div className="border-t border-neutral-300 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-neutral-600">Subtotal</span>
                  <span className="font-body">${subtotal.toLocaleString("es-AR")}</span>
                </div>
                {selectedZone && (
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-600">Envío ({selectedZone.name})</span>
                    <span className="font-body">${selectedZone.price.toLocaleString("es-AR")}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="font-body">Descuento</span>
                    <span className="font-body">−${discount.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium pt-2 border-t border-neutral-300">
                  <span className="font-body">Total</span>
                  <span className="font-body">${total.toLocaleString("es-AR")}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="w-full mt-6 bg-brand-primary text-neutral-50 py-4 font-body text-sm font-medium hover:bg-neutral-800 active:scale-95 disabled:opacity-50 transition-all"
              >
                {submitting ? "Procesando..." : "Ir al pago →"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
