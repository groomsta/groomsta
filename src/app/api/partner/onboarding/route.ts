import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation Schemas for steps
const personalDetailsSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(10),
  partnerType: z.enum(["individual", "salon"]),
  password: z.string().min(6), // In real app, hash this!
});

// We can add more schemas for other steps (KYC, Bank)

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { step, data } = body;

    // basic step handling
    if (step === 1) {
      // Personal Details Registration
      const validation = personalDetailsSchema.safeParse(data);
      if (!validation.success) {
        return NextResponse.json({ success: false, error: validation.error.flatten() }, { status: 400 });
      }

      // Check specific existing user logic here (mocked for now)
      // Create User & Partner record
      // Note: In a real flow, we might just update an existing user who logged in via OTP.
      // For this MVP/Demo, we assume creating a fresh entry or updating.

      // Simplified: Check if phone exists
      let user = await prisma.user.findUnique({ where: { phone: data.phone } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            phone: data.phone,
            fullName: data.fullName,
            email: data.email || null,
            passwordHash: data.password, // TODO: Hash with bcrypt
          }
        });
      }

      let partner = await prisma.partner.findUnique({ where: { userId: user.id } });
      if (!partner) {
        partner = await prisma.partner.create({
          data: {
            userId: user.id,
            partnerType: data.partnerType,
            phone: data.phone,
            fullName: data.fullName,
            email: data.email || null,
            verificationStatus: "pending",
            serviceRadiusKm: 10.0
          }
        });
      }

      return NextResponse.json({ success: true, partnerId: partner.id, step: 2 });
    }

    if (step === 2) {
      // KYC Uploads - Frontend sends URLs after upload, we save to DB
      const { partnerId, documents } = data; // documents: [{ type: 'aadhaar', url: '...' }]

      if (!partnerId) return NextResponse.json({ success: false, error: "Partner ID required" }, { status: 400 });

      // Save documents
      // Using transaction
      await prisma.$transaction(
        documents.map((doc: any) => prisma.partnerDocument.create({
          data: {
            partnerId,
            documentType: doc.type,
            documentUrl: doc.url,
            verificationStatus: "pending"
          }
        }))
      );

      return NextResponse.json({ success: true, step: 3 });
    }

    if (step === 3) {
      // Bank Details
      const { partnerId, bankName, accountNumber, ifsc, holderName } = data;

      if (!partnerId) return NextResponse.json({ success: false, error: "Partner ID required" }, { status: 400 });

      await prisma.partnerBankDetails.create({
        data: {
          partnerId,
          bankName,
          accountNumber,
          ifscCode: ifsc,
          accountHolderName: holderName,
        }
      });

      return NextResponse.json({ success: true, step: 4 });
    }

    // Step 4: Services (Skipping for now or just generic finish)
    if (step === 4) {
      return NextResponse.json({ success: true, message: "Onboarding submitted for verification!" });
    }

    return NextResponse.json({ success: false, error: "Invalid step" }, { status: 400 });

  } catch (error) {
    console.error("Onboarding Error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
