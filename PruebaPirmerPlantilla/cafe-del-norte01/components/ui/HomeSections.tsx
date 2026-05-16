"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SlideFromSide, FadeUpOnScroll } from "./Animations";
import { trackEvent } from "@/lib/analytics/umami";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  product_images: { url: string; alt: string | null; position: number | null }[];
}

interface Props {
  featured: Product[];
  waLink: string;
}

// ADN: cards: horizontal — imagen izquierda, texto derecha
function ProductCardHorizontal({ product }: { product: Product }) {
  const mainImage = product.product_images?.[0];
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex gap-4 sm:gap-5 bg-neutral-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 border border-neutral-100"
    >
      <div className="relative w-28 sm:w-36 flex-shrink-0 overflow-hidden bg-brand-accent/30">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-300 text-2xl">☕</div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-brand-secondary text-neutral-50 text-xs px-2 py-0.5 rounded-full font-body font-medium">
            Oferta
          </span>
        )}
      </div>
      <div className="py-4 pr-4 flex flex-col justify-center flex-1 min-w-0">
        <h3 className="font-display text-lg sm:text-xl text-neutral-900 mb-1 group-hover:text-brand-primary transition-colors leading-tight">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-sm text-neutral-500 line-clamp-2 mb-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="font-body font-semibold text-neutral-900 text-base">
            ${product.price.toLocaleString("es-AR")}
          </span>
          {hasDiscount && (
            <span className="font-body text-sm text-neutral-400 line-through">
              ${product.compare_at_price?.toLocaleString("es-AR")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function HomeSections({ featured, waLink }: Props) {
  return (
    <>
      {/* ====================================================
          SECCIÓN 1: Destacados
          ADN: sections: alternating-zigzag — sección apilada centrada
      ==================================================== */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SlideFromSide index={0}>
            <div className="mb-12">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-3">
                ✦ &nbsp; Para empezar el día
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                Lo que más pedimos.
              </h2>
            </div>
          </SlideFromSide>

          {/* ADN: cards: horizontal — grid de 2 columnas en desktop */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-10">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ProductCardHorizontal product={product} />
              </motion.div>
            ))}
          </div>

          <FadeUpOnScroll delay={0.2}>
            <div className="text-center">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 font-body text-brand-primary font-medium hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest"
                onClick={() => trackEvent("category_click", { category: "ver-carta-completa" })}
              >
                Ver la carta completa
                <span className="w-8 h-px bg-brand-primary transition-all duration-300 group-hover:w-14" />
              </Link>
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* ====================================================
          SECCIÓN 2: El proceso — "Del grano a tu taza"
          ADN: alternating-zigzag — sección diferenciadora del Café
      ==================================================== */}
      <section className="py-20 lg:py-28 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SlideFromSide index={1}>
            <div className="text-center mb-14">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-3">
                ✦ &nbsp; El proceso
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900">
                Del grano a tu taza.
              </h2>
            </div>
          </SlideFromSide>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
            {[
              { num: "01", titulo: "Grano selecto", desc: "De productores de origen único. Cada lote con nombre, altura y perfil de tueste.", icon: "🌱" },
              { num: "02", titulo: "Tueste en el barrio", desc: "Tueste propio, perfil desarrollado para resaltar el dulzor natural del grano.", icon: "🔥" },
              { num: "03", titulo: "En tu taza", desc: "Extracción calibrada al gramo. El mismo café, siempre igual, siempre rico.", icon: "☕" },
            ].map((paso, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-4xl mb-4">{paso.icon}</p>
                <p className="font-display text-5xl text-brand-primary/20 mb-2 font-bold">{paso.num}</p>
                <h3 className="font-display text-xl text-neutral-900 mb-3">{paso.titulo}</h3>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">{paso.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECCIÓN 3: Nosotros — zigzag imagen izquierda / texto derecha
          ADN: alternating-zigzag — imagen + copy narrativo
      ==================================================== */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Imagen izquierda — zigzag par */}
            <SlideFromSide index={0}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=85&auto=format&fit=crop"
                  alt="Barista trabajando en Café del Norte"
                  className="w-full h-full object-cover"
                />
              </div>
            </SlideFromSide>

            {/* Texto derecha */}
            <SlideFromSide index={1}>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4">
                  ✦ &nbsp; Nuestra historia
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
                  Un lugar para quedarse.
                </h2>
                <div className="space-y-4 font-body text-neutral-600 leading-relaxed">
                  <p>
                    Abrimos hace años con una idea simple: hacer un buen café y servirlo con tiempo. Hoy seguimos haciendo lo mismo.
                  </p>
                  <p>
                    Café tostado en el barrio, masas hechas a mano cada mañana, y una mesa para que te quedes el rato que quieras. Sin apuro, sin pantallas que te apuren a irte.
                  </p>
                  <p>
                    Somos el café del norte de la ciudad, literalmente y metafóricamente.
                  </p>
                </div>
                <div className="mt-8 flex gap-6">
                  <div>
                    <p className="font-display text-4xl font-bold text-brand-primary">+12</p>
                    <p className="font-body text-sm text-neutral-500 mt-1">años abiertos</p>
                  </div>
                  <div className="w-px bg-neutral-200" />
                  <div>
                    <p className="font-display text-4xl font-bold text-brand-primary">100%</p>
                    <p className="font-body text-sm text-neutral-500 mt-1">granos de origen</p>
                  </div>
                  <div className="w-px bg-neutral-200" />
                  <div>
                    <p className="font-display text-4xl font-bold text-brand-primary">∞</p>
                    <p className="font-body text-sm text-neutral-500 mt-1">charlas de barra</p>
                  </div>
                </div>
              </div>
            </SlideFromSide>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECCIÓN 4: Horarios — sección diferenciadora para café
          ADN: full bleed con bg-brand-primary
      ==================================================== */}
      <section className="py-20 bg-brand-primary">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll>
            <div className="text-center mb-12">
              <p className="font-body text-brand-accent/70 text-xs uppercase tracking-[0.25em] mb-3">
                ✦ &nbsp; Encontranos acá
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50">
                Siempre con la cafetera prendida.
              </h2>
            </div>
          </FadeUpOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { dias: "Lun — Jue", horario: "8:00 – 22:00" },
              { dias: "Vie — Sáb", horario: "8:00 – 23:30" },
              { dias: "Domingo", horario: "9:00 – 21:00" },
              { dias: "Pedidos online", horario: "Todos los días" },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-6 border border-brand-accent/20 rounded-xl"
              >
                <p className="font-body text-brand-accent/70 text-xs uppercase tracking-widest font-medium mb-2">
                  {h.dias}
                </p>
                <p className="font-display text-white text-2xl font-semibold">{h.horario}</p>
              </motion.div>
            ))}
          </div>

          <FadeUpOnScroll delay={0.3}>
            <div className="text-center mt-10">
              {/* Cliente: revisar/reemplazar con datos reales */}
              <p className="font-body text-brand-accent/80 text-sm">
                Av. Corrientes 1234, Tucumán Capital ·{" "}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-neutral-50 transition-colors"
                >
                  Consultar por WhatsApp
                </a>
              </p>
            </div>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* ====================================================
          SECCIÓN 5: Por qué elegirnos — zigzag texto izquierda / imagen derecha
      ==================================================== */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Texto izquierda — zigzag impar */}
            <SlideFromSide index={0}>
              <div>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4">
                  ✦ &nbsp; Por qué volver
                </p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-8">
                  Hecho con criterio,<br />servido con cariño.
                </h2>
                <div className="space-y-6">
                  {[
                    { titulo: "Calidad real", desc: "Granos seleccionados, tueste propio y extracción calibrada. Sin atajos." },
                    { titulo: "Pastelería artesanal", desc: "Las masas se hacen acá, a mano, cada mañana. Nunca de fábrica." },
                    { titulo: "Pedidos online", desc: "Comprá con MercadoPago y lo enviamos. O vení a buscar cuando quieras." },
                    { titulo: "Atención de barrio", desc: "No somos una cadena. Acá te conocemos y sabemos cómo tomás el café." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <span className="text-brand-primary font-display text-2xl font-bold flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-neutral-900 mb-1">{item.titulo}</h3>
                        <p className="font-body text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideFromSide>

            {/* Imagen derecha — zigzag impar */}
            <SlideFromSide index={1}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                {/* Cliente: reemplazar con foto propia */}
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85&auto=format&fit=crop"
                  alt="Café americano en taza en Café del Norte"
                  className="w-full h-full object-cover"
                />
              </div>
            </SlideFromSide>
          </div>
        </div>
      </section>
    </>
  );
}
