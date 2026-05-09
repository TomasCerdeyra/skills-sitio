# Reference: `app/(public)/producto/[slug]/page.tsx` (Plan Emprendimiento)

Path destino: `app/(public)/producto/[slug]/page.tsx`

Detalle de producto. La query es la misma que en Esencial — la diferencia está en la UI: Emprendimiento agrega lógica de "agregar al carrito" + selector de variantes con stock real.

```typescript
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
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
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  // TODO: skill sitio-diseno — galería, selector de variantes, botón agregar al carrito
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
    </div>
  );
}
```

## Notas

- Las variantes con `stock > 0` pueden agregarse al carrito; las que tienen `stock = 0` deben deshabilitarse en el selector.
- Si todas las variantes tienen stock 0 → el botón "agregar al carrito" se deshabilita.
- El precio mostrado al seleccionar una variante es `product.price + variant.price_modifier`. Si la variante tiene `price` propio (no nulo), ese reemplaza al cálculo.
- Para trackear `view_product` y `select_variant` usar el componente `ProductTracker` (ver `umami-analytics--ref--eventos-por-plan`).
