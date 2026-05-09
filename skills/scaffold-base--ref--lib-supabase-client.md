# Reference: `lib/supabase/client.ts`

Path destino: `lib/supabase/client.ts`

Cliente browser de Supabase. Usar en componentes `"use client"`.

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```
