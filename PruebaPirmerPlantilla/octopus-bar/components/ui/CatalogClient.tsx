"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryFilters } from "./CategoryFilters";
import { ProductCardHorizontal } from "./ProductCardHorizontal";
import { FadeUpOnScroll } from "./FadeUpOnScroll";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  featured: boolean;
  category_id: string | null;
  product_images: { id: string; url: string; alt: string | null; position: number | null }[];
  product_variants: { id: string; name: string; price: number | null; price_modifier: number | null; stock: number | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  position: number | null;
}

export function CatalogClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filtered = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
      {/* Header */}
      <FadeUpOnScroll className="mb-16">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-3">
          ☕ Carta del día
        </p>
        <h1 className="font-display text-5xl lg:text-7xl text-neutral-900 leading-[1.05] tracking-tight">
          Lo que servimos
        </h1>
        <p className="font-body text-lg text-neutral-600 mt-4 max-w-xl">
          Café de especialidad, pastelería artesanal y sandwiches hechos con tiempo. Todo disponible para tomar acá o pedir por WhatsApp.
        </p>
      </FadeUpOnScroll>

      <div className="lg:flex lg:gap-14">
        <CategoryFilters
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-lg text-neutral-500">
                No hay productos en esta categoría.
              </p>
            </div>
          ) : (
            <motion.div
              key={selectedCategoryId ?? "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {filtered.map((product, i) => {
                const category = categories.find((c) => c.id === product.category_id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <ProductCardHorizontal product={product} category={category} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
