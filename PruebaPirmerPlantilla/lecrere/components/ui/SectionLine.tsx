"use client";

import { motion } from "framer-motion";

export function SectionLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ originX: 0.5 }}
      className={`h-px bg-brand-secondary ${className}`}
    />
  );
}
