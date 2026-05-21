"use client";

import { useState } from "react";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { SectionLine } from "@/components/ui/SectionLine";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  const waLink = buildWhatsAppLink({
    message: "Hola, quiero hacer una consulta.",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
      trackEvent("contact_form_submit");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <FadeUpOnScroll>
          <div className="flex items-center gap-4 mb-3">
            <SectionLine className="w-12" />
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-secondary">
              Hablemos
            </p>
          </div>
          <h1 className="font-display text-5xl lg:text-8xl font-light text-neutral-900 leading-[1.0] mb-16">
            Contacto.
          </h1>
        </FadeUpOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Formulario */}
          <FadeUpOnScroll>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 transition-all bg-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 transition-all bg-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 transition-all bg-transparent resize-none"
                  placeholder="¿En qué te podemos ayudar?"
                />
              </div>

              {status === "ok" && (
                <p className="font-body text-sm text-green-600">
                  ✓ Mensaje enviado. Te respondemos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-500">
                  Algo salió mal. Intentá de nuevo o escribinos por WhatsApp.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-brand-primary text-neutral-50 py-4 font-body text-sm font-medium hover:bg-neutral-800 active:scale-95 disabled:opacity-50 transition-all duration-200"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </FadeUpOnScroll>

          {/* Datos de contacto */}
          <FadeUpOnScroll delay={0.1}>
            <div className="space-y-10">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  WhatsApp
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-display text-2xl font-light text-neutral-900 hover:text-brand-secondary transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#25D366]"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar ahora
                </a>
                <p className="font-body text-sm text-neutral-500 mt-2">
                  Respondemos en el día
                </p>
              </div>

              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  Email
                </p>
                {/* Cliente: revisar/reemplazar con datos reales */}
                <a
                  href="mailto:hola@lecrere.com.ar"
                  className="font-display text-2xl font-light text-neutral-900 hover:text-brand-secondary transition-colors"
                >
                  hola@lecrere.com.ar
                </a>
              </div>

              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  Showroom
                </p>
                {/* Cliente: revisar/reemplazar con datos reales */}
                <p className="font-display text-xl font-light text-neutral-900">
                  Honduras 4567, CABA
                </p>
                <p className="font-body text-sm text-neutral-500 mt-1">
                  Lunes a sábados, 10 a 19 hs — con turno previo
                </p>
              </div>

              <div className="pt-8 border-t border-neutral-200">
                <p className="font-body text-sm text-neutral-500 leading-relaxed">
                  Para consultas sobre talles, envíos, cambios o devoluciones,
                  el canal más rápido es WhatsApp.
                </p>
              </div>
            </div>
          </FadeUpOnScroll>
        </div>
      </div>
    </div>
  );
}
