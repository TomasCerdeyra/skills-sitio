import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

async function getResendClient() {
  const tenantId = getTenantId();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tenants")
    .select("resend_api_key")
    .eq("id", tenantId)
    .single();
  if (!data?.resend_api_key) return null;
  return new Resend(data.resend_api_key);
}

export async function sendOrderConfirmation({
  to,
  orderId,
  items,
  total,
  shippingZone,
}: {
  to: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  shippingZone?: string;
}) {
  try {
    const resend = await getResendClient();
    if (!resend) return;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "noreply@lecrere.com.ar";
    const itemsList = items
      .map(
        (i) =>
          `<tr><td>${i.name}</td><td>${i.quantity}</td><td>$${i.price.toLocaleString("es-AR")}</td></tr>`
      )
      .join("");

    await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Lecrere — Pedido #${orderId.slice(0, 8).toUpperCase()} confirmado`,
      html: `
        <h2>Tu pedido está confirmado.</h2>
        <p>Gracias por tu compra en Lecrere. Procesaremos tu pedido a la brevedad.</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse">
          <tr><th>Producto</th><th>Cant.</th><th>Precio</th></tr>
          ${itemsList}
        </table>
        <p><strong>Total: $${total.toLocaleString("es-AR")}</strong></p>
        ${shippingZone ? `<p>Zona de envío: ${shippingZone}</p>` : ""}
        <p>Ante cualquier consulta escribinos a <a href="mailto:hola@lecrere.com.ar">hola@lecrere.com.ar</a> o por WhatsApp.</p>
        <p style="color:#999;font-size:12px">Lecrere — lecrere.com.ar</p>
      `,
    });
  } catch (err) {
    console.error("Error enviando email de confirmación:", err);
  }
}
