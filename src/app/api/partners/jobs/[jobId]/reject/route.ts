import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

/**
 * POST /api/partners/jobs/:jobId/reject
 * Partner rejects a job request
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { jobId } = await params;
  
  // In real app: validate partner auth
  const partnerId = "mock-partner-id";

  // In real app:
  // 1. Record rejection in DB (for analytics)
  // 2. Continue broadcasting to other partners

  console.log(`[JOB REJECTED] Job ${jobId} rejected by partner ${partnerId}`);

  return NextResponse.json({
    success: true,
    message: "Job rejected",
  });
}
