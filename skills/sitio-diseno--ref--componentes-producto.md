# Reference: Detalle de producto

Galería de imágenes + selector de variantes + información + CTA. **Es la página de conversión** — del catálogo se llega acá y de acá se va al carrito (Emprendimiento/Empresa) o WhatsApp (Esencial).

## Estructura general

Layout split:
- **Desktop:** galería a la izquierda (60%), info a la derecha (40%) sticky.
- **Mobile:** galería arriba, info abajo.

> **⚠️ Tres reglas críticas:**
> 1. `params` es una `Promise` en Next.js 15+. Usar `params: Promise<{ slug: string }>` + `await params`.
> 2. `getProduct` debe tener try/catch y verificar `NEXT_PUBLIC_TENANT_ID` antes de llamar a Supabase.
> 3. El componente page **necesita `MOCK_PRODUCTS` como fallback** — sin él, todos los clicks en la demo dan 404.

```tsx
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductDetailClient } from "@/components/ui/ProductDetailClient";

// ⚠️ Obligatorio: mismo contenido que MOCK_PRODUCTS en catalogo/page.tsx
// Incluir todos los campos: id, name, slug, price, compare_at_price, description,
// featured, category_id, product_images[], product_variants[] (con sku:null)
const MOCK_PRODUCTS = [
  /* ... copiar de catalogo/page.tsx ... */
];

async function getProduct(slug: string) {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID; // verificar antes de usar
    if (!tenantId) return null;
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin
      .from("products")
      .select(`
        id, name, slug, price, compare_at_price, description, featured,
        category_id,
        product_images (id, url, alt, position),
        product_variants (id, name, sku, price, price_modifier, stock)
      `)
      .eq("tenant_id", tenantId)
      .eq("slug", slug)
      .eq("active", true)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ⚠️ Promise en Next.js 15+
}) {
  const { slug } = await params; // ⚠️ await — no params.slug directo

  const dbProduct = await getProduct(slug);
  const product =
    dbProduct ??
    (MOCK_PRODUCTS.find((p) => p.slug === slug) as typeof MOCK_PRODUCTS[0] | undefined);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
```

## ProductDetailClient (componente cliente)

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { AddToCartButton } from "./AddToCartButton";
import { WhatsAppProductButton } from "./WhatsAppProductButton";
import { trackEvent } from "@/lib/analytics/umami";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  product_images: Array<{ id: string; url: string; alt: string | null; position: number | null }>;
  product_variants: Array<{
    id: string;
    name: string;
    sku: string | null;
    price: number | null;
    price_modifier: number | null;
    stock: number | null;
  }>;
}

interface Props {
  product: Product;
  plan: "esencial" | "emprendimiento" | "empresa";
}

export function ProductDetailClient({ product, plan }: Props) {
  const sortedImages = [...product.product_images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const hasVariants = product.product_variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.product_variants[0] : null
  );

  useEffect(() => {
    trackEvent("view_product", { slug: product.slug, name: product.name });
  }, [product.slug, product.name]);

  // Calcular precio efectivo
  const effectivePrice = selectedVariant?.price
    ?? product.price + (selectedVariant?.price_modifier ?? 0);

  const stockAvailable = selectedVariant?.stock ?? null;
  const isAvailable = stockAvailable === null || stockAvailable > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-7">
          <ProductGallery images={sortedImages} alt={product.name} />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl lg:text-5xl text-neutral-900 leading-tight mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-body text-3xl font-medium text-neutral-900">
                  ${effectivePrice.toLocaleString("es-AR")}
                </span>
                {product.compare_at_price && product.compare_at_price > effectivePrice && (
                  <span className="font-body text-lg text-neutral-400 line-through">
                    ${product.compare_at_price.toLocaleString("es-AR")}
                  </span>
                )}
              </div>

              {product.description && (
                <div className="font-body text-neutral-700 leading-relaxed mb-10 whitespace-pre-line">
                  {product.description}
                </div>
              )}

              {hasVariants && (
                <VariantSelector
                  variants={product.product_variants}
                  selected={selectedVariant}
                  onSelect={setSelectedVariant}
                  productId={product.id}
                />
              )}

              <div className="mt-8">
                {plan === "esencial" ? (
                  <WhatsAppProductButton
                    productName={product.name}
                    variantName={selectedVariant?.name}
                  />
                ) : (
                  <AddToCartButton
                    product={product}
                    variant={selectedVariant}
                    disabled={!isAvailable}
                  />
                )}

                {!isAvailable && (
                  <p className="font-body text-sm text-neutral-500 mt-3 text-center">
                    Sin stock disponible
                  </p>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-200 space-y-3">
                <DetailRow label="Envío" value="Calculado en el checkout" />
                <DetailRow label="SKU" value={selectedVariant?.sku ?? "—"} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-body text-neutral-500">{label}</span>
      <span className="font-body text-neutral-900">{value}</span>
    </div>
  );
}
```

---

## Galería con thumbnails

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: Array<{ id: string; url: string; alt: string | null }>;
  alt: string;
}

export function ProductGallery({ images, alt }: GalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
        <span className="font-body text-neutral-400">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[selected].id}
            src={images[selected].url}
            alt={images[selected].alt ?? alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative aspect-square overflow-hidden rounded-md transition-all ${
                selected === i
                  ? "ring-2 ring-brand-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <img
                src={img.url}
                alt={img.alt ?? `${alt} - imagen ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Selector de variantes

> ⚠️ **Tipo `Variant` — regla crítica:** El `VariantSelector` recibe variantes directamente de `product.product_variants`. TypeScript infiere el tipo del `useState` en `ProductDetailClient` con todos los campos del producto. Si `Variant` en el selector solo tiene `{ id, name, stock }`, el `onSelect={setSelectedVariant}` falla con:
> *"Type 'Variant' is not assignable to SetStateAction<{...}>: Type 'Variant' is missing properties: sku, price, price_modifier"*
>
> **Solución:** el tipo `Variant` del selector debe incluir TODOS los campos que devuelve Supabase para `product_variants`.

```tsx
"use client";

import { trackEvent } from "@/lib/analytics/umami";

// IMPORTANTE: incluir todos los campos de product_variants para evitar error TypeScript
// cuando se pasa setSelectedVariant como onSelect desde ProductDetailClient
interface Variant {
  id: string;
  name: string;
  sku: string | null;
  price: number | null;
  price_modifier: number | null;
  stock: number | null;
}

interface VariantSelectorProps {
  variants: Variant[];
  selected: Variant | null;
  onSelect: (v: Variant) => void;
  productId: string;
}

export function VariantSelector({
  variants,
  selected,
  onSelect,
  productId,
}: VariantSelectorProps) {
  function handleSelect(v: Variant) {
    onSelect(v);
    trackEvent("select_variant", { product_id: productId, variant_name: v.name });
  }

  return (
    <div className="mb-8">
      <p className="font-body text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
        Variante
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const noStock = v.stock !== null && v.stock <= 0;
          const isSelected = selected?.id === v.id;
          return (
            <button
              key={v.id}
              onClick={() => !noStock && handleSelect(v)}
              disabled={noStock}
              className={`px-4 py-2 rounded-md font-body text-sm transition-all ${
                isSelected
                  ? "bg-neutral-900 text-neutral-50"
                  : noStock
                  ? "bg-neutral-100 text-neutral-400 line-through cursor-not-allowed"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {v.name}
              {v.stock !== null && v.stock > 0 && v.stock <= 3 && (
                <span className="ml-1 text-xs text-amber-600">({v.stock} disp.)</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## CTA según plan

### Esencial — botón WhatsApp

```tsx
"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics/umami";

interface Props {
  productName: string;
  variantName?: string;
}

export function WhatsAppProductButton({ productName, variantName }: Props) {
  const fullName = variantName ? `${productName} - ${variantName}` : productName;
  const url = buildWhatsAppLink({ productName: fullName });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "product" })}
      className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-full font-medium hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-[#25D366]/30"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..." />
      </svg>
      Consultar por WhatsApp
    </a>
  );
}
```

### Emprendimiento / Empresa — agregar al carrito

```tsx
"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/umami";

interface Props {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    product_images: Array<{ url: string }>;
  };
  variant: {
    id: string;
    name: string;
    price: number | null;
    price_modifier: number | null;
  } | null;
  disabled?: boolean;
}

export function AddToCartButton({ product, variant, disabled }: Props) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (disabled) return;

    setAdding(true);

    const effectivePrice = variant?.price
      ?? product.price + (variant?.price_modifier ?? 0);

    const item = {
      id: product.id,
      variant_id: variant?.id,
      name: product.name,
      variant_name: variant?.name,
      price: effectivePrice,
      quantity: 1,
      image: product.product_images[0]?.url,
    };

    // Leer carrito existente
    const existing = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const existingIdx = existing.findIndex(
      (i: any) => i.id === item.id && i.variant_id === item.variant_id
    );

    if (existingIdx >= 0) {
      existing[existingIdx].quantity += 1;
    } else {
      existing.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(existing));

    trackEvent("add_to_cart", {
      product_id: product.id,
      name: product.name,
      price: effectivePrice,
      quantity: 1,
    });

    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled || adding}
      className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-brand-primary/30"
    >
      {added ? "✓ Agregado" : adding ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
}
```

---

## Reglas

1. **Layout split desktop/mobile.** Desktop = sidebar sticky con info; mobile = stack vertical.
2. **Galería con thumbnails clickeables** — primera imagen como featured, resto como grid de 5 columnas debajo.
3. **Cross-fade al cambiar imagen** (NO transición instantánea).
4. **Variantes con stock visible** cuando queda poco (`<= 3`) — genera urgencia.
5. **Variantes sin stock disabled** + tachadas, no escondidas (el cliente sabe que existen).
6. **Botón CTA grande, redondeado, con shadow del color de marca.**
7. **Trackear `view_product`** al montar el componente, `select_variant` al cambiar variante, `add_to_cart` o `whatsapp_click` en CTA.
8. **Estado de "Agregando..." → "Agregado"** en el botón para feedback visual.

---

## Validación

- [ ] Layout split funcionando en desktop y mobile.
- [ ] Galería con cross-fade entre imágenes.
- [ ] Selector de variantes con estado de stock.
- [ ] CTA correcto según plan (WhatsApp para Esencial, carrito para resto).
- [ ] Trackeo de eventos completo.
- [ ] Estado de "Sin stock" manejado (CTA disabled + mensaje).
- [ ] Precio efectivo se actualiza al cambiar variante.
- [ ] Mobile: galería primero, info debajo, CTA siempre accesible.
