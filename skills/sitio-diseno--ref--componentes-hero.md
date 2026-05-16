# Reference: Componentes Hero — Referencia Técnica

El Hero es lo primero que ve el visitante. **Tiene que comunicar quién es el negocio y qué se puede hacer en 3 segundos.**

**Este archivo es REFERENCIA TÉCNICA** — muestra cómo implementar heroes en Next.js con Framer Motion. NO son templates para copiar literalmente. Usá los patrones técnicos (client component, stagger, etc.) pero diseñá el hero como quieras. Consultá `sitio-diseno--ref--inspiracion-diseno.md` para ideas.

---

## ⚠️ REGLA CRÍTICA: El Hero SIEMPRE va en un componente cliente separado

El hero usa `motion` de Framer Motion → requiere `"use client"`. Las páginas del App Router de Next.js son Server Components por default. Si el hero se escribe inline en `page.tsx` **las animaciones no van a funcionar** — el JSX se rendea como HTML estático sin Framer Motion.

### ❌ MAL — hero inline en server component (animaciones no funcionan)

```tsx
// app/(public)/page.tsx  ← es Server Component
export default async function HomePage() {
  return (
    <section className="bg-neutral-900 min-h-screen">
      <h1>Café del Norte</h1>  {/* HTML estático, sin motion */}
    </section>
  );
}
```

### ✅ BIEN — hero extraído a client component

```tsx
// components/ui/HeroSection.tsx
"use client";
import { motion } from "framer-motion";

export function HeroSection({ waLink }: { waLink: string }) {
  return (
    <section className="bg-neutral-900 min-h-screen">
      <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
        Café del Norte
      </motion.h1>
    </section>
  );
}

// app/(public)/page.tsx  ← sigue siendo Server Component, solo importa el componente
import { HeroSection } from "@/components/ui/HeroSection";

export default async function HomePage() {
  const waLink = buildWhatsAppLink({ message: "Hola" });
  return (
    <>
      <HeroSection waLink={waLink} />
      {/* resto de secciones */}
    </>
  );
}
```

**Siempre:** crear `components/ui/HeroSection.tsx` con `"use client"` y el stagger de Framer Motion. Importarlo desde la page.

---

## Ejemplos de hero por tipo (referencia, no obligatorio)

Abajo hay varios estilos de hero implementados. **Son ejemplos para inspirarte**, no opciones de un menú. Podés mezclar conceptos, modificarlos, o crear algo completamente nuevo. Lo importante es que el hero comunique la propuesta del negocio en 3 segundos.

---

## Variantes según objetivo del sitio

### Hero "Generar confianza" — Editorial Split

Para negocios que necesitan transmitir identidad antes de pedir acción. Imagen grande + texto claro al lado.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroEditorialSplit({
  eyebrow,
  heading,
  description,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="relative bg-neutral-50">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        <div className="flex items-center px-6 lg:px-16 py-16 lg:py-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-6"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.05] tracking-tight mb-8"
            >
              {heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-lg text-neutral-600 leading-relaxed mb-10"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-neutral-900 text-neutral-50 px-8 py-4 font-body font-medium hover:bg-brand-primary transition-colors duration-300 group"
              >
                {ctaText}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 h-[50vh] lg:h-auto overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

### Hero "Acción inmediata" — Bold Centered

Para tiendas que quieren llevar al usuario al checkout/WhatsApp ya. Heading enorme, CTA prominente.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroBoldCentered({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
}: {
  heading: string;
  subheading: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background decorativo — patrón opcional */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-brand-primary/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl sm:text-7xl lg:text-9xl font-black text-neutral-50 leading-[0.95] tracking-tight mb-8"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-xl text-neutral-50/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {subheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 bg-brand-primary text-neutral-50 px-10 py-5 rounded-full font-medium text-lg hover:scale-105 active:scale-95 transition-transform duration-200 shadow-2xl shadow-brand-primary/40"
          >
            {primaryCta.text}
            <span>→</span>
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="text-neutral-50 hover:text-brand-primary px-6 py-3 transition-colors underline-offset-4 hover:underline"
            >
              {secondaryCta.text}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

### Hero "Explorar" — Image Grid

Para negocios con catálogo visual fuerte (skincare, ropa, comida). Mosaico de imágenes + texto al costado/abajo.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroImageGrid({
  heading,
  description,
  ctaText,
  ctaHref,
  images, // array de 3 imágenes
}: {
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  images: { src: string; alt: string }[];
}) {
  return (
    <section className="bg-neutral-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-5 lg:pb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl lg:text-7xl text-neutral-900 leading-[1.05] mb-6"
            >
              {heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-body text-lg text-neutral-600 mb-8"
            >
              {description}
            </motion.p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-brand-primary font-body font-medium hover:gap-4 transition-all"
            >
              {ctaText} <span>→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[3/4] overflow-hidden rounded-lg row-span-2"
            >
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Hero "Inmersivo" — Fullscreen con overlay

Para rubros donde el ambiente ES el producto. Imagen de fondo con overlay oscuro, texto centrado, sensación cinematográfica.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroImmersive({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}: {
  heading: string;
  subheading: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-neutral-900/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-body text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {subheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-10 py-4 font-medium hover:bg-brand-primary hover:text-white transition-colors duration-300"
          >
            {primaryCta.text}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-10 py-4 font-medium hover:bg-white/10 transition-colors"
            >
              {secondaryCta.text}
            </Link>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
```

---

### Hero "Minimal tipográfico" — Solo texto, sin imagen

Para marcas premium donde la tipografía ES la identidad. Fondo limpio, heading serif enorme, máximo whitespace. Impacto por sustracción.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroMinimalText({
  eyebrow,
  heading,
  subheading,
  ctaText,
  ctaHref,
}: {
  eyebrow?: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <section className="min-h-[85vh] flex items-center bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6 py-24 lg:py-32">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-8"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl sm:text-8xl lg:text-[10rem] font-bold text-neutral-900 leading-[0.9] tracking-tighter mb-12"
        >
          {heading}
        </motion.h1>
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-xl text-neutral-600 leading-relaxed mb-10"
          >
            {subheading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-3 font-body text-neutral-900 font-medium group"
            >
              {ctaText}
              <span className="w-12 h-px bg-neutral-900 group-hover:w-20 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

### Hero "Video ambiental" — Video/Parallax de fondo

Similar al Immersive pero con video loop. Para experiencias gastronómicas, hoteles, bares premium. El movimiento del video genera sensación de vida.

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroVideoAmbient({
  heading,
  subheading,
  primaryCta,
  videoSrc,
  posterSrc,
}: {
  heading: string;
  subheading: string;
  primaryCta: { text: string; href: string };
  videoSrc: string;
  posterSrc: string;
}) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 lg:pb-28 w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-sm uppercase tracking-[0.2em] text-white/60 mb-4"
        >
          {subheading}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-10 max-w-4xl"
        >
          {heading}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-medium hover:bg-white hover:text-neutral-900 transition-all duration-300"
          >
            {primaryCta.text}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

> **Nota sobre video:** si no hay video disponible, usar la misma imagen del Immersive con un efecto CSS de parallax (`background-attachment: fixed` o `transform: translateZ`) para simular movimiento.

---

## Reglas para Heroes que NO sean genéricos

1. **Heading enorme.** Mínimo `text-5xl` en mobile, `text-7xl+` en desktop. La jerarquía tiene que ser brutal.
2. **Una decisión visual única.** Sea un layout asimétrico, un color de background inesperado, una transformación en el texto, una imagen con tratamiento (blanco y negro, duotone, recortada en forma).
3. **CTA primario claro y diferenciable.** No dos botones iguales — uno tiene que dominar.
4. **Mobile-first INNEGOCIABLE.** En 375px:
   - Heading legible sin scroll.
   - CTA visible sin scroll.
   - Imagen comprimida o stacked, no tapando el texto.
5. **Animación inicial sutil.** Reveal en máximo 1 segundo total. No esperar 3 segundos a que termine la animación.

---

## Variaciones de carácter (Hero hacks)

Para hacer un Hero único, agregar UNA de estas:

- **Subrayado dibujado a mano** debajo de palabras clave del heading (SVG path).
- **Marquee horizontal** debajo del Hero con texto repetido (testimonios, stats, lugares).
- **Imagen con clip-path inusual** (formas no rectangulares).
- **Counter animado** (número de productos, clientes, años).
- **Hero con video background** (cuidado con peso — usar MP4 optimizado y poster image).
- **Texto outline** (heading transparente con borde).
- **Cita testimonial integrada** debajo del CTA.
- **Tag flotante** ("Nuevos productos", "Envío gratis", "Disponible ahora") con leve rotación.

---

## Validación

- [ ] Una variante elegida según objetivo del sitio.
- [ ] Heading con jerarquía brutal (5xl+ mobile, 7xl+ desktop).
- [ ] CTA primario claramente diferenciable.
- [ ] Una decisión visual única aplicada (de la lista de "hacks").
- [ ] Mobile testeado (375px) — heading + CTA visibles sin scroll.
- [ ] Animación de entrada bajo 1 segundo.
- [ ] Imágenes con `object-cover` y `aspect-ratio` controlado.
