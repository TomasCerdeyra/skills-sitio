"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const waLink = buildWhatsAppLink({ message: "Hola, quiero consultar sobre instrumentos" });

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
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <div className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-accent mb-4">
            ♪ Contacto
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-neutral-50 leading-tight">
            Hablamos.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8">
              Mandanos tu consulta
            </h2>
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
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body text-sm transition-colors"
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
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body text-sm transition-colors"
                    placeholder="+54 9 11 ..."
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body text-sm transition-colors"
                  placeholder="vos@email.com"
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body text-sm transition-colors resize-none"
                  placeholder="¿Qué instrumento buscás? ¿Cuál es tu nivel? ¿Tenés alguna duda específica?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-neutral-900 text-neutral-50 py-4 font-body font-semibold text-sm hover:bg-brand-primary transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed rounded-sm"
              >
                {status === "loading" ? "Enviando..." : "Enviar consulta"}
              </button>

              {status === "ok" && (
                <p className="font-body text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-sm">
                  ✓ ¡Mensaje enviado! Te respondemos a la brevedad.
                </p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-sm">
                  Hubo un error. Escribinos directamente por WhatsApp.
                </p>
              )}
            </form>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                Datos de contacto
              </h2>
              <div className="space-y-5">
                {/* Cliente: revisar/reemplazar con datos reales */}
                {[
                  { icon: "📍", label: "Dirección", value: "Av. Corrientes 1234, CABA" },
                  { icon: "🕐", label: "Horarios", value: "Lunes a sábados · 10 a 20 hs" },
                  { icon: "📱", label: "WhatsApp", value: "+54 9 11 4400 5678" },
                  { icon: "✉️", label: "Email", value: "hola@playmusic.com.ar" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-body text-xs uppercase tracking-wide text-neutral-400 mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-body text-neutral-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 p-6 rounded-sm">
              <p className="font-display text-lg font-bold text-neutral-50 mb-2">
                ¿Preferís el WhatsApp?
              </p>
              <p className="font-body text-sm text-neutral-400 mb-5">
                Respondemos en menos de 2 horas en horario de atención.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "contacto" })}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 font-body font-semibold text-sm hover:bg-[#1EB356] transition-colors rounded-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
