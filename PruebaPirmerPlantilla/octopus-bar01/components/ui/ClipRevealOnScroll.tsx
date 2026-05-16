"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export function ClipRevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const clipPaths = {
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0 0 0 0)",
    },
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0)",
    },
  };

  return (
    <motion.div
      initial={{
        clipPath: prefersReducedMotion ? clipPaths[direction].visible : clipPaths[direction].hidden,
        opacity: prefersReducedMotion ? 1 : 0.3,
      }}
      whileInView={{ clipPath: clipPaths[direction].visible, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
