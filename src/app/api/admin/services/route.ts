import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createServiceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  categoryId: z.string(),
  basePrice: z.number().positive(),
  duration: z.number().positive(), // in minutes
  description: z.string().optional(),
});

// Mock services store (without DB)
const servicesStore: any[] = [
  { id: "s1", name: "Haircut", slug: "haircut", categoryId: "c1", basePrice: 150, duration: 30 },
  { id: "s2", name: "Shaving", slug: "shaving", categoryId: "c1", basePrice: 100, duration: 15 },
];

/**
 * GET /api/admin/services
 * List all services
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: servicesStore,
  });
}

/**
 * POST /api/admin/services
 * Create a new service
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createServiceSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const newService = {
      id: "s" + (servicesStore.length + 1),
      ...validation.data,
      createdAt: new Date().toISOString(),
    };

    // In real app: Save to DB
    servicesStore.push(newService);

    return NextResponse.json({
      success: true,
      message: "Service created",
      data: newService,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
