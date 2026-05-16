import { Header } from "@/components/ui/Header";
import { FooterCTA } from "@/components/ui/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FooterCTA />
      <WhatsAppFloat />
    </>
  );
}
