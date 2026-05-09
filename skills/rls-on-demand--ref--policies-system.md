# Reference: Políticas RLS para `tenants` y `user_tenants`

Aplica a TODOS los planes.

```sql
-- =============================================
-- tenants
-- =============================================
DROP POLICY IF EXISTS "Users can view own tenants" ON public.tenants;

CREATE POLICY "Users can view own tenants"
  ON public.tenants FOR SELECT TO authenticated
  USING (
    id IN (SELECT tenant_id FROM public.user_tenants WHERE user_id = (SELECT auth.uid()))
  );

-- =============================================
-- user_tenants
-- =============================================
DROP POLICY IF EXISTS "Users can view own memberships" ON public.user_tenants;

CREATE POLICY "Users can view own memberships"
  ON public.user_tenants FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);
```

## Notas

- Solo lectura para `tenants` y `user_tenants` desde `authenticated`.
- La escritura en estas tablas se hace exclusivamente con `service_role` (creación de tenants nuevos, asignación de membresías).
- Estas políticas permiten que un usuario logueado pueda ver a qué tenants pertenece, lo cual es necesario para el panel admin externo.
