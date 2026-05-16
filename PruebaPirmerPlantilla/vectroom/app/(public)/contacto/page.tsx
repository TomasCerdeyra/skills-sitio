"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const waLink = buildWhatsAppLink();

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
    <div className="pt-24">
      {/* Header */}
      <section className="bg-neutral-900 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Contacto
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-white leading-none">
            Hablemos.
          </h1>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Formulario */}
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-neutral-900 mb-8">
                Envianos un mensaje
              </h2>

              {status === "ok" ? (
                <div className="bg-neutral-100 p-8 text-center">
                  <p className="font-display text-2xl font-bold uppercase text-neutral-900 mb-2">
                    ¡Mensaje recibido!
                  </p>
                  <p className="font-body text-neutral-600">Te respondemos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-sm font-body text-sm focus:border-neutral-900 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-sm font-body text-sm focus:border-neutral-900 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      Teléfono (opcional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-sm font-body text-sm focus:border-neutral-900 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-sm font-body text-sm focus:border-neutral-900 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="font-body text-xs text-red-500">
                      Hubo un error. Escribinos por WhatsApp.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-neutral-900 text-white py-4 rounded-full font-body font-semibold text-sm hover:bg-neutral-700 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar consulta"}
                  </button>
                </form>
              )}
            </div>

            {/* Info de contacto */}
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-neutral-900 mb-8">
                Información
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                    WhatsApp
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-neutral-900 hover:text-neutral-600 transition-colors underline underline-offset-4"
                  >
                    Escribinos directo
                  </a>
                  <p className="font-body text-xs text-neutral-400 mt-1">
                    Respondemos rápido, de lunes a sábado
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                    Showroom
                  </p>
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <p className="font-body text-neutral-900">Av. Corrientes 1234, CABA</p>
                  <p className="font-body text-xs text-neutral-400 mt-1">
                    Lunes a sábados, 10 a 20 hs
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
                    Envíos
                  </p>
                  <p className="font-body text-neutral-700 text-sm">
                    Enviamos a todo el país con OCA, Andreani y Correo Argentino.
                    El costo se calcula al finalizar la compra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
