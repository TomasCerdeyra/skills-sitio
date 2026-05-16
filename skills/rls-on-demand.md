---
name: rls-on-demand
description: Genera el archivo scripts/setup-rls.sql con políticas Row Level Security de Supabase para proyectos SitioHoy. Conoce qué tablas son públicas vs privadas según el plan (Esencial / Emprendimiento / Empresa con Envia / Empresa con zonas fijas), y arma el SQL listo para pegar en el SQL Editor. Invocado por todos los scaffolds. Usar cuando el usuario diga "configurar RLS", "agregar políticas de seguridad", "proteger tablas", o cuando un scaffold lo pida en su flujo.
---

# Skill: RLS On Demand

Genera el archivo `scripts/setup-rls.sql` con todas las políticas que necesita el proyecto según su plan.

## Arquitectura

SitioHoy usa una instancia Supabase compartida con aislamiento multi-tenant:
1. Columna `tenant_id` en cada tabla.
2. RLS policies que limitan lectura/escritura por rol.
3. `NEXT_PUBLIC_TENANT_ID` env var por deploy (aislamiento a nivel app).

### Roles

| Rol | Quién es | Acceso |
|---|---|---|
| `anon` | Visitante sin login | Solo lectura en tablas públicas |
| `authenticated` | Usuario logueado | Según membresía en `user_tenants` |
| `service_role` | Admin client server-side | Bypasea RLS — acceso total |

### Patrón de membresía (reusado en escrituras)

```sql
tenant_id IN (
  SELECT tenant_id FROM public.user_tenants
  WHERE user_id = (SELECT auth.uid())
)
```

---

## Tablas por plan

| Plan | Refs a cargar |
|---|---|
| **Esencial** | `policies-products` + `policies-categories` + `policies-system` |
| **Emprendimiento** | `policies-products` + `policies-categories` + `policies-shipping-zones` + `policies-orders-coupons` + `policies-system` |
| **Empresa con zonas fijas** | Igual que Emprendimiento |
| **Empresa con Envia.com** | Igual que Emprendimiento **menos** `policies-shipping-zones` |

---

## Output esperado

Generar el archivo `scripts/setup-rls.sql` concatenando:

1. Header con metadatos del tenant.
2. `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` para todas las tablas del plan.
3. Contenido de cada reference en orden.

### Header del archivo

```sql
-- =============================================
-- RLS Setup + Tenant Creation — Plan {nombre_plan}
-- Negocio: {tenant_name}
-- Generado: {fecha}
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================
--
-- Este script:
-- 1. Crea el tenant en la tabla tenants (genera UUID automático)
-- 2. Habilita RLS en todas las tablas del plan
-- 3. Crea las políticas de seguridad
--
-- IMPORTANTE: Anotar el UUID del tenant que imprime al final.
-- Ese UUID se usa en:
--   - .env.local → NEXT_PUBLIC_TENANT_ID
--   - scripts/seed-data.sql → Ctrl+H reemplazar TODO_TENANT_ID
--
-- Si las políticas ya existen, descomentar los DROP POLICY
-- IF EXISTS antes de crearlas (vienen comentados en cada bloque).
--
```

### Crear tenant (PRIMER PASO del script)

Generar este bloque al inicio, ANTES de habilitar RLS:

```sql
-- =============================================
-- 0. CREAR TENANT
-- =============================================
DO $$
DECLARE
  _tenant_id UUID;
BEGIN
  INSERT INTO public.tenants (name, slug, plan, status, max_products)
  VALUES ('{nombre}', '{slug}', '{plan}', 'active', {max_products})
  RETURNING id INTO _tenant_id;

  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '  ✅ TENANT CREADO';
  RAISE NOTICE '  UUID: %', _tenant_id;
  RAISE NOTICE '================================================';
  RAISE NOTICE '';
  RAISE NOTICE '  → Copiar este UUID y pegarlo en:';
  RAISE NOTICE '    1. .env.local → NEXT_PUBLIC_TENANT_ID=%', _tenant_id;
  RAISE NOTICE '    2. seed-data.sql → Ctrl+H TODO_TENANT_ID → %', _tenant_id;
  RAISE NOTICE '';
END $$;
```

> **Nota:** el `max_products` varía por plan: `50` (Esencial), `200` (Emprendimiento), `NULL` (Empresa). El `{slug}` debe ser kebab-case ASCII sin tildes.

### Habilitar RLS

Generar este bloque al inicio (ajustar según el plan):

```sql
-- 1. Habilitar RLS en todas las tablas del plan
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenants ENABLE ROW LEVEL SECURITY;

-- Solo Emprendimiento y Empresa
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Emprendimiento siempre, Empresa solo si NO usa Envia.com
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;
```

> Comentar las líneas que no apliquen al plan.

### Después del `ALTER TABLE`, concatenar las refs

En este orden:
1. `rls-on-demand--ref--policies-products.md` → contiene políticas de `products`, `product_images`, `product_variants`.
2. `rls-on-demand--ref--policies-categories.md` → políticas de `categories`, `subcategories`.
3. `rls-on-demand--ref--policies-shipping-zones.md` → solo si aplica.
4. `rls-on-demand--ref--policies-orders-coupons.md` → solo Emprendimiento/Empresa.
5. `rls-on-demand--ref--policies-system.md` → políticas de `tenants` y `user_tenants` (siempre).

---

## Ejecución

El usuario tiene que pegar el archivo `scripts/setup-rls.sql` resultante en el **SQL Editor del Supabase Dashboard** y correrlo.

---

## Notas importantes

- `service_role` bypasea RLS automáticamente — no necesita políticas explícitas.
- La política pública de `product_images` con `USING (true)` es intencional — el filtro por tenant lo hace la app via `product_id`.
- Para actualizar políticas existentes, descomentar los `DROP POLICY IF EXISTS` que vienen en cada bloque.
- Nunca tocar tablas de sistema de Supabase (`auth.*`, `storage.*` están en `supabase-storage--ref--bucket-config`).
- El admin panel usa `service_role` (bypasea RLS) para todas sus operaciones — las políticas protegen principalmente el acceso directo vía anon key desde el frontend.
- Las políticas son **defensa en profundidad** — el storefront actual usa `service_role` desde el server, pero RLS protege ante futuros usos del anon key (realtime, suscripciones, admin interno).
