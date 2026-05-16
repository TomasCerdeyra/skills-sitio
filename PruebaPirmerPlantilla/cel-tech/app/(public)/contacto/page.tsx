"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";
import Link from "next/link";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("ok");
        form.reset();
        trackEvent("contact_form_submit");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      {/* Header */}
      <section className="bg-neutral-900 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">
            Contacto
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white">
            Hablemos.
          </h1>
          <p className="font-body text-neutral-400 mt-3 text-lg max-w-lg">
            Consultá por cualquier equipo, preguntá por disponibilidad o armá tu pedido.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">
                Mandanos un mensaje
              </h2>

              {status === "ok" ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <p className="text-4xl mb-3">✅</p>
                  <h3 className="font-display text-xl font-bold text-green-800 mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="font-body text-green-700 text-sm">
                    Te respondemos lo antes posible, normalmente en menos de 1 hora.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-body text-sm text-neutral-600 mb-1.5">
                        Nombre *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-body text-sm text-neutral-600 mb-1.5">
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                        placeholder="11 1234 5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-body text-sm text-neutral-600 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body text-sm text-neutral-600 mb-1.5">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors resize-none"
                      placeholder="¿Qué equipo buscás? ¿Tenés alguna consulta específica?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-body text-sm text-red-600">
                      Hubo un error. Escribinos directamente por{" "}
                      <a
                        href={`https://wa.me/5491144005678`}
                        className="underline"
                      >
                        WhatsApp
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-brand-primary text-neutral-900 py-4 rounded-xl font-display font-bold text-sm hover:bg-brand-accent hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold text-neutral-900">
                Otras formas de contacto
              </h2>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/5491144005678?text=${encodeURIComponent("Hola, quiero consultar sobre un celular.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "contacto" })}
                className="flex items-center gap-5 p-5 bg-white border border-neutral-200 rounded-2xl hover:border-[#25D366]/50 transition-all group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold text-neutral-900 group-hover:text-[#25D366] transition-colors">
                    WhatsApp
                  </p>
                  <p className="font-body text-sm text-neutral-500">
                    Respondemos en minutos · Lun-Sáb 10 a 20 hs
                  </p>
                </div>
              </a>

              {/* Dirección */}
              <div className="p-5 bg-white border border-neutral-200 rounded-2xl">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">Dónde estamos</p>
                {/* Cliente: revisar/reemplazar con dirección real */}
                <p className="font-display font-semibold text-neutral-900 mb-1">Av. Corrientes 1234, CABA</p>
                <p className="font-body text-sm text-neutral-500">Lunes a sábados, 10 a 20 hs</p>
                <p className="font-body text-sm text-neutral-500">Domingos cerrado</p>
              </div>

              {/* Trust */}
              <div className="p-5 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-primary mb-3">Lo que podés consultarnos</p>
                <ul className="space-y-2">
                  {[
                    "Disponibilidad de modelos específicos",
                    "Permuta / canje de tu equipo",
                    "Consultas sobre garantía y factura",
                    "Envíos y logística",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-sm text-neutral-700">
                      <span className="text-brand-primary">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
