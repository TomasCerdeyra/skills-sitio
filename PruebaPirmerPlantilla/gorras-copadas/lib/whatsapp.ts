const WA_NUMBER = "54329519274";

export function getWhatsAppUrl(message?: string): string {
  const text = message ?? "Hola! Vi sus gorras y me gustaría hacer una consulta.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getProductWhatsAppUrl(productName: string): string {
  return getWhatsAppUrl(`Hola! Me interesa la gorra "${productName}". ¿Pueden darme más info?`);
}
