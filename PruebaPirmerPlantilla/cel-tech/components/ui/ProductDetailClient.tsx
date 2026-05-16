"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductGallery } from "./ProductGallery";
import { AddToCartButton } from "./AddToCartButton";
import { trackEvent } from "@/lib/analytics/umami";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface Variant {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  price_modifier: number | null;
  stock: number | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  product_images: Array<{ id: string; url: string; alt: string | null; position: number | null }>;
  product_variants: Variant[];
}

export function ProductDetailClient({ product }: { product: Product }) {
  const sortedImages = [...product.product_images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
  const hasVariants = product.product_variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasVariants ? product.product_variants[0] : null
  );

  useEffect(() => {
    trackEvent("view_product", { slug: product.slug, name: product.name });
  }, [product.slug, product.name]);

  const effectivePrice = selectedVariant?.price !== null && selectedVariant?.price !== undefined
    ? selectedVariant.price
    : product.price + (selectedVariant?.price_modifier ?? 0);

  const stockAvailable = selectedVariant?.stock ?? null;
  const isAvailable = stockAvailable === null || stockAvailable > 0;

  const waLink = buildWhatsAppLink({
    productName: selectedVariant
      ? `${product.name} - ${selectedVariant.name}`
      : product.name,
  });

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-20">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
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
              {/* Verificado badge */}
              <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-display font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Verificado · Original
              </div>

              <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Precio */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-3xl font-extrabold text-neutral-900">
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
                {product.compare_at_price && product.compare_at_price > effectivePrice && (
                  <span className="font-body text-lg text-neutral-400 line-through">
                    ${product.compare_at_price.toLocaleString("es-AR")}
                  </span>
                )}
                {product.compare_at_price && product.compare_at_price > effectivePrice && (
                  <span className="text-sm font-body text-red-500 font-medium">
                    {Math.round((1 - effectivePrice / product.compare_at_price) * 100)}% off
                  </span>
                )}
              </div>

              {/* Descripción */}
              {product.description && (
                <p className="font-body text-neutral-600 leading-relaxed mb-8 text-[15px]">
                  {product.description}
                </p>
              )}

              {/* Selector de variantes */}
              {hasVariants && (
                <div className="mb-8">
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
                    Modelo / Almacenamiento
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.product_variants.map((v) => {
                      const noStock = v.stock !== null && v.stock <= 0;
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => {
                            if (!noStock) {
                              setSelectedVariant(v);
                              trackEvent("select_variant", {
                                product_id: product.id,
                                variant_name: v.name,
                              });
                            }
                          }}
                          disabled={noStock}
                          className={`px-4 py-2 rounded-xl font-body text-sm font-medium transition-all border ${
                            isSelected
                              ? "bg-neutral-900 text-white border-neutral-900 shadow-lg"
                              : noStock
                              ? "bg-neutral-50 text-neutral-300 border-neutral-200 line-through cursor-not-allowed"
                              : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-brand-primary hover:text-brand-primary"
                          }`}
                        >
                          {v.name}
                          {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                            <span className="ml-1.5 text-[10px] text-amber-600">
                              ({v.stock} disponibles)
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3">
                <div className="sticky bottom-0 lg:static bg-neutral-50 lg:bg-transparent -mx-5 px-5 py-4 lg:p-0 border-t border-neutral-200 lg:border-0">
                  <AddToCartButton
                    product={product}
                    variant={selectedVariant}
                    disabled={!isAvailable}
                  />
                  {!isAvailable && (
                    <p className="font-body text-xs text-neutral-400 mt-2 text-center">
                      Esta variante no tiene stock disponible
                    </p>
                  )}
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "product" })}
                  className="flex items-center justify-center gap-2 w-full border border-neutral-300 text-neutral-700 py-3.5 rounded-full font-body text-sm hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🛡️", label: "Garantía oficial" },
                    { icon: "📄", label: "Con factura" },
                    { icon: "✅", label: "100% original" },
                    { icon: "🚚", label: "Envío a todo el país" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm">
                      <span>{icon}</span>
                      <span className="font-body text-neutral-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
