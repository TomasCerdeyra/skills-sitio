import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { CartProvider } from "@/context/CartContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
