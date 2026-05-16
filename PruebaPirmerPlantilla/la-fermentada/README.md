# La Fermentada

Sitio web de La Fermentada construido con SitioHoy.

- **Plan:** Emprendimiento
- **Slug:** la-fermentada
- **Stack:** Next.js + TypeScript + Tailwind + Supabase + Vercel

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

## Primer uso — Configurar la base de datos

Ejecutar en el SQL Editor de Supabase en este orden:

1. `scripts/setup-rls.sql` — Crea el tenant y las políticas RLS. **Guardar el UUID que imprime**.
2. Pegar el UUID en `.env.local` como `NEXT_PUBLIC_TENANT_ID`.
3. `scripts/seed-data.sql` — Cargar productos de prueba. Primero hacer Ctrl+H para reemplazar `TODO_TENANT_ID` por el UUID real.

## Estructura

- `app/` — rutas y páginas (App Router)
- `app/(public)/` — páginas públicas del sitio (home, catálogo, producto, carrito, contacto)
- `app/checkout/` — flujo de pago con MercadoPago Payment Brick
- `components/ui/` — componentes de UI
- `context/CartContext.tsx` — estado del carrito
- `lib/` — utilidades compartidas (Supabase, email, analytics, WhatsApp)
- `proxy.ts` — middleware de sesión Supabase (NO `middleware.ts`)
- `scripts/setup-rls.sql` — políticas RLS + creación del tenant
- `scripts/seed-data.sql` — datos de prueba

## Flujo de checkout

`/carrito` → `/checkout/datos` → `/checkout` (Payment Brick) → `/checkout/status`

## Cupones de prueba (seed)

- `PRIMERPAN` — 10% de descuento, mínimo $3.000
- `SABADO2000` — $2.000 de descuento fijo, mínimo $8.000

## Deploy

Deploy en Vercel:
- Conectar el repo
- Configurar las variables de entorno (ver `.env.local.example`)
- Configurar el dominio en Cloudflare apuntando a Vercel

## Soporte

Cualquier consulta: [SitioHoy](https://sitiohoy.com.ar)
