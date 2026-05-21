import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { sendEmail } from "@/lib/email/send";
import { buildPaymentConfirmationEmail } from "@/lib/email/templates/payment";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, data } = body as { type: string; data: { id: string } };

  if (type !== "payment" || !data?.id) return NextResponse.json({ ok: true });

  const supabase = createAdminClient();
  const tenantId = getTenantId();

  const { data: tenant } = await supabase
    .from("tenants")
    .select("mp_access_token")
    .eq("id", tenantId)
    .single();

  if (!tenant?.mp_access_token) return NextResponse.json({ error: "No tenant" }, { status: 500 });

  const mp = new MercadoPagoConfig({ accessToken: tenant.mp_access_token });
  const paymentClient = new Payment(mp);
  const payment = await paymentClient.get({ id: data.id });

  await supabase.from("payment_events").insert({
    tenant_id: tenantId,
    provider: "mercadopago",
    provider_event_id: String(data.id),
    status: payment.status,
    payload: payment as unknown as Record<string, unknown>,
  });

  if (payment.status !== "approved") return NextResponse.json({ ok: true });

  const { data: order } = await supabase
    .from("orders")
    .update({
      status: "confirmed",
      payment_status: "approved",
      mp_payment_id: String(data.id),
      updated_at: new Date().toISOString(),
    })
    .eq("external_reference", payment.external_reference!)
    .eq("tenant_id", tenantId)
    .select("*, order_items(*)")
    .single();

  if (!order) return NextResponse.json({ ok: true });

  await supabase.from("order_events").insert({
    tenant_id: tenantId,
    order_id: order.id,
    type: "payment_approved",
    payload: { mp_payment_id: data.id },
  });

  if (order.payer_email) {
    try {
      await sendEmail({
        to: order.payer_email,
        subject: "¡Tu pedido está confirmado! 🧢 Gorras Copadas",
        html: buildPaymentConfirmationEmail({
          customerName: order.customer_first_name ?? "Cliente",
          orderId: order.id,
          total: order.total,
          items: order.order_items,
          trackingToken: order.tracking_token,
        }),
      });
    } catch {}
  }

  return NextResponse.json({ ok: true });
}
