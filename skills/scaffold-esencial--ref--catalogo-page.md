# Reference: `app/(public)/catalogo/page.tsx` (Plan Esencial)

Path destino: `app/(public)/catalogo/page.tsx`

Server Component que trae productos + categorías. **El skill `sitio-diseno` reemplaza el JSX del return — la lógica de data fetching no se toca.**

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
        product_images (id, url, alt, position)
      `)
      .eq("tenant_id", tenantId)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);

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

- `.limit(50)` es innegociable en Esencial — el plan permite máximo 50 productos.
- Las variantes no se incluyen en el catálogo (no se necesitan para listar). Sí en el detalle de producto.
- Las imágenes vienen ordenadas por `position` automáticamente desde Supabase con el join.

---

## Patrón de mock data (aplicado por `sitio-diseno` — OBLIGATORIO)

La plantilla se usa como demo antes de que el cliente cargue datos reales. Sin mock data, el catálogo muestra "0 productos" y la plantilla no se puede vender.

El skill `sitio-diseno` **siempre** modifica este archivo para agregar fallback de datos de muestra. El patrón obligatorio es:

```typescript
export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {
    // Si Supabase no está configurado, usar mock
  }

  // Un solo flag para decidir si usar datos reales o mock
  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  // A partir de acá: diseño LIBRE
  // El skill sitio-diseno decide cómo organizar y mostrar los datos
}
```

**MOCK_PRODUCTS** debe tener 10-12 productos del rubro. **MOCK_CATEGORIES** debe tener 3-5 categorías.

Las imágenes de productos usan `getProductImage()` de `lib/placeholder-images.ts` — no hace falta URLs de Unsplash en el mock.

> **Importante:** usar `useRealData` (un solo flag) para que productos y categorías siempre vengan del mismo origen. Si se usan condiciones independientes, los IDs de categoría de los productos mock no coinciden con las categorías reales → filtro vacío.

