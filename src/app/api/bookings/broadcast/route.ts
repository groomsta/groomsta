import { NextRequest, NextResponse } from "next/server";
import { findNearbyPartners, MOCK_PARTNERS } from "@/lib/geo/distance";

/**
 * POST /api/bookings/broadcast
 * Internal endpoint to broadcast a job to nearby partners
 * 
 * In production:
 * - Called when a customer creates a booking
 * - Finds partners within radius using Turf.js
 * - Sends notifications via SSE/push to each partner
 * - Sets 20-second expiry timer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, customerLocation, radiusKm = 5 } = body;

    if (!bookingId || !customerLocation) {
      return NextResponse.json(
        { success: false, error: "bookingId and customerLocation required" },
        { status: 400 }
      );
    }

    // Find available partners within radius
    const availablePartners = MOCK_PARTNERS.filter(p => p.isAvailable);
    const nearbyPartners = findNearbyPartners(customerLocation, availablePartners, radiusKm);

    if (nearbyPartners.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No partners available in your area",
        data: { partnersSearched: availablePartners.length, radiusKm },
      });
    }

    // In production:
    // 1. Create booking_requests for each partner
    // 2. Send SSE/push notification to each partner
    // 3. Set Redis key with 20s expiry for cancellation

    const broadcastResults = nearbyPartners.map(partner => ({
      partnerId: partner.id,
      partnerName: partner.name,
      distanceKm: partner.distanceKm.toFixed(2),
      notified: true, // Mock - would be actual notification result
    }));

    console.log(`[BROADCAST] Job ${bookingId} sent to ${nearbyPartners.length} partners`);

    return NextResponse.json({
      success: true,
      message: `Job broadcast to ${nearbyPartners.length} partners`,
      data: {
        bookingId,
        expiresAt: Date.now() + 20000, // 20 seconds
        partnersNotified: broadcastResults,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
