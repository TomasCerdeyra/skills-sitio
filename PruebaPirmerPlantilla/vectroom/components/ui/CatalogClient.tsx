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
  featured: boolean;
  category_id: string;
  product_images: { url: string; alt: string | null; position: number | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  position: number;
}

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filtered = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  function handleCategorySelect(id: string | null, name?: string) {
    setSelectedCategoryId(id);
    if (id && name) {
      trackEvent("category_click", { category: name });
    }
  }

  return (
    <div className="pt-24 pb-16">
      {/* Header del catálogo */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-10">
        <div className="pt-8">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            {filtered.length} {filtered.length === 1 ? "prenda" : "prendas"}
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-neutral-900 leading-none">
            {selectedCategoryId
              ? categories.find((c) => c.id === selectedCategoryId)?.name ?? "Catálogo"
              : "Catálogo"}
          </h1>
        </div>
      </div>

      {/* Filtros mobile — chips horizontales sticky */}
      <div className="lg:hidden sticky top-14 z-20 bg-white/95 backdrop-blur-md border-b border-neutral-200 mb-6">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            <FilterChip
              active={selectedCategoryId === null}
              onClick={() => handleCategorySelect(null)}
            >
              Todas
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip
                key={cat.id}
                active={selectedCategoryId === cat.id}
                onClick={() => handleCategorySelect(cat.id, cat.name)}
              >
                {cat.name}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {/* Layout principal */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="lg:flex lg:gap-12">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-48 flex-shrink-0 sticky top-28 self-start">
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-5">
              Categorías
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`font-body text-sm text-left w-full py-1 transition-colors ${
                    selectedCategoryId === null
                      ? "text-neutral-900 font-semibold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  Todas ({products.length})
                </button>
              </li>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category_id === cat.id).length;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategorySelect(cat.id, cat.name)}
                      className={`font-body text-sm text-left w-full py-1 transition-colors ${
                        selectedCategoryId === cat.id
                          ? "text-neutral-900 font-semibold"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Grid de productos */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-neutral-500">
                  No hay productos en esta categoría.
                </p>
              </div>
            ) : (
              <motion.div
                key={selectedCategoryId ?? "all"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
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
      className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-body font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-neutral-900 text-white"
          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const mainImage = product.product_images?.[0];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/producto/${product.slug}`}
        onClick={() =>
          trackEvent("view_product", { slug: product.slug, name: product.name })
        }
        className="group block bg-white overflow-hidden"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainImage.url}
              alt={mainImage.alt ?? product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-body text-xs text-neutral-300 uppercase tracking-widest">
                Sin imagen
              </span>
            </div>
          )}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-neutral-900 text-white px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] font-body rounded-full">
              Sale
            </span>
          )}
          {product.featured && !hasDiscount && (
            <span className="absolute top-3 left-3 bg-white text-neutral-900 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] font-body rounded-full border border-neutral-200">
              Destacado
            </span>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-12 bg-neutral-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-white">
              Ver detalle →
            </span>
          </div>
        </div>
        <div className="p-4 lg:p-5">
          <h3 className="font-display text-base font-bold uppercase tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors leading-tight mb-1">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-body text-sm font-semibold text-neutral-900">
              ${product.price.toLocaleString("es-AR")}
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-neutral-400 line-through">
                ${product.compare_at_price?.toLocaleString("es-AR")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
