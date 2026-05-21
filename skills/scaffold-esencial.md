---
name: scaffold-esencial
description: Crea desde cero la estructura base de un sitio Next.js para un cliente del plan Esencial de SitioHoy ($25.000/mes). Invoca primero scaffold-base, luego agrega el catálogo de hasta 50 productos con categorías, subcategorías y variantes (display only), imágenes via tabla product_images, formulario de contacto vía Resend, WhatsApp CTAs, y Umami Cloud analytics. NO incluye carrito, checkout, MercadoPago ni cupones. El panel admin se conecta externamente. Al terminar queda listo para el skill de diseño. Usar cuando el usuario diga "crear sitio esencial", "scaffold cliente esencial", o similar.
---

# Skill: Scaffold — Plan Esencial

Plan **Esencial** ($25.000/mes). `max_products = 50`. Solo display de productos, sin compra online — los CTAs derivan a WhatsApp.

## Inputs requeridos

Si no fueron provistos, preguntar:

1. Nombre del cliente (ej: `Gilded Glow Skin`)
2. Slug (ej: `gilded-glow-skin`)
3. Tenant ID (UUID — generar con `crypto.randomUUID()` si no tiene)
4. Dominio final (ej: `gildedglow.com.ar`)
5. Número de WhatsApp del negocio (ej: `5491112345678`)
6. ¿Carpeta vacía o monorepo? (default: carpeta vacía)
7. ¿Credenciales listas? (Supabase, Resend, Umami) — si no, placeholders

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js App Router (`proxy.ts`, NO `middleware.ts`) |
| DB / Auth | Supabase multi-tenant |
| Storage | Supabase Storage (bucket `objects`, tabla `product_images`) |
| Emails | Resend (formulario de contacto) |
| Analytics | Umami Cloud |
| Pagos | ❌ Ninguno (CTAs a WhatsApp) |

## Tablas Supabase usadas

✅ `tenants`, `user_tenants`, `categories`, `subcategories`, `products`, `product_images`, `product_variants`

❌ NO usa: `orders`, `order_items`, `coupons`, `shipping_zones`

---

## Flujo

### 1. Invocar `scaffold-base` ✅

Crea proyecto Next.js + TS + Tailwind + estructura base + auth + endpoints comunes (tenant-config, contact) + `.env.local.example`.

### 2. Instalar dependencias específicas

`scaffold-base` ya instala lo común. Para Esencial **no se agrega nada** — `mercadopago` y `@mercadopago/sdk-react` NO se instalan en este plan.

### 3. Generar archivos específicos del plan

| Ref a leer | Path destino |
|---|---|
| `scaffold-esencial--ref--catalogo-page.md` | `app/(public)/catalogo/page.tsx` |
| `scaffold-esencial--ref--producto-page.md` | `app/(public)/producto/[slug]/page.tsx` |

> El form de contacto, layout público, home y nosotros ya los crea `scaffold-base` como placeholders.

### 4. Invocar skills de configuración (en orden)

#### 4.1 — `rls-on-demand` ✅ (PRIMERO — crea el tenant)
Plan: `esencial`. El script `setup-rls.sql` ahora:
1. **Crea el tenant** con `INSERT INTO tenants` y genera UUID automático
2. **Imprime el UUID** con `RAISE NOTICE` para que el usuario lo copie
3. Habilita RLS en las tablas del plan
4. Crea las políticas

Cargar refs:
- `policies-products`
- `policies-categories`
- `policies-system`

NO cargar `policies-shipping-zones` ni `policies-orders-coupons` (Esencial no los usa).

Generar `scripts/setup-rls.sql`.

> **Flujo del usuario:** corre `setup-rls.sql` → copia el UUID → lo pega en `.env.local` como `NEXT_PUBLIC_TENANT_ID` → lo pega en `seed-data.sql` (Ctrl+H `TODO_TENANT_ID`).

#### 4.1.b — Seed data de prueba (skill `sitio-diseno--ref--seed-data-sql`)
Las plantillas demo necesitan datos para que el catálogo se vea lleno. El skill `sitio-diseno` (etapa 5) genera `scripts/seed-data.sql` adaptado al rubro.

El archivo usa `TODO_TENANT_ID` como placeholder — el usuario hace Ctrl+H y lo reemplaza con el UUID que imprimió `setup-rls.sql`.

> *"Ejecutar en orden: setup-rls.sql (crea tenant + RLS), luego seed-data.sql (carga datos)."*

#### 4.2 — `supabase-storage` ✅
Bucket `objects`. Si la instancia ya tiene el bucket, no recrear. Si es instancia nueva, cargar el ref `supabase-storage--ref--bucket-config`.

#### 4.3 — `umami-analytics` ✅
Plan: `esencial`. Eventos: `whatsapp_click`, `contact_form_submit`, `view_product`, `category_click`.

#### 4.4 — `isr-on-demand` ✅
Generar y configurar la revalidación on-demand (ISR) del caché leyendo el skill `isr-on-demand`. Asegurarse de crear los triggers SQL y el endpoint `/api/revalidate/route.ts`.

---

## Verificación

- [ ] `proxy.ts` en raíz (NO `middleware.ts`)
- [ ] `lib/whatsapp.ts` usa `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] `app/api/contact/route.ts` funcional (de scaffold-base)
- [ ] `app/(public)/catalogo/page.tsx` query a Supabase con `.limit(50)`
- [ ] `app/(public)/producto/[slug]/page.tsx` trae producto + imágenes + variantes
- [ ] **No existe** ningún archivo de checkout, carrito, órdenes ni MercadoPago
- [ ] **No existe** ningún directorio `app/admin/` (panel es externo)
- [ ] `package.json` incluye: `@supabase/ssr`, `@supabase/supabase-js`, `resend`. **NO incluye** `mercadopago`
- [ ] `scripts/setup-rls.sql` presente
- [ ] `npm run build` sin errores

---

## Resumen final al usuario

```
✅ Scaffold Esencial del cliente "{nombre}" creado en ./{slug}/

Stack configurado:
- Next.js + TS + Tailwind ✓
- Supabase multi-tenant (tenant_id: {uuid}) ✓
- Catálogo hasta 50 productos con categorías, subcategorías y variantes ✓
- Supabase Storage (bucket: objects → tabla: product_images) ✓
- Formulario de contacto → Resend ✓
- WhatsApp CTAs (número: {whatsapp}) ✓
- Umami Cloud analytics ✓
- Auth lista para el admin panel externo ✓

Próximos pasos:
1. Completar credenciales en .env.local
2. Ejecutar en Supabase SQL Editor (en orden):
   a) INSERT del tenant (el SQL ya se generó arriba)
   b) scripts/setup-rls.sql (políticas de seguridad)
   c) scripts/seed-data.sql (productos de prueba para que la plantilla se vea llena)
3. Invocar el skill sitio-diseno para armar la UI con copy del rubro + imágenes Unsplash + animaciones
4. `npm run dev` — la plantilla debe verse completa, llena y animada
5. Configurar dominio en Vercel + Cloudflare cuando se apruebe la plantilla

Panel admin: se conecta externamente.
El admin gestiona: productos, imágenes, categorías, subcategorías, variantes.
```

---

## Reglas

1. **NUNCA usar `middleware.ts`** — `proxy.ts` viene de `scaffold-base`.
2. **NUNCA crear páginas de checkout, carrito ni pagos** — Esencial no vende online.
3. **Variantes son display only** — se muestran pero no tienen lógica de compra.
4. **Imágenes van en tabla `product_images`** — NO en `image_urls TEXT[]`.
5. **Panel admin es externo** — el scaffold solo prepara auth y datos.
6. **Máximo 50 productos** — el `.limit(50)` en las queries no es negociable.
7. **NO instalar** `mercadopago`, `@mercadopago/sdk-react`, Google Analytics, SendGrid, Stripe.
