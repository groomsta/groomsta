import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const { id } = params;

    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        documents: true,
        bankDetails: true,
        salonDetails: true,
        user: {
          select: {
            phone: true,
            email: true,
            fullName: true,
          }
        }
      },
    });

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error("Error fetching partner details:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
