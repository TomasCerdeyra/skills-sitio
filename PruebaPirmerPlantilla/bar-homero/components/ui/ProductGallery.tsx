"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
}

interface Props {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-square rounded-2xl bg-neutral-100 flex items-center justify-center">
        <span className="text-6xl opacity-20">🍺</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIdx].url}
              alt={images[activeIdx].alt ?? productName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={activeIdx === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                i === activeIdx ? "border-brand-primary" : "border-transparent hover:border-neutral-300"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? productName}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
