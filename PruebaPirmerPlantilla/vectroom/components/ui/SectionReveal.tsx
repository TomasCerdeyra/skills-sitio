"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 24 }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
