"use client";

import { useState } from "react";
import { FadeUpOnScroll } from "@/components/ui/FadeUpOnScroll";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

export default function ContactPage() {
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
    <div className="pt-20">
      {/* Header */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeUpOnScroll>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-secondary mb-4">
              Hablemos
            </p>
            <h1 className="font-display text-5xl lg:text-6xl text-white leading-tight font-bold">
              ¿Tenés alguna consulta?
            </h1>
          </FadeUpOnScroll>
        </div>
      </section>

      {/* Contacto — full-bleed crema */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Datos */}
            <FadeUpOnScroll>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-primary mb-4">
                Encontranos
              </p>
              <h2 className="font-display text-3xl text-neutral-900 mb-8">
                Siempre hay una mesa libre.
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2">
                    Dirección
                  </p>
                  {/* Cliente: revisar/reemplazar con dirección real */}
                  <p className="font-body text-neutral-700">
                    Av. Corrientes 1234, CABA
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2">
                    Horarios
                  </p>
                  {/* Cliente: revisar/reemplazar con horarios reales */}
                  <p className="font-body text-neutral-700">
                    Lun — Vie · 8:00 a 20:00 hs
                    <br />
                    Sábados · 9:00 a 20:00 hs
                    <br />
                    Domingos · 10:00 a 18:00 hs
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2">
                    WhatsApp
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { source: "contacto" })
                    }
                    className="inline-flex items-center gap-3 font-body text-[#25D366] font-medium hover:underline"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Escribinos ahora
                  </a>
                </div>
              </div>
            </FadeUpOnScroll>

            {/* Formulario */}
            <FadeUpOnScroll delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Tu nombre" name="name" required />
                  <FormField label="Email" name="email" type="email" required />
                </div>
                <FormField label="Teléfono (opcional)" name="phone" type="tel" />
                <div>
                  <label htmlFor="message" className="block font-body text-sm text-neutral-600 mb-2">
                    Mensaje <span className="text-brand-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors font-body text-neutral-900 placeholder:text-neutral-400 bg-white"
                    placeholder="Contanos en qué podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-primary text-white py-4 rounded-full font-body font-medium hover:scale-[1.01] active:scale-95 transition-transform disabled:opacity-50 shadow-lg shadow-brand-primary/30"
                >
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </button>

                {status === "ok" && (
                  <p className="font-body text-sm text-green-700 bg-green-50 px-4 py-3 rounded-lg text-center">
                    ¡Mensaje enviado! Te respondemos lo antes posible.
                  </p>
                )}
                {status === "error" && (
                  <p className="font-body text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg text-center">
                    Hubo un error. Escribinos directamente por WhatsApp.
                  </p>
                )}
              </form>
            </FadeUpOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-sm text-neutral-600 mb-2">
        {label} {required && <span className="text-brand-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors font-body text-neutral-900 placeholder:text-neutral-400 bg-white"
      />
    </div>
  );
}
