# Reference: `app/api/shipping/zones/route.ts` (Plan Emprendimiento)

Path destino: `app/api/shipping/zones/route.ts`

Endpoint que devuelve las zonas de envío activas del tenant. El checkout llama a este endpoint para mostrar las opciones al comprador.

```typescript
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  if (!tenantId) {
    return NextResponse.json({ error: "tenantId no configurado" }, { status: 500 });
  }

  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("shipping_zones")
    .select("id, name, description, price")
    .eq("tenant_id", tenantId)
    .eq("active", true)
    .order("position");

  if (error) {
    console.error("Error obteniendo zonas:", error);
    return NextResponse.json({ error: "Error obteniendo zonas" }, { status: 500 });
  }

  return NextResponse.json({ zones: data ?? [] });
}
```

## Cómo lo consume el checkout

El form de checkout (que arma `sitio-diseno`) llama a `GET /api/shipping/zones` y muestra las opciones al comprador como radios o select. Cuando el comprador elige una, el payload a `/api/create-preference` lleva:

```typescript
shipping: {
  carrier: zone.name,        // "CABA", "GBA", etc.
  service: undefined,        // null en zonas fijas
  cost: zone.price,
  street: ...,               // dirección que ingresó el comprador
  city: ...,
  state: ...,
  postal_code: ...,
}
```

## Notas

- Las zonas inactivas no se devuelven (filtro `active = true`).
- El admin panel externo gestiona las zonas (CRUD desde fuera de este proyecto).
- Si no hay zonas cargadas, devuelve `{ zones: [] }` — el checkout debe manejar este caso (mostrar mensaje al comprador y bloquear avance).
