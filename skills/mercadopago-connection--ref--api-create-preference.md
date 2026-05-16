# Reference: `app/api/create-preference/route.ts`

Path destino: `app/api/create-preference/route.ts`

Crea una orden + order_items en Supabase y devuelve la preferencia de MP.

```typescript
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface CartItem {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
}

interface ShippingInfo {
  carrier: string;
  service?: string;
  cost: number;
  street?: string;
  city?: string;
  state?: string;
  postal_code: string;
  notes?: string;
}

interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

interface CouponInfo {
  code: string;
  discount: number;
}

export async function POST(request: NextRequest) {
  try {
    const {
      items,
      tenantId,
      customer,
      shipping,
      coupon,
    }: {
      items: CartItem[];
      tenantId: string;
      customer: CustomerInfo;
      shipping: ShippingInfo;
      coupon?: CouponInfo;
    } = await request.json();

    if (!items?.length || !tenantId || !customer || !shipping) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from("tenants")
      .select("mp_access_token")
      .eq("id", tenantId)
      .single();

    if (tenantError || !tenant?.mp_access_token) {
      return NextResponse.json(
        { error: "Mercado Pago no configurado para este tenant" },
        { status: 400 }
      );
    }

    // Cálculos
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = coupon?.discount ?? 0;
    const shippingCost = shipping.cost ?? 0;
    const total = Math.max(0, subtotal - discount) + shippingCost;

    // Crear orden con TODAS las columnas relevantes
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        tenant_id: tenantId,
        status: "pending",
        total,
        currency: "ARS",
        payment_provider: "mercadopago",
        customer_first_name: customer.first_name,
        customer_last_name: customer.last_name,
        customer_phone: customer.phone ?? null,
        payer_email: customer.email,
        // Shipping — columnas individuales + JSONB con detalle completo
        shipping_carrier: shipping.carrier,
        shipping_service: shipping.service ?? null,
        shipping_cost: shippingCost,
        shipping_postal_code: shipping.postal_code,
        shipping_address: {
          street: shipping.street ?? null,
          city: shipping.city ?? null,
          state: shipping.state ?? null,
          postal_code: shipping.postal_code,
          notes: shipping.notes ?? null,
        },
        // Cupón
        coupon_code: coupon?.code ?? null,
        discount_amount: discount > 0 ? discount : null,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Error creando orden:", orderError);
      return NextResponse.json(
        { error: "Error creando orden base" },
        { status: 500 }
      );
    }

    // Crear order_items
    const orderItemsRows = items.map((item) => ({
      order_id: order.id,
      tenant_id: tenantId,
      product_id: item.id,
      variant_id: item.variant_id ?? null,
      name: item.name,
      variant_name: item.variant_name ?? null,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItemsRows);

    if (itemsError) {
      console.error("Error creando order_items:", itemsError);
      // Rollback de la orden
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: "Error creando ítems de la orden" },
        { status: 500 }
      );
    }

    // Crear preferencia MP
    const mpClient = new MercadoPagoConfig({
      accessToken: tenant.mp_access_token,
    });
    const preference = new Preference(mpClient);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const isLocalhost = !siteUrl || siteUrl.includes("localhost");

    const preferenceItems = items.map((item) => ({
      id: item.id,
      title: item.variant_name ? `${item.name} - ${item.variant_name}` : item.name,
      unit_price: item.price,
      quantity: item.quantity,
      currency_id: "ARS",
    }));

    if (discount > 0) {
      preferenceItems.push({
        id: "discount",
        title: `Descuento (${coupon!.code})`,
        unit_price: -discount,
        quantity: 1,
        currency_id: "ARS",
      });
    }

    if (shippingCost > 0) {
      preferenceItems.push({
        id: "shipping",
        title: `Envío - ${shipping.carrier}${shipping.service ? ` (${shipping.service})` : ""}`,
        unit_price: shippingCost,
        quantity: 1,
        currency_id: "ARS",
      });
    }

    const preferenceBody: Record<string, unknown> = {
      external_reference: order.id,
      items: preferenceItems,
      payer: {
        email: customer.email,
        name: customer.first_name,
        surname: customer.last_name,
        phone: customer.phone ? { number: customer.phone } : undefined,
      },
    };

    if (siteUrl && !isLocalhost) {
      preferenceBody.back_urls = {
        success: `${siteUrl}/checkout/status`,
        failure: `${siteUrl}/checkout/status`,
        pending: `${siteUrl}/checkout/status`,
      };
      preferenceBody.auto_return = "approved";
      preferenceBody.notification_url = `${siteUrl}/api/webhooks/mercadopago?tenantId=${tenantId}`;
    }

    const result = await preference.create({ body: preferenceBody as any });

    return NextResponse.json({
      preferenceId: result.id,
      initPoint: result.init_point,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
```
