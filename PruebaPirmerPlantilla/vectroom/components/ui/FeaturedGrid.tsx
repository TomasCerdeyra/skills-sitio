"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  product_images: { url: string; alt: string | null; position: number | null }[];
}

interface FeaturedGridProps {
  products: Product[];
}

export function FeaturedGrid({ products }: FeaturedGridProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200"
    >
      {products.slice(0, 6).map((product) => {
        const mainImage = product.product_images?.[0];
        const hasDiscount =
          product.compare_at_price && product.compare_at_price > product.price;

        return (
          <motion.div key={product.id} variants={itemVariants}>
            <Link
              href={`/producto/${product.slug}`}
              className="group block bg-white overflow-hidden"
            >
              {/* Imagen */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                {mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mainImage.url}
                    alt={mainImage.alt ?? product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                    <span className="font-body text-xs text-neutral-300 uppercase tracking-widest">
                      Sin imagen
                    </span>
                  </div>
                )}
                {hasDiscount && (
                  <span className="absolute top-4 left-4 bg-neutral-900 text-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-body font-medium rounded-full">
                    Sale
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-12 bg-neutral-900/90 transition-all duration-300 flex items-center justify-center overflow-hidden">
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-white">
                    Ver detalle →
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors leading-tight mb-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3">
                  <span className="font-body font-semibold text-neutral-900">
                    ${product.price.toLocaleString("es-AR")}
                  </span>
                  {hasDiscount && (
                    <span className="font-body text-sm text-neutral-400 line-through">
                      ${product.compare_at_price?.toLocaleString("es-AR")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
