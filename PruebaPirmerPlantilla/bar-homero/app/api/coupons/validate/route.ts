import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const { code, subtotal } = await request.json();

  if (!code || subtotal === undefined) {
    return NextResponse.json({ valid: false, error: "Datos inválidos" }, { status: 400 });
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const now = new Date().toISOString();

  const supabaseAdmin = createAdminClient();

  const { data: coupon, error } = await supabaseAdmin
    .from("coupons")
    .select(
      "id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active"
    )
    .eq("tenant_id", tenantId)
    .eq("code", code.toUpperCase().trim())
    .eq("active", true)
    .single();

  if (error || !coupon) {
    return NextResponse.json({ valid: false, error: "Cupón inválido o inexistente" });
  }

  if (coupon.starts_at && coupon.starts_at > now) {
    return NextResponse.json({ valid: false, error: "El cupón aún no está vigente" });
  }

  if (coupon.expires_at && coupon.expires_at < now) {
    return NextResponse.json({ valid: false, error: "El cupón expiró" });
  }

  if (coupon.max_uses !== null && (coupon.uses_count ?? 0) >= coupon.max_uses) {
    return NextResponse.json({ valid: false, error: "El cupón ya alcanzó su límite de usos" });
  }

  if (subtotal < (coupon.min_amount ?? 0)) {
    return NextResponse.json({
      valid: false,
      error: `El cupón requiere un mínimo de $${(coupon.min_amount ?? 0).toLocaleString("es-AR")}`,
    });
  }

  let discount = 0;
  if (coupon.type === "percent") {
    discount = Math.round((subtotal * Number(coupon.value)) / 100);
  } else {
    discount = Math.min(Number(coupon.value), subtotal);
  }

  return NextResponse.json({
    valid: true,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
    },
    discount,
  });
}
