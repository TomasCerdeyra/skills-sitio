import type { Metadata } from "next";
import { Cormorant_Garamond, Onest } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = Onest({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lecrere — Indumentaria argentina",
  description:
    "Prendas diseñadas y producidas en Argentina. Telas seleccionadas, cortes precisos, producción local. Comprá online en lecrere.com.ar.",
  keywords: ["ropa argentina", "indumentaria premium", "moda local", "lecrere"],
  openGraph: {
    title: "Lecrere — Indumentaria argentina",
    description: "Prendas diseñadas y producidas en Argentina.",
    url: "https://lecrere.com.ar",
    siteName: "Lecrere",
    locale: "es_AR",
    type: "website",
  },
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
      className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
    >
      <head />
      <body className="bg-neutral-50 text-neutral-900 font-body">
        {umamiId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
