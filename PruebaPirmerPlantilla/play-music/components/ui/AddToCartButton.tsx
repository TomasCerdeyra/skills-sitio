"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/placeholder-images";

interface Props {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    product_images: { url: string }[];
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
  const { addItem } = useCart();

  function handleAdd() {
    if (disabled) return;
    setAdding(true);

    const effectivePrice = variant?.price
      ?? product.price + (variant?.price_modifier ?? 0);

    addItem({
      id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_name: variant?.name,
      price: effectivePrice,
      quantity: 1,
      image: getProductImage(product),
    });

    trackEvent("add_to_cart", {
      product_id: product.id,
      name: product.name,
      price: effectivePrice,
      quantity: 1,
    });

    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }, 350);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || adding}
      className={`w-full py-4 rounded-sm font-body font-semibold text-base transition-all duration-200 shadow-lg ${
        added
          ? "bg-brand-secondary text-neutral-50"
          : disabled || adding
          ? "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
          : "bg-brand-primary text-neutral-50 hover:bg-brand-primary/90 active:scale-[0.98] shadow-brand-primary/30"
      }`}
    >
      {added ? "✓ Agregado al carrito" : adding ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
}
