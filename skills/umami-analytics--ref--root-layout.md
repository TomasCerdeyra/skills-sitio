# Reference: `app/layout.tsx` — Root layout con Umami

Path destino: `app/layout.tsx`

Root layout que inyecta el script de Umami solo si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` está definido. **El skill `sitio-diseno` después agrega las fuentes y demás configuración visual a este mismo archivo.**

```typescript
import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const umamiSrc =
    process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js";
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="es">
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
```

## Por qué `data-domains`

Cuando `data-domains` está presente, el script de Umami **solo envía eventos cuando el hostname actual coincide con ese valor**. Esto tiene dos efectos importantes:

1. **En `localhost` / `npm run dev`:** el script se carga pero no envía nada — cero errores 400 en consola.
2. **En producción (dominio del cliente):** el script trackea normalmente.

Sin `data-domains`, el script intenta enviar eventos desde localhost y la API de Umami responde `400` porque el website ID no está registrado para ese origen.

## Variable de entorno requerida

```env
NEXT_PUBLIC_SITE_DOMAIN=cafedelnorte.com.ar
```

Agregar al `.env.local` de cada proyecto. El valor es el dominio de producción **sin** `https://`.

## Nota

El `<head />` vacío y el `<body>` sin clases es intencional — el skill `sitio-diseno` agrega:
- Fuentes con `next/font/google`
- Variables CSS de tipografía en el `<html>`
- Clases en el `<body>` para fondo y color de texto
- Metadata (título, descripción)
- Favicon
