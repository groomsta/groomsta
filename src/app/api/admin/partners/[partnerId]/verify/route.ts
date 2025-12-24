import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, EmailTemplates } from "@/lib/notifications/email";

const verifySchema = z.object({
  action: z.enum(["approve", "reject"]),
  reason: z.string().optional(),
});

interface RouteParams {
  params: Promise<{ partnerId: string }>;
}

/**
 * POST /api/admin/partners/:partnerId/verify
 * Admin approves or rejects a partner application
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { partnerId } = await params;
  
  try {
    const body = await request.json();
    const validation = verifySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { action, reason } = validation.data;

    // Mock partner data (without DB)
    const mockPartner = {
      id: partnerId,
      name: "Test Partner",
      email: "partner@test.com",
    };

    // In real app: Update partner status in DB
    console.log(`[ADMIN] Partner ${partnerId} ${action}ed`);

    // Send email notification
    const emailTemplate = action === "approve" 
      ? EmailTemplates.partnerApproved(mockPartner.name)
      : EmailTemplates.partnerRejected(mockPartner.name, reason);

    const emailResult = await sendEmail({
      to: mockPartner.email,
      ...emailTemplate,
    });

    return NextResponse.json({
      success: true,
      message: `Partner ${action}ed successfully`,
      data: {
        partnerId,
        newStatus: action === "approve" ? "verified" : "rejected",
        emailSent: emailResult.success,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
