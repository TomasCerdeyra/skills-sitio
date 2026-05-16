"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
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
  const { addItem } = useCart();

  function handleAdd() {
    if (disabled) return;

    setAdding(true);

    const effectivePrice =
      variant?.price ?? product.price + (variant?.price_modifier ?? 0);

    addItem({
      id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_name: variant?.name,
      price: effectivePrice,
      quantity: 1,
      image: product.product_images[0]?.url,
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
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || adding}
      className="w-full bg-brand-primary text-white py-4 rounded-full font-body font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-brand-primary/30"
    >
      {added ? "✓ Agregado al pedido" : adding ? "Agregando..." : "Agregar al pedido"}
    </button>
  );
}
