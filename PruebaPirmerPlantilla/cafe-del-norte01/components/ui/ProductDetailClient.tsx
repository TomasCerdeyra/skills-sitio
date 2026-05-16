"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
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

function ProductGallery({ images, alt }: { images: Array<{ id: string; url: string; alt: string | null }>; alt: string }) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-neutral-100 rounded-2xl flex items-center justify-center">
        <span className="font-body text-neutral-400 text-4xl">☕</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[selected].id}
            src={images[selected].url}
            alt={images[selected].alt ?? alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                selected === i
                  ? "ring-2 ring-brand-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img src={img.url} alt={img.alt ?? `${alt} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AddToCartButton({ product, variant, disabled }: {
  product: Product;
  variant: Product["product_variants"][0] | null;
  disabled?: boolean;
}) {
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");
  const { addItem } = useCart();

  function handleAdd() {
    if (disabled) return;
    setState("adding");

    const effectivePrice = variant?.price ?? product.price + (variant?.price_modifier ?? 0);
    const item = {
      id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_name: variant?.name,
      price: effectivePrice,
      quantity: 1,
      image: product.product_images[0]?.url,
    };

    addItem(item);
    trackEvent("add_to_cart", { product_id: product.id, name: product.name, price: effectivePrice, quantity: 1 });

    setTimeout(() => {
      setState("added");
      setTimeout(() => setState("idle"), 2000);
    }, 400);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || state === "adding"}
      className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-body font-medium text-sm tracking-wide transition-all duration-200 hover:bg-brand-secondary hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-brand-primary/30"
    >
      {state === "added" ? "✓ Agregado al pedido" : state === "adding" ? "Agregando..." : "Agregar al pedido"}
    </button>
  );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const sortedImages = [...product.product_images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const hasVariants = product.product_variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? product.product_variants[0] : null);

  useEffect(() => {
    trackEvent("view_product", { slug: product.slug, name: product.name });
  }, [product.slug, product.name]);

  const effectivePrice = selectedVariant?.price ?? product.price + (selectedVariant?.price_modifier ?? 0);
  const stockAvailable = selectedVariant?.stock ?? null;
  const isAvailable = stockAvailable === null || stockAvailable > 0;

  const waLink = buildWhatsAppLink({
    productName: selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name,
    productUrl: typeof window !== "undefined" ? window.location.href : "",
  });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
      {/* Breadcrumb */}
      <nav className="mb-8 font-body text-sm text-neutral-400">
        <Link href="/" className="hover:text-brand-primary transition-colors">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/catalogo" className="hover:text-brand-primary transition-colors">La carta</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Galería — 7 columnas */}
        <div className="lg:col-span-7">
          <ProductGallery images={sortedImages} alt={product.name} />
        </div>

        {/* Info — 5 columnas sticky */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-body text-3xl font-semibold text-neutral-900">
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
                {product.compare_at_price && product.compare_at_price > effectivePrice && (
                  <span className="font-body text-lg text-neutral-400 line-through">
                    ${product.compare_at_price.toLocaleString("es-AR")}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="font-body text-neutral-600 leading-relaxed mb-8 whitespace-pre-line">
                  {product.description}
                </p>
              )}

              {/* Variantes */}
              {hasVariants && (
                <div className="mb-8">
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-3">
                    Variante
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
                              trackEvent("select_variant", { product_id: product.id, variant_name: v.name });
                            }
                          }}
                          disabled={noStock}
                          className={`px-4 py-2.5 rounded-full font-body text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-neutral-900 text-neutral-50"
                              : noStock
                              ? "bg-neutral-100 text-neutral-300 line-through cursor-not-allowed"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {v.name}
                          {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                            <span className="ml-1 text-xs text-amber-600">({v.stock})</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA — Agregar al carrito (plan Emprendimiento) */}
              <div className="space-y-3">
                <AddToCartButton product={product} variant={selectedVariant} disabled={!isAvailable} />

                {/* CTA secundario: WhatsApp */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "product" })}
                  className="flex items-center justify-center gap-3 w-full border border-neutral-200 text-neutral-700 py-3.5 rounded-full font-body text-sm hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>

              {!isAvailable && (
                <p className="font-body text-sm text-neutral-400 mt-3 text-center">Sin stock disponible</p>
              )}

              {/* Detalles */}
              <div className="mt-8 pt-6 border-t border-neutral-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-neutral-400">Envío</span>
                  <span className="font-body text-neutral-700">Calculado en el checkout</span>
                </div>
                {selectedVariant?.sku && (
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-400">SKU</span>
                    <span className="font-body text-neutral-700 font-mono">{selectedVariant.sku}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="mt-16">
        <Link href="/catalogo" className="font-body text-sm text-brand-primary hover:underline">
          ← Volver a la carta
        </Link>
      </div>
    </div>
  );
}
