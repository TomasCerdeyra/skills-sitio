import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { sendOrderConfirmation } from "@/lib/email/send";

export async function POST(req: NextRequest) {
  try {
    const { orderId, formData } = await req.json();

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "MercadoPago no configurado" }, { status: 500 });
    }

    // Crear el pago en MercadoPago
    const mp = new MercadoPagoConfig({ accessToken });
    const paymentResult = await new Payment(mp).create({ body: formData });

    const mpStatus = paymentResult.status ?? "pending";
    const dbStatus = mpStatus === "approved" ? "paid" : mpStatus;

    const tenantId = getTenantId();
    const supabase = createAdminClient();

    const { data: order } = await supabase
      .from("orders")
      .select("id, status, buyer_email, buyer_name, total, coupon_code, shipping_service, order_items(product_id, quantity, unit_price)")
      .eq("id", orderId)
      .eq("tenant_id", tenantId)
      .single();

    if (!order) {
      return NextResponse.json({ paymentId: paymentResult.id, status: mpStatus });
    }

    if (order.status !== "paid") {
      await supabase
        .from("orders")
        .update({ status: dbStatus, mp_payment_id: String(paymentResult.id) })
        .eq("id", orderId);

      if (dbStatus === "paid") {
        if (order.coupon_code) {
          await supabase.rpc("increment_coupon_uses", {
            p_tenant_id: tenantId,
            p_code: order.coupon_code,
          });
        }
        const items = (order.order_items as Array<{ product_id: string; quantity: number; unit_price: number }>) ?? [];
        try {
          await sendOrderConfirmation({
            to: order.buyer_email,
            orderId: order.id,
            items: items.map((i) => ({
              name: `Producto ${i.product_id.slice(0, 8)}`,
              quantity: i.quantity,
              price: i.unit_price,
            })),
            total: order.total,
            shippingZone: order.shipping_service,
          });
        } catch (emailErr) {
          console.error("Error email:", emailErr);
        }
      }
    }

    return NextResponse.json({ paymentId: paymentResult.id, status: mpStatus });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error procesando pago" }, { status: 500 });
  }
}
