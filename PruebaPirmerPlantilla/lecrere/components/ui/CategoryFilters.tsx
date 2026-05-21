"use client";

import { trackEvent } from "@/lib/analytics/umami";

interface Category {
  id: string;
  name: string;
  slug: string;
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
    if (categoryId) trackEvent("category_click", { category: categoryName });
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-48 flex-shrink-0 sticky top-28 self-start">
        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-6">
          Categorías
        </p>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => handleSelect(null, "todas")}
              className={`font-body text-sm text-left w-full transition-colors ${
                selectedCategoryId === null
                  ? "text-brand-secondary font-medium"
                  : "text-neutral-700 hover:text-brand-secondary"
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleSelect(cat.id, cat.name)}
                className={`font-body text-sm text-left w-full transition-colors ${
                  selectedCategoryId === cat.id
                    ? "text-brand-secondary font-medium"
                    : "text-neutral-700 hover:text-brand-secondary"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile — chips horizontales */}
      <div className="lg:hidden sticky top-16 z-20 bg-neutral-50/95 backdrop-blur-md py-3 -mx-6 px-6 mb-8 border-b border-neutral-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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
      className={`flex-shrink-0 px-4 py-1.5 text-xs font-body font-medium tracking-wide whitespace-nowrap transition-colors border ${
        active
          ? "bg-brand-primary text-neutral-50 border-brand-primary"
          : "bg-transparent text-neutral-700 border-neutral-300 hover:border-brand-secondary hover:text-brand-secondary"
      }`}
    >
      {children}
    </button>
  );
}
