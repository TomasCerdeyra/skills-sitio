import { buildWhatsAppLink } from "@/lib/whatsapp";
import { NosotrosClient } from "@/components/ui/NosotrosClient";

export default function NosotrosPage() {
  const waLink = buildWhatsAppLink({ message: "Hola! Quiero saber más sobre Café del Norte." });
  return <NosotrosClient waLink={waLink} />;
}
