import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const supabaseAdmin = createAdminClient();

  const { data: tenant } = await supabaseAdmin
    .from("tenants")
    .select("name, resend_api_key")
    .eq("id", tenantId)
    .single();

  if (!tenant?.resend_api_key) {
    console.warn(`Resend no configurado para tenant ${tenantId}`);
    return NextResponse.json({ ok: true });
  }

  const destinationEmail = process.env.CONTACT_EMAIL;
  if (!destinationEmail) {
    console.warn("CONTACT_EMAIL no configurado");
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(tenant.resend_api_key);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      `noreply@${process.env.RESEND_FROM_DOMAIN}`;

    await resend.emails.send({
      from: `${tenant.name} <${fromEmail}>`,
      to: [destinationEmail],
      subject: `Nueva consulta de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2>Nueva consulta desde el sitio web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error("Error enviando email de contacto:", e);
  }

  return NextResponse.json({ ok: true });
}
