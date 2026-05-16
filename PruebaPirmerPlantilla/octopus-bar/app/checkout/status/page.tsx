"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const STATUS_CONFIG = {
  approved: {
    title: "¡Gracias por tu compra!",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle del pedido.",
    icon: "✅",
    color: "text-green-700",
  },
  pending: {
    title: "Pago pendiente",
    subtitle: "Estamos esperando la confirmación. Te avisamos por email cuando esté listo.",
    icon: "⏳",
    color: "text-amber-600",
  },
  in_process: {
    title: "Pago en revisión",
    subtitle: "El pago está siendo procesado. Recibirás novedades por email.",
    icon: "⏳",
    color: "text-amber-600",
  },
  rejected: {
    title: "Pago rechazado",
    subtitle: "No pudimos procesar el pago. Podés intentar de nuevo o pedir por WhatsApp.",
    icon: "❌",
    color: "text-red-600",
  },
};

function StatusContent() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center bg-white rounded-2xl p-12 shadow-sm border border-neutral-100">
        <p className="text-6xl mb-6">{config.icon}</p>
        <h1 className={`font-display text-4xl lg:text-5xl mb-4 leading-tight ${config.color}`}>
          {config.title}
        </h1>
        <p className="font-body text-lg text-neutral-600 mb-8 leading-relaxed">
          {config.subtitle}
        </p>

        {paymentId && (
          <p className="font-body text-sm text-neutral-400 mb-8">
            ID de pago: <span className="font-mono">{paymentId}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-neutral-900 text-white px-8 py-3 rounded-full hover:bg-brand-primary transition-colors font-body font-medium"
          >
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link
              href="/checkout/datos"
              className="border-2 border-neutral-900 text-neutral-900 px-8 py-3 rounded-full hover:bg-neutral-900 hover:text-white transition-colors font-body font-medium"
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
    <div className="min-h-screen bg-neutral-50 pt-20">
      <Suspense fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="font-body text-neutral-500">Cargando resultado...</p>
        </div>
      }>
        <StatusContent />
      </Suspense>
    </div>
  );
}
