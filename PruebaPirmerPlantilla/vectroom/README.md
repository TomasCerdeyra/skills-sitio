# Vectroom

Sitio web de Vectroom construido con SitioHoy.

- **Plan:** Empresa
- **Slug:** vectroom
- **Stack:** Next.js + TypeScript + Tailwind v4 + Supabase + Vercel
- **Envíos:** Envia.com (Rama A)

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

## Estructura

- `app/` — rutas y páginas (App Router)
- `lib/` — utilidades compartidas (Supabase, helpers)
- `proxy.ts` — middleware de sesión Supabase (NO `middleware.ts`)
- `scripts/setup-rls.sql` — políticas RLS para Supabase (ejecutar una sola vez en el SQL Editor de Supabase)
- `scripts/seed-data.sql` — datos de prueba del catálogo

## Deploy

Deploy en Vercel:
- Conectar el repo
- Configurar las variables de entorno
- Configurar el dominio en Cloudflare apuntando a Vercel

## Soporte

Cualquier consulta: [SitioHoy](https://sitiohoy.com.ar)
