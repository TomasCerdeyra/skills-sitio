"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryFilters } from "@/components/ui/CategoryFilters";
import { ProductCardHorizontal } from "@/components/ui/ProductCardHorizontal";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  description?: string | null;
  featured?: boolean;
  category_id?: string | null;
  product_images: { url: string; alt: string | null; position: number | null }[];
};

type Category = {
  id: string;
  name: string;
  slug: string;
  position?: number;
  subcategories?: { id: string; name: string; slug: string }[];
};

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filtered = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  const [featured, ...rest] = filtered;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
      {/* Header del catálogo */}
      <header className="mb-16">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-3">
          Bar Octopus
        </p>
        <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.0] mb-4">
          La Carta.
        </h1>
        <p className="font-body text-neutral-500 max-w-lg text-base lg:text-lg">
          Hamburguesas con identidad, combos para compartir y bebidas que acompañan la noche.
        </p>
      </header>

      <div className="lg:flex lg:gap-14">
        {/* Filtros */}
        <CategoryFilters
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-lg text-neutral-500">
                No hay productos en esta categoría.
              </p>
            </div>
          ) : (
            <>
              {/* Featured first — ocupa ancho completo */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-8"
                >
                  <div className="grid lg:grid-cols-2 gap-0 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
                    <div className="aspect-square lg:aspect-auto overflow-hidden min-h-[240px]">
                      {featured.product_images?.[0] ? (
                        <img
                          src={featured.product_images[0].url}
                          alt={featured.product_images[0].alt ?? featured.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={`https://picsum.photos/seed/${featured.slug}/800/600`}
                          alt={featured.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
                        ✦ Destacado
                      </p>
                      <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
                        {featured.name}
                      </h2>
                      {featured.description && (
                        <p className="font-body text-neutral-400 mb-6 leading-relaxed">
                          {featured.description}
                        </p>
                      )}
                      <p className="font-display text-3xl font-extrabold text-brand-primary">
                        ${featured.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Rest — list view */}
              {rest.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-4"
                >
                  {rest.map((product) => {
                    const category = categories.find(
                      (c) => c.id === product.category_id
                    );
                    return (
                      <motion.div key={product.id} variants={itemVariants}>
                        <ProductCardHorizontal
                          product={product}
                          category={category}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
