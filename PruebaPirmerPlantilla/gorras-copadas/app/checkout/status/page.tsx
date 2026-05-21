"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { analytics } from "@/lib/analytics/umami";

function StatusContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const externalReference = params.get("external_reference");
  const { clearCart } = useCart();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (status === "approved" && !processed) {
      clearCart();
      setProcessed(true);
      if (externalReference) analytics.purchase(externalReference, 0);
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const isApproved = status === "approved";

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <span className="text-8xl block mb-8">
          {isApproved ? "🎉" : status === "pending" ? "⏳" : "❌"}
        </span>

        <h1
          className="text-5xl font-black leading-none mb-4"
          style={{ fontFamily: "var(--font-display)", color: isApproved ? "#D4FF00" : status === "pending" ? "#A0A0A0" : "#FF3131" }}
        >
          {isApproved ? "¡PEDIDO CONFIRMADO!" : status === "pending" ? "PAGO PENDIENTE" : "PAGO RECHAZADO"}
        </h1>

        <p className="text-[#A0A0A0] text-lg mb-4">
          {isApproved
            ? "Te enviamos un email con los detalles. Tu gorra ya está siendo preparada."
            : status === "pending"
            ? "Tu pago está siendo procesado. Te avisamos cuando se confirme."
            : "Hubo un problema con el pago. Podés intentar de nuevo."}
        </p>

        {externalReference && (
          <p className="text-[#2E2E2E] text-sm mb-10">
            Referencia: #{externalReference.slice(0, 8).toUpperCase()}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isApproved ? (
            <Link
              href="/"
              className="px-8 py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full hover:bg-white transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              VOLVER AL INICIO
            </Link>
          ) : (
            <>
              <Link
                href="/checkout"
                className="px-8 py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full hover:bg-white transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                INTENTAR DE NUEVO
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-[#2E2E2E] text-white font-bold text-lg rounded-full hover:border-[#D4FF00] transition-colors"
              >
                Ir al inicio
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <StatusContent />
    </Suspense>
  );
}
