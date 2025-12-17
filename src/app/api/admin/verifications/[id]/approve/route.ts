import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // In a real app, we would validate admin session here
    // const session = await getAdminSession();
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const updatedPartner = await prisma.partner.update({
      where: { id },
      data: {
        verificationStatus: "verified",
        isActive: true,
        verifiedAt: new Date(),
        // verifiedBy: session.user.id
      },
    });

    // Also update documents to verified?
    // Usually this logic is more granular, but for MVP/Foundation:
    await prisma.partnerDocument.updateMany({
      where: { partnerId: id },
      data: {
        verificationStatus: "verified",
        verifiedAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedPartner,
      message: "Partner verified successfully",
    });
  } catch (error) {
    console.error("Error verifying partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify partner" },
      { status: 500 }
    );
  }
}
