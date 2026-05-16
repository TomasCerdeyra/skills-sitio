"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const STATUS_CONFIG = {
  approved: {
    icon: "✅",
    title: "¡Gracias por tu compra!",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle del pedido.",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  pending: {
    icon: "⏳",
    title: "Pago pendiente",
    subtitle: "Estamos esperando la confirmación. Te avisaremos por email cuando se acredite.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  in_process: {
    icon: "⏳",
    title: "Pago en revisión",
    subtitle: "El pago está siendo procesado. Recibirás novedades por email.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  rejected: {
    icon: "❌",
    title: "Pago rechazado",
    subtitle: "No pudimos procesar el pago. Podés intentar de nuevo con otro método.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
};

function StatusContent() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 flex items-center justify-center px-5">
      <div className="max-w-lg w-full text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${config.bg} mb-8`}>
          <span className="text-4xl">{config.icon}</span>
        </div>

        <h1 className={`font-display text-3xl lg:text-4xl font-bold mb-4 ${config.color}`}>
          {config.title}
        </h1>
        <p className="font-body text-neutral-600 text-lg mb-4">
          {config.subtitle}
        </p>

        {paymentId && (
          <p className="font-body text-sm text-neutral-400 mb-10 font-mono">
            ID de pago: {paymentId}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-neutral-900 text-neutral-50 px-8 py-3.5 rounded-sm hover:bg-brand-primary transition-colors font-body font-semibold text-sm"
          >
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link
              href="/checkout/datos"
              className="border-2 border-neutral-900 text-neutral-900 px-8 py-3.5 rounded-sm hover:bg-neutral-900 hover:text-neutral-50 transition-colors font-body font-semibold text-sm"
            >
              Intentar de nuevo
            </Link>
          )}
          {status === "approved" && (
            <Link
              href="/catalogo"
              className="border-2 border-brand-primary text-brand-primary px-8 py-3.5 rounded-sm hover:bg-brand-primary hover:text-neutral-50 transition-colors font-body font-semibold text-sm"
            >
              Seguir comprando
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-body text-neutral-400">Cargando...</p></div>}>
      <StatusContent />
    </Suspense>
  );
}
