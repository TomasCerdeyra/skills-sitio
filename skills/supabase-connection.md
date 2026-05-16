---
name: supabase-connection
description: Configura la conexión a Supabase en proyectos Next.js de SitioHoy. Provee referencia compacta de columnas para escribir queries, y carga el SQL completo de CREATE TABLE solo cuando se necesita montar una nueva instancia desde cero. Multi-tenant. Usar cuando el usuario quiera conectar Supabase, configurar autenticación, inicializar tablas, o consultar la estructura de una tabla.
---

# Skill: Supabase Connection

Configuración de Supabase para proyectos SitioHoy.

> **Importante:** los archivos de cliente (client/server/admin/proxy) y auth (login/signup/signout) los genera **scaffold-base**. Este skill se enfoca en el **schema** y la referencia de columnas para que el modelo escriba queries correctas.

## Stack

- Next.js App Router + TypeScript
- `@supabase/ssr` (browser y servidor con cookies)
- `@supabase/supabase-js` (cliente admin con service_role)

## Variables de entorno (las define scaffold-base)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_TENANT_ID=
```

---

## Schema — referencia compacta de columnas

> El schema **ya está creado en producción**. Esta es la referencia que el modelo necesita para escribir queries correctas (SELECT/INSERT/UPDATE).

**`tenants`** — config del negocio
`id`, `name`, `slug` (unique), `plan` (`esencial`|`emprendimiento`|`empresa`), `status`, `max_products` (50/200/null), `mp_access_token`, `mp_public_key`, `resend_api_key`, `umami_url`, `url` (unique), `created_at`, `subscription_id`, `subscription_status`, `current_period_end`. **Solo plan Empresa con Envia:** `envia_access_token`, `origin_name`, `origin_phone`, `origin_address`, `origin_city`, `origin_postal_code`, `origin_state`.

**`user_tenants`** — membresías
`id`, `user_id` → `auth.users`, `tenant_id` → `tenants`, `role` (`owner`|`admin`|`editor`), `created_at`.

**`categories`** — `id`, `tenant_id`, `name`, `slug`, `position`, `active`.

**`subcategories`** — `id`, `tenant_id`, `category_id` → `categories`, `name`, `slug`, `position`, `active`.

**`products`** — catálogo
`id`, `tenant_id`, `name`, `slug`, `description`, `price`, `compare_at_price`, `category_id` → `categories`, `active`, `featured`, `created_at`, `updated_at`, `created_by`, `updated_by`.

**`product_images`** — imágenes (NO usar array en `products`)
`id`, `tenant_id`, `product_id` → `products` (cascade), `url`, `alt`, `position`.

**`product_variants`** — variantes
`id`, `tenant_id`, `product_id` → `products` (cascade), `name`, `sku`, `price`, `price_modifier`, `stock`.

**`shipping_zones`** — Emprendimiento siempre / Empresa solo si NO usa Envia
`id`, `tenant_id`, `name` (ej: "CABA"), `description`, `price`, `position`, `active`.

**`orders`** — Emprendimiento y Empresa
- Identificación: `id`, `tenant_id`, `external_reference`, `tracking_token` (unique), `created_at`, `updated_at`.
- Estado: `status` (`pending`|`confirmed`|`preparing`|`shipped`|`delivered`|`cancelled`), `payment_status`, `payment_provider` (default `mercadopago`), `mp_payment_id`, `total`, `currency` (default `ARS`).
- Comprador: `customer_first_name`, `customer_last_name`, `customer_phone`, `payer_email`, `notes`.
- Envío: `shipping_carrier`, `shipping_service`, `shipping_cost`, `shipping_postal_code`, `shipping_address` (JSONB), `shipping_label_url` (solo Envia), `shipping_tracking_number`.
- Cupón: `coupon_code`, `discount_amount`.

**`order_items`** — `id`, `tenant_id`, `order_id` → `orders` (cascade), `product_id` → `products`, `variant_id` → `product_variants`, `name`, `variant_name`, `quantity`, `unit_price`.

**`coupons`** — `id`, `tenant_id`, `code`, `type` (`percent`|`fixed`), `value`, `min_amount`, `max_uses`, `uses_count`, `starts_at`, `expires_at`, `active`.

**`contact_messages`** — formulario de contacto
`id`, `tenant_id`, `name`, `email`, `phone`, `message`, `source` (default `contact_form`), `status` (`new`|`read`|`archived`), `created_at`.

**`order_events`** — historial de cambios de estado de pedidos
`id`, `tenant_id`, `order_id` → `orders`, `type`, `payload` (JSONB), `created_at`.

**`payment_events`** — eventos de pago de proveedores
`id`, `tenant_id`, `order_id` → `orders`, `provider` (default `mercadopago`), `provider_event_id`, `status`, `payload` (JSONB), `created_at`.

---

## Tablas por plan — referencia rápida

| Tabla | Esencial | Emprendimiento | Empresa |
|---|---|---|---|
| `tenants`, `user_tenants` | ✅ | ✅ | ✅ |
| `categories`, `subcategories` | ✅ | ✅ | ✅ |
| `products`, `product_images`, `product_variants` | ✅ | ✅ | ✅ |
| `shipping_zones` | ❌ | ✅ (siempre) | ✅ (si NO usa Envia) |
| `orders`, `order_items` | ❌ | ✅ | ✅ |
| `coupons` | ❌ | ✅ | ✅ |
| `tenants.envia_access_token` + `origin_*` | — | — | ✅ (si usa Envia) |

**Decisión clave del plan Empresa:** al iniciar el scaffold se elige `shipping_zones` (zonas fijas) o Envia.com (envíos automáticos). Mutuamente excluyentes.

---

## Patrón de uso del admin client en API routes

```typescript
import { createAdminClient } from "@/lib/supabase/admin";

const supabaseAdmin = createAdminClient();

const { data: tenant } = await supabaseAdmin
  .from("tenants")
  .select("mp_access_token, resend_api_key, umami_url, plan")
  .eq("id", process.env.NEXT_PUBLIC_TENANT_ID)
  .single();
```

---

## Casos de uso

### Caso 1 — Proyecto sobre la instancia existente (default)
**No ejecutar SQL.** Las tablas ya están. Usar la referencia de columnas de arriba para escribir queries.

### Caso 2 — Montar Supabase desde cero (nueva instancia)
Cargar el reference `supabase-connection--ref--schema-sql.md` que tiene el SQL completo de `CREATE TABLE`. Pegarlo en el SQL Editor de Supabase.

Después del schema, seguir con `supabase-storage` (bucket) y `rls-on-demand` (políticas).

---

## Insertar tenant inicial

> **El script `setup-rls.sql` (generado por `rls-on-demand`) ahora crea el tenant automáticamente.** Ya no es necesario hacer el INSERT manual. El script imprime el UUID del tenant creado.

Después de correr `setup-rls.sql`, cargar credenciales:
```sql
UPDATE public.tenants SET
  mp_access_token = '{token}',
  mp_public_key = '{key}',
  resend_api_key = '{key}',
  umami_url = 'https://cloud.umami.is/script.js',
  umami_website_id = '{website_id}'
WHERE slug = '{slug}';
```

> **Nota:** el UPDATE usa `WHERE slug` en vez de `WHERE id` para no depender de copiar el UUID. Si se prefiere usar el UUID, usar `WHERE id = '{el-uuid-que-imprimió-setup-rls}'`.

---

## Notas importantes

- `client.ts` — usar en componentes `"use client"`
- `server.ts` — usar en Server Components y Server Actions
- `admin.ts` — SOLO server-side (API routes, Server Actions). Nunca exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente
- El proxy (`lib/supabase/proxy.ts`) protege `/admin` verificando membresía en `user_tenants` (preparación — el panel admin actual es externo)
- Roles válidos en `user_tenants`: `owner`, `admin`, `editor`
- `envia_access_token` y `origin_*` solo aplican al plan Empresa cuando usa Envia.com
- Las columnas `shipping_*` y `coupon_code`/`discount_amount` en `orders` se populan desde los endpoints de pago — no usar solo el JSONB
