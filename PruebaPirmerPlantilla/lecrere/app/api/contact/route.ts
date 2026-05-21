import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }

    const tenantId = getTenantId();
    const supabase = createAdminClient();
    const { data: tenant } = await supabase
      .from("tenants")
      .select("resend_api_key")
      .eq("id", tenantId)
      .single();

    if (tenant?.resend_api_key) {
      const resend = new Resend(tenant.resend_api_key);
      const contactEmail = process.env.CONTACT_EMAIL || "hola@lecrere.com.ar";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@lecrere.com.ar";

      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        subject: `Nuevo contacto — ${name}`,
        html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong> ${message}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
