import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Mock partner services data (would come from DB in real app)
const PARTNER_SERVICES: Record<string, { serviceId: string; price: number; enabled: boolean }[]> = {
  "partner-001": [
    { serviceId: "s1", price: 150, enabled: true },
    { serviceId: "s2", price: 550, enabled: true },
  ]
};

const updatePricingSchema = z.object({
  price: z.number().min(1),
  enabled: z.boolean().optional(),
});

// GET: Get partner's pricing for a service
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  // In real app: Get partnerId from auth token
  const partnerId = "partner-001";
  const { serviceId } = await params;

  const partnerServices = PARTNER_SERVICES[partnerId] || [];
  const service = partnerServices.find(s => s.serviceId === serviceId);

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({
    serviceId,
    price: service.price,
    enabled: service.enabled,
  });
}

// PUT: Update partner's pricing for a service
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const partnerId = "partner-001"; // From auth in real app
    const { serviceId } = await params;
    const body = await req.json();

    const parsed = updatePricingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
    }

    const { price, enabled } = parsed.data;

    // Validate price is within allowed range (mock: ±20% of base price)
    const BASE_PRICES: Record<string, number> = {
      "s1": 150,
      "s2": 500,
      "s3": 100,
      "s4": 350,
      "s5": 200,
    };

    const basePrice = BASE_PRICES[serviceId];
    if (!basePrice) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const minPrice = Math.floor(basePrice * 0.8);
    const maxPrice = Math.ceil(basePrice * 1.2);

    if (price < minPrice || price > maxPrice) {
      return NextResponse.json({
        error: `Price must be between ₹${minPrice} and ₹${maxPrice}`,
      }, { status: 400 });
    }

    // In real app: Update database
    console.log(`[MOCK] Partner ${partnerId} updated service ${serviceId}: price=${price}, enabled=${enabled}`);

    return NextResponse.json({
      success: true,
      serviceId,
      price,
      enabled: enabled !== undefined ? enabled : true,
      message: "Pricing updated successfully",
    });
  } catch (error) {
    console.error("Error updating pricing:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
