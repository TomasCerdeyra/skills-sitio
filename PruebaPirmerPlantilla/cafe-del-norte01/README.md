# Café del Norte

Sitio web de Café del Norte construido con SitioHoy.

- **Plan:** Emprendimiento
- **Slug:** cafe-del-norte
- **WhatsApp:** 5493814001234
- **Dominio:** cafedelnorte.com.ar
- **Stack:** Next.js + TypeScript + Tailwind + Supabase + Vercel + MercadoPago + Resend + Umami

## Setup local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Copiar `.env.local.example` a `.env.local` y completar las variables.

3. Correr en desarrollo:
   ```bash
   npm run dev
   ```

4. Build de producción:
   ```bash
   npm run build
   ```

## Setup en Supabase

Ejecutar en orden en el SQL Editor de Supabase:

1. `scripts/setup-rls.sql` — Crea el tenant + habilita RLS + políticas
   - Anotar el UUID que imprime
   - Pegarlo en `.env.local` como `NEXT_PUBLIC_TENANT_ID`
   
2. `scripts/seed-data.sql` — Carga productos, categorías, zonas y cupones de prueba
   - Hacer Ctrl+H y reemplazar `TODO_TENANT_ID` con el UUID

## Estructura

- `app/` — rutas y páginas (App Router)
- `lib/` — utilidades compartidas (Supabase, helpers, email, analytics)
- `context/` — CartContext (carrito global)
- `components/ui/` — componentes de UI reutilizables
- `proxy.ts` — middleware de sesión Supabase (NO `middleware.ts`)
- `scripts/setup-rls.sql` — políticas RLS para Supabase (ejecutar una sola vez)
- `scripts/seed-data.sql` — datos de prueba para demo

## Flujo de checkout

`/carrito` → `/checkout/datos` → `/checkout` (Payment Brick) → `/checkout/status`

## Deploy

Deploy en Vercel:
- Conectar el repo
- Configurar las variables de entorno
- Configurar el dominio en Cloudflare apuntando a Vercel

## Soporte

Cualquier consulta: [SitioHoy](https://sitiohoy.com.ar)
