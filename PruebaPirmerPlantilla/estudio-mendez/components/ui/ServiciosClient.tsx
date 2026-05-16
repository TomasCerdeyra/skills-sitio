"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics/umami";

// Roman numerals
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];

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

export function ServiciosClient({
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

  function handleCategorySelect(id: string | null, name: string) {
    setSelectedCategoryId(id);
    if (id) {
      trackEvent("category_click", { category: name });
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-brand-primary pt-40 pb-20 lg:pt-48 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs uppercase tracking-[0.28em] text-brand-accent mb-6"
          >
            Estudio Méndez
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl font-black text-neutral-50 leading-[0.9] tracking-tight"
          >
            Servicios.
          </motion.h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-50 border-b border-neutral-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-4 lg:hidden">
            <FilterChip
              active={selectedCategoryId === null}
              onClick={() => handleCategorySelect(null, "todas")}
            >
              Todos
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

          {/* Desktop: inline tabs */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleCategorySelect(null, "todas")}
              className={`font-body text-sm py-5 border-b-2 transition-all duration-200 whitespace-nowrap ${
                selectedCategoryId === null
                  ? "border-brand-accent text-brand-primary font-medium"
                  : "border-transparent text-neutral-500 hover:text-brand-primary"
              }`}
            >
              Todos los servicios
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id, cat.name)}
                className={`font-body text-sm py-5 border-b-2 transition-all duration-200 whitespace-nowrap ${
                  selectedCategoryId === cat.id
                    ? "border-brand-accent text-brand-primary font-medium"
                    : "border-transparent text-neutral-500 hover:text-brand-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services list — expedientes */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-lg text-neutral-500">
              No hay servicios en esta categoría.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={`/servicio/${service.slug}`}
                  onClick={() =>
                    trackEvent("view_product", { slug: service.slug, name: service.name })
                  }
                  className="group flex gap-6 lg:gap-12 py-8 lg:py-10 hover:bg-neutral-50/80 transition-colors duration-300 -mx-6 lg:-mx-10 px-6 lg:px-10"
                >
                  {/* Roman numeral */}
                  <div className="w-12 lg:w-20 flex-shrink-0 pt-1.5">
                    <span className="font-display text-2xl lg:text-3xl font-normal text-brand-accent/60 group-hover:text-brand-accent transition-colors duration-200">
                      {ROMAN[i % ROMAN.length]}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Featured badge */}
                        {service.featured && (
                          <span className="inline-block font-body text-[10px] uppercase tracking-[0.2em] text-brand-accent border border-brand-accent/30 px-2 py-0.5 mb-3">
                            Destacado
                          </span>
                        )}
                        <h2 className="font-display text-xl lg:text-2xl font-semibold text-brand-primary group-hover:text-brand-accent transition-colors duration-200 mb-3">
                          {service.name}
                        </h2>
                        {service.description && (
                          <p className="font-body text-sm text-neutral-600 leading-relaxed max-w-2xl line-clamp-2">
                            {service.description}
                          </p>
                        )}
                      </div>

                      {/* Price + CTA */}
                      <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-end gap-4 lg:gap-2 pt-0 lg:pt-2">
                        {service.price > 0 ? (
                          <div className="text-right">
                            {service.compare_at_price && service.compare_at_price > service.price && (
                              <p className="font-body text-xs text-neutral-400 line-through">
                                ${service.compare_at_price.toLocaleString("es-AR")}
                              </p>
                            )}
                            <p className="font-body text-sm font-medium text-brand-primary">
                              desde ${service.price.toLocaleString("es-AR")}
                            </p>
                          </div>
                        ) : (
                          <span className="font-body text-xs text-neutral-500 italic">
                            A convenir
                          </span>
                        )}
                        <span className="font-body text-xs uppercase tracking-[0.15em] text-brand-primary/70 group-hover:text-brand-accent transition-colors flex items-center gap-2 whitespace-nowrap">
                          Ver más
                          <span className="w-4 h-px bg-current group-hover:w-7 transition-all duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
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
      className={`flex-shrink-0 px-4 py-2 text-xs font-body font-medium tracking-wide transition-colors whitespace-nowrap ${
        active
          ? "bg-brand-primary text-neutral-50"
          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}
