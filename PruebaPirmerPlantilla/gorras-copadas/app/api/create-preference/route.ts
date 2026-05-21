import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { getTenantId } from "@/lib/tenant";
import { createAdminClient } from "@/lib/supabase/admin";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, customer, shippingAddress, shipping, couponCode, discountAmount } = body;

  const supabase = createAdminClient();
  const tenantId = getTenantId();

  const { data: tenant } = await supabase
    .from("tenants")
    .select("mp_access_token")
    .eq("id", tenantId)
    .single();

  if (!tenant?.mp_access_token)
    return NextResponse.json({ error: "MercadoPago no configurado" }, { status: 500 });

  const mp = new MercadoPagoConfig({ accessToken: tenant.mp_access_token });
  const preference = new Preference(mp);

  const externalReference = randomUUID();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gorras.com.ar";

  const total = items.reduce(
    (acc: number, i: { quantity: number; unit_price: number }) =>
      acc + i.unit_price * i.quantity,
    0
  );

  const { data: order } = await supabase
    .from("orders")
    .insert({
      tenant_id: tenantId,
      status: "pending",
      total: total - (discountAmount ?? 0) + (shipping?.price ?? 0),
      payer_email: customer.email,
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_phone: customer.phone,
      shipping_address: shippingAddress,
      shipping_carrier: shipping?.carrier ?? null,
      shipping_service: shipping?.service ?? null,
      shipping_cost: shipping?.price ?? 0,
      shipping_postal_code: shippingAddress?.postal_code ?? null,
      coupon_code: couponCode ?? null,
      discount_amount: discountAmount ?? 0,
      external_reference: externalReference,
      payment_provider: "mercadopago",
    })
    .select("id")
    .single();

  if (!order) return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 });

  await supabase.from("order_items").insert(
    items.map((i: { productId: string; variantId?: string; name: string; variantName?: string; quantity: number; unit_price: number }) => ({
      order_id: order.id,
      product_id: i.productId,
      variant_id: i.variantId ?? null,
      name: i.name,
      variant_name: i.variantName ?? null,
      quantity: i.quantity,
      unit_price: i.unit_price,
      tenant_id: tenantId,
    }))
  );

  const result = await preference.create({
    body: {
      items: items.map((i: { name: string; quantity: number; unit_price: number }) => ({
        title: i.name,
        quantity: i.quantity,
        unit_price: i.unit_price,
        currency_id: "ARS",
      })),
      payer: {
        name: customer.firstName,
        surname: customer.lastName,
        email: customer.email,
      },
      external_reference: externalReference,
      back_urls: {
        success: `${baseUrl}/checkout/status?status=approved`,
        failure: `${baseUrl}/checkout/status?status=failure`,
        pending: `${baseUrl}/checkout/status?status=pending`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    },
  });

  return NextResponse.json({ preferenceId: result.id, orderId: order.id });
}
