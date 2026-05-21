"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function StatusContent() {
  const searchParams = useSearchParams();
  const result = searchParams.get("result");
  const orderId = searchParams.get("order");

  const isSuccess = result === "success";
  const isPending = result === "pending";

  return (
    <div className="max-w-2xl mx-auto px-6 pt-40 pb-20 text-center">
      {isSuccess ? (
        <>
          <div className="text-5xl mb-6">✓</div>
          <h1 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mb-4">
            Pedido confirmado.
          </h1>
          <p className="font-body text-neutral-600 mb-4">
            Te enviamos un email con los detalles de tu compra.
          </p>
          {orderId && (
            <p className="font-body text-sm text-neutral-500 mb-10">
              Número de pedido: #{orderId.slice(0, 8).toUpperCase()}
            </p>
          )}
        </>
      ) : isPending ? (
        <>
          <div className="text-5xl mb-6">⏳</div>
          <h1 className="font-display text-4xl font-light text-neutral-900 mb-4">
            Pago pendiente.
          </h1>
          <p className="font-body text-neutral-600 mb-10">
            Tu pago está siendo procesado. Te avisamos cuando se confirme.
          </p>
        </>
      ) : (
        <>
          <div className="text-5xl mb-6">✕</div>
          <h1 className="font-display text-4xl font-light text-neutral-900 mb-4">
            Pago no completado.
          </h1>
          <p className="font-body text-neutral-600 mb-10">
            Podés intentar de nuevo o escribirnos por WhatsApp.
          </p>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/catalogo"
          className="inline-flex items-center justify-center gap-2 bg-brand-primary text-neutral-50 px-8 py-4 font-body text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Seguir comprando
        </Link>
        <a
          href="https://wa.me/5491123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-8 py-4 font-body text-sm hover:border-brand-secondary transition-colors"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Cargando...</div>}>
      <StatusContent />
    </Suspense>
  );
}
