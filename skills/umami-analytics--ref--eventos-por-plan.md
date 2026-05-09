# Reference: Eventos a trackear por plan

Lista canónica de eventos `trackEvent(...)` que cada plan debe registrar. Los eventos son acumulativos: Emprendimiento incluye los de Esencial, Empresa incluye los de Emprendimiento.

---

## Plan Esencial

```typescript
// Clic en botón de WhatsApp
trackEvent("whatsapp_click", {
  source: "header" | "product" | "footer" | "contacto",
});

// Vista de producto (página de detalle)
trackEvent("view_product", {
  slug: product.slug,
  name: product.name,
  category: category?.name ?? "",
});

// Clic en categoría del catálogo
trackEvent("category_click", { category: category.name });

// Envío del formulario de contacto
trackEvent("contact_form_submit");
```

---

## Plan Emprendimiento (todos los anteriores +)

```typescript
// Producto agregado al carrito
trackEvent("add_to_cart", {
  product_id: product.id,
  name: product.name,
  price: product.price,
  quantity: quantity,
});

// Variante seleccionada
trackEvent("select_variant", {
  product_id: product.id,
  variant_name: variant.name,
});

// Inicio del checkout
trackEvent("start_checkout", {
  total: cartTotal,
  items: cartItems.length,
});

// Cupón aplicado
trackEvent("apply_coupon", {
  code: coupon.code,
  type: coupon.type,
});

// Zona de envío seleccionada
trackEvent("select_shipping_zone", {
  zone: zoneName,
  cost: zoneCost,
});

// Compra completada (llamar desde process-payment)
trackEvent("purchase", {
  payment_id: String(paymentId),
  total: total,
  status: "approved",
});
```

---

## Plan Empresa (todos los anteriores +)

```typescript
// Funnel de conversión completo
trackEvent("checkout_step", {
  step: "address" | "shipping" | "payment",
  order_value: cartTotal,
});

// Conversión confirmada vía webhook (post-pago verificado)
trackEvent("conversion", {
  order_id: orderId,
  total: total,
  items_count: itemsCount,
  payment_provider: "mercadopago",
  shipping_carrier: shippingCarrier,
});

// Abandono de carrito (opcional)
trackEvent("checkout_abandoned", {
  step: "address" | "shipping" | "payment",
  cart_value: cartTotal,
});
```

---

## Patrones de uso recomendados

### Botón de WhatsApp en client component

```typescript
"use client";
import { trackEvent } from "@/lib/analytics/umami";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  source,
  productName,
}: {
  source: string;
  productName?: string;
}) {
  const url = buildWhatsAppLink({ productName });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source })}
    >
      Consultar por WhatsApp
    </a>
  );
}
```

### Vista de producto con tracking enriquecido

Umami trackea la page view automáticamente al entrar a `/producto/[slug]`. Para el evento enriquecido `view_product`, usar un client component pequeño:

```typescript
"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/umami";

export function ProductTracker({
  slug,
  name,
  category,
}: {
  slug: string;
  name: string;
  category?: string;
}) {
  useEffect(() => {
    trackEvent("view_product", { slug, name, category: category ?? "" });
  }, [slug, name, category]);

  return null;
}
```

### Form de contacto

```typescript
async function handleSubmit(formData: FormData) {
  await submitContactForm(formData);
  trackEvent("contact_form_submit");
}
```

---

## Notas importantes

- **Nunca trackear datos personales** (email, teléfono, dirección). Solo IDs, categorías, montos.
- Los nombres de eventos deben ser **snake_case** y consistentes entre proyectos para poder comparar métricas entre clientes.
- Las propiedades del evento se ven en el dashboard de Umami como filtros — preferir nombres descriptivos sobre abreviaciones.
- El tipo de `data` es `Record<string, string | number | boolean>` — Umami no acepta objetos anidados ni arrays.
