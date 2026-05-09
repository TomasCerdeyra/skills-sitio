"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { total, clearCart } = useCart();
  const orderId = searchParams.get("orderId");

  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [mpReady, setMpReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch("/api/tenant-config")
      .then((r) => r.json())
      .then((d) => {
        if (d.mp_public_key) {
          initMercadoPago(d.mp_public_key, { locale: "es-AR" });
          setPublicKey(d.mp_public_key);
          setMpReady(true);
        }
      })
      .catch(() => setError("No se pudo cargar la configuración de pago"));
  }, [orderId]);

  const onSubmit = useCallback(
    async (data: Parameters<React.ComponentProps<typeof Payment>["onSubmit"]>[0]) => {
      const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
      const res = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: data.formData, tenantId, orderId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Error al procesar el pago");
      if (result.status === "approved") clearCart();
      router.push(
        `/checkout/status?orderId=${orderId}&status=${result.status}&paymentId=${result.id}`
      );
    },
    [orderId, router, clearCart]
  );

  const onError = useCallback((err: unknown) => {
    console.error("MP Payment Brick error:", err);
    setError("Ocurrió un error con el formulario de pago. Por favor intentá de nuevo.");
  }, []);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-display text-xl text-neutral-900 mb-3">Orden no encontrada</p>
          <Link href="/checkout/datos" className="text-brand-secondary underline text-sm">
            Volver al formulario
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-10 lg:py-16">
        <div className="mb-8">
          <Link href="/checkout/datos" className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1">
            ← Volver a datos de entrega
          </Link>
          <h1 className="font-display text-3xl text-neutral-900 mt-3">Pago</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Total a pagar: <strong className="text-neutral-800">${total.toLocaleString("es-AR")}</strong>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
          {!mpReady && !error && (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {mpReady && publicKey && (
            <Payment
              initialization={{ amount: total }}
              customization={{
                paymentMethods: {
                  creditCard: "all",
                  debitCard: "all",
                },
                visual: {
                  style: {
                    theme: "default",
                  },
                },
              }}
              onSubmit={onSubmit}
              onError={onError}
            />
          )}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Pago procesado de forma segura por Mercado Pago
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
