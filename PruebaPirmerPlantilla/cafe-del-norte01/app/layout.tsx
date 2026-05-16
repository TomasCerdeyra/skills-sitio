import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const bodyFont = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Café del Norte — Cafetería de especialidad",
  description:
    "Café de especialidad, medialunas hechas en casa y mesas para charlar sin apuro. Pedí por WhatsApp o comprá online.",
  openGraph: {
    title: "Café del Norte",
    description: "Cafetería de especialidad. Pedí por WhatsApp o comprá online.",
    url: "https://cafedelnorte.com.ar",
    siteName: "Café del Norte",
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
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
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
