"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { AddToCartButton } from "./AddToCartButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  product_images: Array<{ id: string; url: string; alt: string | null; position: number | null }>;
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
    trackEvent("view_product", { slug: product.slug, name: product.name });
  }, [product.slug, product.name]);

  const effectivePrice =
    selectedVariant?.price ??
    product.price + (selectedVariant?.price_modifier ?? 0);
  const stockAvailable = selectedVariant?.stock ?? null;
  const isAvailable = stockAvailable === null || stockAvailable > 0;

  const waLink = buildWhatsAppLink({
    productName: selectedVariant
      ? `${product.name} (${selectedVariant.name})`
      : product.name,
    productUrl:
      typeof window !== "undefined"
        ? window.location.href
        : `https://lecrere.com.ar/producto/${product.slug}`,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
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
              <h1 className="font-display text-4xl lg:text-6xl font-light text-neutral-900 leading-[1.05] mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-body text-2xl font-medium text-neutral-900">
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
                {product.compare_at_price &&
                  product.compare_at_price > effectivePrice && (
                    <span className="font-body text-base text-neutral-400 line-through">
                      ${product.compare_at_price.toLocaleString("es-AR")}
                    </span>
                  )}
              </div>

              {product.description && (
                <p className="font-body text-neutral-600 leading-relaxed mb-8 whitespace-pre-line">
                  {product.description}
                </p>
              )}

              {hasVariants && (
                <VariantSelector
                  variants={product.product_variants}
                  selected={selectedVariant}
                  onSelect={setSelectedVariant}
                  productId={product.id}
                />
              )}

              <div className="space-y-3 mt-6">
                <AddToCartButton
                  product={product}
                  variant={selectedVariant}
                  disabled={!isAvailable}
                />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-neutral-300 text-neutral-700 py-4 font-body text-sm hover:border-brand-secondary hover:text-brand-secondary transition-colors duration-200"
                  onClick={() =>
                    trackEvent("whatsapp_click", { source: "product" })
                  }
                >
                  Consultar por WhatsApp
                </a>
              </div>

              {!isAvailable && (
                <p className="font-body text-sm text-neutral-500 mt-4 text-center">
                  Sin stock en este talle
                </p>
              )}

              <div className="mt-10 pt-8 border-t border-neutral-200 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-neutral-500">Envío</span>
                  <span className="font-body text-neutral-900">
                    Calculado en el checkout
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-body text-neutral-500">Pago</span>
                  <span className="font-body text-neutral-900">
                    Tarjeta · Débito · Transferencia
                  </span>
                </div>
                {selectedVariant?.sku && (
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-500">SKU</span>
                    <span className="font-body text-neutral-900">
                      {selectedVariant.sku}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
