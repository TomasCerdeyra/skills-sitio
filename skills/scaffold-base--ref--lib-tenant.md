# Reference: `lib/tenant.ts`

Path destino: `lib/tenant.ts`

Helper para obtener el tenant ID actual. Falla rápido si no está configurado.

```typescript
export function getTenantId(): string {
  const id = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!id) throw new Error("NEXT_PUBLIC_TENANT_ID no está definido");
  return id;
}
```
