"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/umami";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price?: number | null;
    description?: string | null;
    product_images: { url: string; alt: string | null; position: number | null }[];
  };
  category?: { name: string };
}

export function ProductCardHorizontal({ product, category }: ProductCardProps) {
  const mainImage = product.product_images?.[0];
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      onClick={() =>
        trackEvent("view_product", {
          slug: product.slug,
          name: product.name,
          category: category?.name ?? "",
        })
      }
      className="group flex gap-0 bg-neutral-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-500 border border-neutral-100"
    >
      {/* Imagen */}
      <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden bg-neutral-100">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ minHeight: "140px" }}
          />
        ) : (
          <div
            className="w-full h-full bg-neutral-200 flex items-center justify-center"
            style={{ minHeight: "140px" }}
          >
            <span className="text-neutral-400 text-3xl">☕</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="py-5 px-5 flex flex-col justify-center flex-1 min-w-0">
        {category && (
          <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-1">
            {category.name}
          </p>
        )}
        <h3 className="font-display text-lg text-neutral-900 mb-1 group-hover:text-brand-primary transition-colors leading-snug">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-sm text-neutral-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="flex items-baseline gap-3 mt-auto">
          <span className="font-body font-semibold text-neutral-900">
            ${product.price.toLocaleString("es-AR")}
          </span>
          {hasDiscount && (
            <span className="font-body text-sm text-neutral-400 line-through">
              ${product.compare_at_price?.toLocaleString("es-AR")}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center pr-5 pl-2 flex-shrink-0">
        <span className="text-neutral-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-300">
          →
        </span>
      </div>
    </Link>
  );
}
