# Reference: `app/api/tenant-config/route.ts`

Path destino: `app/api/tenant-config/route.ts`

Endpoint que devuelve la config pública del tenant (incluye `mp_public_key` para los planes con pagos). Si el plan es Esencial y NO usa MP, igual funciona — `mp_public_key` será null.

```typescript
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!tenantId) {
    return NextResponse.json({ error: "tenantId no configurado" }, { status: 500 });
  }

  const supabaseAdmin = createAdminClient();

  const { data: tenant, error } = await supabaseAdmin
    .from("tenants")
    .select("name, slug, plan, status, max_products, umami_url, mp_public_key")
    .eq("id", tenantId)
    .single();

  if (error || !tenant) {
    return NextResponse.json({ error: "Tenant no encontrado" }, { status: 404 });
  }

  return NextResponse.json(tenant);
}
```
