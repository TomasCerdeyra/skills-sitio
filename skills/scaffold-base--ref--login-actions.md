# Reference: `app/login/actions.ts`

Path destino: `app/login/actions.ts`

Server actions para login y signup. El signup crea automáticamente la membresía en `user_tenants`.

> ⚠️ **Next.js 15+:** Las funciones usadas como `formAction` en JSX deben retornar `Promise<void>`. NO retornar objetos `{ error: string }` — TypeScript falla con "not assignable to type `(formData: FormData) => void | Promise<void>`". Los errores se manejan con `console.error` + `return` sin valor.

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    // En producción: mostrar feedback al usuario via URL params o server state
    console.error("Login error:", error.message);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signup(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  const { data: authData, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("Signup error:", error.message);
    return;
  }

  if (authData.user && tenantId) {
    await adminClient.from("user_tenants").insert({
      user_id: authData.user.id,
      tenant_id: tenantId,
      role: "admin",
    });
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
```
