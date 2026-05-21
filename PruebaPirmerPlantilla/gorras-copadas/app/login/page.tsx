import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p
            className="text-[#D4FF00] text-2xl tracking-widest mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            GORRAS COPADAS
          </p>
          <p className="text-[#A0A0A0] text-sm">Panel de administración</p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-[#A0A0A0] mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-[#141414] border border-[#2E2E2E] rounded-xl text-white focus:outline-none focus:border-[#D4FF00] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs text-[#A0A0A0] mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-[#141414] border border-[#2E2E2E] rounded-xl text-white focus:outline-none focus:border-[#D4FF00] transition-colors"
            />
          </div>

          {error === "invalid_credentials" && (
            <p className="text-[#FF3131] text-sm text-center">
              Email o contraseña incorrectos.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full hover:bg-white transition-colors mt-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}
