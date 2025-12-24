import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateServiceSchema = z.object({
  name: z.string().min(2).optional(),
  basePrice: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ serviceId: string }>;
}

/**
 * PUT /api/admin/services/:serviceId
 * Update a service
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { serviceId } = await params;
  
  try {
    const body = await request.json();
    const validation = updateServiceSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten() },
        { status: 400 }
      );
    }

    // In real app: Update service in DB
    console.log(`[ADMIN] Service ${serviceId} updated`, validation.data);

    return NextResponse.json({
      success: true,
      message: "Service updated",
      data: { serviceId, ...validation.data },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/admin/services/:serviceId
 * Delete a service
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { serviceId } = await params;
  
  // In real app: Soft delete in DB
  console.log(`[ADMIN] Service ${serviceId} deleted`);

  return NextResponse.json({
    success: true,
    message: "Service deleted",
  });
}
