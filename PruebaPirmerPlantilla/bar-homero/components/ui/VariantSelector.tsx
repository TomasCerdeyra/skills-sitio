"use client";

interface Variant {
  id: string;
  name: string;
  price?: number | null;
  price_modifier?: number | null;
  stock: number;
}

interface Props {
  variants: Variant[];
  basePrice: number;
  selected: Variant | null;
  onSelect: (v: Variant) => void;
}

export default function VariantSelector({ variants, basePrice, selected, onSelect }: Props) {
  if (!variants.length) return null;

  return (
    <div>
      <p className="text-sm font-medium text-neutral-700 mb-3">
        Opciones
        {selected && (
          <span className="ml-2 text-neutral-400 font-normal">— {selected.name}</span>
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const effectivePrice = v.price ?? basePrice + (v.price_modifier ?? 0);
          const outOfStock = v.stock <= 0;
          const isSelected = selected?.id === v.id;

          return (
            <button
              key={v.id}
              onClick={() => !outOfStock && onSelect(v)}
              disabled={outOfStock}
              className={`
                relative px-4 py-2 rounded-xl border text-sm font-medium transition-all
                ${isSelected
                  ? "border-brand-primary bg-brand-primary text-white"
                  : outOfStock
                  ? "border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed line-through"
                  : "border-neutral-200 hover:border-brand-primary hover:text-brand-primary text-neutral-700"
                }
              `}
            >
              {v.name}
              {effectivePrice !== basePrice && (
                <span className={`ml-1.5 text-xs ${isSelected ? "text-white/80" : "text-neutral-400"}`}>
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
              )}
              {v.stock > 0 && v.stock <= 5 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-accent text-white text-[9px] flex items-center justify-center font-bold">
                  {v.stock}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="text-xs text-neutral-400 mt-2">
          {selected.stock > 5
            ? "Disponible"
            : `Solo ${selected.stock} disponible${selected.stock !== 1 ? "s" : ""}`}
        </p>
      )}
    </div>
  );
}
