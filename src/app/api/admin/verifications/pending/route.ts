import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pendingPartners = await prisma.partner.findMany({
      where: {
        verificationStatus: "pending",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        partnerType: true,
        verificationStatus: true,
        createdAt: true,
        documents: {
          select: {
            id: true,
            documentType: true,
            verificationStatus: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: pendingPartners,
      message: "Pending verifications fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching pending verifications:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
