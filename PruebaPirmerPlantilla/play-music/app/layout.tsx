import { Playfair_Display, Figtree } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// ⚠️ CRÍTICO en v4: variable con nombre de la fuente (NO del token @theme)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Play Music — Instrumentos & Equipamiento",
  description:
    "Tu tienda de instrumentos musicales en Argentina. Guitarras, bajos, teclados, baterías, accesorios y equipamiento de sonido.",
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
    <html lang="es" className={`${playfair.variable} ${figtree.variable}`}>
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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
