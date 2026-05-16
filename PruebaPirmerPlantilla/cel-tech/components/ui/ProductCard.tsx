"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductImage } from "@/lib/placeholder-images";
import { trackEvent } from "@/lib/analytics/umami";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price: number | null;
    description: string | null;
    featured: boolean;
    category_id: string;
    product_images: { url: string; alt?: string | null; position?: number | null }[];
    product_variants?: { id: string; name: string; price: number | null; price_modifier: number | null; stock: number | null }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductImage(product);
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  // Calcular precio mínimo de variantes si las hay
  const variants = product.product_variants ?? [];
  const hasVariants = variants.length > 0;
  const minVariantPrice = hasVariants
    ? Math.min(
        ...variants.map((v) =>
          v.price !== null ? v.price : product.price + (v.price_modifier ?? 0)
        )
      )
    : null;

  const displayPrice = minVariantPrice ?? product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      onClick={() => trackEvent("view_product", { slug: product.slug, name: product.name })}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 mb-4">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[10px] font-display font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Oferta
            </span>
          )}
          {product.featured && (
            <span className="bg-brand-primary text-neutral-900 text-[10px] font-display font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Destacado
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-all duration-300 flex items-end p-4">
          <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full">
            <span className="font-body text-xs text-white bg-neutral-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Ver detalle →
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="font-body text-xs text-neutral-400 mb-1 uppercase tracking-wider">
          {product.product_variants && product.product_variants.length > 0
            ? `${product.product_variants.length} variantes`
            : "Disponible"}
        </p>
        <h3 className="font-display text-base font-semibold text-neutral-900 mb-1.5 leading-tight group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-neutral-900">
            {hasVariants && "desde "}${displayPrice.toLocaleString("es-AR")}
          </span>
          {hasDiscount && (
            <span className="font-body text-sm text-neutral-400 line-through">
              ${product.compare_at_price!.toLocaleString("es-AR")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
