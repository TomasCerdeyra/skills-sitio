"use client";

import { useState } from "react";
import { CategoryFilters } from "./CategoryFilters";
import { CatalogGrid } from "./CatalogGrid";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  category_id?: string | null;
  product_images: { url: string; alt: string | null; position: number | null }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const filtered = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  return (
    <div className="lg:flex lg:gap-14">
      <CategoryFilters
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />
      <div className="flex-1 min-w-0">
        <CatalogGrid products={filtered} />
      </div>
    </div>
  );
}
