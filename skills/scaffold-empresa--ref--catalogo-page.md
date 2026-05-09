# Reference: `app/(public)/catalogo/page.tsx` (Plan Empresa)

Path destino: `app/(public)/catalogo/page.tsx`

Server Component que trae productos + categorías + variantes. **Sin `.limit()`** — Empresa permite catálogo ilimitado.

```typescript
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

async function getProducts() {
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
    .order("created_at", { ascending: false });
    // sin .limit()

  return data ?? [];
}

async function getCategories() {
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
}

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

- **Sin `.limit()`** — esto es lo único que cambia respecto a Emprendimiento.
- Si el catálogo crece mucho (1000+ productos), el skill de diseño debería implementar paginación o búsqueda. Para esa optimización ver el reference de `sitio-diseno` de catálogo grande.
- Las imágenes y variantes vienen ordenadas correctamente desde Supabase.
