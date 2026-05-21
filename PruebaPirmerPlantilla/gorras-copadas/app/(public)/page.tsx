import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";

export const metadata: Metadata = {
  title: "Gorras Copadas — Gorras para los que se animan",
};

const MOCK_FEATURED = [
  {
    id: "p1", slug: "snapback-acid", name: "Snapback Acid",
    price: 12500, category: "Snapback",
    image: "https://loremflickr.com/600/600/snapback,cap?lock=101",
  },
  {
    id: "p2", slug: "dad-hat-chaos", name: "Dad Hat Chaos",
    price: 9800, category: "Dad Hat",
    image: "https://loremflickr.com/600/600/dadhat,cap?lock=102",
  },
  {
    id: "p3", slug: "fitted-neon", name: "Fitted Neon",
    price: 14200, category: "Fitted",
    image: "https://loremflickr.com/600/600/fitted,cap?lock=103",
  },
  {
    id: "p4", slug: "bucket-skate", name: "Bucket Skate",
    price: 10500, category: "Bucket",
    image: "https://loremflickr.com/600/600/bucket,hat?lock=104",
  },
  {
    id: "p5", slug: "trucker-graffiti", name: "Trucker Graffiti",
    price: 11000, category: "Trucker",
    image: "https://loremflickr.com/600/600/trucker,cap?lock=105",
  },
  {
    id: "p6", slug: "snapback-chrome", name: "Snapback Chrome",
    price: 13800, category: "Snapback",
    image: "https://loremflickr.com/600/600/snapback,streetwear?lock=106",
  },
];

const CATEGORIES = [
  { name: "Snapback", emoji: "🧢", href: "/catalogo?cat=snapback" },
  { name: "Dad Hat", emoji: "🎩", href: "/catalogo?cat=dad-hat" },
  { name: "Fitted", emoji: "🔵", href: "/catalogo?cat=fitted" },
  { name: "Bucket", emoji: "🪣", href: "/catalogo?cat=bucket" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Categories strip */}
      <section className="bg-[#D4FF00] py-4 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="inline-flex items-center gap-2 text-[#0A0A0A] font-black text-sm tracking-widest uppercase hover:underline"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cat.emoji} {cat.name}
              <span className="text-[#0A0A0A]/30 ml-4">—</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#D4FF00] text-xs font-bold tracking-[0.3em] uppercase mb-3">
                Lo más vendido
              </p>
              <h2
                className="text-5xl md:text-6xl font-black text-white leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DESTACADOS
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="hidden md:flex items-center gap-2 text-[#A0A0A0] hover:text-[#D4FF00] transition-colors text-sm font-medium"
            >
              Ver todo →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {MOCK_FEATURED.map((product, i) => (
              <Link
                key={product.id}
                href={`/catalogo/${product.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-[#141414] ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? "auto" : "1" }}
              >
                <div className={`relative ${i === 0 ? "h-[400px] md:h-full" : "aspect-square"}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes={i === 0 ? "(max-width: 768px) 50vw, 40vw" : "(max-width: 768px) 50vw, 20vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="inline-block px-2 py-0.5 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] text-[10px] font-bold tracking-widest uppercase rounded-full mb-2">
                    {product.category}
                  </span>
                  <p className="text-white font-black text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {product.name}
                  </p>
                  <p className="text-[#D4FF00] font-bold text-sm mt-1">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2E2E2E] text-white rounded-full hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors"
            >
              Ver todo el catálogo →
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Envíos express",
                desc: "Despachamos en 24hs hábiles. Seguimiento en tiempo real con Envia.com.",
              },
              {
                icon: "🎯",
                title: "Calidad garantizada",
                desc: "Materiales premium que duran. Si no quedás conforme, te devolvemos la plata.",
              },
              {
                icon: "🔥",
                title: "Diseños únicos",
                desc: "Colaboraciones con artistas locales. Ediciones limitadas que nadie más tiene.",
              },
            ].map((prop) => (
              <div
                key={prop.title}
                className="p-8 rounded-2xl border border-[#2E2E2E] hover:border-[#D4FF00]/50 transition-colors group"
              >
                <span className="text-4xl mb-4 block">{prop.icon}</span>
                <h3
                  className="text-xl font-black text-white mb-3 group-hover:text-[#D4FF00] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {prop.title}
                </h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-24 bg-[#D4FF00] relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-[25vw] font-black leading-none opacity-[0.06] whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)", color: "#0A0A0A" }}
          >
            NOW
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-5xl md:text-7xl font-black text-[#0A0A0A] leading-none mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TU PRÓXIMA
            <br />
            GORRA TE ESPERA
          </h2>
          <p className="text-[#0A0A0A]/70 text-lg mb-10 max-w-lg mx-auto">
            Más de 500 modelos. Envíos a todo Argentina. Pagás con MercadoPago.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#0A0A0A] text-[#D4FF00] font-black text-xl rounded-full hover:bg-[#1A1A1A] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            EXPLORAR COLECCIÓN →
          </Link>
        </div>
      </section>

    </>
  );
}
