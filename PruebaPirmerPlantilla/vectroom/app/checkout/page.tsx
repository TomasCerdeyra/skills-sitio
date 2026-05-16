"use client";

import { useEffect, useState, useCallback } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mpInitialized, setMpInitialized] = useState(false);
  const router = useRouter();
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedCustomer = localStorage.getItem("checkout_customer");
    const savedShipping = localStorage.getItem("checkout_shipping");
    const savedCoupon = localStorage.getItem("checkout_coupon");

    if (!savedCart || !savedCustomer || !savedShipping) {
      router.push("/checkout/datos");
      return;
    }

    const parsedCart: CartItem[] = JSON.parse(savedCart);
    const customer = JSON.parse(savedCustomer);
    const shipping = JSON.parse(savedShipping);
    const coupon = savedCoupon ? JSON.parse(savedCoupon) : undefined;

    if (parsedCart.length === 0) { router.push("/"); return; }
    setCart(parsedCart);

    async function init() {
      try {
        const keyRes = await fetch("/api/tenant-config");
        const keyData = await keyRes.json();
        if (!keyData.mp_public_key) {
          setError("Mercado Pago no está configurado todavía.");
          setLoading(false);
          return;
        }
        initMercadoPago(keyData.mp_public_key, { locale: "es-AR" });
        setMpInitialized(true);

        const prefRes = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: parsedCart, tenantId, customer, shipping, coupon }),
        });
        const prefData = await prefRes.json();

        if (prefData.preferenceId && prefData.orderId) {
          setPreferenceId(prefData.preferenceId);
          setOrderId(prefData.orderId);
          const sub = parsedCart.reduce((s, i) => s + i.price * i.quantity, 0);
          setTotal(Math.max(0, sub - (coupon?.discount ?? 0)) + shipping.cost);
        } else {
          setError(prefData.error || "Error al crear la preferencia de pago.");
        }
      } catch {
        setError("Error al inicializar el checkout.");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [tenantId, router]);

  const handleSubmit = useCallback(
    async (formData: unknown) => {
      setProcessing(true);
      setError(null);
      try {
        const res = await fetch("/api/process-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, tenantId, orderId }),
        });
        const data = await res.json();
        if (data.id) {
          localStorage.removeItem("cart");
          localStorage.removeItem("checkout_customer");
          localStorage.removeItem("checkout_shipping");
          localStorage.removeItem("checkout_coupon");
          router.push(`/checkout/status?payment_id=${data.id}&status=${data.status}`);
        } else {
          setError(data.error || "Error al procesar el pago");
        }
      } catch {
        setError("Error de conexión. Intentá de nuevo.");
      } finally {
        setProcessing(false);
      }
    },
    [tenantId, orderId, router]
  );

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-neutral-900 mb-8">
          Pago
        </h1>

        {loading && (
          <div className="text-center py-16">
            <p className="font-body text-neutral-500 text-sm">Iniciando el checkout…</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-sm mb-6">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {processing && (
          <div className="text-center py-4">
            <p className="font-body text-sm text-neutral-500">Procesando pago…</p>
          </div>
        )}

        {!loading && mpInitialized && preferenceId && total > 0 && (
          <div className="bg-white border border-neutral-200 p-6">
            <div className="mb-6 pb-4 border-b border-neutral-100">
              <p className="font-body text-xs text-neutral-400 uppercase tracking-[0.15em] mb-1">Total a pagar</p>
              <p className="font-display text-3xl font-black text-neutral-900">${total.toLocaleString("es-AR")}</p>
            </div>
            <Payment
              initialization={{ amount: total, preferenceId }}
              onSubmit={async (param) => { await handleSubmit(param.formData); }}
              onError={(e) => console.error("Payment Brick error:", e)}
              customization={{
                paymentMethods: {
                  creditCard: "all",
                  debitCard: "all",
                  ticket: "all",
                  mercadoPago: "all",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any,
              }}
            />
          </div>
        )}

        {!loading && !mpInitialized && !error && (
          <div className="bg-neutral-100 border border-neutral-200 p-6 text-center">
            <p className="font-body text-sm text-neutral-600">
              El sistema de pago no está configurado todavía.
              <br />
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="text-neutral-900 underline mt-2 inline-block"
                target="_blank" rel="noopener noreferrer">
                Consultá por WhatsApp para cerrar la compra.
              </a>
            </p>
          </div>
        )}

        {/* Unused variable suppression */}
        {cart.length === 0 && null}
      </div>
    </div>
  );
}
