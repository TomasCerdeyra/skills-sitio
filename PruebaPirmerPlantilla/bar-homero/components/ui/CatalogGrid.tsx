"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  description?: string | null;
  product_images?: { url: string; alt?: string | null }[];
  product_variants?: { id: string; stock: number }[];
}

interface Props {
  products: Product[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function CatalogGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl mb-3">🍻</p>
        <p className="text-neutral-500">No hay productos en esta categoría</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
