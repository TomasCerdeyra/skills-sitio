"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { WhatsAppProductButton } from "./WhatsAppProductButton";
import { trackEvent } from "@/lib/analytics/umami";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  product_images: Array<{
    id: string;
    url: string;
    alt: string | null;
    position: number | null;
  }>;
  product_variants: Array<{
    id: string;
    name: string;
    sku: string | null;
    price: number | null;
    price_modifier: number | null;
    stock: number | null;
  }>;
}

export function ProductDetailClient({ product }: { product: Product }) {
  const sortedImages = [...product.product_images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
  const hasVariants = product.product_variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.product_variants[0] : null
  );

  useEffect(() => {
    trackEvent("view_product", {
      slug: product.slug,
      name: product.name,
    });
  }, [product.slug, product.name]);

  const effectivePrice =
    selectedVariant?.price ??
    product.price + (selectedVariant?.price_modifier ?? 0);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-sm text-neutral-400 mb-10">
        <Link href="/" className="hover:text-brand-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-brand-primary transition-colors">
          La Carta
        </Link>
        <span>/</span>
        <span className="text-neutral-700">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Galería */}
        <div className="lg:col-span-7">
          <ProductGallery images={sortedImages} alt={product.name} />
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-3xl font-extrabold text-brand-primary">
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
                {product.compare_at_price &&
                  product.compare_at_price > effectivePrice && (
                    <span className="font-body text-lg text-neutral-400 line-through">
                      ${product.compare_at_price.toLocaleString("es-AR")}
                    </span>
                  )}
              </div>

              {product.description && (
                <div className="font-body text-neutral-700 leading-relaxed mb-8 whitespace-pre-line text-base">
                  {product.description}
                </div>
              )}

              {hasVariants && (
                <VariantSelector
                  variants={product.product_variants}
                  selected={selectedVariant}
                  onSelect={setSelectedVariant}
                  productId={product.id}
                />
              )}

              {/* CTA — Plan Esencial: WhatsApp */}
              <div className="mt-8">
                <WhatsAppProductButton
                  productName={product.name}
                  variantName={selectedVariant?.name}
                />
              </div>

              {/* Detalles adicionales */}
              <div className="mt-10 pt-8 border-t border-neutral-200 space-y-3">
                <DetailRow label="Retiro" value="En el local — Tucumán" />
                {selectedVariant?.sku && (
                  <DetailRow label="SKU" value={selectedVariant.sku} />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-body text-neutral-500">{label}</span>
      <span className="font-body text-neutral-900">{value}</span>
    </div>
  );
}
