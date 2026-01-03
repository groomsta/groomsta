import { NextResponse } from "next/server";

// Health check endpoint for monitoring
export async function GET() {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: {
      api: "up",
      database: "up", // Would check DB connection in real app
      cache: "up",    // Would check Redis in real app
    },
    uptime: process.uptime(),
    memory: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: "MB",
    },
  };

  return NextResponse.json(health);
}
