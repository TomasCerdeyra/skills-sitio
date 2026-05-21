import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { sendOrderConfirmation } from "@/lib/email/send";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.type !== "payment") return NextResponse.json({ ok: true });

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) return NextResponse.json({ ok: true });

    const tenantId = getTenantId();
    const supabase = createAdminClient();

    const mp = new MercadoPagoConfig({ accessToken });
    const payment = await new Payment(mp).get({ id: body.data.id });

    if (payment.status !== "approved") return NextResponse.json({ ok: true });

    const orderId = payment.external_reference;
    if (!orderId) return NextResponse.json({ ok: true });

    const { data: order } = await supabase
      .from("orders")
      .select("id, status, buyer_email, total, coupon_code, shipping_service")
      .eq("id", orderId)
      .eq("tenant_id", tenantId)
      .single();

    if (!order || order.status === "paid") return NextResponse.json({ ok: true });

    await supabase
      .from("orders")
      .update({ status: "paid", mp_payment_id: String(payment.id) })
      .eq("id", orderId);

    if (order.coupon_code) {
      await supabase.rpc("increment_coupon_uses", {
        p_tenant_id: tenantId,
        p_code: order.coupon_code,
      });
    }

    try {
      await sendOrderConfirmation({
        to: order.buyer_email,
        orderId: order.id,
        items: [],
        total: order.total,
        shippingZone: order.shipping_service,
      });
    } catch (emailErr) {
      console.error("Error en email webhook:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: true });
  }
}
