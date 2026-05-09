"use client";

import { useState } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAction(action: typeof login, formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-3xl text-neutral-900">Bar Homero</p>
          <p className="text-sm text-neutral-500 mt-1">Acceso al panel de administración</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary text-sm"
                placeholder="admin@barhomero.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                formAction={(formData) => handleAction(login, formData)}
                disabled={loading}
                className="flex-1 bg-brand-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-primary/90 disabled:opacity-60 transition-colors"
              >
                {loading ? "..." : "Ingresar"}
              </button>
              <button
                formAction={(formData) => handleAction(signup, formData)}
                disabled={loading}
                className="flex-1 bg-neutral-100 text-neutral-700 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-200 disabled:opacity-60 transition-colors"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Solo para administradores del local
        </p>
      </div>
    </div>
  );
}
