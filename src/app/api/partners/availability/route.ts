import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const availabilitySchema = z.object({
  isOnline: z.boolean().optional(),
  workingHours: z.record(z.string(), z.object({
    enabled: z.boolean(),
    start: z.string(),
    end: z.string(),
  })).optional(),
  blockedDates: z.array(z.string()).optional(),
});

// Mock partner availability (would come from DB)
let PARTNER_AVAILABILITY: Record<string, {
  isOnline: boolean;
  workingHours: Record<number, { enabled: boolean; start: string; end: string }>;
  blockedDates: string[];
}> = {
  "partner-001": {
    isOnline: true,
    workingHours: {
      0: { enabled: false, start: "09:00", end: "18:00" },
      1: { enabled: true, start: "09:00", end: "18:00" },
      2: { enabled: true, start: "09:00", end: "18:00" },
      3: { enabled: true, start: "09:00", end: "18:00" },
      4: { enabled: true, start: "09:00", end: "18:00" },
      5: { enabled: true, start: "09:00", end: "18:00" },
      6: { enabled: true, start: "10:00", end: "16:00" },
    },
    blockedDates: [],
  }
};

// GET: Get partner availability
export async function GET(req: NextRequest) {
  const partnerId = "partner-001"; // From auth in real app

  const availability = PARTNER_AVAILABILITY[partnerId];
  if (!availability) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  return NextResponse.json(availability);
}

// PUT: Update partner availability
export async function PUT(req: NextRequest) {
  try {
    const partnerId = "partner-001"; // From auth in real app
    const body = await req.json();

    const parsed = availabilitySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
    }

    const { isOnline, workingHours, blockedDates } = parsed.data;

    // Get current availability or create default
    const current = PARTNER_AVAILABILITY[partnerId] || {
      isOnline: true,
      workingHours: {},
      blockedDates: [],
    };

    // Update only provided fields
    if (isOnline !== undefined) {
      current.isOnline = isOnline;
    }
    if (workingHours) {
      current.workingHours = workingHours as any;
    }
    if (blockedDates) {
      current.blockedDates = blockedDates;
    }

    PARTNER_AVAILABILITY[partnerId] = current;

    console.log(`[MOCK] Partner ${partnerId} availability updated:`, JSON.stringify(current));

    return NextResponse.json({
      success: true,
      availability: current,
      message: "Availability updated successfully",
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
