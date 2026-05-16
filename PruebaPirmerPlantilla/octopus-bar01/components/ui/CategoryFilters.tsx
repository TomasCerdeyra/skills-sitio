"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: { id: string; name: string; slug: string }[];
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function CategoryFilters({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFiltersProps) {
  function handleSelect(categoryId: string | null, categoryName: string) {
    onSelectCategory(categoryId);
    if (categoryId) {
      trackEvent("category_click", { category: categoryName });
    }
  }

  return (
    <>
      {/* Desktop sidebar sticky */}
      <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-28 self-start">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
          Categorías
        </p>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => handleSelect(null, "todas")}
              className={`font-body text-left w-full py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
                selectedCategoryId === null
                  ? "bg-brand-primary text-neutral-900 font-bold"
                  : "text-neutral-700 hover:text-brand-primary hover:bg-brand-primary/10"
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleSelect(cat.id, cat.name)}
                className={`font-body text-left w-full py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
                  selectedCategoryId === cat.id
                    ? "bg-brand-primary text-neutral-900 font-bold"
                    : "text-neutral-700 hover:text-brand-primary hover:bg-brand-primary/10"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile — chips horizontales sticky */}
      <div className="lg:hidden sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-md py-3 -mx-6 px-6 mb-6 border-b border-neutral-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <FilterChip
            active={selectedCategoryId === null}
            onClick={() => handleSelect(null, "todas")}
          >
            Todas
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={selectedCategoryId === cat.id}
              onClick={() => handleSelect(cat.id, cat.name)}
            >
              {cat.name}
            </FilterChip>
          ))}
        </div>
      </div>
    </>
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
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? "bg-brand-primary text-neutral-900 font-bold"
          : "bg-neutral-100 text-neutral-700 hover:bg-brand-primary/15 hover:text-brand-primary"
      }`}
    >
      {children}
    </button>
  );
}
