# Reference: `app/auth/signout/route.ts`

Path destino: `app/auth/signout/route.ts`

Endpoint POST que cierra la sesión y redirige a `/login`.

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL!));
}
```
