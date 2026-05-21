# Reference: `app/(public)/catalogo/page.tsx` (Plan Emprendimiento)

Path destino: `app/(public)/catalogo/page.tsx`

Server Component que trae productos + categorías + variantes. **El skill `sitio-diseno` reemplaza el JSX del return — la lógica de data fetching no se toca.**

Diferencia respecto a Esencial: incluye `product_variants` en el join (Emprendimiento permite agregar variantes al carrito).

```typescript
import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";
import { TAGS } from "@/lib/cache-tags"; // creado por skill isr-on-demand

const getProducts = unstable_cache(
  async () => {
    const tenantId = getTenantId();
    const supabaseAdmin = createAdminClient();

    const { data } = await supabaseAdmin
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, featured,
        category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, price, price_modifier, stock)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(200);

    return data ?? [];
  },
  ["catalog-products"],
  { tags: [TAGS.PRODUCTS] }
);

const getCategories = unstable_cache(
  async () => {
    const tenantId = getTenantId();
    const supabaseAdmin = createAdminClient();

    const { data } = await supabaseAdmin
      .from("categories")
      .select(`
        id, name, slug, position,
        subcategories (id, name, slug, position)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("position");

    return data ?? [];
  },
  ["catalog-categories"],
  { tags: [TAGS.CATEGORIES] }
);

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // TODO: skill sitio-diseno
  return (
    <div>
      <p>Productos: {products.length}</p>
      <p>Categorías: {categories.length}</p>
    </div>
  );
}
```

## Notas

- `.limit(200)` es innegociable en Emprendimiento.
- Las variantes se incluyen en el listado para poder mostrar precios desde/hasta o mínimo stock disponible en el catálogo si el diseño lo requiere.
- Las imágenes vienen ordenadas por `position` desde Supabase.
