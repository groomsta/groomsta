import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["on_the_way", "arrived", "started", "completed"]),
});

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

/**
 * PUT /api/partners/jobs/:jobId/status
 * Update job status (On The Way -> Arrived -> Started -> Completed)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { jobId } = await params;
  
  try {
    const body = await request.json();
    const validation = statusSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { status } = validation.data;

    // In real app:
    // 1. Validate partner auth
    // 2. Update booking status in DB
    // 3. Notify customer of status change

    console.log(`[JOB STATUS] Job ${jobId} status updated to ${status}`);

    return NextResponse.json({
      success: true,
      message: `Job status updated to ${status}`,
      data: { jobId, status },
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
