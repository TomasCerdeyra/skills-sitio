---
name: umami-analytics
description: Configura Umami Cloud como sistema de analíticas en proyectos Next.js de SitioHoy. Inyecta el script en el root layout y provee un helper de tracking de eventos. Los eventos están diferenciados por plan (Esencial / Emprendimiento / Empresa). Multi-tenant — cada deploy tiene su propio website ID. Usar cuando un scaffold pida configurar analytics, cuando se quiera agregar tracking, o cuando haya que configurar Umami en un proyecto existente.
---

# Skill: Umami Analytics

Integra Umami Cloud como sistema de analíticas. Cumple GDPR sin cookies.

## Stack

- Next.js App Router + TypeScript
- Cuenta en [cloud.umami.is](https://cloud.umami.is)
- Supabase configurado (`tenants.umami_url`)

## Configuración por tenant

| Campo | Dónde | Descripción |
|---|---|---|
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `.env.local` del proyecto Vercel | ID único del sitio en Umami (distinto por cliente) |
| `NEXT_PUBLIC_UMAMI_SRC` | `.env.local` | URL del script (default: `https://cloud.umami.is/script.js`) |
| `tenants.umami_url` | Supabase | Referencia admin de qué script usa cada tenant |

**Cada deploy de Vercel tiene su propio Website ID** — esto separa las métricas por cliente.

## Setup en Umami Cloud

1. Ir a [cloud.umami.is](https://cloud.umami.is) → crear cuenta (o usar la cuenta de SitioHoy).
2. Settings → **Add Website**.
3. Nombre: nombre del cliente (ej: `Gilded Glow Skin`).
4. Dominio: dominio del cliente (ej: `gildedglow.com.ar`).
5. Copiar el **Website ID** → guardar en `NEXT_PUBLIC_UMAMI_WEBSITE_ID` en Vercel.
6. Guardar `https://cloud.umami.is/script.js` en `tenants.umami_url` (Supabase).

## Variables de entorno

```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
```

---

## Generar archivos del proyecto

| Ref a leer | Path destino |
|---|---|
| `umami-analytics--ref--root-layout.md` | `app/layout.tsx` (root layout con script) |
| `umami-analytics--ref--lib-umami.md` | `lib/analytics/umami.ts` (helper trackEvent) |

**Eventos a trackear según el plan:** ver `umami-analytics--ref--eventos-por-plan.md`.

---

## Notas importantes

- Umami **no usa cookies** — cumple GDPR/privacidad sin banner.
- **`NEXT_PUBLIC_UMAMI_WEBSITE_ID` debe ser un UUID** del formato `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. Si se pone cualquier otro valor (email, texto libre), el script se inyecta pero la API de Umami devuelve `400` en cada evento.
- Si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` está vacío o no está definido, el script simplemente no se inyecta — no rompe nada.
- **El script SÍ intenta enviar eventos desde `localhost`** si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` está definido. Para evitar los 400 en desarrollo, usar `data-domains` en el `<Script>` (ver ref `umami-analytics--ref--root-layout`). Agregar `NEXT_PUBLIC_SITE_DOMAIN=dominio.com.ar` al `.env.local`.
- El dashboard de Umami es accesible en [cloud.umami.is](https://cloud.umami.is). Compartir acceso read-only al cliente desde Settings → Share.
- `strategy="afterInteractive"` asegura que el script no bloquea el render ni el LCP.

## Reglas

1. **Las page views se trackean automáticamente** — no agregar código manual para eso.
2. **Los eventos custom se trackean con `trackEvent("nombre", { ...props })`** desde componentes client.
3. **Nunca trackear datos personales** (email, teléfono, dirección). Solo IDs y categorías.
4. **El helper falla silenciosamente** si Umami no está cargado — no rompe la app.
