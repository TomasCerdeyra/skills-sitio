"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getProductImage } from "@/lib/placeholder-images";
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
  product_images: { url: string; alt?: string | null; position?: number | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  position: number;
}

interface Props {
  products: Product[];
  categories: Category[];
}

export function CatalogClient({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category_id === activeCategory);

  function handleCategoryClick(catId: string, catName: string) {
    setActiveCategory(catId);
    if (catId !== "all") {
      trackEvent("category_click", { category: catName });
    }
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => handleCategoryClick("all", "Todos")}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-neutral-900 text-neutral-50 shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              ♪ Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id, cat.name)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-brand-primary text-neutral-50 shadow-md shadow-brand-primary/30"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="font-display text-4xl text-neutral-300 mb-4">♩</p>
              <p className="font-body text-neutral-500">
                No hay instrumentos en esta categoría todavía.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imageUrl = getProductImage(product);
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/producto/${product.slug}`}
        onClick={() => trackEvent("view_product", { slug: product.slug, name: product.name })}
        className="group block bg-neutral-50 border border-neutral-200 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 rounded-sm overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-brand-primary text-neutral-50 text-xs font-body font-bold px-2 py-0.5 uppercase tracking-wide">
              Oferta
            </span>
          )}
          {product.featured && !hasDiscount && (
            <span className="absolute top-3 left-3 bg-brand-secondary text-neutral-50 text-xs font-body font-bold px-2 py-0.5 uppercase tracking-wide">
              Destacado
            </span>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="font-body text-xs text-neutral-50 bg-neutral-900/70 backdrop-blur-sm px-3 py-1 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Ver detalle →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-base font-semibold text-neutral-900 line-clamp-2 leading-snug mb-1 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="font-body text-xs text-neutral-500 line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-body font-bold text-neutral-900 text-sm">
              ${product.price.toLocaleString("es-AR")}
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-neutral-400 line-through">
                ${product.compare_at_price!.toLocaleString("es-AR")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
