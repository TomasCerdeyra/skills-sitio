# Reference: `app/(public)/producto/[slug]/page.tsx` (Plan Esencial)

Path destino: `app/(public)/producto/[slug]/page.tsx`

Detalle de producto. Trae imágenes ordenadas y variantes (display only). **El skill `sitio-diseno` arma la galería, el selector de variantes y el WhatsApp CTA.**

> ⚠️ **Next.js 15+:** `params` es una `Promise`. Usar `params: Promise<{ slug: string }>` y `await params` en el cuerpo de la función. La firma antigua `params: { slug: string }` genera error de TypeScript en Next.js 15+.
> 
> ⚠️ Envolver el fetch de Supabase en `try/catch` — si `NEXT_PUBLIC_TENANT_ID` no está definido durante el build estático, `getTenantId()` lanza una excepción que rompe la página.

```typescript
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
  try {
    const tenantId = getTenantId();
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

    return data;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // TODO: skill sitio-diseno — galería, selector de variantes, botón WhatsApp
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
    </div>
  );
}
```

## Notas

- Las imágenes vienen ordenadas por `position` (la primera, `position: 0`, es la principal).
- En Esencial las variantes son **display only** — el skill de diseño puede mostrarlas pero NO genera lógica de "agregar al carrito".
- Si el producto no existe o está inactivo, devuelve 404.
- Para trackear el evento `view_product` hay que usar el componente client `ProductTracker` (ver `umami-analytics--ref--eventos-por-plan`).
