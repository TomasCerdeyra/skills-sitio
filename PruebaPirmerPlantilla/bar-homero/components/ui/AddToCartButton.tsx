"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/context/CartContext";

interface Props {
  item: CartItem;
  disabled?: boolean;
  className?: string;
}

type State = "idle" | "adding" | "added";

export default function AddToCartButton({ item, disabled, className }: Props) {
  const { addItem } = useCart();
  const [state, setState] = useState<State>("idle");

  function handleClick() {
    if (state !== "idle" || disabled) return;
    setState("adding");
    addItem(item);
    setTimeout(() => setState("added"), 300);
    setTimeout(() => setState("idle"), 2000);
  }

  const label = state === "adding" ? "Agregando..." : state === "added" ? "✓ Agregado" : "Agregar al pedido";
  const bgClass =
    state === "added"
      ? "bg-green-600 border-green-600"
      : disabled
      ? "bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed"
      : "bg-brand-primary border-brand-primary hover:bg-brand-primary/90";

  return (
    <button
      onClick={handleClick}
      disabled={disabled || state !== "idle"}
      className={`
        px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border
        ${bgClass}
        ${!disabled && state !== "added" ? "text-white" : ""}
        ${state === "added" ? "text-white" : ""}
        ${className ?? "w-full"}
      `}
    >
      {label}
    </button>
  );
}
