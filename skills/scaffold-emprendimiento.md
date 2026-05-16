---
name: scaffold-emprendimiento
description: Crea desde cero la estructura base de un sitio Next.js para un cliente del plan Emprendimiento de SitioHoy ($37.000/mes). Invoca primero scaffold-base, luego agrega catálogo de hasta 200 productos con variantes, checkout completo con MercadoPago + cuotas, cupones de descuento, envíos por zonas fijas (tabla shipping_zones), confirmación de pedidos por email con Resend, y Umami analytics. El panel de administración se conecta externamente. Al terminar queda listo para el skill de diseño. Usar cuando el usuario diga "crear sitio emprendimiento", "scaffold cliente emprendimiento", o similar.
---

# Skill: Scaffold — Plan Emprendimiento

Plan **Emprendimiento** ($37.000/mes). `max_products = 200`. Usa siempre `shipping_zones` para envíos (zonas fijas).

## Inputs requeridos

Si no fueron provistos, preguntar:

1. Nombre del cliente (ej: `Milan Bar`)
2. Slug (ej: `milan-bar`)
3. Tenant ID (UUID — generar si no tiene)
4. Dominio final (ej: `milanbar.com.ar`)
5. Número de WhatsApp del negocio
6. ¿Carpeta vacía o monorepo? (default: carpeta vacía)
7. ¿Credenciales listas? (Supabase, MercadoPago, Resend, Umami) — si no, placeholders

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js App Router (`proxy.ts`, NO `middleware.ts`) |
| DB / Auth | Supabase multi-tenant |
| Storage | Supabase Storage |
| Pagos | MercadoPago + cuotas |
| Envíos | `shipping_zones` (zonas fijas, gestionadas desde admin panel) |
| Emails | Resend (confirmación pedidos + contacto) |
| Analytics | Umami Cloud |

## Tablas Supabase usadas

✅ Todas las base + `shipping_zones`, `orders`, `order_items`, `coupons`

❌ NO usa: `tenants.envia_access_token` (eso es plan Empresa)

---

## Flujo

### 1. Invocar `scaffold-base` ✅

Crea proyecto + estructura + auth + endpoints comunes.

### 2. Instalar dependencias específicas

`scaffold-base` ya instala lo común. Agregar:

```bash
npm install mercadopago @mercadopago/sdk-react
```

### 3. Generar archivos específicos del plan

| Ref a leer | Path destino |
|---|---|
| `scaffold-emprendimiento--ref--cart-context.md` | `context/CartContext.tsx` ⚠️ **PRIMERO** |
| `scaffold-emprendimiento--ref--catalogo-page.md` | `app/(public)/catalogo/page.tsx` |
| `scaffold-emprendimiento--ref--producto-page.md` | `app/(public)/producto/[slug]/page.tsx` |
| `scaffold-emprendimiento--ref--carrito-page.md` | `app/(public)/carrito/page.tsx` |
| `scaffold-emprendimiento--ref--api-shipping-zones.md` | `app/api/shipping/zones/route.ts` |
| `scaffold-emprendimiento--ref--api-coupons-validate.md` | `app/api/coupons/validate/route.ts` |

> ⚠️ **CartContext primero**: `carrito/page.tsx` y `components/ui/Header.tsx` usan `useCart()` de `@/context/CartContext`. Sin este archivo el build falla. Crear `context/CartContext.tsx` ANTES que los componentes que lo consumen.
>
> **Paso obligatorio en `app/layout.tsx`:** después de crear el CartContext, envolver `{children}` con `<CartProvider>` en el root layout (el skill `umami-analytics` ya genera el layout — agregar el provider dentro de él).

#### 4.1 — `rls-on-demand` ✅ (PRIMERO — crea el tenant)
Plan: `emprendimiento`. El script `setup-rls.sql` ahora:
1. **Crea el tenant** con `INSERT INTO tenants` y genera UUID automático
2. **Imprime el UUID** con `RAISE NOTICE` para que el usuario lo copie
3. Habilita RLS en todas las tablas del plan
4. Crea las políticas

Cargar refs:
- `policies-products`
- `policies-categories`
- `policies-shipping-zones`
- `policies-orders-coupons`
- `policies-system`

Generar `scripts/setup-rls.sql` completo.

> **Flujo del usuario:** corre `setup-rls.sql` → copia el UUID → lo pega en `.env.local` como `NEXT_PUBLIC_TENANT_ID` → lo pega en `seed-data.sql` (Ctrl+H `TODO_TENANT_ID`).

#### 4.1.b — Seed data de prueba (skill `sitio-diseno--ref--seed-data-sql`)
Las plantillas demo necesitan datos para que el catálogo, los filtros, las zonas y el checkout se vean reales. El skill `sitio-diseno` (etapa 5) genera `scripts/seed-data.sql` adaptado al rubro con: 8-12 productos, 3-5 categorías, imágenes Unsplash, variantes, zonas de envío y 2 cupones de prueba.

El archivo usa `TODO_TENANT_ID` como placeholder — el usuario hace Ctrl+H y lo reemplaza con el UUID que imprimió `setup-rls.sql`.

> *"Ejecutar en orden: setup-rls.sql (crea tenant + RLS), luego seed-data.sql (carga datos)."*

#### 4.2 — `supabase-storage` ✅
Bucket `objects`. Si la instancia ya lo tiene, no recrear.

#### 4.3 — `rls-on-demand` ✅
Plan: `emprendimiento`. Cargar refs:
- `policies-products`
- `policies-categories`
- `policies-shipping-zones`
- `policies-orders-coupons`
- `policies-system`

Generar `scripts/setup-rls.sql` con todas + ALTER TABLE para todas las tablas del plan.

#### 4.4 — `mercadopago-connection` ✅
Generar:
- `app/api/create-preference/route.ts`
- `app/api/process-payment/route.ts`
- `app/api/webhooks/mercadopago/route.ts`
- `app/checkout/page.tsx` (Payment Brick)

#### 4.5 — `resend-email` ✅
Generar `lib/email/send.ts` y `lib/email/templates/payment.ts`. Estos los usan los endpoints de mercadopago.

#### 4.6 — `umami-analytics` ✅
Plan: `emprendimiento`. Eventos: los de Esencial + `add_to_cart`, `select_variant`, `start_checkout`, `apply_coupon`, `select_shipping_zone`, `purchase`.

---

## Verificación

- [ ] `context/CartContext.tsx` creado con `CartProvider` y `useCart()`
- [ ] `<CartProvider>` envuelve `{children}` en `app/layout.tsx`
- [ ] `proxy.ts` en raíz (NO `middleware.ts`)
- [ ] `app/api/shipping/zones/route.ts` lee de `shipping_zones`
- [ ] `app/api/coupons/validate/route.ts` funcional
- [ ] `app/api/contact/route.ts` funcional (de scaffold-base)
- [ ] Flujo de checkout es: `/carrito` → `/checkout/datos` → `/checkout` (Payment Brick) → `/checkout/status`
- [ ] Header/MobileMenu: botón "Pedido" (o carrito) enlaza a `/carrito`, NO directamente a `/checkout/datos`
- [ ] `app/api/create-preference/route.ts` crea orden + order_items + popula columnas individuales (`shipping_carrier`, `shipping_service`, `shipping_cost`, `shipping_postal_code`, `coupon_code`, `discount_amount`)
- [ ] `app/api/process-payment/route.ts` actualiza orden e incrementa `coupons.uses_count`
- [ ] `app/api/webhooks/mercadopago/route.ts` detecta transición a approved (no duplica)
- [ ] `app/(public)/catalogo/page.tsx` query con `.limit(200)`
- [ ] `app/(public)/producto/[slug]/page.tsx` trae producto + imágenes + variantes
- [ ] `app/(public)/carrito/page.tsx` presente — revisar items, ajustar cantidades, eliminar, antes de ir al checkout
- [ ] **No existe** ningún directorio `app/admin/` (panel es externo)
- [ ] Imágenes usan tabla `product_images`
- [ ] `package.json` incluye: `@supabase/ssr`, `@supabase/supabase-js`, `mercadopago`, `@mercadopago/sdk-react`, `resend`
- [ ] `scripts/setup-rls.sql` presente
- [ ] `npm run build` sin errores

---

## Resumen final al usuario

```
✅ Scaffold Emprendimiento del cliente "{nombre}" creado en ./{slug}/

Stack configurado:
- Next.js + TS + Tailwind ✓
- Supabase multi-tenant (tenant_id: {uuid}) ✓
- Catálogo hasta 200 productos con categorías, subcategorías y variantes ✓
- Supabase Storage (bucket: objects → tabla: product_images) ✓
- MercadoPago + cuotas con order_items + cupones ✓
- Flujo checkout: /carrito → /checkout/datos → /checkout → /checkout/status ✓
- Validación de cupones (/api/coupons/validate) ✓
- Zonas de envío leídas de shipping_zones (/api/shipping/zones) ✓
- Confirmación de pedidos → Resend ✓
- Formulario de contacto → Resend ✓
- WhatsApp CTAs (número: {whatsapp}) ✓
- Umami Cloud analytics ✓
- Auth lista para el admin panel externo ✓

Próximos pasos:
1. Completar credenciales en .env.local
2. Ejecutar en Supabase SQL Editor (en orden):
   a) INSERT del tenant + cargar credenciales (mp_access_token, mp_public_key, resend_api_key, umami_url)
   b) scripts/setup-rls.sql (políticas de seguridad)
   c) scripts/seed-data.sql (productos + categorías + zonas + cupones de prueba)
3. Invocar skill sitio-diseno para armar la UI con copy del rubro + imágenes Unsplash + animaciones
4. `npm run dev` — la plantilla debe verse completa, llena y animada
5. Configurar dominio en Vercel + Cloudflare cuando se apruebe la plantilla

Panel admin: se conecta externamente.
El admin gestiona: productos, imágenes, categorías, variantes, pedidos, cupones, zonas de envío.
```

---

## Reglas

1. **NUNCA usar `middleware.ts`** — `proxy.ts` viene de `scaffold-base`.
2. **NUNCA crear `app/admin/`** — el panel se conecta externamente.
3. **Imágenes van en tabla `product_images`** — NO en `image_urls TEXT[]`.
4. **Cupones:** siempre incrementar `uses_count` cuando se aplica un pago exitoso (lo hace `mercadopago-connection`).
5. **Shipping en `orders`:** popular **columnas individuales** (`shipping_carrier`, `shipping_service`, `shipping_cost`, `shipping_postal_code`) **Y** el JSONB `shipping_address`. NO solo el JSONB.
6. **Cupón en `orders`:** popular `coupon_code` y `discount_amount` cuando aplica.
7. **Email nunca rompe el pago** — siempre en try/catch.
8. **Máximo 200 productos** — `.limit(200)` en queries de catálogo.
9. **Zonas de envío vienen siempre de `shipping_zones`** — nunca hardcodear.
10. **NO instalar** Stripe, PayPal, Google Analytics, SendGrid.
11. **NO usar `envia_access_token`** — eso es plan Empresa.
