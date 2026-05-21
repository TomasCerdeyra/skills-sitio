"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useCart } from "@/context/CartContext";

export default function PagoPage() {
  const { items, total, hydrated } = useCart();
  const router = useRouter();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hydrated) return;

    const mpKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (mpKey) initMercadoPago(mpKey, { locale: "es-AR" });

    const checkoutData = sessionStorage.getItem("checkout-data");
    if (!checkoutData || items.length === 0) {
      router.push("/checkout");
      return;
    }

    const data = JSON.parse(checkoutData);

    fetch("/api/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          name: i.name,
          variantName: i.variantName,
          quantity: i.quantity,
          unit_price: i.price,
        })),
        customer: data.customer,
        shippingAddress: data.shippingAddress,
        shipping: data.shipping,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.preferenceId) setPreferenceId(d.preferenceId);
        else setError("No pudimos iniciar el pago. Intentá de nuevo.");
      })
      .catch(() => setError("Error de conexión. Intentá de nuevo."))
      .finally(() => setLoading(false));
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1
          className="text-4xl font-black text-white mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PAGO SEGURO
        </h1>

        <div className="p-6 bg-[#141414] rounded-2xl border border-[#1A1A1A] mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#A0A0A0] text-sm">Total a pagar</span>
            <span className="text-2xl font-black text-[#D4FF00]">
              ${total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="p-6 rounded-2xl border border-[#FF3131]/30 bg-[#FF3131]/5 text-center">
            <p className="text-[#FF3131] mb-4">{error}</p>
            <button
              onClick={() => router.push("/checkout")}
              className="px-6 py-3 border border-[#2E2E2E] text-white rounded-full hover:border-[#D4FF00] transition-colors"
            >
              Volver al carrito
            </button>
          </div>
        )}

        {preferenceId && !loading && (
          <div className="rounded-2xl overflow-hidden">
            <Payment
              initialization={{
                amount: total,
                preferenceId,
              }}
              customization={{
                paymentMethods: {
                  creditCard: "all",
                  debitCard: "all",
                  ticket: "all",
                  bankTransfer: "all",
                  mercadoPago: "all",
                },
                visual: {
                  style: {
                    theme: "dark",
                    customVariables: {
                      baseColor: "#D4FF00",
                      baseColorFirstVariant: "#b8e000",
                      baseColorSecondVariant: "#a0cc00",
                      fontSizeLarge: "18px",
                    },
                  },
                },
              }}
              onSubmit={async (param) => {
                const { selectedPaymentMethod, formData } = param;
                const res = await fetch("/api/process-payment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ selectedPaymentMethod, formData }),
                });
                const data = await res.json();
                if (data.status === "approved") {
                  router.push(`/checkout/status?status=approved&external_reference=${data.external_reference}`);
                } else if (data.status === "pending") {
                  router.push(`/checkout/status?status=pending&external_reference=${data.external_reference}`);
                } else {
                  router.push(`/checkout/status?status=failure`);
                }
              }}
              onError={(error) => {
                console.error("MP Error:", error);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
