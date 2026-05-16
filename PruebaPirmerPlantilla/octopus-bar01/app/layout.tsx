import { Bricolage_Grotesque, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-var",
  display: "swap",
  weight: ["400", "600", "800"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-var",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Bar Octopus — Hamburguesería",
  description:
    "Hamburguesas con identidad, carnes seleccionadas y salsas de autor. Pedí por WhatsApp.",
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
