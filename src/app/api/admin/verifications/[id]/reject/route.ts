import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { reason } = await request.json();

    const updatedPartner = await prisma.partner.update({
      where: { id },
      data: {
        verificationStatus: "rejected",
        isActive: false,
        rejectionReason: reason || "Does not meet requirements",
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPartner,
      message: "Partner rejected",
    });
  } catch (error) {
    console.error("Error rejecting partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reject partner" },
      { status: 500 }
    );
  }
}
