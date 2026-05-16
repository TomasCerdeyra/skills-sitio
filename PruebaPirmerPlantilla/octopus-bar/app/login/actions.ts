"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  const { data: authData, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
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
