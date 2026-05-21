# Reference: `app/(public)/producto/[slug]/page.tsx` (Plan Emprendimiento)

Path destino: `app/(public)/producto/[slug]/page.tsx`

Detalle de producto. La query es la misma que en Esencial — la diferencia está en la UI: Emprendimiento agrega lógica de "agregar al carrito" + selector de variantes con stock real.

## ⚠️ Cuatro reglas críticas para no romper la demo

1. **`params` es una Promise en Next.js 15+.** En Server Components usar `await params` — NO `params.slug` directo. En Client Components (`"use client"`) usar `use(params)` de React (import `use` from `"react"`) — los client components no pueden usar `await` al top level.
2. **Si la pagina usa estado o eventos, es "use client"** y debe usar `use(params)`, no `await params`. Ejemplo: `const { slug } = use(params as Promise<{ slug: string }>);`
3. **`getProduct` con try/catch.** Si las credenciales de Supabase no están configuradas, la función debe devolver `null` sin lanzar. Jamás llamar a `getTenantId()` sin un try/catch exterior.
4. **Mock data obligatorio.** La plantilla se muestra como demo con la DB vacía. Sin mock, cualquier click en un producto termina en 404. Los slugs del mock DEBEN coincidir exactamente con los slugs del `MOCK_PRODUCTS` del catálogo.

```typescript
import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { TAGS } from "@/lib/cache-tags"; // creado por skill isr-on-demand
import { ProductDetailClient } from "@/components/ui/ProductDetailClient";

// ============================================================
// MOCK DATA — fallback cuando la DB no está configurada
// IMPORTANTE: los slugs deben coincidir con los de MOCK_PRODUCTS en catalogo/page.tsx
// ============================================================
const MOCK_PRODUCTS = [
  {
    id: "mock-1", name: "Producto 1", slug: "producto-1",
    price: 1500, compare_at_price: null,
    description: "Descripción del producto 1.",
    featured: true, category_id: "mock-cat-1",
    product_images: [{ id: "i1", url: "https://picsum.photos/seed/producto-1/800/600", alt: "Producto 1", position: 0 }],
    product_variants: [],
  },
  // ... copiar acá los mismos productos que están en MOCK_PRODUCTS del catálogo
  // con TODOS los campos: id, name, slug, price, compare_at_price, description,
  // featured, category_id, product_images[], product_variants[]
  // product_variants necesita: id, name, sku (null), price, price_modifier, stock
];

function getProduct(slug: string) {
  return unstable_cache(
    async () => {
      try {
        const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
        if (!tenantId) return null;

        const supabaseAdmin = createAdminClient();
        const { data } = await supabaseAdmin
          .from("products")
          .select(`
            id, name, slug, price, compare_at_price, description, featured,
            category_id,
            product_images (id, url, alt, position),
            product_variants (id, name, sku, price, price_modifier, stock)
          `)
          .eq("tenant_id", tenantId)
          .eq("slug", slug)
          .eq("active", true)
          .single();

        return data ?? null;
      } catch {
        return null;
      }
    },
    [`product-${slug}`],
    { tags: [TAGS.PRODUCTS, TAGS.PRODUCT(slug)] }
  )();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ⚠️ Promise en Next.js 15+
}) {
  const { slug } = await params; // ⚠️ await params — NO params.slug directo

  // DB primero; si falla o está vacía, buscar en mock
  const dbProduct = await getProduct(slug);
  const product =
    dbProduct ??
    (MOCK_PRODUCTS.find((p) => p.slug === slug) as typeof MOCK_PRODUCTS[0] | undefined);

  if (!product) notFound();

  // TODO: skill sitio-diseno — galería, selector de variantes, botón agregar al carrito
  return <ProductDetailClient product={product} />;
}
```

## Notas

- Las variantes con `stock > 0` pueden agregarse al carrito; las que tienen `stock = 0` deben deshabilitarse en el selector.
- Si todas las variantes tienen stock 0 → el botón "agregar al carrito" se deshabilita.
- El precio mostrado al seleccionar una variante es `product.price + variant.price_modifier`. Si la variante tiene `price` propio (no nulo), ese reemplaza al cálculo.
- Para trackear `view_product` y `select_variant` usar el componente `ProductTracker` (ver `umami-analytics--ref--eventos-por-plan`).
- El `MOCK_PRODUCTS` de esta página debe ser una copia exacta del `MOCK_PRODUCTS` en `catalogo/page.tsx`. Mantenerlos sincronizados.
