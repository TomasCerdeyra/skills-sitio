"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { analytics } from "@/lib/analytics/umami";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

export type ProductData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  categorySlug: string;
  description: string;
  images: string[];
  variants: Array<{ id: string; name: string; stock: number }>;
};

export default function ProductDetail({ product }: { product: ProductData }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      variantName:
        selectedVariant?.name !== "Talle único" ? selectedVariant?.name : undefined,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity: 1,
    });
    analytics.addToCart(product.name, product.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-10">
          <Link href="/" className="hover:text-[#D4FF00] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-[#D4FF00] transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#141414]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-[#D4FF00]"
                        : "border-[#2E2E2E]"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <Link
              href={`/catalogo?cat=${product.categorySlug}`}
              className="inline-block px-3 py-1 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-xs font-bold tracking-widest uppercase rounded-full mb-4"
            >
              {product.category}
            </Link>

            <h1
              className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.name}
            </h1>

            <p className="text-3xl font-black text-[#D4FF00] mb-6">
              ${product.price.toLocaleString("es-AR")}
            </p>

            <p className="text-[#A0A0A0] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <p className="text-sm font-medium text-[#A0A0A0] mb-3">Talle</p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock === 0}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
                        selectedVariant?.id === v.id
                          ? "bg-[#D4FF00] text-[#0A0A0A] border-[#D4FF00]"
                          : v.stock === 0
                          ? "bg-transparent text-[#2E2E2E] border-[#2E2E2E] cursor-not-allowed line-through"
                          : "bg-transparent text-white border-[#2E2E2E] hover:border-[#D4FF00]"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
              <p className="text-[#FF3131] text-sm font-medium mb-4">
                ⚡ Solo quedan {selectedVariant.stock} unidades
              </p>
            )}

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock === 0}
                className={`flex-1 py-4 font-black text-lg rounded-full transition-all ${
                  added
                    ? "bg-[#1A1A1A] text-[#D4FF00] border-2 border-[#D4FF00]"
                    : selectedVariant?.stock === 0
                    ? "bg-[#141414] text-[#2E2E2E] cursor-not-allowed"
                    : "bg-[#D4FF00] text-[#0A0A0A] hover:bg-white"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {selectedVariant?.stock === 0
                  ? "SIN STOCK"
                  : added
                  ? "✓ AGREGADO"
                  : "AGREGAR AL CARRITO"}
              </button>

              <a
                href={getProductWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 border-2 border-[#2E2E2E] text-[#A0A0A0] rounded-full hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors"
                aria-label="Consultar por WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* Info chips */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#1A1A1A]">
              {[
                { icon: "🚀", label: "Despacho 24hs" },
                { icon: "🔒", label: "Pago seguro" },
                { icon: "↩️", label: "Cambios" },
              ].map((chip) => (
                <div key={chip.label} className="text-center py-3 px-2 rounded-xl bg-[#141414]">
                  <span className="text-xl block mb-1">{chip.icon}</span>
                  <span className="text-[#A0A0A0] text-xs">{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
