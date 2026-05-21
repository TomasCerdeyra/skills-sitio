import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros — Gorras Copadas",
  description: "La historia detrás de las gorras más copadas de Argentina.",
};

export default function NosotrosPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-[#D4FF00] text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Quiénes somos
        </p>
        <h1
          className="text-[clamp(3rem,8vw,7rem)] font-black text-white leading-none tracking-tight mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          NACIÓ DEL
          <br />
          <span className="text-[#D4FF00]">SKATE,</span>
          <br />
          <span style={{ WebkitTextStroke: "2px #D4FF00", color: "transparent" }}>CRECIÓ</span>
        </h1>
        <p className="text-[#A0A0A0] text-xl leading-relaxed max-w-2xl">
          Gorras Copadas nació en un garage de Buenos Aires en 2019. Éramos tres skaters
          hartos de no encontrar gorras con onda real. Así que las hicimos nosotros.
        </p>
      </section>

      {/* Image break */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-3 gap-3 h-80 md:h-96">
          <div className="relative col-span-2 rounded-2xl overflow-hidden bg-[#141414]">
            <Image
              src="https://loremflickr.com/900/500/skateboard,streetwear?lock=200"
              alt="Cultura skater"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 66vw, 50vw"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-[#141414]">
            <Image
              src="https://loremflickr.com/400/500/cap,hat?lock=201"
              alt="Diseñando gorras"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 25vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#141414] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-black text-white mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LO QUE NOS MUEVE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: "01",
                title: "Autenticidad",
                body: "No hacemos gorras genéricas. Cada diseño pasa por artistas locales que entienden la cultura del street.",
              },
              {
                num: "02",
                title: "Calidad que dura",
                body: "Usamos materiales seleccionados. Nuestras gorras bancaron sol, lluvia y mil patadas al skate.",
              },
              {
                num: "03",
                title: "Comunidad primero",
                body: "Colaboramos con artistas, skaters y murgueros. La cultura callejera nos nutre y nosotros la nutrimos.",
              },
              {
                num: "04",
                title: "Envíos a todo el país",
                body: "Desde La Quiaca hasta Ushuaia. Si sos argentino, te llegamos.",
              },
            ].map((v) => (
              <div key={v.num} className="flex gap-6 p-8 rounded-2xl border border-[#2E2E2E] hover:border-[#D4FF00]/40 transition-colors">
                <span className="text-[#D4FF00]/30 font-black text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  {v.num}
                </span>
                <div>
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {v.title}
                  </h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-4xl md:text-6xl font-black text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ¿LISTO PARA
          <br />
          <span className="text-[#D4FF00]">DESTACARTE?</span>
        </h2>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4FF00] text-[#0A0A0A] font-black text-xl rounded-full hover:bg-white transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          VER CATÁLOGO →
        </Link>
      </section>
    </div>
  );
}
