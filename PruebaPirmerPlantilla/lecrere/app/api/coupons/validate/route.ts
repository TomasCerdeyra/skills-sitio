import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();
    if (!code) return NextResponse.json({ error: "Código requerido" }, { status: 400 });

    const tenantId = getTenantId();
    const supabase = createAdminClient();

    const { data: coupon } = await supabase
      .from("coupons")
      .select("id, code, type, value, min_amount, max_uses, uses_count, expires_at, starts_at, active")
      .eq("tenant_id", tenantId)
      .eq("code", code.toUpperCase())
      .eq("active", true)
      .single();

    if (!coupon) return NextResponse.json({ error: "Cupón inválido" }, { status: 404 });

    const now = new Date();
    if (coupon.expires_at && new Date(coupon.expires_at) < now)
      return NextResponse.json({ error: "Cupón vencido" }, { status: 400 });
    if (coupon.starts_at && new Date(coupon.starts_at) > now)
      return NextResponse.json({ error: "Cupón no activo aún" }, { status: 400 });
    if (coupon.max_uses && coupon.uses_count >= coupon.max_uses)
      return NextResponse.json({ error: "Cupón agotado" }, { status: 400 });
    if (coupon.min_amount && subtotal < coupon.min_amount)
      return NextResponse.json(
        { error: `Monto mínimo: $${coupon.min_amount.toLocaleString("es-AR")}` },
        { status: 400 }
      );

    const discount =
      coupon.type === "percent"
        ? Math.round((subtotal * coupon.value) / 100)
        : coupon.value;

    return NextResponse.json({ coupon, discount });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
