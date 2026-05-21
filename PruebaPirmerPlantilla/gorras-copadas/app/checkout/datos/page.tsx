"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type ShippingRate = {
  carrier: string;
  service: string;
  price: number;
  days: string;
};

export default function CheckoutDatosPage() {
  const { items, total, hydrated } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [rateError, setRateError] = useState("");

  if (!hydrated) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  async function fetchRates() {
    if (!form.postalCode || form.postalCode.length < 4) return;
    setLoadingRates(true);
    setRateError("");
    try {
      const res = await fetch("/api/shipping/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postalCode: form.postalCode,
          items: items.map((i) => ({ quantity: i.quantity, weight: 0.2 })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRates(data.rates ?? []);
      if (data.rates?.length) setSelectedRate(data.rates[0]);
    } catch {
      setRateError("No pudimos calcular el envío. Intentá más tarde.");
    } finally {
      setLoadingRates(false);
    }
  }

  function setField(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const checkoutData = {
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
      },
      shippingAddress: {
        street: form.address,
        city: form.city,
        state: form.state,
        postal_code: form.postalCode,
        notes: form.notes,
      },
      shipping: selectedRate,
    };
    sessionStorage.setItem("checkout-data", JSON.stringify(checkoutData));
    router.push("/checkout/pago");
  }

  const shippingCost = selectedRate?.price ?? 0;
  const grandTotal = total + shippingCost;

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          TUS DATOS
        </h1>
        <p className="text-[#A0A0A0] mb-10">Completá tus datos para continuar con el pago.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal */}
          <section className="p-6 bg-[#141414] rounded-2xl border border-[#1A1A1A] space-y-4">
            <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Datos personales</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "firstName", label: "Nombre", autoComplete: "given-name" },
                { id: "lastName", label: "Apellido", autoComplete: "family-name" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs text-[#A0A0A0] mb-1">{f.label}</label>
                  <input
                    id={f.id}
                    required
                    autoComplete={f.autoComplete}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => setField(f.id as keyof typeof form, e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "email", label: "Email", type: "email", autoComplete: "email" },
                { id: "phone", label: "Teléfono", type: "tel", autoComplete: "tel" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs text-[#A0A0A0] mb-1">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    autoComplete={f.autoComplete}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => setField(f.id as keyof typeof form, e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Address */}
          <section className="p-6 bg-[#141414] rounded-2xl border border-[#1A1A1A] space-y-4">
            <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Dirección de envío</h2>
            <div>
              <label htmlFor="address" className="block text-xs text-[#A0A0A0] mb-1">Dirección</label>
              <input
                id="address"
                required
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                placeholder="Calle 1234, Piso 2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-xs text-[#A0A0A0] mb-1">Ciudad</label>
                <input
                  id="city"
                  required
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-xs text-[#A0A0A0] mb-1">Provincia</label>
                <input
                  id="state"
                  required
                  value={form.state}
                  onChange={(e) => setField("state", e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="postalCode" className="block text-xs text-[#A0A0A0] mb-1">Código postal</label>
                <input
                  id="postalCode"
                  required
                  value={form.postalCode}
                  onChange={(e) => setField("postalCode", e.target.value)}
                  onBlur={fetchRates}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                  placeholder="1000"
                />
              </div>
              <button
                type="button"
                onClick={fetchRates}
                disabled={loadingRates}
                className="px-4 py-3 bg-[#2A2A2A] text-white text-sm font-bold rounded-xl hover:bg-[#D4FF00] hover:text-[#0A0A0A] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {loadingRates ? "..." : "Calcular envío"}
              </button>
            </div>

            {/* Shipping rates */}
            {rates.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-[#A0A0A0] font-medium uppercase tracking-widest">Opciones de envío</p>
                {rates.map((rate, i) => (
                  <label
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                      selectedRate?.carrier === rate.carrier && selectedRate?.service === rate.service
                        ? "border-[#D4FF00] bg-[#D4FF00]/5"
                        : "border-[#2E2E2E] hover:border-[#2E2E2E]/80"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      checked={selectedRate?.carrier === rate.carrier && selectedRate?.service === rate.service}
                      onChange={() => setSelectedRate(rate)}
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">{rate.carrier} — {rate.service}</p>
                      <p className="text-[#A0A0A0] text-xs">{rate.days}</p>
                    </div>
                    <span className="text-[#D4FF00] font-bold">${rate.price.toLocaleString("es-AR")}</span>
                  </label>
                ))}
              </div>
            )}
            {rateError && <p className="text-[#FF3131] text-sm">{rateError}</p>}

            <div>
              <label htmlFor="notes" className="block text-xs text-[#A0A0A0] mb-1">Notas de entrega (opcional)</label>
              <input
                id="notes"
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
                placeholder="Timbre roto, dejar con portero..."
              />
            </div>
          </section>

          {/* Total summary */}
          <div className="p-6 bg-[#141414] rounded-2xl border border-[#1A1A1A] flex justify-between items-center">
            <div>
              <p className="text-[#A0A0A0] text-sm">Total con envío</p>
              <p className="text-3xl font-black text-[#D4FF00]" style={{ fontFamily: "var(--font-display)" }}>
                ${grandTotal.toLocaleString("es-AR")}
              </p>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-[#D4FF00] text-[#0A0A0A] font-black text-lg rounded-full hover:bg-white transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              IR AL PAGO →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
