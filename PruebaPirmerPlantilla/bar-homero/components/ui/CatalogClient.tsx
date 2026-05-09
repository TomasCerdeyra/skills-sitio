"use client";

import { useState } from "react";
import CategoryFilters from "./CategoryFilters";
import CatalogGrid from "./CatalogGrid";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  description?: string | null;
  category_id?: string | null;
  product_images?: { url: string; alt?: string | null }[];
  product_variants?: { id: string; stock: number }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  products: Product[];
  categories: Category[];
}

export default function CatalogClient({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const activeId = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.id ?? null
    : null;

  const filtered = activeId
    ? products.filter((p) => p.category_id === activeId)
    : products;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <CategoryFilters
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-400 mb-5">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
        <CatalogGrid products={filtered} />
      </div>
    </div>
  );
}
