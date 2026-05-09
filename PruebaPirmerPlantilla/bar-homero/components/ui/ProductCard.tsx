"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  description?: string | null;
  product_images?: { url: string; alt?: string | null }[];
  product_variants?: { id: string; stock: number }[];
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const image = product.product_images?.[0];
  const hasVariants = (product.product_variants?.length ?? 0) > 0;
  const inStock = hasVariants
    ? product.product_variants!.some((v) => v.stock > 0)
    : true;

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-100">
        <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt ?? product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-30">🍺</span>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
              <span className="bg-white/90 text-neutral-700 text-xs font-semibold px-3 py-1 rounded-full">
                Sin stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display text-neutral-900 font-medium text-base leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-neutral-900">
                ${product.price.toLocaleString("es-AR")}
              </span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  ${product.compare_at_price.toLocaleString("es-AR")}
                </span>
              )}
            </div>
            <span className="text-xs text-brand-primary font-medium group-hover:underline">
              {hasVariants ? "Elegir opción →" : "Ver →"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
