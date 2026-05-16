"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/umami";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  category_id: string;
  product_images: { id: string; url: string; alt: string | null; position: number | null }[];
  product_variants: { id: string; name: string; price: number | null; price_modifier: number | null; stock: number | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  position: number;
  subcategories: { id: string; name: string; slug: string; position: number }[];
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

  function handleCategorySelect(id: string | null, name: string) {
    setSelectedCategoryId(id);
    if (id) trackEvent("category_click", { category: name });
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      {/* Header de página */}
      <div className="bg-brand-dark text-neutral-50 py-16 lg:py-20 mb-0">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-brand-secondary/70 mb-3"
          >
            Panadería artesanal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-5xl lg:text-7xl leading-tight italic"
          >
            La carta.
          </motion.h1>
        </div>
      </div>

      {/* Filtros como tabs sticky */}
      <div className="sticky top-16 z-20 bg-neutral-50/96 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            <FilterTab
              active={selectedCategoryId === null}
              onClick={() => handleCategorySelect(null, "Todos")}
            >
              Todo
            </FilterTab>
            {categories.map((cat) => (
              <FilterTab
                key={cat.id}
                active={selectedCategoryId === cat.id}
                onClick={() => handleCategorySelect(cat.id, cat.name)}
              >
                {cat.name}
              </FilterTab>
            ))}
          </div>
        </div>
      </div>

      {/* Lista productos — carta de panadería */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategoryId ?? "all"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-body text-lg text-neutral-500">
                  No hay productos en esta categoría.
                </p>
              </div>
            ) : (
              // Agrupar por categoría cuando se ve "Todo"
              selectedCategoryId === null ? (
                <div className="space-y-12">
                  {categories.map((cat) => {
                    const catProducts = filtered.filter((p) => p.category_id === cat.id);
                    if (catProducts.length === 0) return null;
                    return (
                      <div key={cat.id}>
                        {/* Nombre de categoría como separador */}
                        <h2 className="font-display font-bold text-2xl lg:text-3xl text-brand-dark italic mb-1 pb-3 border-b-2 border-brand-secondary/30">
                          {cat.name}
                        </h2>
                        <div className="divide-y divide-neutral-100">
                          {catProducts.map((product, i) => (
                            <ProductRow key={product.id} product={product} index={i} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {filtered.map((product, i) => (
                    <ProductRow key={product.id} product={product} index={i} />
                  ))}
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FilterTab({
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
      className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
        active
          ? "bg-brand-primary text-neutral-50 shadow-md shadow-brand-primary/20"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

function ProductRow({
  product,
  index,
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price: number | null;
    description: string | null;
    product_images: { url: string; alt: string | null }[];
    product_variants: { price: number | null; price_modifier: number | null }[];
  };
  index: number;
}) {
  const image = product.product_images?.[0];
  const hasVariants = product.product_variants.length > 0;
  const minPrice = hasVariants
    ? Math.min(
        ...product.product_variants.map((v) =>
          v.price !== null ? v.price : product.price + (v.price_modifier ?? 0)
        )
      )
    : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        href={`/producto/${product.slug}`}
        onClick={() => trackEvent("view_product", { slug: product.slug, name: product.name })}
        className="group flex items-center gap-5 py-5 hover:bg-brand-accent/40 transition-colors -mx-4 px-4 rounded-xl"
      >
        {/* Imagen circular */}
        <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-neutral-200 group-hover:border-brand-secondary transition-colors">
          {image ? (
            <img
              src={image.url}
              alt={image.alt ?? product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xl">🌾</div>
          )}
        </div>

        {/* Nombre + descripción */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-base lg:text-lg text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
            {product.name}
          </h3>
          {product.description && (
            <p className="font-body text-sm text-neutral-500 mt-0.5 line-clamp-1 hidden sm:block">
              {product.description}
            </p>
          )}
        </div>

        {/* Precio */}
        <div className="flex-shrink-0 text-right ml-2">
          <span className="font-body font-semibold text-base text-brand-dark">
            {hasVariants ? "desde " : ""}${minPrice.toLocaleString("es-AR")}
          </span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="block font-body text-xs text-neutral-400 line-through">
              ${product.compare_at_price.toLocaleString("es-AR")}
            </span>
          )}
        </div>

        {/* Flecha */}
        <span className="flex-shrink-0 text-neutral-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all text-sm">
          →
        </span>
      </Link>
    </motion.div>
  );
}
