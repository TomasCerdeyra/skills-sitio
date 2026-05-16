import { HeaderTransparent } from "@/components/ui/HeaderTransparent";
import { FooterCTA } from "@/components/ui/FooterCTA";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderTransparent brandName="Bar Octopus" />
      <main>{children}</main>
      <FooterCTA brandName="Bar Octopus" />
      <WhatsAppFloat />
    </>
  );
}
