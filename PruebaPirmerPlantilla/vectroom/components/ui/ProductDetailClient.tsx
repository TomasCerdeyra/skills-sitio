"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";
import { useCart } from "@/context/CartContext";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number | null;
}

interface ProductVariant {
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
  product_images: ProductImage[];
  product_variants: ProductVariant[];
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const sortedImages = [...product.product_images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.product_variants.length > 0 ? product.product_variants[0] : null
  );

  useEffect(() => {
    trackEvent("view_product", { slug: product.slug, name: product.name });
  }, [product.slug, product.name]);

  const effectivePrice =
    selectedVariant?.price ?? product.price + (selectedVariant?.price_modifier ?? 0);

  const stockAvailable = selectedVariant?.stock ?? null;
  const isAvailable = stockAvailable === null || stockAvailable > 0;

  function handleAddToCart() {
    if (!isAvailable) return;
    setAdding(true);

    addItem({
      id: product.id,
      variant_id: selectedVariant?.id,
      name: product.name,
      variant_name: selectedVariant?.name,
      price: effectivePrice,
      quantity: 1,
      image: sortedImages[0]?.url,
    });

    trackEvent("add_to_cart", {
      product_id: product.id,
      name: product.name,
      price: effectivePrice,
      quantity: 1,
    });

    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  }

  const waLink = buildWhatsAppLink({
    productName: selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name,
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-10 pt-4">
        <Link href="/catalogo" className="font-body text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          Catálogo
        </Link>
        <span className="text-neutral-300">/</span>
        <span className="font-body text-xs text-neutral-900">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Galería */}
        <div className="lg:col-span-7">
          {/* Imagen principal */}
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm mb-3">
            <AnimatePresence mode="wait">
              {sortedImages.length > 0 ? (
                <motion.img
                  key={sortedImages[selectedImage]?.id}
                  src={sortedImages[selectedImage]?.url}
                  alt={sortedImages[selectedImage]?.alt ?? product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-body text-xs text-neutral-300 uppercase tracking-widest">Sin imagen</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          {sortedImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {sortedImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-sm transition-all ${
                    selectedImage === i
                      ? "ring-2 ring-neutral-900 ring-offset-2"
                      : "opacity-50 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt ?? `${product.name} - imagen ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info sticky */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-[-0.03em] text-neutral-900 leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-body text-2xl font-semibold text-neutral-900">
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
                {product.compare_at_price && product.compare_at_price > effectivePrice && (
                  <span className="font-body text-base text-neutral-400 line-through">
                    ${product.compare_at_price.toLocaleString("es-AR")}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="font-body text-neutral-600 leading-relaxed mb-8 text-sm">
                  {product.description}
                </p>
              )}

              {/* Variantes */}
              {product.product_variants.length > 0 && (
                <div className="mb-8">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                    Talle
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
                          className={`min-w-[44px] h-[44px] px-3 font-body text-sm font-medium transition-all rounded-sm ${
                            isSelected
                              ? "bg-neutral-900 text-white"
                              : noStock
                              ? "bg-neutral-100 text-neutral-300 line-through cursor-not-allowed"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {v.name}
                          {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                            <span className="block text-[9px] text-amber-500 font-normal leading-none mt-0.5">
                              {v.stock} disp.
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
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable || adding}
                  className="w-full bg-neutral-900 text-white py-4 rounded-full font-body font-semibold text-sm hover:bg-neutral-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {added ? "✓ Agregado al carrito" : adding ? "Agregando..." : "Agregar al carrito"}
                </button>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "product" })}
                  className="flex items-center justify-center gap-2 w-full border border-neutral-200 text-neutral-700 py-4 rounded-full font-body font-medium text-sm hover:border-neutral-400 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>

                {!isAvailable && (
                  <p className="font-body text-xs text-neutral-400 text-center">
                    Sin stock en este talle
                  </p>
                )}
              </div>

              {/* Detalles */}
              <div className="mt-8 pt-8 border-t border-neutral-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-body text-neutral-400">Envío</span>
                  <span className="font-body text-neutral-700">Calculado al finalizar compra</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-body text-neutral-400">Producción</span>
                  <span className="font-body text-neutral-700">Argentina</span>
                </div>
                {selectedVariant?.sku && (
                  <div className="flex justify-between text-xs">
                    <span className="font-body text-neutral-400">SKU</span>
                    <span className="font-body text-neutral-700 font-mono">{selectedVariant.sku}</span>
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
