type OrderItem = {
  name: string;
  variant_name?: string | null;
  quantity: number;
  unit_price: number;
};

type PaymentEmailParams = {
  customerName: string;
  orderId: string;
  total: number;
  items: OrderItem[];
  trackingToken: string;
};

export function buildPaymentConfirmationEmail({
  customerName,
  orderId,
  total,
  items,
  trackingToken,
}: PaymentEmailParams): string {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #2E2E2E;">
          ${item.name}${item.variant_name ? ` — ${item.variant_name}` : ""}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #2E2E2E;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #2E2E2E;text-align:right;">
          $${item.unit_price.toLocaleString("es-AR")}
        </td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:system-ui,sans-serif;color:#F5F5F5;">
  <div style="max-width:600px;margin:40px auto;background:#141414;border-radius:12px;overflow:hidden;">
    <div style="background:#D4FF00;padding:32px 40px;">
      <h1 style="margin:0;color:#0A0A0A;font-size:28px;font-weight:900;letter-spacing:-0.5px;">
        GORRAS COPADAS
      </h1>
      <p style="margin:8px 0 0;color:#0A0A0A;font-size:14px;opacity:.7;">Tu pedido está confirmado ✓</p>
    </div>
    <div style="padding:40px;">
      <p style="font-size:18px;font-weight:600;margin:0 0 24px;">
        ¡Hola ${customerName}! Tu pedido llegó.
      </p>
      <p style="color:#A0A0A0;margin:0 0 32px;">
        Número de pedido: <strong style="color:#D4FF00;">#${orderId.slice(0, 8).toUpperCase()}</strong>
      </p>

      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="color:#A0A0A0;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">
            <th style="text-align:left;padding-bottom:8px;">Producto</th>
            <th style="text-align:center;padding-bottom:8px;">Cant.</th>
            <th style="text-align:right;padding-bottom:8px;">Precio</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <div style="margin-top:24px;text-align:right;">
        <span style="font-size:22px;font-weight:900;color:#D4FF00;">
          Total: $${total.toLocaleString("es-AR")}
        </span>
      </div>

      <div style="margin-top:40px;padding:24px;background:#1A1A1A;border-radius:8px;">
        <p style="margin:0 0 8px;font-size:14px;color:#A0A0A0;">Seguí tu pedido en:</p>
        <a href="https://gorras.com.ar/pedidos/${trackingToken}"
           style="color:#D4FF00;font-weight:600;text-decoration:none;word-break:break-all;">
          gorras.com.ar/pedidos/${trackingToken}
        </a>
      </div>

      <p style="margin-top:32px;color:#A0A0A0;font-size:14px;">
        ¿Dudas? Escribinos por WhatsApp al
        <a href="https://wa.me/54329519274" style="color:#D4FF00;text-decoration:none;">
          +54 329 519274
        </a>
      </p>
    </div>
    <div style="padding:24px 40px;border-top:1px solid #2E2E2E;text-align:center;">
      <p style="margin:0;color:#2E2E2E;font-size:12px;">
        © ${new Date().getFullYear()} Gorras Copadas · gorras.com.ar
      </p>
    </div>
  </div>
</body>
</html>`;
}
