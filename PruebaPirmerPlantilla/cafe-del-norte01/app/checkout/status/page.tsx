"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

const STATUS_CONFIG = {
  approved: {
    title: "¡Gracias por tu compra!",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle.",
    color: "text-green-700",
    icon: "✅",
  },
  pending: {
    title: "Pago pendiente",
    subtitle: "Estamos esperando la confirmación. Te avisaremos por email.",
    color: "text-amber-600",
    icon: "⏳",
  },
  in_process: {
    title: "Pago en revisión",
    subtitle: "El pago está siendo procesado. Recibirás novedades por email.",
    color: "text-amber-600",
    icon: "⏳",
  },
  rejected: {
    title: "Pago rechazado",
    subtitle: "No pudimos procesar el pago. Intentá de nuevo o usá otro método.",
    color: "text-red-600",
    icon: "❌",
  },
};

function StatusContent() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="text-6xl mb-6">{config.icon}</p>
        <h1 className={`font-display text-4xl lg:text-5xl mb-6 ${config.color}`}>
          {config.title}
        </h1>
        <p className="font-body text-lg text-neutral-600 mb-8">{config.subtitle}</p>
        {paymentId && (
          <p className="font-body text-sm text-neutral-500 mb-8">
            ID de pago: <span className="font-mono">{paymentId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-neutral-900 text-neutral-50 px-8 py-3 rounded-full hover:bg-brand-primary transition-colors font-body">
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link href="/checkout/datos" className="border border-neutral-900 text-neutral-900 px-8 py-3 rounded-full hover:bg-neutral-900 hover:text-neutral-50 transition-colors font-body">
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
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <StatusContent />
    </Suspense>
  );
}
