import type { Metadata } from "next";
import { Playfair_Display, Onest } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ⚠️ Variables con el nombre de la fuente (no del token) — regla crítica Tailwind v4
const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bodyFont = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Estudio Méndez — Derecho Comercial y Societario",
  description:
    "Estudio jurídico especializado en derecho comercial y societario. Constitución de sociedades, contratos, M&A y asesoramiento legal para empresas.",
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
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
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
        {children}
      </body>
    </html>
  );
}
