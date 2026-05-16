"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/lib/analytics/umami";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";

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
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.product_variants.length > 0 ? product.product_variants[0] : null
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const sortedImages = [...product.product_images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
  const hasVariants = product.product_variants.length > 0;

  const effectivePrice = selectedVariant?.price !== null && selectedVariant?.price !== undefined
    ? selectedVariant.price
    : product.price + (selectedVariant?.price_modifier ?? 0);

  const stockAvailable = selectedVariant?.stock ?? null;
  const isAvailable = stockAvailable === null || stockAvailable > 0;

  useEffect(() => {
    trackEvent("view_product", { slug: product.slug, name: product.name });
  }, [product.slug, product.name]);

  function handleAddToCart() {
    if (!isAvailable) return;
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const waLink = buildWhatsAppLink({
    productName: selectedVariant
      ? `${product.name} - ${selectedVariant.name}`
      : product.name,
  });

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-body text-sm text-neutral-400">
          <Link href="/" className="hover:text-brand-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-brand-primary transition-colors">La carta</Link>
          <span>/</span>
          <span className="text-neutral-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Galería */}
          <div className="lg:col-span-7">
            {/* Imagen principal */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-accent">
              <AnimatePresence mode="wait">
                {sortedImages.length > 0 ? (
                  <motion.img
                    key={sortedImages[selectedImage]?.id}
                    src={sortedImages[selectedImage]?.url}
                    alt={sortedImages[selectedImage]?.alt ?? product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🌾</div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {sortedImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                {sortedImages.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden rounded-lg transition-all ${
                      selectedImage === i
                        ? "ring-2 ring-brand-primary ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt ?? `${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info del producto */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Nombre */}
                <h1 className="font-display font-bold text-3xl lg:text-4xl text-brand-dark leading-tight mb-4 italic">
                  {product.name}
                </h1>

                {/* Precio */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-body text-2xl font-semibold text-brand-primary">
                    ${effectivePrice.toLocaleString("es-AR")}
                  </span>
                  {product.compare_at_price && product.compare_at_price > effectivePrice && (
                    <span className="font-body text-base text-neutral-400 line-through">
                      ${product.compare_at_price.toLocaleString("es-AR")}
                    </span>
                  )}
                </div>

                {/* Descripción */}
                {product.description && (
                  <p className="font-body text-base text-neutral-600 leading-relaxed mb-8 whitespace-pre-line">
                    {product.description}
                  </p>
                )}

                {/* Variantes */}
                {hasVariants && (
                  <div className="mb-8">
                    <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-3">
                      Elegir
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
                            className={`px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all ${
                              isSelected
                                ? "bg-brand-primary text-neutral-50 shadow-md shadow-brand-primary/30"
                                : noStock
                                ? "bg-neutral-100 text-neutral-300 line-through cursor-not-allowed"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                          >
                            {v.name}
                            {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                              <span className="ml-1 text-xs text-amber-500">({v.stock})</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="space-y-3">
                  {/* Agregar al carrito */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!isAvailable}
                    className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-body font-semibold text-base hover:bg-brand-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/30 hover:scale-[1.01] active:scale-95"
                  >
                    {added ? "✓ Agregado al pedido" : !isAvailable ? "Sin stock" : "Agregar al pedido"}
                  </button>

                  {/* WhatsApp */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "product" })}
                    className="w-full flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary py-3.5 rounded-full font-body font-medium text-sm hover:bg-brand-primary hover:text-neutral-50 transition-colors"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>

                {/* Meta info */}
                <div className="mt-8 pt-6 border-t border-neutral-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-400">Envío</span>
                    <span className="font-body text-neutral-600">Calculado en el checkout</span>
                  </div>
                  {selectedVariant?.sku && (
                    <div className="flex justify-between text-sm">
                      <span className="font-body text-neutral-400">SKU</span>
                      <span className="font-body text-neutral-600">{selectedVariant.sku}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
