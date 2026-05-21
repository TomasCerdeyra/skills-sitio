import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTenantId } from "@/lib/tenant";

type ShipmentItem = {
  quantity: number;
  weight: number;
};

export async function POST(request: NextRequest) {
  const { postalCode, items } = await request.json() as {
    postalCode: string;
    items: ShipmentItem[];
  };

  if (!postalCode || !items?.length)
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });

  const supabase = createAdminClient();
  const tenantId = getTenantId();

  const { data: tenant } = await supabase
    .from("tenants")
    .select("envia_access_token, origin_postal_code")
    .eq("id", tenantId)
    .single();

  if (!tenant?.envia_access_token) {
    return NextResponse.json({
      rates: [
        { carrier: "Correo Argentino", service: "Estándar", price: 3500, days: "5-8 días hábiles" },
        { carrier: "OCA", service: "E-Pak", price: 4200, days: "3-5 días hábiles" },
      ],
    });
  }

  const totalWeight = items.reduce((acc, i) => acc + i.weight * i.quantity, 0);

  try {
    const res = await fetch("https://api.envia.com/ship/rate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tenant.envia_access_token}`,
      },
      body: JSON.stringify({
        origin: {
          postal_code: process.env.ENVIA_ORIGIN_POSTAL_CODE ?? tenant.origin_postal_code,
          country_code: "AR",
        },
        destination: { postal_code: postalCode, country_code: "AR" },
        packages: [{ weight: Math.max(0.1, totalWeight), length: 30, width: 20, height: 10 }],
        shipment: { type: 1 },
      }),
    });

    if (!res.ok) throw new Error("Envia.com error");

    const data = await res.json();
    const rates = (data.data ?? []).map((r: { carrier: string; service: string; totalPrice: number; deliveryEstimate: string }) => ({
      carrier: r.carrier,
      service: r.service,
      price: Math.round(r.totalPrice),
      days: r.deliveryEstimate ?? "A consultar",
    }));

    return NextResponse.json({ rates });
  } catch {
    return NextResponse.json({
      rates: [
        { carrier: "Correo Argentino", service: "Estándar", price: 3500, days: "5-8 días hábiles" },
        { carrier: "OCA", service: "E-Pak", price: 4200, days: "3-5 días hábiles" },
      ],
    });
  }
}
