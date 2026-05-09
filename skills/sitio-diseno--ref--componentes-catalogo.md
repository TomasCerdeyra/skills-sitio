# Reference: Componentes de catálogo

ProductCard, grid del catálogo y filtros por categoría. **El catálogo es la página de mayor tráfico** — tiene que ser rápido, escaneable y bonito.

## ProductCard

### Variante "Editorial" (para skincare, lujo, lifestyle)

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics/umami";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price?: number | null;
    product_images: { url: string; alt: string | null; position: number | null }[];
  };
  category?: { name: string };
}

export function ProductCardEditorial({ product, category }: ProductCardProps) {
  const mainImage = product.product_images?.[0];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      onClick={() => trackEvent("view_product", { slug: product.slug, name: product.name })}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 rounded-sm">
        {mainImage && (
          <motion.img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-brand-primary text-neutral-50 px-3 py-1 text-xs uppercase tracking-wider font-medium rounded-full">
            Oferta
          </span>
        )}
      </div>
      <div>
        {category && (
          <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">
            {category.name}
          </p>
        )}
        <h3 className="font-display text-xl text-neutral-900 mb-1 group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-3">
          <span className="font-body text-lg font-medium text-neutral-900">
            ${product.price.toLocaleString("es-AR")}
          </span>
          {hasDiscount && (
            <span className="font-body text-sm text-neutral-400 line-through">
              ${product.compare_at_price?.toLocaleString("es-AR")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
```

### Variante "Bold" (para ropa urbana, productos digitales)

```tsx
"use client";

import Link from "next/link";

export function ProductCardBold({ product, category }: ProductCardProps) {
  const mainImage = product.product_images?.[0];

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block border border-neutral-900 hover:border-brand-primary transition-colors duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {mainImage && (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-neutral-900/0 group-hover:bg-neutral-900/90 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-neutral-50">
            Ver detalle →
          </span>
        </div>
      </div>
      <div className="p-4 flex justify-between items-baseline">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          {product.name}
        </h3>
        <span className="font-body font-bold">
          ${product.price.toLocaleString("es-AR")}
        </span>
      </div>
    </Link>
  );
}
```

### Variante "Cálido" (para artesanos, cafés, productos orgánicos)

```tsx
"use client";

import Link from "next/link";

export function ProductCardCalido({ product, category }: ProductCardProps) {
  const mainImage = product.product_images?.[0];

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block bg-neutral-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-primary/10">
        {mainImage && (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl mb-2">{product.name}</h3>
        <p className="font-body text-brand-primary text-lg font-semibold">
          ${product.price.toLocaleString("es-AR")}
        </p>
      </div>
    </Link>
  );
}
```

---

## Grid de catálogo

### Responsive con stagger animado

```tsx
"use client";

import { motion } from "framer-motion";
import { ProductCardEditorial } from "./ProductCardEditorial"; // o la variante elegida

interface CatalogGridProps {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price?: number | null;
    category_id?: string | null;
    product_images: { url: string; alt: string | null; position: number | null }[];
  }>;
  categories: Array<{ id: string; name: string }>;
}

export function CatalogGrid({ products, categories }: CatalogGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-body text-lg text-neutral-600">
          No hay productos disponibles en este momento.
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10"
    >
      {products.map((product) => {
        const category = categories.find((c) => c.id === product.category_id);
        return (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCardEditorial product={product} category={category} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
```

---

## Filtros por categoría

### Sticky horizontal en mobile + sidebar en desktop

```tsx
"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";

interface CategoryFiltersProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    subcategories?: Array<{ id: string; name: string; slug: string }>;
  }>;
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function CategoryFilters({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFiltersProps) {
  function handleSelect(categoryId: string | null, categoryName: string) {
    onSelectCategory(categoryId);
    if (categoryId) {
      trackEvent("category_click", { category: categoryName });
    }
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-28 self-start">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
          Categorías
        </p>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleSelect(null, "todas")}
              className={`font-body text-left w-full transition-colors ${
                selectedCategoryId === null
                  ? "text-brand-primary font-medium"
                  : "text-neutral-700 hover:text-brand-primary"
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleSelect(cat.id, cat.name)}
                className={`font-body text-left w-full transition-colors ${
                  selectedCategoryId === cat.id
                    ? "text-brand-primary font-medium"
                    : "text-neutral-700 hover:text-brand-primary"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile sticky horizontal scroll */}
      <div className="lg:hidden sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-md py-3 -mx-6 px-6 mb-6 border-b border-neutral-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <FilterChip
            active={selectedCategoryId === null}
            onClick={() => handleSelect(null, "todas")}
          >
            Todas
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={selectedCategoryId === cat.id}
              onClick={() => handleSelect(cat.id, cat.name)}
            >
              {cat.name}
            </FilterChip>
          ))}
        </div>
      </div>
    </>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-brand-primary text-neutral-50"
          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}
```

---

## Página completa de catálogo (esqueleto)

```tsx
"use client";

import { useState } from "react";
import { CategoryFilters } from "@/components/ui/CategoryFilters";
import { CatalogGrid } from "@/components/ui/CatalogGrid";

export function CatalogClient({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filtered = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
      <header className="mb-16">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
          Nuestro catálogo
        </p>
        <h1 className="font-display text-5xl lg:text-7xl text-neutral-900 leading-[1.05]">
          Productos
        </h1>
      </header>

      <div className="lg:flex lg:gap-12">
        <CategoryFilters
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <div className="flex-1 min-w-0">
          <CatalogGrid products={filtered} categories={categories} />
        </div>
      </div>
    </div>
  );
}
```

> **Importante:** `app/(public)/catalogo/page.tsx` es Server Component que hace el fetch. El componente client `CatalogClient` recibe los datos y maneja el state de filtros.

---

## Reglas

1. **Una variante de ProductCard por proyecto.** Elegir según tono visual y aplicar consistentemente.
2. **Aspect ratio fijo** en imágenes (no que floten en altura distinta).
3. **Stagger en aparición** — usar `motion` con `staggerChildren` para que el grid no aparezca todo de golpe.
4. **Mobile: scroll horizontal de filtros** (chips).
5. **Desktop: sidebar sticky** de filtros que sigue al usuario al hacer scroll.
6. **Estado vacío manejado** — mostrar mensaje cuando `products.length === 0` o filtro sin resultados.
7. **Trackear `category_click`** en cada filtro y `view_product` al click en card.
8. **Precios siempre con `toLocaleString("es-AR")`** — formato argentino.
9. **`compare_at_price` mostrado tachado** cuando hay descuento.

---

## Validación

- [ ] ProductCard con una variante consistente.
- [ ] Imagen con aspect-ratio fijo.
- [ ] Hover con efecto distintivo (no solo opacity).
- [ ] Grid responsive: 1 col mobile, 2 sm, 3 lg, 4 xl.
- [ ] Filtros desktop como sidebar sticky.
- [ ] Filtros mobile como chips horizontales con scroll.
- [ ] Estado vacío manejado.
- [ ] Tracking de eventos en filtros y clicks.
- [ ] Precios con formato AR.
