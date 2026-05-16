import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface ShippingAddress {
  street: string;
  city: string;
  postal_code: string;
  state: string;
}

export async function POST(request: NextRequest) {
  const { destination, items } = (await request.json()) as {
    destination: ShippingAddress;
    items: Array<{ weight?: number; quantity: number }>;
  };

  if (!destination?.postal_code) {
    return NextResponse.json({ error: "Destino inválido" }, { status: 400 });
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const supabaseAdmin = createAdminClient();

  const { data: tenant } = await supabaseAdmin
    .from("tenants")
    .select(
      "envia_access_token, origin_name, origin_phone, origin_address, origin_city, origin_postal_code, origin_state"
    )
    .eq("id", tenantId)
    .single();

  if (!tenant?.envia_access_token) {
    return NextResponse.json(
      { error: "Envíos no configurados para este tenant" },
      { status: 503 }
    );
  }

  if (
    !tenant.origin_name ||
    !tenant.origin_address ||
    !tenant.origin_city ||
    !tenant.origin_postal_code ||
    !tenant.origin_state
  ) {
    return NextResponse.json(
      { error: "Datos de origen incompletos en el tenant" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.envia.com/ship/rate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tenant.envia_access_token}`,
      },
      body: JSON.stringify({
        origin: {
          name: tenant.origin_name,
          phone: tenant.origin_phone,
          street: tenant.origin_address,
          city: tenant.origin_city,
          state: tenant.origin_state,
          postal_code: tenant.origin_postal_code,
          country: "AR",
        },
        destination: {
          street: destination.street,
          city: destination.city,
          state: destination.state,
          postal_code: destination.postal_code,
          country: "AR",
        },
        packages: [
          {
            weight: items.reduce(
              (acc, item) => acc + (item.weight ?? 0.5) * item.quantity,
              0
            ),
            dimensions: { length: 20, width: 20, height: 10 },
          },
        ],
        shipment: { carrier: "all" },
      }),
    });

    if (!response.ok) {
      throw new Error(`Envia.com error: ${response.status}`);
    }

    const data = await response.json();

    const options = (data.data ?? []).map((rate: {
      carrier: string;
      service: string;
      totalPrice: number;
      deliveryDate?: string;
    }) => ({
      carrier: rate.carrier,
      service: rate.service,
      price: rate.totalPrice,
      estimated_delivery: rate.deliveryDate ?? null,
    }));

    return NextResponse.json({ options });
  } catch (error) {
    console.error("Error calculando envío:", error);
    return NextResponse.json(
      { error: "No se pudo calcular el costo de envío" },
      { status: 500 }
    );
  }
}
