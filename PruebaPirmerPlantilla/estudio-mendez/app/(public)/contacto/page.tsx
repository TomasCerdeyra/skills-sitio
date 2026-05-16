"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer una consulta." });

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
    <div className="bg-neutral-50">
      {/* Header */}
      <div className="bg-brand-primary pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-accent mb-6">
            Hablemos
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-black text-neutral-50 leading-[0.9] tracking-tight">
            Contacto.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact info */}
          <div className="lg:col-span-4">
            <FadeUpOnScroll>
              <h2 className="font-display text-3xl font-bold text-brand-primary mb-8 leading-[1.1]">
                La mejor vía
                <br /> es la más directa.
              </h2>
              <p className="font-body text-neutral-600 leading-relaxed mb-12">
                Preferimos el WhatsApp para una respuesta rápida.
                El formulario es válido también — le damos respuesta el mismo día.
              </p>
            </FadeUpOnScroll>

            <FadeUpOnScroll delay={0.1}>
              <div className="space-y-8">
                {/* WhatsApp */}
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent mb-3">
                    WhatsApp
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "contacto-page" })}
                    className="font-body text-brand-primary hover:text-brand-accent transition-colors font-medium flex items-center gap-2 group"
                  >
                    {/* Cliente: revisar/reemplazar con datos reales */}
                    +54 9 11 4400 5678
                    <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent mb-3">
                    Email
                  </p>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <a
                    href="mailto:consultas@estudiomendez.com.ar"
                    className="font-body text-brand-primary hover:text-brand-accent transition-colors font-medium"
                  >
                    consultas@estudiomendez.com.ar
                  </a>
                </div>

                {/* Dirección */}
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent mb-3">
                    Oficina
                  </p>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <address className="font-body not-italic text-neutral-700 space-y-1">
                    <p>Av. Corrientes 1234, Piso 8</p>
                    <p>Ciudad de Buenos Aires</p>
                  </address>
                </div>

                {/* Horarios */}
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent mb-3">
                    Horarios
                  </p>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <div className="font-body text-neutral-700 space-y-1 text-sm">
                    <p>Lunes a viernes: 9 a 18 hs</p>
                    <p className="text-neutral-500">Urgencias: coordinamos por WhatsApp</p>
                  </div>
                </div>
              </div>
            </FadeUpOnScroll>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <FadeUpOnScroll delay={0.15}>
              {status === "ok" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-primary p-10 lg:p-14 text-center"
                >
                  <div className="w-12 h-12 bg-brand-accent flex items-center justify-center mx-auto mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-900">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-50 mb-4">
                    Mensaje recibido.
                  </h3>
                  <p className="font-body text-neutral-300">
                    Le respondemos antes del final del día hábil.
                    Si necesita una respuesta urgente, contáctenos por WhatsApp.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 bg-brand-accent text-neutral-900 px-8 py-3 font-body font-semibold text-sm hover:bg-brand-accent-light transition-colors"
                  >
                    Ir a WhatsApp
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-body text-xs uppercase tracking-[0.18em] text-neutral-500 block mb-2"
                      >
                        Nombre *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="w-full px-4 py-4 bg-neutral-100 border border-transparent text-brand-primary font-body text-base focus:outline-none focus:border-brand-accent focus:bg-white transition-all duration-200 placeholder:text-neutral-400"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="font-body text-xs uppercase tracking-[0.18em] text-neutral-500 block mb-2"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        className="w-full px-4 py-4 bg-neutral-100 border border-transparent text-brand-primary font-body text-base focus:outline-none focus:border-brand-accent focus:bg-white transition-all duration-200 placeholder:text-neutral-400"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-body text-xs uppercase tracking-[0.18em] text-neutral-500 block mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className="w-full px-4 py-4 bg-neutral-100 border border-transparent text-brand-primary font-body text-base focus:outline-none focus:border-brand-accent focus:bg-white transition-all duration-200 placeholder:text-neutral-400"
                      placeholder="+54 9 11 1234 5678 (opcional)"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body text-xs uppercase tracking-[0.18em] text-neutral-500 block mb-2"
                    >
                      Consulta *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-4 bg-neutral-100 border border-transparent text-brand-primary font-body text-base focus:outline-none focus:border-brand-accent focus:bg-white transition-all duration-200 placeholder:text-neutral-400 resize-none"
                      placeholder="Describí brevemente tu situación o consulta..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-body text-sm text-red-600">
                      Hubo un error al enviar. Por favor, escribinos directamente por WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-brand-primary text-neutral-50 py-5 font-body font-semibold text-sm hover:bg-brand-accent hover:text-neutral-900 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar consulta"}
                  </button>

                  <p className="font-body text-xs text-neutral-400">
                    Los datos proporcionados se usan exclusivamente para gestionar su consulta
                    y están protegidos por el secreto profesional.
                  </p>
                </form>
              )}
            </FadeUpOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
