import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, message } = body as {
    name: string;
    email: string;
    phone?: string;
    message: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const tenantId = getTenantId();

  const { error } = await supabase.from("contact_messages").insert({
    tenant_id: tenantId,
    name,
    email,
    phone: phone ?? null,
    message,
    source: "contact_form",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
