import { Lora, Figtree } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const displayFont = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Bar Homero — Bar de barrio, Buenos Aires",
  description:
    "Bebidas, picadas y buenas tardes. Carta completa disponible para pedir online o acercarte al local.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const umamiSrc =
    process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head />
      <body className="font-body antialiased bg-neutral-50 text-neutral-900">
        {umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            data-domains={process.env.NEXT_PUBLIC_SITE_DOMAIN}
            strategy="afterInteractive"
          />
        )}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
