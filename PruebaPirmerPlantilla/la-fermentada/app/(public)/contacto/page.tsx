"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/whatsapp";

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary/70 mb-3">
            Contacto
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-brand-dark italic leading-tight">
            Hablemos.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-body text-sm text-neutral-500 mb-1.5">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-colors font-body bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm text-neutral-500 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="w-full px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-colors font-body bg-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block font-body text-sm text-neutral-500 mb-1.5">
                  Teléfono (opcional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-colors font-body bg-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-body text-sm text-neutral-500 mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-base border border-neutral-300 rounded-xl focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-colors font-body bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-body font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 shadow-lg shadow-brand-primary/20 hover:scale-[1.01] active:scale-95"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>

              {status === "ok" && (
                <p className="font-body text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  ¡Mensaje enviado! Te respondemos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  Hubo un error. Escribinos directamente por WhatsApp.
                </p>
              )}
            </form>
          </motion.div>

          {/* Info de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-brand-accent rounded-2xl p-7 space-y-5">
              <h2 className="font-display font-bold text-xl text-brand-dark italic">
                También podés escribirnos
              </h2>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-brand-dark hover:text-brand-primary transition-colors group"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-semibold">WhatsApp</p>
                  <p className="font-body text-sm text-neutral-500 group-hover:text-brand-primary transition-colors">
                    Respondemos el mismo día
                  </p>
                </div>
              </a>
            </div>

            {/* Datos del local */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-brand-dark italic">El local</h3>
              {/* Cliente: revisar/reemplazar con datos reales */}
              <div className="space-y-3 font-body text-sm text-neutral-600">
                <p className="flex gap-3 items-start">
                  <span className="text-brand-secondary text-lg mt-0.5">📍</span>
                  <span>Honduras 4567, Palermo, CABA</span>
                </p>
                <p className="flex gap-3 items-start">
                  <span className="text-brand-secondary text-lg mt-0.5">🕘</span>
                  <span>Lunes a sábados, 9 a 13 hs</span>
                </p>
                <p className="flex gap-3 items-start">
                  <span className="text-brand-secondary text-lg mt-0.5">🚚</span>
                  <span>Envíos a CABA y GBA — miércoles y sábados</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
