import type { Metadata } from "next";
import { Barlow_Condensed, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ⚠️ CRÍTICO v4: variable con nombre de la fuente, NO del token @theme
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vectroom — Ropa",
  description:
    "Tienda de ropa de diseño argentino. Prendas pensadas para usarse. Producción local, materiales nobles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiSrc =
    process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${outfit.variable}`}
    >
      <head />
      <body className="bg-white text-neutral-900 antialiased">
        {umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            data-domains={process.env.NEXT_PUBLIC_SITE_DOMAIN}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
