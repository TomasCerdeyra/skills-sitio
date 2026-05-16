interface PaymentEmailItems {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentEmailShipping {
  carrier: string;
  service?: string;
  cost: number;
}

interface PaymentEmailDiscount {
  code: string;
  amount: number;
}

interface PaymentEmailParams {
  statusText: string;
  items: PaymentEmailItems[];
  totalAmount: number;
  paymentId: string | number;
  shippingInfo?: PaymentEmailShipping;
  discount?: PaymentEmailDiscount;
  // Personalización visual (opcional)
  headerTitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
  accentColor?: string;
}

export function getPaymentStatusText(status: string): string {
  switch (status) {
    case "approved":
      return "✅ Pago aprobado";
    case "pending":
      return "⏳ Pago pendiente";
    case "in_process":
      return "⏳ Pago en proceso";
    case "rejected":
      return "❌ Pago rechazado";
    default:
      return status;
  }
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildPaymentConfirmationEmail({
  statusText,
  items,
  totalAmount,
  paymentId,
  shippingInfo,
  discount,
  headerTitle = "Confirmación de Compra",
  gradientFrom = "#6366f1",
  gradientTo = "#8b5cf6",
  accentColor = "#6366f1",
}: PaymentEmailParams): string {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(item.name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.price * item.quantity)}</td>
        </tr>`
    )
    .join("");

  const subtotalRow = `
    <div style="margin-top:12px;padding:8px 12px;display:flex;justify-content:space-between;color:#374151;">
      <span>Subtotal</span>
      <span>${formatCurrency(subtotal)}</span>
    </div>
  `;

  const discountRow = discount
    ? `<div style="padding:8px 12px;display:flex;justify-content:space-between;color:#10b981;">
         <span>Descuento (${escapeHtml(discount.code)})</span>
         <span>-${formatCurrency(discount.amount)}</span>
       </div>`
    : "";

  const shippingRow = shippingInfo
    ? `<div style="padding:8px 12px;display:flex;justify-content:space-between;color:#374151;">
         <span>Envío - ${escapeHtml(shippingInfo.carrier)}${shippingInfo.service ? ` (${escapeHtml(shippingInfo.service)})` : ""}</span>
         <span>${formatCurrency(shippingInfo.cost)}</span>
       </div>`
    : "";

  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:linear-gradient(135deg,${gradientFrom},${gradientTo});padding:32px 24px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:22px;">${escapeHtml(headerTitle)}</h1>
      </div>
      <div style="padding:24px;">
        <p style="color:#374151;font-size:16px;margin:0 0 8px;">¡Hola!</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 20px;">
          Recibimos tu pago correctamente. Acá tenés el detalle de tu compra:
        </p>
        <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:20px;">
          <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Estado del pago</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${escapeHtml(statusText)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:8px 12px;text-align:left;">Producto</th>
              <th style="padding:8px 12px;text-align:center;">Cant.</th>
              <th style="padding:8px 12px;text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        ${subtotalRow}
        ${discountRow}
        ${shippingRow}
        <div style="margin-top:16px;padding:12px;background:#f3f4f6;border-radius:8px;display:flex;justify-content:space-between;">
          <span style="font-size:16px;font-weight:700;color:#111827;">Total</span>
          <span style="font-size:16px;font-weight:700;color:${accentColor};">${formatCurrency(totalAmount)}</span>
        </div>
        <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;text-align:center;">
          ID de pago: ${escapeHtml(String(paymentId))}
        </p>
      </div>
    </div>
  `;
}
