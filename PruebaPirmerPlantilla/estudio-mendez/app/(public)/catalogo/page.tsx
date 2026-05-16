import { redirect } from "next/navigation";

// Redirige /catalogo → /servicios (los servicios son el catálogo en este plan)
export default function CatalogoPage() {
  redirect("/servicios");
}
