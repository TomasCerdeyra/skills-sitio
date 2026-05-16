"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const STATUS_CONFIG = {
  approved: {
    title: "¡Gracias por tu pedido!",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle de tu compra.",
    icon: "✅",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  pending: {
    title: "Pago pendiente",
    subtitle: "Estamos esperando la confirmación. Te avisaremos por email cuando se acredite.",
    icon: "⏳",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  in_process: {
    title: "Pago en revisión",
    subtitle: "El pago está siendo procesado. Recibirás novedades por email.",
    icon: "⏳",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  rejected: {
    title: "Pago rechazado",
    subtitle: "No pudimos procesar el pago. Podés intentar de nuevo o escribirnos por WhatsApp.",
    icon: "❌",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
  },
};

function StatusContent() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">{config.icon}</div>
        <h1 className={`font-display font-bold text-3xl lg:text-4xl italic mb-4 ${config.color}`}>
          {config.title}
        </h1>
        <p className="font-body text-base text-neutral-600 mb-8 leading-relaxed">
          {config.subtitle}
        </p>

        {paymentId && (
          <div className={`inline-block px-5 py-3 rounded-xl border mb-8 ${config.bg}`}>
            <p className="font-body text-sm text-neutral-500">
              N° de pago: <span className="font-mono font-medium">{paymentId}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-brand-primary text-neutral-50 px-8 py-3.5 rounded-full font-body font-semibold hover:bg-brand-dark transition-colors"
          >
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link
              href="/checkout/datos"
              className="border-2 border-brand-primary text-brand-primary px-8 py-3.5 rounded-full font-body font-semibold hover:bg-brand-primary hover:text-neutral-50 transition-colors"
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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <StatusContent />
    </Suspense>
  );
}
