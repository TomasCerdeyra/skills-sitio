"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { analytics } from "@/lib/analytics/umami";

export default function CheckoutPage() {
  const { items, total, removeItem, updateQty, hydrated } = useCart();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<null | { type: "percent" | "fixed"; value: number; code: string }>(null);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    if (items.length > 0) analytics.beginCheckout(total, items.length);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleApplyCoupon() {
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon, subtotal: total }),
      });
      const data = await res.json();
      if (!res.ok) { setCouponError(data.error ?? "Cupón inválido"); return; }
      setCouponStatus({ type: data.type, value: data.value, code: data.code });
    } catch {
      setCouponError("Error al validar el cupón");
    }
  }

  const discount = couponStatus
    ? couponStatus.type === "percent"
      ? Math.round(total * (couponStatus.value / 100))
      : couponStatus.value
    : 0;
  const finalTotal = total - discount;

  if (!hydrated) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="text-6xl block mb-6">🧢</span>
          <h1 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            TU CARRITO ESTÁ VACÍO
          </h1>
          <p className="text-[#A0A0A0] mb-8">Encontrá la gorra perfecta en nuestro catálogo.</p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4FF00] text-[#0A0A0A] font-black rounded-full hover:bg-white transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            IR AL CATÁLOGO →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-black text-white mb-10" style={{ fontFamily: "var(--font-display)" }}>
          TU CARRITO
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-[#141414] rounded-2xl border border-[#1A1A1A]">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{item.name}</p>
                  {item.variantName && (
                    <p className="text-[#A0A0A0] text-sm">{item.variantName}</p>
                  )}
                  <p className="text-[#D4FF00] font-bold mt-1">
                    ${item.price.toLocaleString("es-AR")}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeItem(item.id)}
                      className="w-8 h-8 rounded-full border border-[#2E2E2E] text-[#A0A0A0] hover:border-[#D4FF00] hover:text-[#D4FF00] flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-[#2E2E2E] text-[#A0A0A0] hover:border-[#D4FF00] hover:text-[#D4FF00] flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-[#A0A0A0] hover:text-[#FF3131] transition-colors text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="p-6 bg-[#141414] rounded-2xl border border-[#1A1A1A]">
              <h2 className="text-lg font-bold text-white mb-4">Resumen</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-[#A0A0A0]">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#D4FF00]">
                    <span>Descuento ({couponStatus?.code})</span>
                    <span>−${discount.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#A0A0A0]">
                  <span>Envío</span>
                  <span>Se calcula al pagar</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-[#2E2E2E]">
                <span className="font-bold text-white">Total</span>
                <span className="text-2xl font-black text-[#D4FF00]">
                  ${finalTotal.toLocaleString("es-AR")}
                </span>
              </div>

              {/* Coupon */}
              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="CUPÓN"
                    className="flex-1 px-3 py-2.5 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors uppercase"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 bg-[#2A2A2A] text-white text-sm font-bold rounded-xl hover:bg-[#D4FF00] hover:text-[#0A0A0A] transition-colors"
                  >
                    OK
                  </button>
                </div>
                {couponError && <p className="text-[#FF3131] text-xs">{couponError}</p>}
                {couponStatus && <p className="text-[#D4FF00] text-xs">✓ Cupón aplicado</p>}
              </div>

              <button
                onClick={() => router.push("/checkout/datos")}
                className="mt-6 w-full py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full hover:bg-white transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                CONTINUAR →
              </button>
            </div>

            <Link
              href="/catalogo"
              className="block text-center text-[#A0A0A0] hover:text-[#D4FF00] text-sm transition-colors"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
