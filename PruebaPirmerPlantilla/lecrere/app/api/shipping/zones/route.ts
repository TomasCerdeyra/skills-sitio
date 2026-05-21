import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("shipping_zones")
      .select("id, name, description, price, position")
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
