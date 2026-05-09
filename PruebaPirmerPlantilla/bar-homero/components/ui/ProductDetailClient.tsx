"use client";

import { useState } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";

interface Variant {
  id: string;
  name: string;
  price?: number | null;
  price_modifier?: number | null;
  stock: number;
}

interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  position?: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  description?: string | null;
  category_id?: string | null;
  product_images: ProductImage[];
  product_variants: Variant[];
}

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const hasVariants = product.product_variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasVariants ? (product.product_variants.find((v) => v.stock > 0) ?? null) : null
  );

  const effectivePrice = selectedVariant
    ? (selectedVariant.price ?? product.price + (selectedVariant.price_modifier ?? 0))
    : product.price;

  const canAdd = hasVariants ? selectedVariant !== null && selectedVariant.stock > 0 : true;

  const sortedImages = [...product.product_images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );

  const cartItem = {
    id: product.id,
    variant_id: selectedVariant?.id,
    name: product.name,
    variant_name: selectedVariant?.name,
    price: effectivePrice,
    quantity: 1,
    image: sortedImages[0]?.url,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 lg:py-16">
      <div className="mb-6">
        <Link
          href="/catalogo"
          className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors flex items-center gap-1"
        >
          ← Volver a la carta
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <ProductGallery images={sortedImages} productName={product.name} />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl text-neutral-900 font-semibold leading-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-bold text-neutral-900">
                ${effectivePrice.toLocaleString("es-AR")}
              </span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-lg text-neutral-400 line-through">
                  ${product.compare_at_price.toLocaleString("es-AR")}
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <p className="text-neutral-600 leading-relaxed text-base">
              {product.description}
            </p>
          )}

          {hasVariants && (
            <VariantSelector
              variants={product.product_variants}
              basePrice={product.price}
              selected={selectedVariant}
              onSelect={setSelectedVariant}
            />
          )}

          <div className="flex flex-col gap-3 pt-2">
            <AddToCartButton item={cartItem} disabled={!canAdd} />
            {hasVariants && !selectedVariant && (
              <p className="text-sm text-neutral-400 text-center">Seleccioná una opción para continuar</p>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Pedido online seguro
            </span>
            <span className="flex items-center gap-2">
              <span className="text-brand-secondary">◆</span> Bar Homero, Buenos Aires
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
