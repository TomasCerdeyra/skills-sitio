import { Fraunces, Figtree } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

// Nombres de variable distintos a los tokens @theme para evitar colisión circular
const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const bodyFont = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "La Fermentada — Panadería artesanal con masa madre",
  description:
    "Pan de masa madre, fermentación lenta y harinas de molienda local. Retiro en local o envío. Pedí por WhatsApp.",
  openGraph: {
    title: "La Fermentada — Panadería artesanal con masa madre",
    description: "Pan artesanal horneado cada mañana. Masa madre, tiempo y oficio.",
    siteName: "La Fermentada",
    locale: "es_AR",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
