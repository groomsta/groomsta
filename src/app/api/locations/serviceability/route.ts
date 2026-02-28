import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/locations/serviceability?pincode=110001
// Check if a pincode is serviceable by Groomsta
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const pincode = searchParams.get("pincode");

        if (!pincode || pincode.length !== 6) {
            return NextResponse.json(
                { error: "Valid 6-digit pincode is required" },
                { status: 400 }
            );
        }

        const location = await prisma.serviceableLocation.findUnique({
            where: { pincode },
        });

        if (!location || !location.isActive) {
            return NextResponse.json({
                serviceable: false,
                pincode,
                message: "Sorry, we don't currently serve this area. We're expanding soon!",
            });
        }

        return NextResponse.json({
            serviceable: true,
            pincode,
            city: location.city,
            state: location.state,
            message: `Great news! We serve ${location.city}.`,
        });
    } catch (error) {
        console.error("Error checking serviceability:", error);
        return NextResponse.json(
            { error: "Failed to check serviceability" },
            { status: 500 }
        );
    }
}
