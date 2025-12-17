import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { partnerId, services } = body;

    if (!partnerId || !Array.isArray(services)) {
      return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }

    // services: [{ serviceId, price, isCustomPrice }]

    // 1. Clear existing services (or upsert - simpler to delete all for this MVP sync)
    // Real world: smarter diffing
    await prisma.partnerService.deleteMany({
      where: { partnerId: partnerId }
    });

    // 2. Insert new ones
    if (services.length > 0) {
        await prisma.partnerService.createMany({
            data: services.map((s: any) => ({
                partnerId,
                serviceId: s.serviceId,
                customPrice: s.price,
                isAvailable: true
            }))
        });
    }

    return NextResponse.json({ success: true, message: "Services updated successfully" });

  } catch (error) {
    console.error("Update Services Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
