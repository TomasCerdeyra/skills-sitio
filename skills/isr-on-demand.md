---
name: isr-on-demand
description: Implementa ISR on-demand multitenant con triggers SQL dinámicos en Supabase. Asegura que los cambios en la base de datos revaliden el caché de Next.js invocando a /api/revalidate.
---

# Corrección 33 — ISR on-demand multitenant con triggers SQL dinámicos

## Contexto

Todos los sitios SitioHoy comparten una base de datos Supabase multitenant. Las páginas de productos y catálogo se cachean en Next.js con `unstable_cache`. Para que los cambios en Supabase se reflejen en el sitio automáticamente, se usa ISR on-demand: triggers SQL en Supabase que llaman al endpoint `/api/revalidate` del sitio correspondiente.

La URL y el secret de cada tenant se leen dinámicamente desde la tabla `tenants`, por lo que un solo conjunto de triggers funciona para todos los tenants sin hardcodear URLs.

## Orden de ejecución

Este skill se ejecuta **después** del scaffold base. Los archivos de datos de catálogo y producto (generados por `scaffold-esencial`, `scaffold-emprendimiento` o `scaffold-empresa`) ya incluyen `unstable_cache` + TAGS en sus funciones de fetch. Este skill solo necesita:

1. Crear `lib/cache-tags.ts` (paso 2)
2. Crear `app/api/revalidate/route.ts` (paso 4)
3. Correr el SQL de triggers en Supabase (paso 5)
4. Actualizar la fila del tenant con `url` y `revalidation_secret` (paso 1)

---

## 1. Columnas requeridas en tenants

Al crear o migrar cualquier sitio, asegurarse de que la tabla `tenants` tenga estas columnas:

```sql
ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS url text;
ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS revalidation_secret text;
```

Al insertar el tenant en el seed, poblar ambas:

```sql
UPDATE public.tenants
SET
  url = 'https://DOMINIO-DEL-SITIO.vercel.app', -- o dominio definitivo
  revalidation_secret = 'SECRET-UNICO-POR-TENANT' -- generar con: openssl rand -hex 32
WHERE id = 'TENANT_ID';
```

---

## 2. Cache tags por tenant

`lib/cache-tags.ts` — todos los tags deben incluir el `TENANT_ID` para evitar colisiones entre tenants en la misma instancia de Vercel:

```typescript
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!

export const TAGS = {
  PRODUCTS:    `products-${TENANT_ID}`,
  PRODUCT:     (slug: string) => `product-${TENANT_ID}-${slug}`,
  CATEGORIES:  `categories-${TENANT_ID}`,
  ORDERS:      `orders-${TENANT_ID}`,
  ORDER:       (id: string) => `order-${TENANT_ID}-${id}`,
  COUPONS:     `coupons-${TENANT_ID}`,
  SITE_CONFIG: `site-config-${TENANT_ID}`,
  HOMEPAGE:    `homepage-${TENANT_ID}`,
  SHIPPING:    `shipping-zones-${TENANT_ID}`,
  TENANT:      `tenant-config-${TENANT_ID}`,
}
```

---

## 3. Cache por slug en getProductBySlug

`lib/data/catalog.ts` — la función `getProductBySlug` debe usar un cache key y tag específico por slug para que al cambiar un producto solo se regenere esa página, no todas:

```typescript
export const getProductBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<ProductDetail | null> => {
      // ... query a Supabase igual que siempre
    },
    [`product-detail-${slug}`],
    { tags: [TAGS.PRODUCTS, TAGS.PRODUCT(slug)] },
  )()
```

Donde sea que se llame `getProductBySlug(slug)`, la llamada no cambia — solo la definición interna.

---

## 4. Endpoint /api/revalidate

`app/api/revalidate/route.ts` — el secret se lee del tenant en Supabase (no de env var), con fallback a `REVALIDATION_SECRET` para compatibilidad local:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getTenantConfig } from '@/lib/supabase/tenant'

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!

const TABLE_TAGS: Record<string, string[]> = {
  products:         [`products-${TENANT_ID}`],
  product_images:   [`products-${TENANT_ID}`],
  product_variants: [`products-${TENANT_ID}`],
  categories:       [`categories-${TENANT_ID}`, `products-${TENANT_ID}`],
  coupons:          [`coupons-${TENANT_ID}`],
  tenants:          [`tenant-config-${TENANT_ID}`],
  shipping_zones:   [`shipping-zones-${TENANT_ID}`],
}

export async function POST(req: NextRequest) {
  const tenant = await getTenantConfig()
  const secret = tenant.revalidation_secret ?? process.env.REVALIDATION_SECRET

  const auth = req.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let tags: string[] = []

  try {
    const body = await req.json()

    if (body?.tag && typeof body.tag === 'string') {
      tags = [body.tag]
    } else if (body?.table === 'products' && body?.slug) {
      tags = [
        `product-${TENANT_ID}-${body.slug}`,
        `products-${TENANT_ID}`,
      ]
    } else if (body?.table) {
      tags = TABLE_TAGS[body.table] ?? [`products-${TENANT_ID}`]
    } else {
      tags = [`products-${TENANT_ID}`, `categories-${TENANT_ID}`]
    }
  } catch {
    tags = [`products-${TENANT_ID}`, `categories-${TENANT_ID}`]
  }

  for (const tag of tags) {
    revalidateTag(tag, 'max') // Next.js 16 requiere segundo argumento: 'max' invalida server + client cache
  }

  return NextResponse.json({ ok: true, tags })
}
```

---

## 5. Triggers SQL en Supabase

Crear como migración `0XX_isr_webhooks.sql`. Requiere que `pg_net` esté habilitado.

La función central `isr_notify` lee la URL y el secret del tenant dinámicamente — funciona para todos los tenants sin hardcodear nada:

```sql
CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;

CREATE OR REPLACE FUNCTION isr_notify(p_tenant_id uuid, p_table text, p_slug text DEFAULT NULL)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  _url    text;
  _secret text;
  _body   jsonb;
BEGIN
  SELECT url, revalidation_secret
    INTO _url, _secret
    FROM public.tenants
   WHERE id = p_tenant_id;

  IF _url IS NULL OR _secret IS NULL THEN RETURN; END IF;

  IF p_slug IS NOT NULL THEN
    _body := jsonb_build_object('table', p_table, 'slug', p_slug);
  ELSE
    _body := jsonb_build_object('table', p_table);
  END IF;

  PERFORM net.http_post(
    url     := _url || '/api/revalidate',
    body    := _body,
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || _secret
    )
  );
END;
$$;

-- products: pasa el slug para invalidar solo esa página
CREATE OR REPLACE FUNCTION trigger_isr_products()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM isr_notify(COALESCE(NEW.tenant_id, OLD.tenant_id), 'products', COALESCE(NEW.slug, OLD.slug));
  RETURN COALESCE(NEW, OLD);
END;
$$;
DROP TRIGGER IF EXISTS isr_products ON public.products;
CREATE TRIGGER isr_products
AFTER INSERT OR UPDATE OR DELETE ON public.products
FOR EACH ROW EXECUTE FUNCTION trigger_isr_products();

-- product_images
CREATE OR REPLACE FUNCTION trigger_isr_product_images()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM isr_notify(COALESCE(NEW.tenant_id, OLD.tenant_id), 'product_images');
  RETURN COALESCE(NEW, OLD);
END;
$$;
DROP TRIGGER IF EXISTS isr_product_images ON public.product_images;
CREATE TRIGGER isr_product_images
AFTER INSERT OR UPDATE OR DELETE ON public.product_images
FOR EACH ROW EXECUTE FUNCTION trigger_isr_product_images();

-- product_variants
CREATE OR REPLACE FUNCTION trigger_isr_product_variants()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM isr_notify(COALESCE(NEW.tenant_id, OLD.tenant_id), 'product_variants');
  RETURN COALESCE(NEW, OLD);
END;
$$;
DROP TRIGGER IF EXISTS isr_product_variants ON public.product_variants;
CREATE TRIGGER isr_product_variants
AFTER INSERT OR UPDATE OR DELETE ON public.product_variants
FOR EACH ROW EXECUTE FUNCTION trigger_isr_product_variants();

-- categories
CREATE OR REPLACE FUNCTION trigger_isr_categories()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM isr_notify(COALESCE(NEW.tenant_id, OLD.tenant_id), 'categories');
  RETURN COALESCE(NEW, OLD);
END;
$$;
DROP TRIGGER IF EXISTS isr_categories ON public.categories;
CREATE TRIGGER isr_categories
AFTER INSERT OR UPDATE OR DELETE ON public.categories
FOR EACH ROW EXECUTE FUNCTION trigger_isr_categories();

-- coupons
CREATE OR REPLACE FUNCTION trigger_isr_coupons()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  PERFORM isr_notify(COALESCE(NEW.tenant_id, OLD.tenant_id), 'coupons');
  RETURN COALESCE(NEW, OLD);
END;
$$;
DROP TRIGGER IF EXISTS isr_coupons ON public.coupons;
CREATE TRIGGER isr_coupons
AFTER INSERT OR UPDATE OR DELETE ON public.coupons
FOR EACH ROW EXECUTE FUNCTION trigger_isr_coupons();
```

> **Importante:** `supabase_functions.http_request` NO acepta argumentos posicionales en esta versión de Supabase. Usar siempre `net.http_post` con parámetros nombrados (`url :=`, `body :=`, `headers :=`).

---

## 6. Reglas permanentes a agregar en sitio-hoy-database

- Nunca hardcodear la URL del sitio en triggers SQL. Siempre leer `url` y `revalidation_secret` de `tenants`.
- Nunca usar `supabase_functions.http_request` con argumentos — la función pública no los acepta. Usar `net.http_post`.
- Al crear el tenant en el seed, siempre poblar `url` y `revalidation_secret`.
- El `revalidation_secret` debe generarse con `openssl rand -hex 32` — uno distinto por tenant.
- No usar `dynamic = 'force-dynamic'` en páginas de catálogo — rompe el ISR y hace que cada visita golpee Supabase.
- No usar `revalidate = N` (timer fijo) — ineficiente y regenera aunque no haya cambios.
- El ISR on-demand es el único approach correcto para sitios con catálogo editable.
