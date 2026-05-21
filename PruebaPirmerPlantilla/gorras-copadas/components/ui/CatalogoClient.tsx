"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { analytics } from "@/lib/analytics/umami";

export type ProductCard = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  badge: string | null;
};

export type CategoryItem = {
  id: string;
  name: string;
};

export default function CatalogoClient({
  products,
  categories,
}: {
  products: ProductCard[];
  categories: CategoryItem[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  function handleAddToCart(product: ProductCard) {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      quantity: 1,
    });
    analytics.addToCart(product.name, product.price);
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#D4FF00] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Colección completa
          </p>
          <h1
            className="text-5xl md:text-7xl font-black text-white leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CATÁLOGO
          </h1>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#D4FF00] text-[#0A0A0A]"
                  : "bg-[#141414] text-[#A0A0A0] border border-[#2E2E2E] hover:border-[#D4FF00]/50 hover:text-white"
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && cat.id !== "all" && (
                <span className="ml-2 opacity-60">
                  ({products.filter((p) => p.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl overflow-hidden bg-[#141414] border border-[#1A1A1A] hover:border-[#2E2E2E] transition-colors"
            >
              <Link href={`/catalogo/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-[#FF3131] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/catalogo/${product.slug}`}>
                  <p className="text-white font-semibold text-sm leading-tight mb-1 hover:text-[#D4FF00] transition-colors">
                    {product.name}
                  </p>
                </Link>
                <p className="text-[#D4FF00] font-bold">
                  ${product.price.toLocaleString("es-AR")}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 w-full py-2.5 bg-[#1A1A1A] hover:bg-[#D4FF00] text-[#A0A0A0] hover:text-[#0A0A0A] text-xs font-bold rounded-full transition-all duration-200 border border-[#2E2E2E] hover:border-[#D4FF00]"
                >
                  AGREGAR AL CARRITO
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#A0A0A0] text-lg">
              No hay productos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
