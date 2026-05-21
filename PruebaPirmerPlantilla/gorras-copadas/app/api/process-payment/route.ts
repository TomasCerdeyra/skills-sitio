import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { formData } = body;

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
  const paymentClient = new Payment(mp);

  const result = await paymentClient.create({ body: formData });

  return NextResponse.json({
    status: result.status,
    external_reference: result.external_reference,
    payment_id: result.id,
  });
}
