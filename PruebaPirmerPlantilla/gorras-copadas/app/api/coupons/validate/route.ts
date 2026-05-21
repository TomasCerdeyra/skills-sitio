import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function POST(request: NextRequest) {
  const { code, subtotal } = await request.json() as { code: string; subtotal: number };

  if (!code) return NextResponse.json({ error: "Código requerido" }, { status: 400 });

  const supabase = createAdminClient();
  const tenantId = getTenantId();

  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (error || !coupon) return NextResponse.json({ error: "Cupón no válido" }, { status: 404 });

  const now = new Date();
  if (coupon.expires_at && new Date(coupon.expires_at) < now)
    return NextResponse.json({ error: "Cupón vencido" }, { status: 400 });
  if (coupon.starts_at && new Date(coupon.starts_at) > now)
    return NextResponse.json({ error: "Cupón aún no vigente" }, { status: 400 });
  if (coupon.max_uses && (coupon.uses_count ?? 0) >= coupon.max_uses)
    return NextResponse.json({ error: "Cupón agotado" }, { status: 400 });
  if (coupon.min_amount && subtotal < coupon.min_amount)
    return NextResponse.json(
      { error: `Mínimo de compra: $${coupon.min_amount.toLocaleString("es-AR")}` },
      { status: 400 }
    );

  return NextResponse.json({ code: coupon.code, type: coupon.type, value: coupon.value });
}
