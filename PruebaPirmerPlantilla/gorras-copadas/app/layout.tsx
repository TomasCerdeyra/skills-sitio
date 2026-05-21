import type { Metadata } from "next";
import { Archivo_Black, Onest } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
import "./globals.css";

const displayFont = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
  weight: "400",
});

const bodyFont = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Gorras Copadas — Gorras para los que se animan",
    template: "%s | Gorras Copadas",
  },
  description:
    "La tienda de gorras más copada de Argentina. Snapbacks, dad hats y 5-panels para los que no le tienen miedo al estilo. Envíos a todo el país.",
  metadataBase: new URL("https://gorras.com.ar"),
  openGraph: {
    siteName: "Gorras Copadas",
    locale: "es_AR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head />
      <body>
        {umamiId && (
          <Script src={umamiSrc} data-website-id={umamiId} strategy="afterInteractive" />
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
