"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const STATUS_CONFIG = {
  approved: {
    headline: "Gracias por tu compra.",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle del pedido.",
    color: "text-neutral-900",
    badge: "✅ Aprobado",
  },
  pending: {
    headline: "Pago pendiente.",
    subtitle: "Estamos esperando la confirmación. Te avisamos por email cuando esté listo.",
    color: "text-neutral-900",
    badge: "⏳ Pendiente",
  },
  in_process: {
    headline: "En revisión.",
    subtitle: "El pago está siendo procesado. Recibirás novedades por email.",
    color: "text-neutral-900",
    badge: "⏳ En proceso",
  },
  rejected: {
    headline: "Pago rechazado.",
    subtitle: "No pudimos procesar el pago. Intentá de nuevo o usá otro método.",
    color: "text-red-600",
    badge: "❌ Rechazado",
  },
};

function StatusContent() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-neutral-400 border border-neutral-200 px-4 py-1.5 rounded-full mb-8">
          {config.badge}
        </span>
        <h1 className={`font-display text-4xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-none mb-6 ${config.color}`}>
          {config.headline}
        </h1>
        <p className="font-body text-neutral-600 mb-8 leading-relaxed">{config.subtitle}</p>

        {paymentId && (
          <p className="font-body text-xs text-neutral-400 mb-8">
            ID de pago: <span className="font-mono">{paymentId}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-neutral-900 text-white px-8 py-3.5 rounded-full hover:bg-neutral-700 transition-colors font-body font-medium text-sm"
          >
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link
              href="/checkout/datos"
              className="border border-neutral-300 text-neutral-700 px-8 py-3.5 rounded-full hover:border-neutral-900 transition-colors font-body font-medium text-sm"
            >
              Intentar de nuevo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-neutral-400">Cargando…</p>
      </div>
    }>
      <StatusContent />
    </Suspense>
  );
}
