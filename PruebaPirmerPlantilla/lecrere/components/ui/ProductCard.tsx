"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/umami";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price?: number | null;
    category_id?: string | null;
    product_images: { url: string; alt: string | null; position: number | null }[];
  };
}

function getImageSrc(product: ProductCardProps["product"]): string {
  if (product.product_images?.[0]?.url) return product.product_images[0].url;
  const seed = product.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://picsum.photos/seed/${seed}/600/800`;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = getImageSrc(product);
  const altText = product.product_images?.[0]?.alt ?? product.name;
  const hasDiscount =
    product.compare_at_price &&
    product.compare_at_price > product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      onClick={() =>
        trackEvent("view_product", { slug: product.slug, name: product.name })
      }
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
        {/* Cliente: reemplazar con foto propia */}
        <Image
          src={mainImage}
          alt={altText}
          fill
          quality={80}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-brand-secondary text-neutral-50 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] font-body font-medium">
            Oferta
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-12 bg-gradient-to-t from-brand-primary/80 to-transparent transition-all duration-400 flex items-end justify-center pb-3 overflow-hidden">
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            Ver detalle →
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
      <div>
        <h3 className="font-display text-xl font-light text-neutral-900 group-hover:text-brand-secondary transition-colors duration-300 mb-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-3">
          <span className="font-body text-sm font-medium text-neutral-900">
            ${product.price.toLocaleString("es-AR")}
          </span>
          {hasDiscount && (
            <span className="font-body text-xs text-neutral-400 line-through">
              ${product.compare_at_price?.toLocaleString("es-AR")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
