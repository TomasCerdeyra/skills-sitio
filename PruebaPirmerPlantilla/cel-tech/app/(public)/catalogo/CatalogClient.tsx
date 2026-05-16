"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { trackEvent } from "@/lib/analytics/umami";
import { motion, AnimatePresence } from "framer-motion";

type Category = {
  id: string;
  name: string;
  slug: string;
  position: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  featured: boolean;
  category_id: string;
  product_images: { url: string; alt?: string | null; position?: number | null }[];
  product_variants?: { id: string; name: string; price: number | null; price_modifier: number | null; stock: number | null }[];
};

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category_id === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

  const handleCategoryChange = (catId: string, catName: string) => {
    setActiveCategory(catId);
    if (catId !== "all") {
      trackEvent("category_click", { category: catName });
    }
  };

  return (
    <div>
      {/* Filtros sticky */}
      <div className="sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide flex-nowrap">
              <button
                onClick={() => handleCategoryChange("all", "Todo")}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-neutral-900 text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                Todo ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category_id === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id, cat.name)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-brand-primary text-neutral-900 shadow-md"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Buscador */}
            <div className="relative flex-shrink-0 sm:w-56">
              <input
                type="text"
                placeholder="Buscar modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-200 bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <p className="text-4xl mb-4">📱</p>
              <p className="font-body text-neutral-500">
                No encontramos equipos con ese filtro.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 font-body text-sm text-brand-primary hover:underline"
              >
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
