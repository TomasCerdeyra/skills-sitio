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

type CustomerInfo = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
};

type ShippingInfo = {
  carrier: string;
  service?: string;
  cost: number;
  street?: string;
  city?: string;
  state?: string;
  postal_code: string;
  notes?: string;
};

type CouponInfo = {
  code: string;
  discount: number;
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
    const customer: CustomerInfo = JSON.parse(savedCustomer);
    const shipping: ShippingInfo = JSON.parse(savedShipping);
    const coupon: CouponInfo | undefined = savedCoupon ? JSON.parse(savedCoupon) : undefined;

    if (parsedCart.length === 0) { router.push("/"); return; }
    setCart(parsedCart);

    async function init() {
      try {
        const keyRes = await fetch("/api/tenant-config");
        const keyData = await keyRes.json();
        if (!keyData.mp_public_key) {
          setError("Mercado Pago no está configurado.");
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
          const subtotal = parsedCart.reduce((s, i) => s + i.price * i.quantity, 0);
          setTotal(Math.max(0, subtotal - (coupon?.discount ?? 0)) + shipping.cost);
        } else {
          setError(prefData.error || "Error al crear la preferencia.");
        }
      } catch (err) {
        setError("Error al inicializar el checkout.");
        console.error(err);
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
      } catch (err) {
        setError("Error de conexión. Intentá de nuevo.");
        console.error(err);
      } finally {
        setProcessing(false);
      }
    },
    [tenantId, orderId, router]
  );

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <h1 className="font-display font-bold text-3xl text-brand-dark italic mb-8">
          Pagar
        </h1>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6">
            <p className="font-body text-sm text-red-700">{error}</p>
          </div>
        )}

        {processing && (
          <div className="bg-brand-accent rounded-xl px-5 py-4 mb-6">
            <p className="font-body text-sm text-brand-primary">Procesando el pago…</p>
          </div>
        )}

        {!loading && (
          <div className="mb-4 text-sm font-body text-neutral-500">
            {cart.length} producto{cart.length !== 1 ? "s" : ""} · Total ${total.toLocaleString("es-AR")}
          </div>
        )}

        {mpInitialized && preferenceId && total > 0 && (
          <Payment
            initialization={{ amount: total, preferenceId }}
            onSubmit={async (param) => { await handleSubmit(param.formData); }}
            onError={(err) => console.error("Payment Brick error:", err)}
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
        )}
      </div>
    </div>
  );
}
