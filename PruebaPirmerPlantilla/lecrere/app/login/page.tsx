import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm">
        <p className="font-display text-3xl tracking-[0.15em] uppercase text-center mb-2">
          Lecrere
        </p>
        <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-500 text-center mb-10">
          Panel de administración
        </p>
        <form action={login} className="space-y-4">
          <div>
            <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors bg-transparent"
              placeholder="admin@lecrere.com.ar"
            />
          </div>
          <div>
            <label className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-primary transition-colors bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-primary text-neutral-50 py-3.5 font-body text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
