"use client";

import { useState, useEffect } from "react";
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
      ? `${product.name} - ${selectedVariant.name}`
      : product.name,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
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
              <h1 className="font-display text-4xl lg:text-5xl text-neutral-900 leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-body text-3xl font-semibold text-neutral-900">
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
                <div className="font-body text-neutral-600 leading-relaxed mb-8 whitespace-pre-line text-lg">
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

              <div className="mt-4 space-y-3">
                <AddToCartButton
                  product={product}
                  variant={selectedVariant}
                  disabled={!isAvailable}
                />

                {/* También disponible por WhatsApp */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", { source: "product" })
                  }
                  className="flex items-center justify-center gap-2 w-full border-2 border-neutral-200 text-neutral-700 py-4 rounded-full font-body font-medium hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>

                {!isAvailable && (
                  <p className="font-body text-sm text-neutral-500 text-center">
                    Sin stock disponible en este momento.
                  </p>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-200 space-y-3">
                <DetailRow label="Envío" value="Calculado en el checkout" />
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
