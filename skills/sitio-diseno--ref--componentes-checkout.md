# Reference: Componentes de checkout

**Solo aplica a planes Emprendimiento y Empresa.** El skill `mercadopago-connection` genera la página final con el Payment Brick. Este reference cubre el **flujo previo:** captura de datos del comprador + selección de envío + cupón.

## Estructura de páginas

```
app/checkout/
├── datos/page.tsx       ← form completo (este reference)
├── page.tsx             ← Payment Brick (lo arma mercadopago-connection)
└── status/page.tsx      ← resultado del pago (este reference)
```

---

## `app/checkout/datos/page.tsx` — Form de checkout

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/umami";

type CartItem = {
  id: string;
  variant_id?: string;
  name: string;
  variant_name?: string;
  price: number;
  quantity: number;
  image?: string;
};

type ShippingZone = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

export default function CheckoutDatosPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [validating, setValidating] = useState(false);

  // Cargar carrito y zonas
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      router.push("/");
      return;
    }
    const parsed: CartItem[] = JSON.parse(savedCart);
    if (parsed.length === 0) {
      router.push("/");
      return;
    }
    setCart(parsed);

    fetch("/api/shipping/zones")
      .then((r) => r.json())
      .then((data) => {
        setZones(data.zones ?? []);
        if (data.zones?.[0]) setSelectedZone(data.zones[0]);
      });

    trackEvent("start_checkout", {
      total: parsed.reduce((s, i) => s + i.price * i.quantity, 0),
      items: parsed.length,
    });
  }, [router]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = coupon?.discount ?? 0;
  const shipping = selectedZone?.price ?? 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setValidating(true);
    setCouponError(null);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput, subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        setCoupon({ code: data.coupon.code, discount: data.discount });
        trackEvent("apply_coupon", { code: data.coupon.code, type: data.coupon.type });
      } else {
        setCouponError(data.error ?? "Cupón inválido");
      }
    } catch {
      setCouponError("Error validando el cupón");
    } finally {
      setValidating(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedZone) return;

    const form = e.currentTarget;
    const customer = {
      first_name: (form.elements.namedItem("first_name") as HTMLInputElement).value,
      last_name: (form.elements.namedItem("last_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value || undefined,
    };

    const shippingInfo = {
      carrier: selectedZone.name,
      cost: selectedZone.price,
      street: (form.elements.namedItem("street") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      state: (form.elements.namedItem("state") as HTMLInputElement).value,
      postal_code: (form.elements.namedItem("postal_code") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value || undefined,
    };

    localStorage.setItem("checkout_customer", JSON.stringify(customer));
    localStorage.setItem("checkout_shipping", JSON.stringify(shippingInfo));
    if (coupon) localStorage.setItem("checkout_coupon", JSON.stringify(coupon));
    else localStorage.removeItem("checkout_coupon");

    router.push("/checkout");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-16">
      <h1 className="font-display text-4xl lg:text-5xl text-neutral-900 mb-12">
        Datos del pedido
      </h1>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
          {/* Datos del comprador */}
          <section>
            <h2 className="font-display text-xl mb-6">Tus datos</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Nombre" name="first_name" required />
              <FormField label="Apellido" name="last_name" required />
              <FormField label="Email" name="email" type="email" required className="sm:col-span-2" />
              <FormField label="Teléfono (opcional)" name="phone" type="tel" className="sm:col-span-2" />
            </div>
          </section>

          {/* Zona de envío */}
          <section>
            <h2 className="font-display text-xl mb-6">Envío</h2>
            <div className="space-y-3">
              {zones.map((zone) => (
                <label
                  key={zone.id}
                  className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedZone?.id === zone.id
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <input
                        type="radio"
                        name="zone"
                        checked={selectedZone?.id === zone.id}
                        onChange={() => {
                          setSelectedZone(zone);
                          trackEvent("select_shipping_zone", { zone: zone.name, cost: zone.price });
                        }}
                        className="sr-only"
                      />
                      <p className="font-body font-medium text-neutral-900">{zone.name}</p>
                      {zone.description && (
                        <p className="font-body text-sm text-neutral-600 mt-1">{zone.description}</p>
                      )}
                    </div>
                    <span className="font-body font-semibold text-neutral-900">
                      ${zone.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <FormField label="Calle y número" name="street" required className="sm:col-span-2" />
              <FormField label="Ciudad" name="city" required />
              <FormField label="Provincia" name="state" required />
              <FormField label="Código postal" name="postal_code" required />
            </div>

            <div className="mt-4">
              <label className="block font-body text-sm text-neutral-600 mb-1">
                Notas para el envío (opcional)
              </label>
              <textarea
                name="notes"
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors font-body"
              />
            </div>
          </section>

          {/* Cupón */}
          <section>
            <h2 className="font-display text-xl mb-4">¿Tenés un cupón?</h2>
            <div className="flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="CUPON10"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-md focus:border-brand-primary focus:outline-none font-body uppercase"
                disabled={!!coupon}
              />
              {coupon ? (
                <button
                  type="button"
                  onClick={() => {
                    setCoupon(null);
                    setCouponInput("");
                  }}
                  className="px-4 py-3 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 transition-colors"
                >
                  Quitar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={validating || !couponInput.trim()}
                  className="px-6 py-3 bg-neutral-900 text-neutral-50 rounded-md hover:bg-brand-primary transition-colors disabled:opacity-50"
                >
                  {validating ? "Validando..." : "Aplicar"}
                </button>
              )}
            </div>
            {couponError && (
              <p className="font-body text-sm text-red-600 mt-2">{couponError}</p>
            )}
            {coupon && (
              <p className="font-body text-sm text-green-700 mt-2">
                ✓ Cupón {coupon.code} aplicado: -${coupon.discount.toLocaleString("es-AR")}
              </p>
            )}
          </section>

          <button
            type="submit"
            disabled={!selectedZone}
            className="w-full bg-brand-primary text-neutral-50 py-4 rounded-full font-medium hover:scale-[1.01] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/30"
          >
            Continuar al pago
          </button>
        </form>

        {/* Resumen */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 bg-neutral-50 rounded-lg p-6 border border-neutral-200">
            <h3 className="font-display text-lg mb-6">Resumen del pedido</h3>

            <div className="space-y-4 mb-6">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-neutral-200 last:border-0 last:pb-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm">{item.name}</p>
                    {item.variant_name && (
                      <p className="font-body text-xs text-neutral-600">{item.variant_name}</p>
                    )}
                    <p className="font-body text-xs text-neutral-500 mt-1">
                      {item.quantity} × ${item.price.toLocaleString("es-AR")}
                    </p>
                  </div>
                  <p className="font-body text-sm font-medium">
                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pb-4 border-b border-neutral-200 mb-4">
              <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString("es-AR")}`} />
              {coupon && (
                <SummaryRow
                  label={`Descuento (${coupon.code})`}
                  value={`-$${coupon.discount.toLocaleString("es-AR")}`}
                  highlight
                />
              )}
              {selectedZone && (
                <SummaryRow
                  label={`Envío (${selectedZone.name})`}
                  value={`$${selectedZone.price.toLocaleString("es-AR")}`}
                />
              )}
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-display text-xl">Total</span>
              <span className="font-display text-2xl font-bold text-brand-primary">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-body text-sm text-neutral-600 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors font-body"
      />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-body text-neutral-600">{label}</span>
      <span className={`font-body font-medium ${highlight ? "text-green-700" : "text-neutral-900"}`}>
        {value}
      </span>
    </div>
  );
}
```

---

## `app/checkout/status/page.tsx` — Resultado del pago

```tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const STATUS_CONFIG = {
  approved: {
    title: "✅ ¡Gracias por tu compra!",
    subtitle: "Tu pago fue aprobado. Te enviamos un email con el detalle.",
    color: "text-green-700",
  },
  pending: {
    title: "⏳ Pago pendiente",
    subtitle: "Estamos esperando la confirmación. Te avisaremos por email.",
    color: "text-amber-600",
  },
  in_process: {
    title: "⏳ Pago en revisión",
    subtitle: "El pago está siendo procesado. Recibirás novedades por email.",
    color: "text-amber-600",
  },
  rejected: {
    title: "❌ Pago rechazado",
    subtitle: "No pudimos procesar el pago. Intentá de nuevo o usá otro método.",
    color: "text-red-600",
  },
};

export default function CheckoutStatusPage() {
  const params = useSearchParams();
  const status = (params.get("status") as keyof typeof STATUS_CONFIG) ?? "pending";
  const paymentId = params.get("payment_id");

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className={`font-display text-4xl lg:text-5xl mb-6 ${config.color}`}>
          {config.title}
        </h1>
        <p className="font-body text-lg text-neutral-600 mb-8">{config.subtitle}</p>

        {paymentId && (
          <p className="font-body text-sm text-neutral-500 mb-8">
            ID de pago: <span className="font-mono">{paymentId}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-neutral-900 text-neutral-50 px-8 py-3 rounded-full hover:bg-brand-primary transition-colors font-body"
          >
            Volver al inicio
          </Link>
          {status === "rejected" && (
            <Link
              href="/checkout/datos"
              className="border border-neutral-900 text-neutral-900 px-8 py-3 rounded-full hover:bg-neutral-900 hover:text-neutral-50 transition-colors font-body"
            >
              Intentar de nuevo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## Reglas

1. **Form en una sola página** (`/checkout/datos`) con secciones claras: datos → envío → cupón → resumen.
2. **Resumen sticky en desktop**, abajo en mobile.
3. **Validación inline** en email y código postal.
4. **Cupón con feedback visible** (verde si aplicó, rojo si error).
5. **Selección de zona como radios estilizados** (no select), para que se vea el precio de cada uno.
6. **Total en grande con color de marca** — es lo más importante.
7. **Botón "Continuar al pago" disabled** hasta que haya zona seleccionada.
8. **Persistir todo en localStorage** antes de pasar al Payment Brick.
9. **Trackear `start_checkout`, `select_shipping_zone`, `apply_coupon`** en cada etapa.

---

## Diferencia para plan Empresa con Envia.com

Si el plan es Empresa con Envia.com, **reemplazar la sección "Zona de envío"** por:
1. Primero pedir CP + ciudad + provincia.
2. Cuando el comprador completa eso, hacer POST a `/api/shipping/calculate`.
3. Mostrar las opciones reales (OCA, Andreani, etc.) como radios.
4. Cuando elige una, guardar como `shipping` con `carrier`, `service`, `cost`, etc.

El resto del flujo es idéntico.

---

## Validación

- [ ] Form completo: datos comprador + dirección + zona + cupón.
- [ ] Resumen sticky con cart + descuento + envío + total.
- [ ] Validación de cupón funcional con feedback visible.
- [ ] Selección de zona como radios estilizados.
- [ ] localStorage actualizado antes de redirect a `/checkout`.
- [ ] Tracking de eventos completo.
- [ ] Status page con 4 variantes (approved, pending, in_process, rejected).
- [ ] Mobile: form en una columna, resumen abajo.
