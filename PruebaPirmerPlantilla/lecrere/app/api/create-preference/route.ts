import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function POST(req: NextRequest) {
  try {
    const { items, buyer, shippingZone, couponCode, discountAmount } = await req.json();

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "MercadoPago no configurado" }, { status: 500 });
    }

    const tenantId = getTenantId();
    const supabase = createAdminClient();

    const subtotal = items.reduce(
      (acc: number, i: { price: number; quantity: number }) => acc + i.price * i.quantity,
      0
    );
    const total = subtotal + (shippingZone?.price ?? 0) - (discountAmount ?? 0);

    const orderId = crypto.randomUUID();

    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      tenant_id: tenantId,
      status: "pending",
      buyer_name: buyer.name,
      buyer_email: buyer.email,
      buyer_phone: buyer.phone,
      shipping_address: buyer.address,
      shipping_carrier: "Correo Argentino",
      shipping_service: shippingZone?.name ?? "Sin zona",
      shipping_cost: shippingZone?.price ?? 0,
      shipping_postal_code: buyer.postalCode,
      coupon_code: couponCode ?? null,
      discount_amount: discountAmount ?? 0,
      total,
    });

    if (orderError) throw orderError;

    const orderItems = items.map(
      (i: { id: string; name: string; price: number; quantity: number; variant_name?: string }) => ({
        order_id: orderId,
        tenant_id: tenantId,
        product_id: i.id,
        variant_name: i.variant_name ?? null,
        quantity: i.quantity,
        unit_price: i.price,
      })
    );
    await supabase.from("order_items").insert(orderItems);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lecrere.com.ar";
    const mp = new MercadoPagoConfig({ accessToken });
    const preferenceClient = new Preference(mp);

    const preference = await preferenceClient.create({
      body: {
        items: items.map((i: { name: string; price: number; quantity: number }) => ({
          title: i.name,
          quantity: i.quantity,
          unit_price: i.price,
          currency_id: "ARS",
        })),
        payer: { email: buyer.email, name: buyer.name },
        external_reference: orderId,
        back_urls: {
          success: `${siteUrl}/checkout/status?order=${orderId}&result=success`,
          failure: `${siteUrl}/checkout/status?order=${orderId}&result=failure`,
          pending: `${siteUrl}/checkout/status?order=${orderId}&result=pending`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/webhooks/mercadopago`,
        payment_methods: { installments: 12 },
      },
    });

    return NextResponse.json({ preferenceId: preference.id, orderId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creando preferencia" }, { status: 500 });
  }
}
