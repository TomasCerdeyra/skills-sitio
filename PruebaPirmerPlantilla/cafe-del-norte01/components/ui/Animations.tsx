"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * SlideFromSide — familia slide-lateral del ADN Estructural.
 * Pares entran desde izquierda, impares desde derecha.
 */
export function SlideFromSide({
  children,
  index = 0,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  delay?: number;
  className?: string;
}) {
  const fromLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeUpOnScroll — versión secundaria para elementos menores
 */
export function FadeUpOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
