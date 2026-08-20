---
name: correo-argentino
description: Integración Correo Argentino (MiCorreo API) — cotización en tiempo real, pre-registro de envíos y tracking. Solo Plan Empresa, se activa cuando el scaffold pregunta si usa Correo Argentino directo (sin Envia.com como intermediario). Requiere cuenta MiCorreo activa. Las credenciales viven en platform_config (nivel plataforma), el customer_id del negocio en tenants.
tipo: integración — solo Plan Empresa (Módulo 4.8 opcional, si el usuario elige Correo Argentino directo en vez de Envia.com)
---

# Integración Correo Argentino (MiCorreo API)

> Las credenciales de acceso MiCorreo de la plataforma viven en `platform_config`, no en `.env` ni en `tenants`.
> El `customer_id` específico de cada negocio vive en `tenants.correo_argentino_customer_id` y se carga desde el panel admin.

## ⚠️ Limitación crítica — leer antes de implementar

La API de MiCorreo es una herramienta de **pre-carga**, NO de etiquetas automáticas:

| Capacidad | Disponible |
|---|---|
| Cotización en tiempo real | ✅ |
| Pre-registro del envío (pre-imposición) | ✅ |
| Tracking del envío | ✅ |
| Generación de etiqueta PDF | ❌ |

El PDF de la etiqueta se genera **solo desde el portal web** de MiCorreo (`correoargentino.com.ar/MiCorreo`). El comerciante entra, selecciona el envío importado, paga (si no tiene cuenta corriente) e imprime la etiqueta.

Para etiquetas PDF automáticas existe la API Corporativa (Web Services), que requiere un contrato corporativo separado con Correo Argentino.

---

## URLs base

```env
# Solo la URL base en .env (test vs prod)
CA_API_URL=https://apitest.correoargentino.com.ar/micorreo/v1   # testing
# CA_API_URL=https://api.correoargentino.com.ar/micorreo/v1     # producción
```

Las credenciales (user, password) NO van en `.env` ni en `tenants` — se leen de `platform_config` en Supabase.
Para productos físicos, las cotizaciones deben usar `products.weight_grams`,
`length_cm`, `width_cm` y `height_cm`. Si se usan defaults estimados, registrarlo
en `proyecto-tracking.json`.

`tenants.origin_postal_code` es obligatorio para cotizar. Sin ese campo, MiCorreo responde:
`El codigo Postal del emisor debe tener valor`.

## Schema requerido — `platform_config`

```sql
CREATE TABLE public.platform_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  correo_argentino_user text,
  correo_argentino_password text,
  correo_argentino_customer_id text,
  correo_argentino_token text,
  correo_argentino_token_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

---

## Errores conocidos — leer antes de implementar

| Error | Causa | Fix |
|---|---|---|
| `401 Unauthorized` | Token JWT expirado o Basic Auth inválido | Refrescar token via POST `/token` |
| `402 Cliente FAP no identificado` | `customerId` inválido o no registrado | Llamar `/users/validate` para obtener `customerId` correcto |
| `402 Peso no valido` | `dimensions.weight` fuera de rango | Peso en gramos, mínimo 1g, máximo 25000g |
| `402 La provincia es invalida` | Código de provincia incorrecto | Usar los códigos de una sola letra de la tabla abajo |
| `402 El alto/ancho/largo debe estar entre 0 y 255` | Dimensiones en centímetros fuera de rango | Máximo 150cm para cotización, 255cm para importación |
| `402 La orden ya fue importada con anterioridad` | `extOrderId` duplicado | Usar `orderId` único por orden |
| `402 El codigo Postal del emisor debe tener valor` | Falta `origin_postal_code` en `tenants` | Completar datos de origen en Supabase |

---

## Códigos de provincia MiCorreo

```typescript
// lib/correo-argentino/provinces.ts
export const CA_PROVINCE_CODES: Record<string, string> = {
  'salta': 'A',
  'buenos aires': 'B',
  'provincia de buenos aires': 'B',
  'ciudad autónoma de buenos aires': 'C',
  'caba': 'C',
  'capital federal': 'C',
  'san luis': 'D',
  'entre ríos': 'E',
  'entre rios': 'E',
  'la rioja': 'F',
  'santiago del estero': 'G',
  'chaco': 'H',
  'san juan': 'J',
  'catamarca': 'K',
  'la pampa': 'L',
  'mendoza': 'M',
  'misiones': 'N',
  'formosa': 'P',
  'neuquén': 'Q',
  'neuquen': 'Q',
  'río negro': 'R',
  'rio negro': 'R',
  'santa fe': 'S',
  'tucumán': 'T',
  'tucuman': 'T',
  'chubut': 'U',
  'tierra del fuego': 'V',
  'corrientes': 'W',
  'córdoba': 'X',
  'cordoba': 'X',
  'jujuy': 'Y',
  'santa cruz': 'Z',
}

export const toCAProvinceCode = (province: string): string =>
  CA_PROVINCE_CODES[province.toLowerCase().trim()] ?? province.slice(0, 1).toUpperCase()
```

> Estos códigos son distintos de los de `lib/envia/provinces.ts` (ISO 3166-2:AR). No mezclar.

---

## `lib/correo-argentino/client.ts`

```typescript
import { createServiceClient } from '@/lib/supabase/server'
import { env } from '@/lib/config/env'

const CA_API = process.env.CA_API_URL ?? 'https://api.correoargentino.com.ar/micorreo/v1'

// ─── Token management ────────────────────────────────────────────────────────

async function getCorreoArgentinoConfig() {
  const supabase = createServiceClient()

  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select(`
      id,
      correo_argentino_customer_id,
      origin_postal_code
    `)
    .eq('id', env.NEXT_PUBLIC_TENANT_ID)
    .single()

  if (tenantError || !tenant) throw new Error('Tenant no encontrado para Correo Argentino.')

  const { data: platform, error: platformError } = await supabase
    .from('platform_config')
    .select(`
      id,
      correo_argentino_user,
      correo_argentino_password,
      correo_argentino_customer_id,
      correo_argentino_token,
      correo_argentino_token_expires_at
    `)
    .limit(1)
    .single()

  if (platformError || !platform) {
    throw new Error('Credenciales de Correo Argentino no configuradas en platform_config.')
  }

  return { tenant, platform }
}

export async function getCAToken(): Promise<string> {
  const { platform } = await getCorreoArgentinoConfig()

  // Devolver token cacheado si todavía es válido (con 5 min de margen)
  if (platform.correo_argentino_token && platform.correo_argentino_token_expires_at) {
    const expiresAt = new Date(platform.correo_argentino_token_expires_at)
    if (expiresAt > new Date(Date.now() + 5 * 60 * 1000)) {
      return platform.correo_argentino_token
    }
  }

  if (!platform.correo_argentino_user || !platform.correo_argentino_password) {
    throw new Error('Credenciales de Correo Argentino no configuradas en platform_config.')
  }

  // Refrescar token via Basic Auth
  const credentials = Buffer.from(
    `${platform.correo_argentino_user}:${platform.correo_argentino_password}`
  ).toString('base64')

  const res = await fetch(`${CA_API}/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${credentials}` },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Error obteniendo token CA: ${res.status} ${body}`)
  }

  const { token, expires } = await res.json() as { token: string; expires: string }
  const expiresDate = new Date(expires)
  const expiresAt = isNaN(expiresDate.getTime())
    ? new Date(Date.now() + 60 * 60 * 1000)
    : expiresDate

  // Guardar en DB
  const supabase = createServiceClient()
  await supabase
    .from('platform_config')
    .update({
      correo_argentino_token: token,
      correo_argentino_token_expires_at: expiresAt.toISOString(),
    })
    .eq('id', platform.id)

  return token
}

// ─── Customer ID ─────────────────────────────────────────────────────────────

export async function getCACustomerId(): Promise<string> {
  const { tenant, platform } = await getCorreoArgentinoConfig()

  if (tenant.correo_argentino_customer_id) {
    return tenant.correo_argentino_customer_id
  }

  // Obtener customerId via /users/validate
  const token = await getCAToken()
  const res = await fetch(`${CA_API}/users/validate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: platform.correo_argentino_user,
      password: platform.correo_argentino_password,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Error validando usuario CA: ${res.status} ${body}`)
  }

  const { customerId } = await res.json() as { customerId: string }

  // Guardar en DB
  const supabase = createServiceClient()
  await supabase
    .from('tenants')
    .update({ correo_argentino_customer_id: customerId })
    .eq('id', tenant.id)

  return customerId
}

// ─── Cotización ───────────────────────────────────────────────────────────────

export interface CADimensions {
  weight: number   // gramos, min 1, max 25000
  height: number   // cm, max 150
  width: number    // cm, max 150
  length: number   // cm, max 150
}

export interface CARateResult {
  deliveredType: 'D' | 'S'
  productType: string
  productName: string
  price: number
  deliveryTimeMin: string
  deliveryTimeMax: string
}

export async function getShippingRates(params: {
  postalCodeOrigin: string
  postalCodeDestination: string
  dimensions: CADimensions
}): Promise<CARateResult[]> {
  const [token, customerId] = await Promise.all([getCAToken(), getCACustomerId()])

  const res = await fetch(`${CA_API}/rates`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      postalCodeOrigin: params.postalCodeOrigin,
      postalCodeDestination: params.postalCodeDestination,
      dimensions: {
        weight: Math.round(params.dimensions.weight),
        height: Math.round(params.dimensions.height),
        width: Math.round(params.dimensions.width),
        length: Math.round(params.dimensions.length),
      },
      // Sin deliveredType = devuelve ambos (domicilio + sucursal)
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Error cotizando envío CA: ${res.status} ${body}`)
  }

  const data = await res.json() as { rates: CARateResult[] }
  return data.rates ?? []
}

// ─── Importar envío (pre-imposición) ─────────────────────────────────────────

export interface CAImportParams {
  extOrderId: string          // ID único de la orden en SitioHoy
  orderNumber: string         // Número visible para el comerciante
  recipient: {
    name: string
    email: string
    phone?: string
    cellPhone?: string
  }
  shipping: {
    deliveryType: 'D' | 'S'  // D = domicilio, S = sucursal
    agency?: string            // Código de sucursal, solo si deliveryType = 'S'
    address: {
      streetName: string
      streetNumber: string
      floor?: string
      apartment?: string
      city: string
      provinceCode: string    // Código de 1 letra — usar toCAProvinceCode()
      postalCode: string
    }
    weight: number             // gramos
    declaredValue: number      // ARS
    height: number             // cm
    length: number             // cm
    width: number              // cm
  }
}

export async function importShipping(params: CAImportParams): Promise<void> {
  const [token, customerId] = await Promise.all([getCAToken(), getCACustomerId()])

  const res = await fetch(`${CA_API}/shipping/import`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      extOrderId: params.extOrderId,
      orderNumber: params.orderNumber,
      sender: {
        name: null, phone: null, cellPhone: null, email: null,
        originAddress: {
          streetName: null, streetNumber: null, floor: null, apartment: null,
          city: null, provinceCode: null, postalCode: null,
        },
      },
      recipient: {
        name: params.recipient.name,
        email: params.recipient.email,
        phone: params.recipient.phone ?? '',
        cellPhone: params.recipient.cellPhone ?? '',
      },
      shipping: {
        deliveryType: params.shipping.deliveryType,
        productType: 'CP',
        agency: params.shipping.agency ?? null,
        address: params.shipping.address,
        weight: Math.round(params.shipping.weight),
        declaredValue: params.shipping.declaredValue,
        height: Math.round(params.shipping.height),
        length: Math.round(params.shipping.length),
        width: Math.round(params.shipping.width),
      },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Error importando envío CA: ${res.status} ${body}`)
  }
}

// ─── Tracking ─────────────────────────────────────────────────────────────────

export interface CATrackingEvent {
  event: string
  date: string
  branch: string
  status: string
  sign: string
}

export interface CATrackingResult {
  id: string | null
  productId: string | null
  trackingNumber: string
  events: CATrackingEvent[]
}

export async function getTracking(shippingId: string): Promise<CATrackingResult | null> {
  const token = await getCAToken()

  const res = await fetch(`${CA_API}/shipping/tracking`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shippingId }),
  })

  if (!res.ok) return null

  const data = await res.json()

  // La API devuelve array o objeto con error
  if (Array.isArray(data) && data.length > 0) return data[0] as CATrackingResult
  if (data?.error) return null

  return data as CATrackingResult
}
```

---

## Server Action — cotizar envío (checkout Step 2)

```typescript
// app/actions/shipping-ca.ts
'use server'

import { getShippingRates } from '@/lib/correo-argentino/client'
import { toCAProvinceCode } from '@/lib/correo-argentino/provinces'
import { getTenantConfig } from '@/lib/config/tenant'

export async function quoteCorrShipping(params: {
  postalCodeDestination: string
  weight: number    // gramos totales del pedido
  height: number
  width: number
  length: number
}) {
  try {
    const tenant = await getTenantConfig()
    if (!tenant.origin_postal_code) {
      return { ok: false, error: 'Falta configurar el código postal de origen del negocio.' }
    }

    const rates = await getShippingRates({
      postalCodeOrigin: tenant.origin_postal_code,
      postalCodeDestination: params.postalCodeDestination,
      dimensions: {
        weight: params.weight,
        height: params.height,
        width: params.width,
        length: params.length,
      },
    })
    if (!rates.length) {
      return { ok: false, error: 'No hay opciones de envío para ese código postal.' }
    }

    return { ok: true, rates }
  } catch (err) {
    console.error('[CA shipping quote error]', err)
    return { ok: false, error: 'No se pudo cotizar el envío. Revisá el código postal.' }
  }
}
```

El checkout nunca debe usar una tarifa flat como fallback si MiCorreo no devuelve opciones.
El formulario debe deshabilitar el submit mientras `selectedRate === null`.

---

## Server Action — importar envío post-pago

Llamar desde el webhook de MercadoPago **solo cuando `payment_status = 'approved'`**:

```typescript
// Dentro del webhook handler — lib/webhooks/mercadopago.ts
import { importShipping } from '@/lib/correo-argentino/client'
import { toCAProvinceCode } from '@/lib/correo-argentino/provinces'

// Solo si correoArgentino activo en config
if (config.integrations?.correoArgentino && order.shipping_carrier === 'correo-argentino') {
  await importShipping({
    extOrderId: order.id,
    orderNumber: order.id.slice(0, 8).toUpperCase(),
    recipient: {
      name: `${order.customer_first_name} ${order.customer_last_name}`,
      email: order.payer_email,
      phone: order.customer_phone ?? '',
    },
    shipping: {
      deliveryType: 'D',
      address: {
        streetName: order.shipping_address.streetName,
        streetNumber: order.shipping_address.streetNumber,
        floor: order.shipping_address.floor,
        apartment: order.shipping_address.apartment,
        city: order.shipping_address.city,
        provinceCode: toCAProvinceCode(order.shipping_address.state),
        postalCode: order.shipping_postal_code,
      },
      weight: order.total_weight_grams,      // calcular de los order_items
      declaredValue: Number(order.total),
      height: order.total_height_cm ?? 10,
      length: order.total_length_cm ?? 20,
      width: order.total_width_cm ?? 20,
    },
  })
}
```

---

## Flujo de etiquetas — instrucciones para el comerciante

Una vez que SitioHoy importa el envío automáticamente al confirmar el pago, el comerciante debe:

1. Entrar a [correoargentino.com.ar/MiCorreo](https://www.correoargentino.com.ar/MiCorreo)
2. Iniciar sesión con la cuenta MiCorreo operativa definida por la plataforma
3. Ir a "Mis envíos" → encontrar el envío por número de orden
4. Pagar el envío (si la cuenta no tiene saldo o cuenta corriente)
5. Descargar e imprimir la etiqueta
6. Llevar el paquete a una sucursal de Correo Argentino

> Documentar este flujo en el manual de uso que se entrega al cliente junto con el sitio.
