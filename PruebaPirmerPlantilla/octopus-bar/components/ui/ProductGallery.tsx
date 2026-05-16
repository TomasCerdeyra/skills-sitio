"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: Array<{ id: string; url: string; alt: string | null }>;
  alt: string;
}

export function ProductGallery({ images, alt }: GalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center">
        <span className="text-neutral-400 text-5xl">☕</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
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
        <div className="grid grid-cols-5 gap-3">
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
              <img
                src={img.url}
                alt={img.alt ?? `${alt} - imagen ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
