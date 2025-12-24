import { NextRequest, NextResponse } from "next/server";

// In-memory job store (mock without DB)
// In production, this would be Redis or DB
const acceptedJobs = new Map<string, { partnerId: string; acceptedAt: number }>();

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

/**
 * POST /api/partners/jobs/:jobId/accept
 * Partner accepts a job request
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { jobId } = await params;
  
  // Check if job was already accepted (first-accept-wins)
  if (acceptedJobs.has(jobId)) {
    return NextResponse.json(
      { success: false, error: "Job already accepted by another partner" },
      { status: 409 }
    );
  }

  // In real app: validate partner auth, check job exists, etc.
  const partnerId = "mock-partner-id"; // Would come from auth

  // Mark job as accepted
  acceptedJobs.set(jobId, { partnerId, acceptedAt: Date.now() });

  // In real app: 
  // 1. Update booking status in DB
  // 2. Notify customer
  // 3. Cancel broadcast to other partners

  console.log(`[JOB ACCEPTED] Job ${jobId} accepted by partner ${partnerId}`);

  return NextResponse.json({
    success: true,
    message: "Job accepted successfully",
    data: {
      jobId,
      status: "on_the_way",
      startOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      endOtp: Math.floor(1000 + Math.random() * 9000).toString(),
    },
  });
}
