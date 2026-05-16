import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// ⚠️ Tailwind v4: variable con nombre de la fuente, NO del token
const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cel Tech — Celulares originales con garantía",
  description: "Tienda especializada en celulares originales. iPhone, Samsung, Motorola y más. Todos verificados y con garantía. Envíos a todo el país.",
  keywords: "celulares, iphone, samsung, motorola, originales, garantía, Buenos Aires",
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
      <body>
        {umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            data-domains={process.env.NEXT_PUBLIC_SITE_DOMAIN}
            strategy="afterInteractive"
          />
        )}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
