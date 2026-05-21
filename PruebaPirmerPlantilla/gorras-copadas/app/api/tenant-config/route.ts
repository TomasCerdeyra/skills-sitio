import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createAdminClient();
  const tenantId = getTenantId();

  const { data, error } = await supabase
    .from("tenants")
    .select("id, name, slug, mp_public_key, plan, url")
    .eq("id", tenantId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
