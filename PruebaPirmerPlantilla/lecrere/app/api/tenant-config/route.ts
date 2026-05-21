import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = getTenantId();
    const supabase = createAdminClient();

    const { data } = await supabase
      .from("tenants")
      .select("id, name, slug, plan, mp_public_key, umami_url")
      .eq("id", tenantId)
      .single();

    if (!data) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
