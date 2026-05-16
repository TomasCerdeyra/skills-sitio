"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";

interface CategoryFiltersProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-28 self-start">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
          Categorías
        </p>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleSelect(null, "todas")}
              className={`font-body text-left w-full py-1.5 transition-colors text-sm ${
                selectedCategoryId === null
                  ? "text-brand-primary font-semibold"
                  : "text-neutral-600 hover:text-brand-primary"
              }`}
            >
              Todos
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleSelect(cat.id, cat.name)}
                className={`font-body text-left w-full py-1.5 transition-colors text-sm ${
                  selectedCategoryId === cat.id
                    ? "text-brand-primary font-semibold"
                    : "text-neutral-600 hover:text-brand-primary"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile sticky horizontal scroll */}
      <div className="lg:hidden sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-md py-3 -mx-6 px-6 mb-6 border-b border-neutral-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <FilterChip
            active={selectedCategoryId === null}
            onClick={() => handleSelect(null, "todas")}
          >
            Todos
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
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
        active
          ? "bg-brand-primary text-white"
          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}
