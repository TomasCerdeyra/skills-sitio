# Reference: `app/api/shipping/calculate/route.ts` (Plan Empresa — Rama A: Envia.com)

Path destino: `app/api/shipping/calculate/route.ts`

**Solo crear este archivo si el plan Empresa eligió Envia.com como provider de envíos.** Si eligió zonas fijas, usar `scaffold-emprendimiento--ref--api-shipping-zones.md`.

Endpoint que consulta tarifas reales a la API de Envia.com con origen (datos del tenant) y destino (dirección del comprador), y devuelve opciones de carriers (OCA, Andreani, Correo Argentino) con sus precios.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface ShippingAddress {
  street: string;
  city: string;
  postal_code: string;
  state: string;
}

export async function POST(request: NextRequest) {
  const { destination, items } = (await request.json()) as {
    destination: ShippingAddress;
    items: Array<{ weight?: number; quantity: number }>;
  };

  if (!destination?.postal_code) {
    return NextResponse.json({ error: "Destino inválido" }, { status: 400 });
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const supabaseAdmin = createAdminClient();

  const { data: tenant } = await supabaseAdmin
    .from("tenants")
    .select(
      "envia_access_token, origin_name, origin_phone, origin_address, origin_city, origin_postal_code, origin_state"
    )
    .eq("id", tenantId)
    .single();

  if (!tenant?.envia_access_token) {
    return NextResponse.json(
      { error: "Envíos no configurados para este tenant" },
      { status: 503 }
    );
  }

  if (
    !tenant.origin_name ||
    !tenant.origin_address ||
    !tenant.origin_city ||
    !tenant.origin_postal_code ||
    !tenant.origin_state
  ) {
    return NextResponse.json(
      { error: "Datos de origen incompletos en el tenant" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.envia.com/ship/rate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tenant.envia_access_token}`,
      },
      body: JSON.stringify({
        origin: {
          name: tenant.origin_name,
          phone: tenant.origin_phone,
          street: tenant.origin_address,
          city: tenant.origin_city,
          state: tenant.origin_state,
          postal_code: tenant.origin_postal_code,
          country: "AR",
        },
        destination: {
          street: destination.street,
          city: destination.city,
          state: destination.state,
          postal_code: destination.postal_code,
          country: "AR",
        },
        packages: [
          {
            weight: items.reduce(
              (acc, item) => acc + (item.weight ?? 0.5) * item.quantity,
              0
            ),
            dimensions: { length: 20, width: 20, height: 10 },
          },
        ],
        shipment: { carrier: "all" },
      }),
    });

    if (!response.ok) {
      throw new Error(`Envia.com error: ${response.status}`);
    }

    const data = await response.json();

    const options = (data.data ?? []).map((rate: {
      carrier: string;
      service: string;
      totalPrice: number;
      deliveryDate?: string;
    }) => ({
      carrier: rate.carrier,
      service: rate.service,
      price: rate.totalPrice,
      estimated_delivery: rate.deliveryDate ?? null,
    }));

    return NextResponse.json({ options });
  } catch (error) {
    console.error("Error calculando envío:", error);
    return NextResponse.json(
      { error: "No se pudo calcular el costo de envío" },
      { status: 500 }
    );
  }
}
```

## Cómo lo consume el checkout

El comprador ingresa su dirección + CP → el form llama a `POST /api/shipping/calculate` con `{ destination, items }` → recibe opciones reales de carriers → elige una.

El payload a `/api/create-preference` lleva:

```typescript
shipping: {
  carrier: "OCA",                    // del response de Envia
  service: "Estándar",               // del response de Envia
  cost: 1850,
  street: "Av. Corrientes 1234",
  city: "Buenos Aires",
  state: "CABA",
  postal_code: "1043",
}
```

Esto pobla las columnas `shipping_carrier`, `shipping_service`, `shipping_cost`, `shipping_postal_code` y el JSONB `shipping_address` en `orders`.

## Notas importantes

- **Si falta `envia_access_token` o algún `origin_*`, el endpoint devuelve 503 con mensaje claro.** No silenciar el error — el comprador debe ver "envíos no disponibles" para que sepa que algo falla.
- El peso default por ítem es `0.5kg`. Si los productos tienen peso definido en la base, usarlo en lugar del default. Hoy el schema no tiene columna `weight` en `products` — para implementarlo, agregar la columna o gestionar peso desde el admin panel.
- Las dimensiones default son `20x20x10cm`. Para productos grandes el cliente debería poder configurarlas (mejora futura).
- La API de Envia.com puede cambiar — verificar con su documentación oficial: [envia.com/api](https://envia.com).
