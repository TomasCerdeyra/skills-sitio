# Play Music

Sitio web de Play Music construido con SitioHoy.

- **Plan:** Empresa
- **Slug:** play-music
- **Envíos:** Envia.com (tarifas en tiempo real)
- **Stack:** Next.js + TypeScript + Tailwind v4 + Supabase + Vercel

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

## Base de datos

Ejecutar en el SQL Editor de Supabase **en este orden**:

1. `scripts/setup-rls.sql` — crea el tenant y habilita RLS
   - Anotar el UUID que imprime (es el `NEXT_PUBLIC_TENANT_ID`)
2. `scripts/seed-data.sql` — carga los productos demo
   - Antes de ejecutar: Ctrl+H → reemplazar `TODO_TENANT_ID` con el UUID del paso anterior

## Estructura

- `app/` — rutas y páginas (App Router)
- `lib/` — utilidades compartidas (Supabase, helpers)
- `components/ui/` — componentes de interfaz
- `context/CartContext.tsx` — estado del carrito
- `proxy.ts` — middleware de sesión Supabase (NO `middleware.ts`)
- `scripts/setup-rls.sql` — políticas RLS + creación de tenant
- `scripts/seed-data.sql` — datos de prueba

## Envíos

Este sitio usa **Envia.com** para cotizar envíos en tiempo real.
Configurar en la tabla `tenants`:
- `envia_access_token` — token de acceso a la API de Envia
- `origin_name`, `origin_address`, `origin_city`, `origin_postal_code`, `origin_state`, `origin_phone` — datos del remitente

## Deploy

Deploy en Vercel:
- Conectar el repo
- Configurar las variables de entorno
- Configurar el dominio en Cloudflare apuntando a Vercel

## Soporte

Cualquier consulta: [SitioHoy](https://sitiohoy.com.ar)
