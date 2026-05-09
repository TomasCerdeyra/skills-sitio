---
name: mercadopago-connection
description: Configura la integración completa con Mercado Pago en proyectos Next.js de SitioHoy (planes Emprendimiento y Empresa). Incluye creación de preferencia con orden + order_items, procesamiento de pago con Payment Brick, webhook con detección de transición a approved, aplicación de cupones (con incremento de uses_count), populación completa de las columnas de envío y descuento de orders, y disparo de emails de confirmación vía resend-email. Multi-tenant — credenciales por tenant en Supabase. Usar cuando el usuario quiera integrar Mercado Pago, configurar pagos, crear checkout, manejar webhooks, o cuando un scaffold lo invoque.
---

# Skill: Mercado Pago Connection

Integración completa con Mercado Pago para los planes Emprendimiento y Empresa.

## Stack requerido

- Next.js App Router + TypeScript
- Supabase configurado (skill `supabase-connection`)
- `tenants` con `mp_access_token` y `mp_public_key` cargados
- Tablas `orders`, `order_items`, `coupons`
- `lib/email/send.ts` y `lib/email/templates/payment.ts` (skill `resend-email`)
- `app/api/tenant-config/route.ts` (lo provee `scaffold-base`)

## Dependencias

```bash
npm install mercadopago @mercadopago/sdk-react
```

## Variables de entorno

Las credenciales de MP **NO** van en `.env.local`. Se almacenan por tenant:
- `tenants.mp_access_token` — Token privado (server-only)
- `tenants.mp_public_key` — Clave pública (se expone al cliente vía `/api/tenant-config`)

La única env relacionada es:
```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com.ar
```
Se usa para `back_urls` y `notification_url`. En localhost no se configuran webhooks.

---

## Generar archivos del proyecto

| Ref a leer | Path destino |
|---|---|
| `mercadopago-connection--ref--api-create-preference.md` | `app/api/create-preference/route.ts` |
| `mercadopago-connection--ref--api-process-payment.md` | `app/api/process-payment/route.ts` |
| `mercadopago-connection--ref--api-webhook.md` | `app/api/webhooks/mercadopago/route.ts` |
| `mercadopago-connection--ref--checkout-page.md` | `app/checkout/page.tsx` (placeholder con Payment Brick — el skill de diseño lo estiliza) |

---

## Flujo completo

1. **Cliente** captura datos del comprador (`customer`), zona/carrier de envío (`shipping`) y opcionalmente cupón validado (`coupon`).
2. **Cliente** llama a `GET /api/tenant-config` → recibe `mp_public_key`.
3. **Cliente** inicializa el SDK con `initMercadoPago(publicKey, { locale: "es-AR" })`.
4. **Cliente** llama a `POST /api/create-preference` con `{ items, tenantId, customer, shipping, coupon? }`.
5. **Servidor** crea `orders` con todas las columnas (shipping_*, coupon_code, discount_amount, customer_*, payer_email).
6. **Servidor** crea N filas en `order_items`.
7. **Servidor** crea preferencia en MP con ítems + descuento (negativo) + shipping como ítem extra.
8. **Cliente** renderiza el Payment Brick con `preferenceId`.
9. **Usuario** completa el formulario de pago.
10. **Cliente** llama a `POST /api/process-payment` con `{ formData, tenantId, orderId }`.
11. **Servidor** crea el pago en MP, actualiza `orders` con `mp_payment_id` y status, incrementa `coupons.uses_count` si aplicó cupón, envía email de confirmación.
12. **Cliente** redirige a `/checkout/status`.
13. **Webhook** recibe notificación asíncrona, actualiza estado final, e incrementa cupón + envía email solo en transición de no-approved a approved (evita duplicados).

---

## Tipos de datos esperados

El endpoint `create-preference` espera este payload del cliente:

```typescript
{
  items: Array<{
    id: string;             // product_id
    variant_id?: string;
    name: string;
    variant_name?: string;
    price: number;          // unit price
    quantity: number;
  }>;
  tenantId: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  shipping: {
    carrier: string;        // "OCA" o nombre de zona ("CABA")
    service?: string;       // "Estándar" o null si es zona fija
    cost: number;
    street?: string;
    city?: string;
    state?: string;
    postal_code: string;
    notes?: string;
  };
  coupon?: {
    code: string;
    discount: number;       // monto del descuento ya calculado
  };
}
```

---

## Notas importantes

- Las credenciales de MP se obtienen de `tenants.mp_access_token` y `tenants.mp_public_key` (multi-tenant).
- El `external_reference` vincula la preferencia con la orden en Supabase.
- Si es localhost, no se configuran `back_urls` ni `notification_url`.
- La moneda fija es `ARS`.
- El webhook siempre responde `{ received: true }` para no generar reintentos de MP.
- El incremento de `uses_count` se hace tanto en `process-payment` (instantáneo) como en el `webhook` (cuando pasa a approved). Si la orden ya estaba en approved, el webhook no incrementa de nuevo.
- El email se envía en `process-payment` y también en el webhook (solo en la transición a approved). El template debe ser idempotente — si llega dos veces, no es crítico.
- Los datos del comprador se guardan en columnas dedicadas (`customer_first_name`, `customer_last_name`, `customer_phone`, `payer_email`), NO solo en JSONB.
- `shipping_address` JSONB tiene la dirección completa; las columnas `shipping_carrier`, `shipping_service`, `shipping_cost`, `shipping_postal_code` se popular para queries rápidas y reporting.

## Reglas

1. **Email NUNCA rompe el pago** — siempre en try/catch independiente.
2. **Todas las credenciales** vienen de la tabla `tenants`, no de `.env`.
3. **El webhook es idempotente** — verificar transición de status para no duplicar acciones.
4. **`order_items` se crea SIEMPRE** junto con la orden, no solo el JSONB en `orders.shipping_address`.
5. **Cupones: incrementar `uses_count` solo cuando el pago es válido** (approved/in_process/pending) y solo una vez.
