import { NextRequest } from "next/server";

// Mock job data for SSE stream (without DB)
const MOCK_JOBS = [
  {
    id: "job-" + Date.now(),
    customerName: "Vikram Mehta",
    serviceName: "Premium Haircut",
    price: 450,
    distance: "2.3 km",
    address: "B-42, Sector 18, Noida, UP 201301",
  },
];

/**
 * Server-Sent Events endpoint for incoming jobs
 * Partners connect to this endpoint to receive real-time job requests
 */
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const connectMsg = `data: ${JSON.stringify({ type: "connected", message: "Listening for jobs..." })}\n\n`;
      controller.enqueue(encoder.encode(connectMsg));

      // Simulate sending a job after 5 seconds (mock without DB)
      const jobTimeout = setTimeout(() => {
        const job = {
          type: "new_job",
          data: {
            ...MOCK_JOBS[0],
            id: "job-" + Date.now(),
            expiresAt: Date.now() + 20000, // 20 seconds
          },
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(job)}\n\n`));
      }, 5000);

      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "heartbeat" })}\n\n`));
      }, 15000);

      // Cleanup on close
      request.signal.addEventListener("abort", () => {
        clearTimeout(jobTimeout);
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
