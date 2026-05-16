"use client";

import { trackEvent } from "@/lib/analytics/umami";

interface Variant {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  price_modifier: number | null;
  stock: number | null;
}

interface VariantSelectorProps {
  variants: Variant[];
  selected: Variant | null;
  onSelect: (v: Variant) => void;
  productId: string;
}

export function VariantSelector({
  variants,
  selected,
  onSelect,
  productId,
}: VariantSelectorProps) {
  function handleSelect(v: Variant) {
    onSelect(v);
    trackEvent("select_variant", { product_id: productId, variant_name: v.name });
  }

  return (
    <div className="mb-8">
      <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
        Variante
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const noStock = v.stock !== null && v.stock <= 0;
          const isSelected = selected?.id === v.id;
          return (
            <button
              key={v.id}
              onClick={() => !noStock && handleSelect(v)}
              disabled={noStock}
              className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                isSelected
                  ? "bg-brand-primary text-white"
                  : noStock
                  ? "bg-neutral-100 text-neutral-400 line-through cursor-not-allowed"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {v.name}
              {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                <span className="ml-1 text-xs text-amber-600">({v.stock} disp.)</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
