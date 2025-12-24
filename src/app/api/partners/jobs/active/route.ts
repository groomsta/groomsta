import { NextResponse } from "next/server";

// Mock active jobs (without DB)
const MOCK_ACTIVE_JOBS = [
  {
    id: "job-active-001",
    customerName: "Ananya Sharma",
    customerPhone: "+91 98765 43210",
    serviceName: "Hair Coloring + Styling",
    price: 1200,
    address: "A-101, DLF Phase 3, Gurgaon",
    status: "on_the_way",
    bookingTime: "10:30 AM",
  },
];

/**
 * GET /api/partners/jobs/active
 * Get list of partner's active jobs
 */
export async function GET() {
  // In real app: fetch from DB based on authenticated partner

  return NextResponse.json({
    success: true,
    data: MOCK_ACTIVE_JOBS,
  });
}
