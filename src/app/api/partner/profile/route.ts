import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const partnerId = searchParams.get("partnerId");

  if (!partnerId) {
    return NextResponse.json({ success: false, error: "Partner ID required" }, { status: 400 });
  }

  try {
    const partner = await prisma.partner.findUnique({
      where: { id: partnerId },
      include: {
        documents: true,
        bankDetails: true,
        salonDetails: true,
        offeredServices: {
            include: {
                service: true
            }
        }
      }
    });

    if (!partner) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: partner });

  } catch (error) {
    console.error("Get Profile Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
