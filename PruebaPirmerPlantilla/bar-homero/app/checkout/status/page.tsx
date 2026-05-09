"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const STATUS_CONFIG = {
  approved: {
    icon: "✅",
    title: "¡Pago aprobado!",
    description: "Tu pedido fue confirmado. En breve te enviamos un email con los detalles.",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  in_process: {
    icon: "⏳",
    title: "Pago en proceso",
    description: "Estamos verificando tu pago. Te avisaremos cuando esté confirmado.",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  pending: {
    icon: "⏳",
    title: "Pago pendiente",
    description: "Tu pago está pendiente de acreditación.",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  rejected: {
    icon: "❌",
    title: "Pago rechazado",
    description: "No pudimos procesar tu pago. Por favor intentá con otro método.",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

function StatusContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const status = searchParams.get("status") ?? "pending";
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");

  const config =
    STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.pending;

  useEffect(() => {
    if (status === "approved") clearCart();
  }, [status, clearCart]);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className={`rounded-2xl border p-8 text-center ${config.bg} ${config.border}`}>
          <p className="text-5xl mb-4">{config.icon}</p>
          <h1 className={`font-display text-2xl mb-2 ${config.color}`}>{config.title}</h1>
          <p className="text-neutral-600 text-sm leading-relaxed">{config.description}</p>

          {(orderId || paymentId) && (
            <div className="mt-6 pt-6 border-t border-current/10 space-y-1 text-xs text-neutral-500">
              {orderId && <p>Orden: <span className="font-mono">{orderId.slice(0, 8)}...</span></p>}
              {paymentId && <p>Pago: <span className="font-mono">#{paymentId}</span></p>}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            href="/"
            className="flex-1 text-center py-3 bg-white border border-neutral-200 text-neutral-700 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            Ir al inicio
          </Link>
          {status === "rejected" ? (
            <Link
              href="/checkout/datos"
              className="flex-1 text-center py-3 bg-brand-primary text-white rounded-xl text-sm font-medium hover:bg-brand-primary/90 transition-colors"
            >
              Reintentar
            </Link>
          ) : (
            <Link
              href="/catalogo"
              className="flex-1 text-center py-3 bg-brand-primary text-white rounded-xl text-sm font-medium hover:bg-brand-primary/90 transition-colors"
            >
              Ver carta
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
