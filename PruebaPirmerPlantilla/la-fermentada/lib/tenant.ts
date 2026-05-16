export function getTenantId(): string {
  const id = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!id) throw new Error("NEXT_PUBLIC_TENANT_ID no está definido");
  return id;
}
