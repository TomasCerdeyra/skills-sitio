"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const STATUS_CONFIG = {
  approved: {
    icon: "✅",
    title: "¡Gracias por tu compra!",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle. Pronto te contactamos para coordinar el envío.",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  pending: {
    icon: "⏳",
    title: "Pago pendiente",
    subtitle: "Estamos esperando la confirmación del pago. Te avisaremos por email cuando se acredite.",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  in_process: {
    icon: "⏳",
    title: "Pago en revisión",
    subtitle: "El pago está siendo procesado por Mercado Pago. Recibirás novedades por email.",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  rejected: {
    icon: "❌",
    title: "Pago rechazado",
    subtitle: "No pudimos procesar el pago. Podés intentar de nuevo con otro método.",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
  },
};

function CheckoutStatusContent() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="bg-neutral-50 min-h-screen pt-20 flex items-center justify-center px-5">
      <div className="max-w-lg w-full">
        <div className={`rounded-3xl border p-8 text-center mb-8 ${config.bg}`}>
          <p className="text-5xl mb-4">{config.icon}</p>
          <h1 className={`font-display text-3xl font-bold mb-3 ${config.color}`}>
            {config.title}
          </h1>
          <p className="font-body text-neutral-600 leading-relaxed">
            {config.subtitle}
          </p>
          {paymentId && (
            <p className="font-body text-xs text-neutral-400 mt-4">
              ID de pago: <span className="font-mono">{paymentId}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-neutral-900 text-white px-8 py-3.5 rounded-full font-display font-bold text-sm hover:bg-brand-primary hover:text-neutral-900 transition-all text-center"
          >
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link
              href="/checkout/datos"
              className="border-2 border-neutral-900 text-neutral-900 px-8 py-3.5 rounded-full font-display font-bold text-sm hover:bg-neutral-900 hover:text-white transition-all text-center"
            >
              Intentar de nuevo
            </Link>
          )}
          <a
            href={`https://wa.me/5491144005678?text=${encodeURIComponent("Hola, quiero consultar sobre mi pedido.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-8 py-3.5 rounded-full font-display font-bold text-sm hover:scale-[1.02] transition-transform text-center"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-body text-neutral-400">Cargando...</p></div>}>
      <CheckoutStatusContent />
    </Suspense>
  );
}
