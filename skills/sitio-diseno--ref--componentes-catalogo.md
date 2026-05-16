# Reference: Componentes de catálogo — Referencia Técnica

ProductCard, grid del catálogo y filtros por categoría. **El catálogo es la página de mayor tráfico** — tiene que ser rápido, escaneable y bonito.

**Este archivo es REFERENCIA TÉCNICA** — muestra cómo conectar con Supabase y manejar datos de productos. Los ejemplos de cards son VARIACIONES para inspirarte. **El layout de la página de catálogo es 100% libre** — NO siempre sidebar+grid.

---

## ⚠️ REGLA ANTI-REPETITIVIDAD

**NO USAR SIEMPRE el layout sidebar+grid.** Cada catálogo debe tener un layout único. Ideas:

- **Tabs/pills** horizontales arriba que filtran por categoría
- **Menú tipo restaurante** con anclas por sección (scroll a cada categoría)
- **Acordeón** donde cada categoría se expande/colapsa
- **Scroll horizontal** por categoría (cada fila es una categoría)
- **Dropdown/drawer** para filtros (más inmersivo, sin sidebar)
- **Grid completo sin filtros** (si hay pocas categorías, no hace falta filtro)
- **Lista minimalista** sin cards (nombre + precio + línea, como una carta de vinos)
- **Bento grid** con cards de distintos tamaños
- **Masonry** tipo Pinterest

El sidebar+grid es UNA opción válida, no LA opción. Si sentís que "ya hice esto", elegí otra cosa.

---

## Datos técnicos (estos SÍ son obligatorios)

### Queries de Supabase

Las queries para traer productos y categorías son fijas — la estructura de la DB no cambia:

```tsx
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
    .order("created_at", { ascending: false });

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
```

### Patrón de mock data (OBLIGATORIO)

La plantilla puede verse sin datos reales. Siempre agregar fallback:

```tsx
const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "Categoría A", slug: "categoria-a", position: 0 },
  // 3-5 del rubro
];

const MOCK_PRODUCTS = [
  {
    id: "mock-1", name: "Producto", slug: "producto",
    price: 1200, compare_at_price: null, description: "...",
    featured: true, category_id: "mock-cat-1",
    product_images: [{ url: "...", alt: "...", position: 0 }],
  },
  // 8-12 del rubro
];

export default async function CatalogPage() {
  let products: any[] = [];
  let categories: any[] = [];
  
  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {
    // Si Supabase no está configurado, usar mock
  }

  const useRealData = products.length > 0 && categories.length > 0;
  const displayProducts = useRealData ? products : MOCK_PRODUCTS;
  const displayCategories = useRealData ? categories : MOCK_CATEGORIES;

  // A partir de acá: diseño LIBRE
  // Pasarle los datos al componente client que diseñes
}
```

> **Importante:** usar `useRealData` (un solo flag) para decidir si se usan datos reales o mock. NO usar condiciones independientes (`products.length > 0` por un lado, `categories.length > 0` por otro) porque produce inconsistencias en el filtro.

### Helper de imágenes (OBLIGATORIO)

Usar el helper `getProductImage()` de `lib/placeholder-images.ts` para que los productos siempre tengan imagen. Ver `sitio-diseno--ref--imagenes-placeholder.md` para el patrón completo.

```tsx
import { getProductImage } from "@/lib/placeholder-images";

// En la card de producto:
const imageUrl = getProductImage(product);
```

### Tracking de analytics

```tsx
import { trackEvent } from "@/lib/analytics/umami";

// Al hacer click en un producto
trackEvent("view_product", { slug: product.slug, name: product.name });

// Al filtrar por categoría
trackEvent("category_click", { category: categoryName });
```

---

## Ejemplos de ProductCard (para inspirarse, NO copiar)

### Card vertical editorial

```tsx
"use client";
import Link from "next/link";
import { getProductImage } from "@/lib/placeholder-images";

export function ProductCard({ product, category }: ProductCardProps) {
  const imageUrl = getProductImage(product);
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-brand-primary text-white px-3 py-1 text-xs uppercase tracking-wider">
            Oferta
          </span>
        )}
      </div>
      <h3 className="font-display text-xl mb-1">{product.name}</h3>
      <span className="font-body text-lg">${product.price.toLocaleString("es-AR")}</span>
    </Link>
  );
}
```

### Card con overlay al hover

```tsx
export function ProductCardOverlay({ product }: ProductCardProps) {
  const imageUrl = getProductImage(product);
  
  return (
    <Link href={`/producto/${product.slug}`} className="group block relative aspect-square overflow-hidden">
      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-white font-display text-lg">{product.name}</h3>
          <span className="text-white/80">${product.price.toLocaleString("es-AR")}</span>
        </div>
      </div>
    </Link>
  );
}
```

### Card horizontal (tipo menú)

```tsx
export function ProductCardHorizontal({ product }: ProductCardProps) {
  const imageUrl = getProductImage(product);
  
  return (
    <Link href={`/producto/${product.slug}`} className="group flex gap-6 py-6 border-b border-neutral-200">
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-lg mb-1">{product.name}</h3>
        <p className="text-neutral-500 text-sm line-clamp-2">{product.description}</p>
      </div>
      <span className="font-display text-lg font-bold self-center">${product.price.toLocaleString("es-AR")}</span>
    </Link>
  );
}
```

### Item tipo carta de restaurante (sin imagen)

```tsx
export function MenuItemCard({ product }: ProductCardProps) {
  return (
    <div className="flex justify-between items-baseline py-4 border-b border-neutral-200 border-dashed">
      <div>
        <h3 className="font-display text-lg">{product.name}</h3>
        {product.description && (
          <p className="text-neutral-500 text-sm mt-1 max-w-md">{product.description}</p>
        )}
      </div>
      <span className="font-display text-lg font-bold ml-8 whitespace-nowrap">
        ${product.price.toLocaleString("es-AR")}
      </span>
    </div>
  );
}
```

---

## Reglas técnicas (NO de diseño)

1. **Aspect ratio fijo** en imágenes de cards (no que floten en altura distinta).
2. **Stagger en aparición** — usar `motion` con `staggerChildren` para que los items no aparezcan de golpe.
3. **Estado vacío manejado** — mostrar mensaje cuando un filtro no tiene resultados.
4. **Trackear eventos** — `category_click` y `view_product`.
5. **Precios con `toLocaleString("es-AR")`** — formato argentino.
6. **`compare_at_price` tachado** cuando hay descuento.
7. **Usar `getProductImage()`** para todas las imágenes de producto.

---

## Validación

- [ ] El catálogo tiene un layout que NO es el típico sidebar+grid de siempre.
- [ ] Las imágenes usan `getProductImage()` con fallback automático.
- [ ] Mock data con `useRealData` flag para consistencia.
- [ ] Hover con efecto distintivo en cards.
- [ ] Estado vacío manejado en filtros.
- [ ] Tracking de eventos.
- [ ] Precios con formato AR.
