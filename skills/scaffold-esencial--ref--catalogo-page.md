# Reference: `app/(public)/catalogo/page.tsx` (Plan Esencial)

Path destino: `app/(public)/catalogo/page.tsx`

Server Component que trae productos + categorías. **El skill `sitio-diseno` reemplaza el JSX del return — la lógica de data fetching no se toca.**

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
      product_images (id, url, alt, position)
    `)
    .eq("tenant_id", tenantId)
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

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

- `.limit(50)` es innegociable en Esencial — el plan permite máximo 50 productos.
- Las variantes no se incluyen en el catálogo (no se necesitan para listar). Sí en el detalle de producto.
- Las imágenes vienen ordenadas por `position` automáticamente desde Supabase con el join.

---

## Patrón de mock data (aplicado por `sitio-diseno` — OBLIGATORIO)

La plantilla se usa como demo antes de que el cliente cargue datos reales. Sin mock data, el catálogo muestra "0 productos" y la plantilla no se puede vender.

El skill `sitio-diseno` **siempre** modifica este archivo para agregar el patrón de fallback:

```typescript
// Datos de muestra — se usan cuando el seed aún no fue ejecutado
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Categoría A", slug: "categoria-a", position: 0 },
  { id: "mock-cat-2", name: "Categoría B", slug: "categoria-b", position: 1 },
  // 2-4 categorías del rubro
];

const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    name: "Nombre del producto",
    slug: "nombre-del-producto",
    price: 1200,
    compare_at_price: null,
    description: "Descripción verosímil del rubro.",
    featured: true,
    category_id: "mock-cat-1",
    product_images: [{
      url: "https://images.unsplash.com/photo-{ID}?w=600&q=80&auto=format&fit=crop",
      alt: "Nombre del producto",
      position: 0,
    }],
  },
  // 10-12 productos del rubro con imágenes Unsplash válidas
];

async function getProducts() {
  try {
    // ... mismo fetch que antes
  } catch {
    return []; // evita que un error de Supabase rompa la página
  }
}

async function getCategories() {
  try {
    // ... mismo fetch que antes
  } catch {
    return [];
  }
}

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  // Usar mock si la DB está vacía (seed no ejecutado aún)
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;
  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;

  return <CatalogClient products={displayProducts} categories={displayCategories} />;
}
```

IDs de imágenes Unsplash por rubro → ver `sitio-diseno--ref--imagenes-placeholder.md`.
