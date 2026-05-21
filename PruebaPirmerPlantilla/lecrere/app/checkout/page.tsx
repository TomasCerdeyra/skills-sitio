"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const preferenceId = searchParams.get("preferenceId");
  const orderId = searchParams.get("orderId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !preferenceId || typeof window === "undefined") return;

    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (!publicKey) return;

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error — MercadoPago SDK injected globally
      const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
      const bricks = mp.bricks();
      bricks.create("payment", "paymentBrick", {
        initialization: {
          amount: 0,
          preferenceId,
        },
        customization: {
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            mercadoPago: "all",
          },
        },
        callbacks: {
          onReady: () => {},
          onSubmit: async ({ formData }: { formData: Record<string, unknown> }) => {
            const res = await fetch("/api/process-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId, formData }),
            });
            const data = await res.json();
            const status = data.status ?? "failure";
            window.location.href = `/checkout/status?order=${orderId}&result=${
              status === "approved" ? "success" : status === "pending" ? "pending" : "failure"
            }`;
          },
          onError: (error: unknown) => {
            console.error("MP Brick error:", error);
          },
        },
      });
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [mounted, preferenceId, orderId]);

  if (!preferenceId) {
    return (
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20 text-center">
        <p className="font-body text-neutral-600">Preferencia no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-10 pt-32 pb-20">
      <h1 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 mb-10">
        Pagá tu pedido.
      </h1>
      <div id="paymentBrick" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center font-body">Cargando...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
