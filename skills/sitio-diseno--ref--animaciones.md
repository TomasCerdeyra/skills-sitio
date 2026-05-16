# Reference: Animaciones e interactividad

**Las animaciones NO son opcionales.** Una plantilla demo estática no se vende. Cada sección debe tener entrada animada, cada elemento interactivo debe tener feedback visual.

## Animaciones OBLIGATORIAS por componente

Esta es la lista mínima que TODA plantilla debe tener:

### Header
- [ ] Shrink al scroll (de h-20 a h-16, transición 300ms).
- [ ] Backdrop-blur cuando hay scroll.
- [ ] Underline animado en links de navegación desktop (hover).
- [ ] Mobile menu con drawer + overlay (AnimatePresence).

### Hero (cualquier variante)
- [ ] Eyebrow con fade + small slide-up (300ms, delay 0).
- [ ] Heading con fade + slide-up (700ms, delay 100ms).
- [ ] Subhead con fade + slide-up (700ms, delay 200ms).
- [ ] CTAs con fade + slide-up (700ms, delay 300ms).
- [ ] Imagen del Hero con fade + scale-in sutil (1200ms, ease).

### Catálogo
- [ ] Grid de productos con stagger de 60-80ms entre cards.
- [ ] Cada card con fade + slide-up al aparecer.
- [ ] Hover en card: scale de imagen interna a 1.05-1.10.
- [ ] Click en filtros: feedback visual (color cambio + transition).

### Detalle de producto
- [ ] Galería con cross-fade entre imágenes (300ms).
- [ ] Selector de variantes con feedback al seleccionar.
- [ ] CTA con scale-95 al click (active).
- [ ] CTA con scale-1.02 al hover (subtle).
- [ ] "Agregar al carrito" con micro-animación de feedback ("Agregando..." → "✓ Agregado").

### Secciones del Home
- [ ] CADA sección bajo el Hero con reveal on scroll (FadeUpOnScroll).
- [ ] Heading de sección y contenido con stagger entre ellos (delay 100-150ms).

### Footer
- [ ] Reveal on scroll cuando entra al viewport.

### Botones / Links generales
- [ ] Hover: cambio de color + scale-1.02 sutil.
- [ ] Active: scale-95.
- [ ] Transition-duration 200ms en hovers.
- [ ] Botones con shadow del color de marca y `hover:shadow-lg`.

### Inputs / Forms
- [ ] Focus: border de `brand.primary` + ring sutil (`ring-2 ring-brand-primary/20`).
- [ ] Transition al focus de 200ms.

### Modales / Drawers
- [ ] AnimatePresence para mount/unmount.
- [ ] Spring physics para drawers (`type: "spring", damping: 30, stiffness: 300`).

---

## Cuándo usar Framer Motion vs CSS

| Caso | Framer Motion | CSS puro |
|---|---|---|
| Reveal on scroll | ✅ | ❌ |
| Stagger de listas | ✅ | ❌ |
| Drawer / modal | ✅ | ❌ |
| Texto letra por letra | ✅ | ❌ |
| Cross-fade de imagen | ✅ | ❌ |
| Hover en botones | ❌ | ✅ |
| Hover en cards | ❌ | ✅ |
| Shrink de header | ❌ | ✅ (con state) |
| Underline animado | ❌ | ✅ |

**`framer-motion` es OBLIGATORIO** para los reveals, stagger y drawers. Instalar siempre:

```bash
npm install framer-motion
```

---

## Familias de animación — referencia

Hay varias familias de animación disponibles. **Mezclar 2-3 tipos distintos** en la misma página genera más impacto que usar el mismo efecto para todo. Elegí las que mejor encajen con el mood del proyecto.

| Familia | Componente de reveal | Efecto | Cuándo funciona bien |
|---------|---------------------|--------|---------------------|
| Fade up | `FadeUpOnScroll` | opacity + translateY | Suave, editorial, seguro |
| Slide lateral | `SlideFromSide` | Entra desde izquierda/derecha | Dinamismo, ritmo visual |
| Clip reveal | `ClipRevealOnScroll` | Cortina con clip-path | Lujo, editorial premium |
| Scale pop | `ScalePopOnScroll` | Scale con bounce spring | Pop, juvenil, vibrante |

**Tip:** no uses fade-up para TODO. Mezclar un fade-up con un clip-reveal y un stagger creativo genera mucha más diversidad visual.

---

## ⚠️ TypeScript — `ease` dentro de Variants (framer-motion v11+)

Cuando `ease` se usa **directamente** como prop de un elemento `<motion.div>` no hay problema:

```tsx
// ✅ Funciona sin cast — es un prop directo del elemento
<motion.div transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} />
```

Pero cuando `ease` está **dentro de un objeto `Variants`**, TypeScript es estricto y falla:

```tsx
// ❌ Error TypeScript: "number[] is not assignable to type 'Easing'"
const itemVariants = {
  visible: { opacity: 1, transition: { ease: [0.25, 0.1, 0.25, 1] } },
};

// ✅ Correcto — castear como tupla bezier
const itemVariants = {
  visible: { opacity: 1, transition: { ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};
```

**Regla:** en cualquier objeto `Variants`, agregar `as [number, number, number, number]` al array de `ease`.

---

## Patrones reusables

### 1. FadeUpOnScroll — familia `fade-up` (el clásico)

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
```

Uso (ejemplo del Home):

```tsx
<section className="py-20">
  <FadeUpOnScroll>
    <h2 className="font-display text-5xl mb-6">Por qué elegirnos</h2>
  </FadeUpOnScroll>
  <FadeUpOnScroll delay={0.1}>
    <p className="text-lg text-neutral-600 mb-12">Más de una década...</p>
  </FadeUpOnScroll>
  <div className="grid lg:grid-cols-3 gap-6">
    {features.map((f, i) => (
      <FadeUpOnScroll key={f.id} delay={0.2 + i * 0.1}>
        <FeatureCard {...f} />
      </FadeUpOnScroll>
    ))}
  </div>
</section>
```

---

### 1b. SlideFromSide — familia `slide-lateral`

Elementos entran alternando desde izquierda y derecha. Crea un efecto de movimiento dinámico, ideal para tonos Bold y Vibrante.

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
```

Uso:

```tsx
<section className="py-20">
  <SlideFromSide index={0}>
    <h2 className="font-display text-5xl mb-6">Nuestros productos</h2>
  </SlideFromSide>
  <div className="grid lg:grid-cols-3 gap-6">
    {features.map((f, i) => (
      <SlideFromSide key={f.id} index={i} delay={i * 0.08}>
        <FeatureCard {...f} />
      </SlideFromSide>
    ))}
  </div>
</section>
```

---

### 1c. ClipRevealOnScroll — familia `clip-reveal`

Efecto de cortina/revelación usando `clipPath`. Las secciones se descubren como si se levantara un telón. Elegante para tonos Lujo y Editorial.

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
      initial={{ clipPath: clipPaths[direction].hidden, opacity: 0.3 }}
      whileInView={{ clipPath: clipPaths[direction].visible, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Uso:

```tsx
<section className="py-20">
  <ClipRevealOnScroll>
    <h2 className="font-display text-5xl mb-6">Nuestra historia</h2>
  </ClipRevealOnScroll>
  <ClipRevealOnScroll delay={0.15} direction="left">
    <img src="..." alt="..." className="w-full aspect-[16/9] object-cover" />
  </ClipRevealOnScroll>
</section>
```

---

### 1d. ScalePopOnScroll — familia `scale-pop`

Elementos aparecen con un pop elástico (spring). Ideal para tonos Vibrante/Pop y marcas juveniles. Usa physics de spring en vez de easing.

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ScalePopOnScroll({
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
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Uso:

```tsx
<div className="grid lg:grid-cols-3 gap-6">
  {products.map((p, i) => (
    <ScalePopOnScroll key={p.id} delay={i * 0.06}>
      <ProductCard product={p} />
    </ScalePopOnScroll>
  ))}
</div>
```

### 2. HeroAnimated — entrada del Hero con stagger

```tsx
"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function HeroContent({ eyebrow, heading, subhead, primaryCta, secondaryCta }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl"
    >
      <motion.p variants={itemVariants} className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-6">
        {eyebrow}
      </motion.p>
      <motion.h1 variants={itemVariants} className="font-display text-5xl lg:text-7xl text-neutral-900 leading-[1.05] mb-8">
        {heading}
      </motion.h1>
      <motion.p variants={itemVariants} className="font-body text-lg text-neutral-600 mb-10">
        {subhead}
      </motion.p>
      <motion.div variants={itemVariants} className="flex gap-4">
        {primaryCta}
        {secondaryCta}
      </motion.div>
    </motion.div>
  );
}
```

### 3. StaggerGrid — para grids de productos / features

```tsx
"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export function StaggerGrid({ items, renderItem }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants}>
          {renderItem(item)}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### 4. AnimatedHeading — letras con stagger (para Hero principal)

```tsx
"use client";

import { motion } from "framer-motion";

export function AnimatedHeading({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

> Usar **solo en heading principal del Hero**. No abusar.

### 5. CrossFadeImage — para galería de producto

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";

export function CrossFadeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={src}
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full object-cover"
      />
    </AnimatePresence>
  );
}
```

### 6. Drawer / Modal con AnimatePresence

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Drawer({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/60 z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-neutral-50 z-50 p-6"
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
```

### 7. Botón con efecto magnético (CSS)

```tsx
<button className="relative overflow-hidden bg-brand-primary text-neutral-50 px-8 py-4 rounded-full font-medium transition-all duration-200 active:scale-95 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-primary/40">
  <span className="relative z-10">Comprar ahora</span>
</button>
```

### 8. Header con shrink al scroll

```tsx
"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-50/95 backdrop-blur-md shadow-sm h-16"
          : "bg-transparent h-20"
      }`}
    >
      {/* contenido */}
    </header>
  );
}
```

### 9. Underline animado (CSS)

```tsx
<a href="/catalogo" className="relative group">
  Catálogo
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
</a>
```

---

## Curvas de easing

No usar `ease-in-out` por default — es genérico:

| Carácter | Curva | Para qué |
|---|---|---|
| Suave editorial | `[0.25, 0.1, 0.25, 1]` | Reveals, fade-in (la más usada) |
| Snappy moderno | `[0.16, 1, 0.3, 1]` | Botones, navegación |
| Bouncy | `type: "spring", damping: 15, stiffness: 200` | Modal, drawer |
| Dramático | `[0.87, 0, 0.13, 1]` | Hero text reveals especiales |

---

## Performance

- **Animar SOLO `transform` y `opacity`** — son GPU-accelerated.
- **Evitar `width`, `height`, `top`, `left`** — fuerzan reflow.
- **`transition-duration` máximo 700ms.**
- **`prefers-reduced-motion` respetado:**

```tsx
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

const transition = prefersReducedMotion
  ? { duration: 0 }
  : { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] };
```

---

## Validación final — checklist obligatorio

Antes de cerrar la plantilla, **verificar visualmente** en `npm run dev`:

- [ ] Al cargar la home: el Hero entra animado con stagger (eyebrow → heading → subhead → CTA).
- [ ] Al hacer scroll: el header se achica.
- [ ] Al pasar por la sección de destacados: las cards aparecen con stagger.
- [ ] Al pasar por sección "Nosotros": entra con FadeUp.
- [ ] Al pasar por sección CTA final: entra con FadeUp.
- [ ] Al hover sobre una card: la imagen interna hace zoom sutil.
- [ ] Al hover sobre un link de nav: aparece el underline.
- [ ] Al hover sobre un botón: cambia color + scale.
- [ ] Al click sobre un botón: scale-95 momentáneo.
- [ ] Al abrir mobile menu: drawer entra desde la derecha con spring.
- [ ] En detalle de producto: cambiar imagen hace cross-fade.
- [ ] En detalle de producto: agregar al carrito muestra "Agregando..." → "✓ Agregado".

**Si CUALQUIERA de estas falla, no está completo.**
