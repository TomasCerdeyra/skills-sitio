import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  if (!tenantId) {
    return NextResponse.json({ error: "tenantId no configurado" }, { status: 500 });
  }

  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("shipping_zones")
    .select("id, name, description, price")
    .eq("tenant_id", tenantId)
    .eq("active", true)
    .order("position");

  if (error) {
    console.error("Error obteniendo zonas:", error);
    return NextResponse.json({ error: "Error obteniendo zonas" }, { status: 500 });
  }

  return NextResponse.json({ zones: data ?? [] });
}
