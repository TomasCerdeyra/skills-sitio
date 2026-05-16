"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";

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
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  function handleAdd() {
    if (disabled || state === "adding") return;

    setState("adding");

    const effectivePrice = variant?.price !== null && variant?.price !== undefined
      ? variant.price
      : product.price + (variant?.price_modifier ?? 0);

    const item = {
      id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_name: variant?.name,
      price: effectivePrice,
      quantity: 1,
      image: product.product_images[0]?.url,
    };

    // Leer carrito existente de localStorage
    const existing = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const existingIdx = existing.findIndex(
      (i: any) => i.id === item.id && i.variant_id === item.variant_id
    );

    if (existingIdx >= 0) {
      existing[existingIdx].quantity += 1;
    } else {
      existing.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(existing));

    // Disparar evento de storage para que el CartContext se actualice
    window.dispatchEvent(new Event("storage"));

    trackEvent("add_to_cart", {
      product_id: product.id,
      name: product.name,
      price: effectivePrice,
      quantity: 1,
    });

    setTimeout(() => {
      setState("added");
      setTimeout(() => setState("idle"), 2200);
    }, 400);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || state === "adding"}
      className={`w-full py-4 rounded-full font-display font-bold text-sm transition-all duration-200 shadow-lg 
        ${disabled
          ? "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
          : state === "added"
          ? "bg-green-600 text-white shadow-green-600/30 scale-[0.99]"
          : "bg-brand-primary text-neutral-900 hover:bg-brand-accent hover:scale-[1.02] active:scale-95 shadow-brand-primary/30"
        }`}
    >
      {state === "added"
        ? "✓ Agregado al carrito"
        : state === "adding"
        ? "Agregando..."
        : disabled
        ? "Sin stock"
        : "Agregar al carrito"}
    </button>
  );
}
