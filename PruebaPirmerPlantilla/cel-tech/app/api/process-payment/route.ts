import { MercadoPagoConfig, Payment as MpPayment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/email/send";
import {
  buildPaymentConfirmationEmail,
  getPaymentStatusText,
} from "@/lib/email/templates/payment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, tenantId, orderId } = body;

    if (!formData || !tenantId || !orderId) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    const { data: tenant } = await supabaseAdmin
      .from("tenants")
      .select("mp_access_token, resend_api_key, name")
      .eq("id", tenantId)
      .single();

    if (!tenant?.mp_access_token) {
      return NextResponse.json(
        { error: "Mercado Pago no configurado" },
        { status: 400 }
      );
    }

    const { data: order } = await supabaseAdmin
      .from("orders")
      .select(
        "id, total, coupon_code, discount_amount, shipping_carrier, shipping_service, shipping_cost, payer_email"
      )
      .eq("id", orderId)
      .eq("tenant_id", tenantId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
    }

    const { data: orderItems } = await supabaseAdmin
      .from("order_items")
      .select("name, variant_name, quantity, unit_price")
      .eq("order_id", orderId);

    const mpClient = new MercadoPagoConfig({
      accessToken: tenant.mp_access_token,
    });
    const payment = new MpPayment(mpClient);

    const paymentBody: Record<string, unknown> = {
      transaction_amount: Number(order.total),
      description: `Compra - Orden ${orderId}`,
      payment_method_id: formData.payment_method_id,
      external_reference: orderId,
    };

    if (formData.token) {
      paymentBody.token = formData.token;
      paymentBody.installments = formData.installments || 1;
      paymentBody.payer = {
        email: formData.payer?.email || order.payer_email,
        identification: formData.payer?.identification,
      };
      if (formData.issuer_id) paymentBody.issuer_id = formData.issuer_id;
    }

    if (formData.payer && !formData.token) {
      paymentBody.payer = {
        email: formData.payer.email || order.payer_email,
        first_name: formData.payer.first_name,
        last_name: formData.payer.last_name,
        identification: formData.payer.identification,
      };
    }

    const result = await payment.create({ body: paymentBody as any });

    const payerEmailStr =
      formData.payer?.email ||
      (result.payer as any)?.email ||
      order.payer_email ||
      null;

    await supabaseAdmin
      .from("orders")
      .update({
        mp_payment_id: String(result.id),
        status: result.status,
        payment_status: result.status_detail,
        payer_email: payerEmailStr,
        external_reference: String(result.id),
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    const isPaymentValid =
      result.status === "approved" ||
      result.status === "in_process" ||
      result.status === "pending";

    if (isPaymentValid && order.coupon_code) {
      const { data: couponRow } = await supabaseAdmin
        .from("coupons")
        .select("id, uses_count")
        .eq("tenant_id", tenantId)
        .eq("code", order.coupon_code)
        .single();

      if (couponRow) {
        await supabaseAdmin
          .from("coupons")
          .update({ uses_count: (couponRow.uses_count ?? 0) + 1 })
          .eq("id", couponRow.id);
      }
    }

    if (isPaymentValid && payerEmailStr && tenant.resend_api_key && orderItems) {
      try {
        const statusText = getPaymentStatusText(result.status!);
        const html = buildPaymentConfirmationEmail({
          statusText,
          items: orderItems.map((i) => ({
            name: i.variant_name ? `${i.name} - ${i.variant_name}` : i.name,
            price: Number(i.unit_price),
            quantity: i.quantity,
          })),
          totalAmount: Number(order.total),
          paymentId: result.id!,
          shippingInfo: order.shipping_carrier
            ? {
                carrier: order.shipping_carrier,
                service: order.shipping_service ?? undefined,
                cost: Number(order.shipping_cost ?? 0),
              }
            : undefined,
          discount:
            order.coupon_code && order.discount_amount
              ? { code: order.coupon_code, amount: Number(order.discount_amount) }
              : undefined,
        });

        await sendTransactionalEmail({
          resendApiKey: tenant.resend_api_key,
          to: payerEmailStr,
          subject: `${statusText} - Orden #${result.id}`,
          html,
          fromName: tenant.name,
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }
    }

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      payment_method_id: result.payment_method_id,
    });
  } catch (error: any) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      {
        error: "Error al procesar el pago",
        detail: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
