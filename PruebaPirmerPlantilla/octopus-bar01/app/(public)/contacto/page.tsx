"use client";

import { useState } from "react";
import { ClipRevealOnScroll } from "@/components/ui/ClipRevealOnScroll";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const waLink = buildWhatsAppLink({ message: "Hola, quiero hacer una consulta." });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("ok");
        trackEvent("contact_form_submit");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-20">
      {/* Header dark */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ClipRevealOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-primary mb-4">
              Escribinos
            </p>
          </ClipRevealOnScroll>
          <ClipRevealOnScroll delay={0.1}>
            <h1 className="font-display text-5xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight">
              Contacto.
            </h1>
          </ClipRevealOnScroll>
        </div>
      </section>

      {/* Contenido — full bleed neutral-50 */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Datos de contacto */}
            <ClipRevealOnScroll direction="left">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-neutral-900 mb-8">
                  Encontranos.
                </h2>

                <div className="space-y-6 mb-10">
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      Dirección
                    </p>
                    <p className="font-body text-neutral-700">
                      Av. Aconquija 1234, Tucumán
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      Horarios
                    </p>
                    <p className="font-body text-neutral-700">
                      Mar — Jue: 19:00 – 01:00
                      <br />
                      Vie — Sáb: 19:00 – 02:30
                      <br />
                      Dom: 18:00 – 00:00
                    </p>
                  </div>
                </div>

                {/* WhatsApp prominente */}
                <div className="bg-neutral-900 rounded-xl p-6">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
                    Respuesta rápida
                  </p>
                  <p className="font-display text-xl font-bold text-white mb-5">
                    Escribinos por WhatsApp y te respondemos al toque.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { source: "contacto" })
                    }
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-full font-body font-bold hover:bg-[#1fbe5a] hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-[#25D366]/30"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            </ClipRevealOnScroll>

            {/* Formulario */}
            <ClipRevealOnScroll direction="right" delay={0.15}>
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-neutral-900 mb-8">
                  O mandanos un mensaje.
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2 block"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="given-name"
                      className="w-full px-4 py-3 text-base border border-neutral-200 rounded-xl font-body text-neutral-900 bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-200"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2 block"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      className="w-full px-4 py-3 text-base border border-neutral-200 rounded-xl font-body text-neutral-900 bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-200"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2 block"
                    >
                      Teléfono <span className="text-neutral-400">(opcional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className="w-full px-4 py-3 text-base border border-neutral-200 rounded-xl font-body text-neutral-900 bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-200"
                      placeholder="+54 9 381 000 0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2 block"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 text-base border border-neutral-200 rounded-xl font-body text-neutral-900 bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all duration-200 resize-none"
                      placeholder="¿En qué te podemos ayudar?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-brand-primary text-neutral-900 py-4 rounded-full font-body font-bold text-base hover:bg-brand-accent hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-brand-primary/20"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                  </button>

                  {status === "ok" && (
                    <p className="font-body text-sm text-green-600 bg-green-50 px-4 py-3 rounded-lg text-center">
                      ¡Mensaje enviado! Te respondemos pronto.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="font-body text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg text-center">
                      Hubo un error. Escribinos directamente por WhatsApp.
                    </p>
                  )}
                </form>
              </div>
            </ClipRevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
