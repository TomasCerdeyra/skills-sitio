"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  product_images: { id: string; url: string; alt: string | null; position: number | null }[];
}

interface HomeFeaturedProps {
  products: Product[];
}

// La decisión inesperada: los productos se muestran como una carta impresa
// con nombre a la izquierda, precio a la derecha, y una imagen circular pequeña
export function HomeFeatured({ products }: HomeFeaturedProps) {
  return (
    <section className="bg-neutral-50 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 lg:mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary/70 mb-3">
            Los favoritos
          </p>
          <h2 className="font-display font-bold text-4xl lg:text-6xl text-brand-dark leading-tight">
            Del horno de hoy.
          </h2>
        </motion.div>

        {/* Lista tipo carta de panadería */}
        <div className="space-y-0">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={`/producto/${product.slug}`}
                className="group flex items-center gap-5 py-5 border-b border-neutral-200 hover:bg-brand-accent/30 transition-colors -mx-4 px-4 rounded-lg"
              >
                {/* Imagen circular pequeña */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-200 group-hover:border-brand-secondary transition-colors">
                  {product.product_images?.[0] ? (
                    <img
                      src={product.product_images[0].url}
                      alt={product.product_images[0].alt ?? product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <span className="text-neutral-300 text-xl">🌾</span>
                    </div>
                  )}
                </div>

                {/* Nombre y descripción */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-lg lg:text-xl text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="font-body text-sm text-neutral-500 mt-0.5 leading-snug line-clamp-1">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Precio alineado a la derecha — decisión carta */}
                <div className="flex-shrink-0 text-right">
                  <span className="font-body font-semibold text-lg text-brand-dark">
                    ${product.price.toLocaleString("es-AR")}
                  </span>
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="block font-body text-xs text-neutral-400 line-through">
                      ${product.compare_at_price.toLocaleString("es-AR")}
                    </span>
                  )}
                </div>

                {/* Arrow */}
                <span className="flex-shrink-0 text-neutral-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all text-sm">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Link a catálogo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/catalogo"
            className="font-body text-sm text-brand-primary font-semibold hover:underline underline-offset-4 flex items-center gap-2"
          >
            Ver la carta completa
            <span className="w-8 h-px bg-brand-primary inline-block transition-all duration-300 group-hover:w-12" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
