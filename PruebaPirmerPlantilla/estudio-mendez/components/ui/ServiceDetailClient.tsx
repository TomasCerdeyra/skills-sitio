"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

interface Variant {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  price_modifier: number | null;
  stock: number | null;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  featured: boolean;
  category_id: string;
  product_images: { id: string; url: string; alt: string | null; position: number | null }[];
  product_variants: Variant[];
}

export function ServiceDetailClient({ service }: { service: Service }) {
  const sortedImages = [...service.product_images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
  const hasVariants = service.product_variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    hasVariants ? service.product_variants[0] : null
  );
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    trackEvent("view_product", { slug: service.slug, name: service.name });
  }, [service.slug, service.name]);

  const effectivePrice = selectedVariant?.price ?? service.price;

  const waLink = buildWhatsAppLink({
    productName: selectedVariant
      ? `${service.name} — ${selectedVariant.name}`
      : service.name,
  });

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-4">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-brand-primary transition-colors group"
        >
          <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
          Todos los servicios
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden bg-neutral-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={sortedImages[selectedImageIdx]?.id ?? "placeholder"}
                  src={
                    sortedImages[selectedImageIdx]?.url ??
                    "https://picsum.photos/seed/servicio-default/800/600"
                  }
                  alt={sortedImages[selectedImageIdx]?.alt ?? service.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {sortedImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {sortedImages.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`relative aspect-square overflow-hidden transition-all ${
                      selectedImageIdx === i
                        ? "ring-2 ring-brand-accent ring-offset-2"
                        : "opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt ?? `${service.name} — imagen ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info — sticky */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {service.featured && (
                  <span className="inline-block font-body text-[10px] uppercase tracking-[0.2em] text-brand-accent border border-brand-accent/30 px-2 py-0.5 mb-4">
                    Destacado
                  </span>
                )}

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary leading-[1.1] tracking-tight mb-6">
                  {service.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-8">
                  {effectivePrice > 0 ? (
                    <>
                      <span className="font-body text-2xl font-medium text-brand-primary">
                        ${effectivePrice.toLocaleString("es-AR")}
                      </span>
                      {service.compare_at_price &&
                        service.compare_at_price > effectivePrice && (
                          <span className="font-body text-lg text-neutral-400 line-through">
                            ${service.compare_at_price.toLocaleString("es-AR")}
                          </span>
                        )}
                    </>
                  ) : (
                    <span className="font-body text-lg text-neutral-500 italic">
                      Honorarios a convenir según el caso
                    </span>
                  )}
                </div>

                {/* Description */}
                {service.description && (
                  <p className="font-body text-neutral-700 leading-relaxed mb-10 whitespace-pre-line">
                    {service.description}
                  </p>
                )}

                {/* Variants */}
                {hasVariants && (
                  <div className="mb-10">
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                      Modalidad
                    </p>
                    <div className="flex flex-col gap-2">
                      {service.product_variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        const vPrice = v.price ?? service.price;
                        return (
                          <button
                            key={v.id}
                            onClick={() => {
                              setSelectedVariant(v);
                              trackEvent("select_variant", {
                                product_id: service.id,
                                variant_name: v.name,
                              });
                            }}
                            className={`flex justify-between items-center p-4 text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-brand-primary text-neutral-50"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                          >
                            <span className="font-body text-sm">{v.name}</span>
                            {vPrice > 0 && (
                              <span className="font-body text-sm font-medium">
                                ${vPrice.toLocaleString("es-AR")}/mes
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", { source: "service-detail" })
                  }
                  className="flex items-center justify-center gap-3 w-full bg-brand-primary text-neutral-50 py-5 font-body font-semibold text-sm hover:bg-brand-accent hover:text-neutral-900 active:scale-[0.99] transition-all duration-200 shadow-xl shadow-brand-primary/20"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar este servicio
                </a>

                <p className="font-body text-xs text-neutral-400 text-center mt-3">
                  Sin compromiso. Respondemos en el día.
                </p>

                {/* Detalles */}
                <div className="mt-10 pt-8 border-t border-neutral-200 space-y-3">
                  {/* Cliente: revisar/reemplazar con datos reales */}
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-500">Consultas</span>
                    <span className="font-body text-brand-primary">Lunes a viernes, 9 a 18 hs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-500">Respuesta</span>
                    <span className="font-body text-brand-primary">En menos de 24 hs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-neutral-500">Modalidad</span>
                    <span className="font-body text-brand-primary">Presencial o remota</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
