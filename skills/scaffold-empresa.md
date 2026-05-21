---
name: scaffold-empresa
description: Crea desde cero la estructura base de un sitio Next.js para un cliente del plan Empresa de SitioHoy ($65.000/mes). Extiende Emprendimiento con productos ilimitados y analítica avanzada de conversiones. Para envíos pregunta al inicio si se usa Envia.com (envíos automáticos en tiempo real) o zonas fijas (shipping_zones, igual que Emprendimiento) — son mutuamente excluyentes. El panel admin se conecta externamente. Al terminar queda listo para el skill de diseño. Usar cuando el usuario diga "crear sitio empresa", "scaffold cliente empresa", o similar.
---

# Skill: Scaffold — Plan Empresa

Plan **Empresa** ($65.000/mes). `max_products = NULL` (ilimitado). Decisión clave al inicio: **Envia.com vs zonas fijas**.

## Inputs requeridos

Igual que Emprendimiento + **una pregunta clave**:

1. Nombre del cliente
2. Slug
3. Tenant ID (UUID — generar si no tiene)
4. Dominio final
5. Número de WhatsApp del negocio
6. **¿Usa Envia.com para los envíos? (Sí / No)** ← decisión clave
7. ¿Carpeta vacía o monorepo?
8. ¿Credenciales listas?

> **Pregunta 6 textual al usuario:**
>
> *"¿Va a usar Envia.com para calcular los envíos o va a configurar zonas fijas manuales?*
> *  a) **Envia.com (Sí)** — el sitio consulta tarifas en tiempo real a la API de Envia y muestra opciones (OCA, Andreani, Correo Argentino) con sus precios reales.*
> *  b) **Zonas fijas (No)** — el cliente define manualmente las zonas y precios desde el admin panel, igual que en Emprendimiento."*

Según la respuesta se sigue **Rama A (Envia)** o **Rama B (zonas fijas)**.

---

## Stack (compartido por ambas ramas)

Todo lo de Emprendimiento + analítica avanzada de conversiones.

## Diferencia 1 — Productos ilimitados

En todas las queries de catálogo, **no agregar `.limit()`**. En el INSERT del tenant: `max_products = NULL`.

## Diferencia 2 — Envíos (decisión inicial)

| Rama | Tabla / API usada | Endpoint que se genera |
|---|---|---|
| **A — Envia.com** | `tenants.envia_access_token` + `tenants.origin_*` | `app/api/shipping/calculate/route.ts` |
| **B — Zonas fijas** | `shipping_zones` | `app/api/shipping/zones/route.ts` |

## Diferencia 3 — Analítica avanzada

Eventos extra: `checkout_step`, `conversion`, `checkout_abandoned`.

---

## Flujo

### 1. Invocar `scaffold-base` ✅

Crea proyecto + estructura + auth + endpoints comunes.

### 2. Instalar dependencias específicas

```bash
npm install mercadopago @mercadopago/sdk-react
```

### 3. Generar archivos específicos del plan

#### Catálogo y producto (sin límite)

| Ref a leer | Path destino |
|---|---|
| `scaffold-emprendimiento--ref--cart-context.md` | `context/CartContext.tsx` ⚠️ **PRIMERO** |
| `scaffold-empresa--ref--catalogo-page.md` | `app/(public)/catalogo/page.tsx` |
| `scaffold-emprendimiento--ref--producto-page.md` | `app/(public)/producto/[slug]/page.tsx` |

> ⚠️ **CartContext primero**: igual que Emprendimiento, `carrito/page.tsx` y el Header usan `useCart()`. Crear el context antes de generar componentes que lo consumen. Envolver `{children}` con `<CartProvider>` en `app/layout.tsx`.

#### Cupones (igual que Emprendimiento)

| Ref a leer | Path destino |
|---|---|
| `scaffold-emprendimiento--ref--api-coupons-validate.md` | `app/api/coupons/validate/route.ts` |

#### Envíos (según rama elegida)

**Si Rama A — Envia.com:**

| Ref a leer | Path destino |
|---|---|
| `scaffold-empresa--ref--api-shipping-calculate-envia.md` | `app/api/shipping/calculate/route.ts` |

NO crear `app/api/shipping/zones/route.ts`.

**Si Rama B — Zonas fijas:**

| Ref a leer | Path destino |
|---|---|
| `scaffold-emprendimiento--ref--api-shipping-zones.md` | `app/api/shipping/zones/route.ts` |

NO crear `app/api/shipping/calculate/route.ts`. NO usar `envia_access_token`.

### 4. Invocar skills de configuración

#### 4.1 — `rls-on-demand` ✅ (PRIMERO — crea el tenant)

Plan: `empresa`. El script `setup-rls.sql` ahora:
1. **Crea el tenant** con `INSERT INTO tenants` y genera UUID automático
2. **Imprime el UUID** con `RAISE NOTICE` para que el usuario lo copie
3. Habilita RLS en todas las tablas del plan
4. Crea las políticas

**Si Rama A (Envia):** el INSERT del tenant incluye las columnas `envia_access_token`, `origin_*`. Cargar refs:
- `policies-products`
- `policies-categories`
- `policies-orders-coupons`
- `policies-system`

NO cargar `policies-shipping-zones` (no se usa la tabla).

**Si Rama B (zonas fijas):** cargar refs:
- `policies-products`
- `policies-categories`
- `policies-shipping-zones`
- `policies-orders-coupons`
- `policies-system`

Generar `scripts/setup-rls.sql` completo.

> **Flujo del usuario:** corre `setup-rls.sql` → copia el UUID → lo pega en `.env.local` como `NEXT_PUBLIC_TENANT_ID` → lo pega en `seed-data.sql` (Ctrl+H `TODO_TENANT_ID`).

#### 4.1.b — Seed data de prueba (skill `sitio-diseno--ref--seed-data-sql`)

Las plantillas demo necesitan datos para que el catálogo, los filtros, las zonas y el checkout se vean reales. El skill `sitio-diseno` (etapa 5) genera `scripts/seed-data.sql` adaptado al rubro con: 8-12 productos, 3-5 categorías, imágenes Unsplash, variantes, **zonas de envío (solo Rama B)** y 2 cupones de prueba.

El archivo usa `TODO_TENANT_ID` como placeholder — el usuario hace Ctrl+H y lo reemplaza con el UUID que imprimió `setup-rls.sql`.

> *"Ejecutar en orden: setup-rls.sql (crea tenant + RLS), luego seed-data.sql (carga datos)."*

**Importante en Rama A (Envia.com):** el seed NO incluye shipping_zones (no se usa la tabla). Sí incluye productos, categorías, variantes y cupones.

#### 4.2 — `supabase-storage` ✅
Igual que Emprendimiento.

#### 4.3 — `rls-on-demand` ✅

Plan: `empresa`.

**Si Rama A (Envia):** cargar refs:
- `policies-products`
- `policies-categories`
- `policies-orders-coupons`
- `policies-system`

NO cargar `policies-shipping-zones` (no se usa la tabla).

**Si Rama B (zonas fijas):** cargar refs:
- `policies-products`
- `policies-categories`
- `policies-shipping-zones`
- `policies-orders-coupons`
- `policies-system`

#### 4.4 — `mercadopago-connection` ✅
Igual que Emprendimiento.

⚠️ **Pasarelas adicionales:** el plan Empresa contempla sumar otras pasarelas además de MercadoPago, pero no están definidas. Dejar comentario en `app/api/create-preference/route.ts`:

```typescript
// TODO: Pasarelas adicionales (pendiente de definir).
// Cuando se agregue otra pasarela, ramificar acá según `payment_provider`.
```

#### 4.5 — `resend-email` ✅
Igual que Emprendimiento.

#### 4.6 — `umami-analytics` ✅
Plan: `empresa`. Eventos: los de Emprendimiento + `checkout_step`, `conversion`, `checkout_abandoned`.

Importante: el evento `conversion` se debe disparar desde el **webhook** de MercadoPago en la transición a approved, no desde `process-payment`.

#### 4.7 — `isr-on-demand` ✅
Generar y configurar la revalidación on-demand (ISR) del caché leyendo el skill `isr-on-demand`. Asegurarse de crear los triggers SQL y el endpoint `/api/revalidate/route.ts`.

---

## Verificación

Todo lo de Emprendimiento, más:

- [ ] Queries de productos **sin** `.limit()`
- [ ] INSERT del tenant con `max_products = NULL`
- [ ] **Si Rama A:** `app/api/shipping/calculate/route.ts` usa `tenants.envia_access_token`. NO existe `app/api/shipping/zones/route.ts`. Tenant tiene `origin_*` completados.
- [ ] **Si Rama B:** `app/api/shipping/zones/route.ts` lee de `shipping_zones`. NO existe `app/api/shipping/calculate/route.ts`. Tenant NO tiene `envia_access_token`.
- [ ] `trackEvent("conversion", ...)` en el webhook de MercadoPago
- [ ] `npm run build` sin errores

---

## Resumen final al usuario

### Si Rama A (Envia.com)

```
✅ Scaffold Empresa del cliente "{nombre}" creado en ./{slug}/ (envíos: Envia.com)

Stack configurado:
- Next.js + TS + Tailwind ✓
- Supabase multi-tenant (tenant_id: {uuid}) ✓
- Catálogo ilimitado de productos con categorías, subcategorías y variantes ✓
- Supabase Storage (bucket: objects → tabla: product_images) ✓
- MercadoPago + cuotas + cupones + order_items ✓
- Envíos automáticos via Envia.com (/api/shipping/calculate) ✓
- Confirmación de pedidos → Resend ✓
- Umami Cloud + analítica de conversiones ✓
- Auth lista para el admin panel externo ✓

Próximos pasos:
1. Completar credenciales en .env.local
2. Ejecutar en Supabase SQL Editor (en orden):
   a) INSERT del tenant con campos origin_* + envia_access_token + cargar mp/resend/umami
   b) scripts/setup-rls.sql (sin políticas de shipping_zones)
   c) scripts/seed-data.sql (productos + categorías + cupones — sin shipping_zones en Rama A)
3. Invocar skill sitio-diseno para armar la UI con copy del rubro + imágenes Unsplash + animaciones
4. `npm run dev` — la plantilla debe verse completa, llena y animada
5. Configurar dominio en Vercel + Cloudflare cuando se apruebe la plantilla

⚠️ Pasarelas adicionales: pendiente de definir cuáles se suman a MercadoPago.
   Ver TODO en app/api/create-preference/route.ts.
```

### Si Rama B (zonas fijas)

```
✅ Scaffold Empresa del cliente "{nombre}" creado en ./{slug}/ (envíos: zonas fijas)

Stack configurado:
- Next.js + TS + Tailwind ✓
- Supabase multi-tenant (tenant_id: {uuid}) ✓
- Catálogo ilimitado de productos con categorías, subcategorías y variantes ✓
- Supabase Storage (bucket: objects → tabla: product_images) ✓
- MercadoPago + cuotas + cupones + order_items ✓
- Envíos por zonas fijas leídas de shipping_zones (/api/shipping/zones) ✓
- Confirmación de pedidos → Resend ✓
- Umami Cloud + analítica de conversiones ✓
- Auth lista para el admin panel externo ✓

Próximos pasos:
1. Completar credenciales en .env.local
2. Ejecutar en Supabase SQL Editor (en orden):
   a) INSERT del tenant + cargar mp_access_token, mp_public_key, resend_api_key, umami_url
   b) scripts/setup-rls.sql (incluye políticas de shipping_zones)
   c) scripts/seed-data.sql (productos + categorías + zonas + cupones de prueba)
3. Invocar skill sitio-diseno para armar la UI con copy del rubro + imágenes Unsplash + animaciones
4. `npm run dev` — la plantilla debe verse completa, llena y animada
5. Configurar dominio en Vercel + Cloudflare cuando se apruebe la plantilla

⚠️ Pasarelas adicionales: pendiente de definir cuáles se suman a MercadoPago.
```

---

## Reglas

1. **NUNCA usar `middleware.ts`** — `proxy.ts` viene de `scaffold-base`.
2. **NUNCA crear `app/admin/`** — el panel es externo.
3. **Sin `.limit()` en queries de productos** — el catálogo es ilimitado.
4. **`max_products = NULL`** en el INSERT del tenant.
5. **Decidir Rama A o B al inicio.** Mutuamente excluyentes — no generar ambos endpoints.
6. **Rama A:** si no hay `envia_access_token` o falta algún campo `origin_*`, el endpoint devuelve 503 con mensaje claro.
7. **Rama B:** zonas vienen siempre de `shipping_zones`, nunca hardcodear.
8. **Email nunca rompe el pago** — try/catch independiente.
9. **NO usar `envia_access_token` hardcodeado** — siempre desde `tenants`.
10. **Las columnas de `orders`** (`shipping_carrier`, `shipping_service`, `shipping_cost`, `shipping_postal_code`, `coupon_code`, `discount_amount`) se popular según la rama: en A vienen del response de Envia; en B vienen de la zona seleccionada.
