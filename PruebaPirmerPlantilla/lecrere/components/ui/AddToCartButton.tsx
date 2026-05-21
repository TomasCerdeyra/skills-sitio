"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";

interface Props {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    product_images: Array<{ url: string }>;
  };
  variant: {
    id: string;
    name: string;
    price: number | null;
    price_modifier: number | null;
  } | null;
  disabled?: boolean;
}

export function AddToCartButton({ product, variant, disabled }: Props) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (disabled || adding) return;
    setAdding(true);

    const effectivePrice =
      variant?.price ?? product.price + (variant?.price_modifier ?? 0);

    const item = {
      id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_name: variant?.name,
      price: effectivePrice,
      quantity: 1,
      image: product.product_images[0]?.url,
    };

    const existing = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const existingIdx = existing.findIndex(
      (i: typeof item) =>
        i.id === item.id && i.variant_id === item.variant_id
    );

    if (existingIdx >= 0) {
      existing[existingIdx].quantity += 1;
    } else {
      existing.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(existing));
    window.dispatchEvent(new Event("cartUpdated"));

    trackEvent("add_to_cart", {
      product_id: product.id,
      name: product.name,
      price: effectivePrice,
      quantity: 1,
    });

    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || adding}
      className="w-full bg-brand-primary text-neutral-50 py-4 font-body font-medium text-sm tracking-wide hover:bg-neutral-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 shadow-lg shadow-brand-primary/20"
    >
      {added ? "✓ Agregado" : adding ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
}
