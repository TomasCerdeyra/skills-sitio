interface WhatsAppLinkParams {
  message?: string;
  productName?: string;
  productUrl?: string;
}

export function buildWhatsAppLink({
  message,
  productName,
  productUrl,
}: WhatsAppLinkParams = {}): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  let text = message;

  if (!text && productName) {
    text = `Hola, quiero consultar sobre: *${productName}*`;
    if (productUrl) text += `\n${productUrl}`;
  }

  if (!text) text = "Hola, quiero hacer un pedido.";

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
