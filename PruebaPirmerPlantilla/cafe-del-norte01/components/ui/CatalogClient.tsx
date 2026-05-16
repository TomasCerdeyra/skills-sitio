"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics/umami";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  category_id: string | null;
  product_images: { url: string; alt: string | null; position: number | null }[];
  product_variants: { id: string; name: string; price: number | null; price_modifier: number | null; stock: number | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  position: number | null;
}

interface Props {
  products: Product[];
  categories: Category[];
}

// ADN: cards: horizontal — imagen + texto lado a lado
function ProductCardHorizontal({ product, category }: { product: Product; category?: Category }) {
  const mainImage = product.product_images?.[0];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const hasVariants = product.product_variants && product.product_variants.length > 0;

  const minPrice = hasVariants
    ? Math.min(...product.product_variants.map(v => v.price ?? product.price))
    : product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      onClick={() => trackEvent("view_product", { slug: product.slug, name: product.name })}
      className="group flex bg-neutral-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 border border-neutral-100 hover:border-brand-accent"
    >
      <div className="relative w-28 sm:w-36 flex-shrink-0 overflow-hidden bg-brand-accent/30">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full min-h-[110px] bg-neutral-100 flex items-center justify-center text-neutral-300 text-3xl">
            ☕
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-brand-secondary text-neutral-50 text-xs px-2 py-0.5 rounded-full font-body font-medium">
            Oferta
          </span>
        )}
      </div>
      <div className="py-4 px-4 flex flex-col justify-center flex-1 min-w-0">
        {category && (
          <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-1">
            {category.name}
          </p>
        )}
        <h3 className="font-display text-lg sm:text-xl text-neutral-900 mb-1.5 group-hover:text-brand-primary transition-colors leading-tight">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-sm text-neutral-500 line-clamp-2 mb-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-body font-semibold text-neutral-900 text-base">
            {hasVariants ? "Desde " : ""}${minPrice.toLocaleString("es-AR")}
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

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? "bg-brand-primary text-neutral-50 shadow-md shadow-brand-primary/30"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

export function CatalogClient({ products, categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  function handleSelect(categoryId: string | null, categoryName: string) {
    setSelectedCategoryId(categoryId);
    if (categoryId) trackEvent("category_click", { category: categoryName });
  }

  const filtered = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
      {/* Header del catálogo */}
      <div className="mb-10">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-3">
          ✦ &nbsp; Todo lo que hacemos
        </p>
        <h1 className="font-display text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.02]">
          La carta.
        </h1>
        <p className="font-body text-lg text-neutral-600 mt-4 max-w-xl">
          Café de especialidad, pastelería artesanal, sándwiches y bebidas. Todo hecho acá.
        </p>
      </div>

      <div className="lg:flex lg:gap-12">
        {/* Sidebar de filtros — desktop */}
        <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-28 self-start">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
            Categorías
          </p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleSelect(null, "todas")}
                className={`font-body text-left w-full py-1 transition-all duration-200 ${
                  selectedCategoryId === null
                    ? "text-brand-primary font-semibold"
                    : "text-neutral-600 hover:text-brand-primary"
                }`}
              >
                Todas
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleSelect(cat.id, cat.name)}
                  className={`font-body text-left w-full py-1 transition-all duration-200 ${
                    selectedCategoryId === cat.id
                      ? "text-brand-primary font-semibold"
                      : "text-neutral-600 hover:text-brand-primary"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Filtros mobile — chips horizontales sticky */}
        <div className="lg:hidden sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-md py-3 -mx-6 px-6 mb-6 border-b border-neutral-200">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <FilterChip active={selectedCategoryId === null} onClick={() => handleSelect(null, "todas")}>
              Todas
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip key={cat.id} active={selectedCategoryId === cat.id} onClick={() => handleSelect(cat.id, cat.name)}>
                {cat.name}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Grid — ADN: masonry */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-lg text-neutral-500">
                No hay productos en esta categoría.
              </p>
              <button
                onClick={() => setSelectedCategoryId(null)}
                className="mt-4 font-body text-sm text-brand-primary underline"
              >
                Ver todos
              </button>
            </div>
          ) : (
            // ADN: masonry — columnas CSS, alturas variables
            <div className="columns-1 sm:columns-2 lg:columns-2 xl:columns-3 gap-4 lg:gap-5">
              {filtered.map((product, i) => {
                const category = categories.find((c) => c.id === product.category_id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.4), ease: [0.25, 0.1, 0.25, 1] }}
                    className="break-inside-avoid mb-4 lg:mb-5"
                  >
                    <ProductCardHorizontal product={product} category={category} />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
