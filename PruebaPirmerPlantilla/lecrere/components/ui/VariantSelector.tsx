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
      <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">
        Talle
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
              className={`px-4 py-2 text-sm font-body border transition-all duration-200 ${
                isSelected
                  ? "border-brand-primary bg-brand-primary text-neutral-50"
                  : noStock
                  ? "border-neutral-200 text-neutral-300 line-through cursor-not-allowed"
                  : "border-neutral-300 text-neutral-700 hover:border-brand-primary"
              }`}
            >
              {v.name}
              {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                <span className="ml-1 text-[10px] text-amber-600">
                  ({v.stock})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
