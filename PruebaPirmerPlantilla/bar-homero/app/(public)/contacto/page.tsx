"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUpOnScroll from "@/components/ui/FadeUpOnScroll";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const whatsappLink = buildWhatsAppLink({ message: "Hola Bar Homero! Quería hacer una consulta" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-brand-primary pt-28 pb-14">
        <div className="max-w-6xl mx-auto px-4">
          <p className="eyebrow-decorated text-sm uppercase tracking-widest text-brand-secondary font-medium mb-3">
            Hablemos
          </p>
          <h1 className="font-display text-5xl text-white font-semibold">Contacto</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <FadeUpOnScroll>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
              <h2 className="font-display text-2xl text-neutral-900 mb-6">Mandanos un mensaje</h2>

              {status === "sent" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <p className="text-2xl mb-2">✅</p>
                  <p className="text-green-700 font-medium">¡Mensaje enviado!</p>
                  <p className="text-sm text-green-600 mt-1">Te respondemos a la brevedad.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm text-green-700 underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nombre</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Mensaje</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary resize-none"
                      placeholder="¿En qué te podemos ayudar?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600">Hubo un error. Intentá de nuevo o escribinos por WhatsApp.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-brand-primary/90 disabled:opacity-60 transition-colors"
                  >
                    {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>
          </FadeUpOnScroll>

          {/* Info */}
          <FadeUpOnScroll delay={0.1}>
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-6">
                <h3 className="font-display text-lg text-neutral-900 mb-2">¿Preferís WhatsApp?</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  La forma más rápida de hablar con nosotros. Respondemos en minutos.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#22c55e] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.1.543 4.072 1.497 5.782L0 24l6.385-1.673C8.013 23.374 9.956 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.66-.52-5.17-1.424l-.37-.22-3.789.993 1.01-3.688-.241-.38A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Escribinos por WhatsApp
                </a>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <h3 className="font-display text-lg text-neutral-900 mb-4">Encontranos</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-primary mt-0.5">📍</span>
                    <div>
                      <p className="font-medium text-neutral-800">Bar Homero</p>
                      <p>Buenos Aires, Argentina</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-primary mt-0.5">🕒</span>
                    <div>
                      <p className="font-medium text-neutral-800">Horario</p>
                      <p>Lun–Jue 18:00–01:00</p>
                      <p>Vie–Sáb 18:00–03:00</p>
                      <p>Dom 17:00–00:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-neutral-400 text-center">
                <Link href="/catalogo" className="underline hover:text-neutral-600 transition-colors">
                  Ver carta online →
                </Link>
              </div>
            </div>
          </FadeUpOnScroll>
        </div>
      </div>
    </div>
  );
}
