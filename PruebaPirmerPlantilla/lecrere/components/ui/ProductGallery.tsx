"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryProps {
  images: Array<{ id: string; url: string; alt: string | null }>;
  alt: string;
}

export function ProductGallery({ images, alt }: GalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
        <span className="font-body text-sm text-neutral-400">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[selected].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* Cliente: reemplazar con foto propia */}
            <Image
              src={images[selected].url}
              alt={images[selected].alt ?? alt}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={selected === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative aspect-square overflow-hidden transition-all ${
                selected === i
                  ? "ring-1 ring-brand-primary ring-offset-1"
                  : "opacity-50 hover:opacity-100"
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${alt} — imagen ${i + 1}`}
                fill
                quality={70}
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
