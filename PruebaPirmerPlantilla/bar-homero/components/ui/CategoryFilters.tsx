"use client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export default function CategoryFilters({ categories, active, onChange }: Props) {
  const all = [{ id: "all", name: "Todos", slug: null as string | null }, ...categories.map((c) => ({ ...c, slug: c.slug as string | null }))];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-48 shrink-0">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-4 px-2">
          Categorías
        </p>
        <nav className="space-y-0.5">
          {all.map(({ id, name, slug }) => (
            <button
              key={id}
              onClick={() => onChange(slug)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active === slug
                  ? "bg-brand-primary text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile chips */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {all.map(({ id, name, slug }) => (
          <button
            key={id}
            onClick={() => onChange(slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              active === slug
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
}
