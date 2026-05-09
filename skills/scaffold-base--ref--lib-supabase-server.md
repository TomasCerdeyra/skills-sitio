# Reference: `lib/supabase/server.ts`

Path destino: `lib/supabase/server.ts`

Cliente server de Supabase con manejo de cookies. Usar en Server Components y Server Actions.

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorar si se llama desde un Server Component (solo lectura)
          }
        },
      },
    }
  );
}
```
