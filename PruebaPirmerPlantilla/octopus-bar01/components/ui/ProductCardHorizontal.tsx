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
    category_id?: string | null;
    product_images: { url: string; alt: string | null; position: number | null }[];
  };
  category?: { id: string; name: string; slug: string };
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
      className="group flex gap-0 bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-brand-primary/10 hover:border-brand-primary/30 transition-all duration-500"
    >
      {/* Imagen */}
      <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden bg-neutral-100">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <img
            src={`https://picsum.photos/seed/${product.slug}/400/400`}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-brand-primary text-neutral-900 px-2 py-0.5 text-xs uppercase tracking-wider font-bold rounded-full">
            Promo
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 py-5 px-5 flex flex-col justify-between">
        <div>
          {category && (
            <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-1">
              {category.name}
            </p>
          )}
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="font-body text-sm text-neutral-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
        <div className="flex items-baseline gap-3 mt-3">
          <span className="font-body font-bold text-lg text-neutral-900">
            ${product.price.toLocaleString("es-AR")}
          </span>
          {hasDiscount && (
            <span className="font-body text-sm text-neutral-400 line-through">
              ${product.compare_at_price?.toLocaleString("es-AR")}
            </span>
          )}
          <span className="ml-auto font-body text-xs text-brand-primary group-hover:translate-x-1 transition-transform duration-200">
            Ver →
          </span>
        </div>
      </div>
    </Link>
  );
}
