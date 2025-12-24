import { Resend } from "resend";

// Initialize Resend client - will be null if API key not provided
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email notification
 * Returns mock response if Resend API key is not configured
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.log("[MOCK EMAIL]", payload);
    return { success: true, id: `mock-${Date.now()}` };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Groomsta <notifications@groomsta.com>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// Email Templates
export const EmailTemplates = {
  partnerApproved: (name: string) => ({
    subject: "🎉 Welcome to Groomsta Partner Network!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Congratulations, ${name}!</h1>
        <p>Your partner application has been <strong style="color: #16a34a;">approved</strong>.</p>
        <p>You can now start receiving job requests from customers in your area.</p>
        <a href="https://partner.groomsta.com/dashboard" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px;">Open Dashboard</a>
      </div>
    `,
  }),

  partnerRejected: (name: string, reason?: string) => ({
    subject: "Groomsta Partner Application Update",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">Application Update</h1>
        <p>Hi ${name},</p>
        <p>Unfortunately, we couldn't approve your partner application at this time.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
        <p>Please review your documents and resubmit your application.</p>
        <a href="https://partner.groomsta.com/register" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 16px;">Resubmit Application</a>
      </div>
    `,
  }),

  newJobRequest: (serviceName: string, customerName: string) => ({
    subject: `New Job Request: ${serviceName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Job Request!</h1>
        <p>You have a new service request from <strong>${customerName}</strong>.</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p>Open your app to accept this job before it expires.</p>
      </div>
    `,
  }),
};
