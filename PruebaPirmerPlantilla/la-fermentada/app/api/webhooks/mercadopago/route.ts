import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { MercadoPagoConfig, Payment as MpPayment } from "mercadopago";
import { sendTransactionalEmail } from "@/lib/email/send";
import { buildPaymentConfirmationEmail } from "@/lib/email/templates/payment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "payment" && body.data?.id) {
      const paymentId = body.data.id;
      const tenantId = request.nextUrl.searchParams.get("tenantId");

      if (!tenantId) {
        console.error("Webhook missing tenantId");
        return NextResponse.json({ received: true });
      }

      const supabaseAdmin = createAdminClient();

      const { data: tenant } = await supabaseAdmin
        .from("tenants")
        .select("mp_access_token, resend_api_key, name")
        .eq("id", tenantId)
        .single();

      if (!tenant?.mp_access_token) {
        return NextResponse.json({ received: true });
      }

      const mpClient = new MercadoPagoConfig({
        accessToken: tenant.mp_access_token,
      });
      const paymentApi = new MpPayment(mpClient);
      const payment = await paymentApi.get({ id: paymentId });

      const orderId = payment.external_reference;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payerEmailStr = (payment.payer as any)?.email;

      if (!orderId) {
        return NextResponse.json({ received: true });
      }

      const { data: existingOrder } = await supabaseAdmin
        .from("orders")
        .select(
          "status, total, coupon_code, discount_amount, shipping_carrier, shipping_service, shipping_cost"
        )
        .eq("id", orderId)
        .single();

      if (!existingOrder) {
        return NextResponse.json({ received: true });
      }

      const wasApproved = existingOrder.status === "approved";
      const isNowApproved = payment.status === "approved";

      const updateData: Record<string, unknown> = {
        status: payment.status,
        payment_status: payment.status_detail,
        mp_payment_id: String(paymentId),
        updated_at: new Date().toISOString(),
      };
      if (payerEmailStr) updateData.payer_email = payerEmailStr;

      await supabaseAdmin.from("orders").update(updateData).eq("id", orderId);

      if (!wasApproved && isNowApproved) {
        if (existingOrder.coupon_code) {
          const { data: couponRow } = await supabaseAdmin
            .from("coupons")
            .select("id, uses_count")
            .eq("tenant_id", tenantId)
            .eq("code", existingOrder.coupon_code)
            .single();

          if (couponRow) {
            await supabaseAdmin
              .from("coupons")
              .update({ uses_count: (couponRow.uses_count ?? 0) + 1 })
              .eq("id", couponRow.id);
          }
        }

        if (tenant.resend_api_key && payerEmailStr) {
          try {
            const { data: orderItems } = await supabaseAdmin
              .from("order_items")
              .select("name, variant_name, quantity, unit_price")
              .eq("order_id", orderId);

            const html = buildPaymentConfirmationEmail({
              statusText: "✅ Pago aprobado",
              items: (orderItems ?? []).map((i) => ({
                name: i.variant_name ? `${i.name} - ${i.variant_name}` : i.name,
                price: Number(i.unit_price),
                quantity: i.quantity,
              })),
              totalAmount: Number(existingOrder.total),
              paymentId: payment.id!,
              shippingInfo: existingOrder.shipping_carrier
                ? {
                    carrier: existingOrder.shipping_carrier,
                    service: existingOrder.shipping_service ?? undefined,
                    cost: Number(existingOrder.shipping_cost ?? 0),
                  }
                : undefined,
              discount:
                existingOrder.coupon_code && existingOrder.discount_amount
                  ? {
                      code: existingOrder.coupon_code,
                      amount: Number(existingOrder.discount_amount),
                    }
                  : undefined,
              gradientFrom: "#5C3D1E",
              gradientTo: "#C9933F",
              accentColor: "#C9933F",
            });

            await sendTransactionalEmail({
              resendApiKey: tenant.resend_api_key,
              to: payerEmailStr,
              subject: `✅ Pago aprobado - Orden #${payment.id}`,
              html,
              fromName: tenant.name,
            });
          } catch (e) {
            console.error("Webhook email error:", e);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: true });
  }
}
