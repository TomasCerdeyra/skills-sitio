"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[#D4FF00] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Contacto
            </p>
            <h1
              className="text-5xl md:text-7xl font-black text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HABLEMOS
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed mb-12">
              ¿Tenés una duda? ¿Querés hacer un pedido mayorista? ¿Buscás algo especial?
              Escribinos y te respondemos en el día.
            </p>

            <div className="space-y-6">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-[#2E2E2E] hover:border-[#D4FF00]/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <p className="text-white font-semibold group-hover:text-[#D4FF00] transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-[#A0A0A0] text-sm">Respuesta en menos de 1 hora</p>
                </div>
              </a>

              <div className="p-5 rounded-2xl border border-[#2E2E2E]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D4FF00]/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Buenos Aires, Argentina</p>
                    <p className="text-[#A0A0A0] text-sm">Enviamos a todo el país</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {status === "ok" ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
                <span className="text-6xl">✅</span>
                <h2
                  className="text-4xl font-black text-[#D4FF00]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  MENSAJE ENVIADO
                </h2>
                <p className="text-[#A0A0A0]">Te respondemos pronto.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-3 border border-[#2E2E2E] text-white rounded-full hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Nombre", type: "text", required: true },
                  { id: "email", label: "Email", type: "email", required: true },
                  { id: "phone", label: "Teléfono (opcional)", type: "tel", required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-[#A0A0A0] mb-2">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#141414] border border-[#2E2E2E] rounded-xl text-white placeholder-[#2E2E2E] focus:outline-none focus:border-[#D4FF00] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#A0A0A0] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#141414] border border-[#2E2E2E] rounded-xl text-white placeholder-[#2E2E2E] focus:outline-none focus:border-[#D4FF00] transition-colors resize-none"
                    placeholder="Contanos en qué podemos ayudarte..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-[#FF3131] text-sm">
                    Hubo un error. Intentá por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full disabled:opacity-50 hover:bg-white transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {status === "loading" ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
