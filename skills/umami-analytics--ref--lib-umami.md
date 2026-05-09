# Reference: `lib/analytics/umami.ts`

Path destino: `lib/analytics/umami.ts`

Helper de tracking. Falla silenciosamente si Umami no está cargado.

```typescript
declare global {
  interface Window {
    umami?: {
      track: (
        event: string,
        data?: Record<string, string | number | boolean>
      ) => void;
    };
  }
}

/**
 * Trackea un evento en Umami.
 * Si Umami no está cargado (dev, bloqueador, script no inyectado), lo ignora silenciosamente.
 */
export function trackEvent(
  event: string,
  data?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}
```

## Uso

```typescript
"use client";

import { trackEvent } from "@/lib/analytics/umami";

trackEvent("whatsapp_click", { source: "header" });
trackEvent("view_product", { slug: "producto-x" });
trackEvent("purchase", { total: 1500, payment_id: "12345" });
```

## Nota técnica

El `declare global` extiende el tipado de `Window` para que TypeScript reconozca `window.umami`. No rompe nada en runtime — solo es para autocomplete y type-checking.
