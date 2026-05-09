# Reference: Configuración del bucket de Storage

**Cuándo usar:** al montar Supabase Storage por primera vez (proyecto nuevo o instancia nueva).

Pegar este SQL en el **SQL Editor de Supabase** (es DDL, no se ejecuta desde la app).

```sql
-- Crear el bucket público con límite de 10MB y solo formatos de imagen
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'objects',
  'objects',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- Policies del bucket
-- =============================================

-- Subir imágenes (usuarios autenticados)
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'objects');

-- Lectura pública
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'objects');

-- Eliminar (usuarios autenticados)
CREATE POLICY "Authenticated users can delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'objects');

-- Actualizar metadata (usuarios autenticados)
CREATE POLICY "Authenticated users can update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'objects');
```

## Notas

- Las policies del bucket de Storage están en `storage.objects`, **distintas** de las RLS que aplica el skill `rls-on-demand` (que actúan sobre las tablas en `public.*`).
- Si el bucket ya existe, el `ON CONFLICT (id) DO NOTHING` evita errores. Las policies sí intentarán crearse — si existen previamente, ajustar agregando `DROP POLICY IF EXISTS "..." ON storage.objects;` antes de cada `CREATE POLICY`.
- El bucket es **público** porque las URLs de las imágenes se exponen en el storefront. El `service_role` del admin panel bypasea estas policies.
