# Reference: Componentes Hero

El Hero es lo primero que ve el visitante. **Tiene que comunicar quién es el negocio y qué se puede hacer en 3 segundos.**

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
