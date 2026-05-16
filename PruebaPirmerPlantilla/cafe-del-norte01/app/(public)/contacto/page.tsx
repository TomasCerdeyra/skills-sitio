"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";
import { FadeUpOnScroll } from "@/components/ui/Animations";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const waLink = buildWhatsAppLink({ message: "Hola! Quiero hacer una consulta." });

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

  const inputClass = "w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 font-body text-sm bg-neutral-50";

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4"
          >
            ✦ &nbsp; Escribinos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.02]"
          >
            ¿Hablamos?
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Formulario */}
          <FadeUpOnScroll>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">Nombre</label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="Tu nombre" autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">Email</label>
                  <input id="email" name="email" type="email" required className={inputClass} placeholder="tu@email.com" autoComplete="email" inputMode="email" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">Teléfono (opcional)</label>
                <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+54 9 381 000 0000" autoComplete="tel" inputMode="tel" />
              </div>
              <div>
                <label htmlFor="message" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">Mensaje</label>
                <textarea id="message" name="message" required rows={5} className={inputClass} placeholder="Contanos en qué te podemos ayudar..." />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-body font-medium text-sm hover:bg-brand-secondary hover:scale-[1.01] active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-brand-primary/30"
              >
                {status === "loading" ? "Enviando..." : "Enviar consulta"}
              </button>

              {status === "ok" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-body text-sm text-green-700 text-center bg-green-50 rounded-xl p-4"
                >
                  ✓ ¡Mensaje enviado! Te respondemos pronto.
                </motion.p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-600 text-center bg-red-50 rounded-xl p-4">
                  Hubo un error. Escribinos directamente por WhatsApp.
                </p>
              )}
            </form>
          </FadeUpOnScroll>

          {/* Datos de contacto */}
          <FadeUpOnScroll delay={0.15}>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                  O encontranos directamente.
                </h2>
                <p className="font-body text-neutral-600 leading-relaxed">
                  Si preferís, escribinos por WhatsApp y te respondemos al toque.
                </p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "contacto" })}
                className="flex items-center gap-4 p-5 bg-[#25D366]/10 rounded-2xl border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-medium text-neutral-800">WhatsApp</p>
                  <p className="font-body text-sm text-neutral-500">Respondemos en minutos</p>
                </div>
              </a>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary text-sm">📍</span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-neutral-800">Dónde estamos</p>
                    {/* Cliente: revisar/reemplazar con datos reales */}
                    <p className="font-body text-sm text-neutral-500">Av. Corrientes 1234, Tucumán Capital</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary text-sm">🕐</span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-neutral-800">Horarios</p>
                    {/* Cliente: revisar/reemplazar con datos reales */}
                    <p className="font-body text-sm text-neutral-500">Lun–Jue 8–22 · Vie–Sáb 8–23:30 · Dom 9–21</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUpOnScroll>
        </div>
      </div>
    </div>
  );
}
