// Tailwind v4 — la configuración de tema está en app/globals.css (@theme {})
// Este archivo no es necesario en v4 salvo para plugins de terceros.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
};

export default config;
