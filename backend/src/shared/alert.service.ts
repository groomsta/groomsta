export class AlertService {
    /**
     * Sends a critical alert to the admin/dev team.
     * In a real production env, this would send an Email, SMS, or Slack message.
     */
    public static async sendCriticalAlert(error: Error, context: string = 'General'): Promise<void> {
        // defined prefix for easy grep/filtering in logs
        const alertPrefix = '[CRITICAL ALERT] 🚨';
        const timestamp = new Date().toISOString();

        const message = `
${alertPrefix}
Time: ${timestamp}
Context: ${context}
Error: ${error.message}
Stack: ${error.stack}
        `;

        // 1. Log to Console (StdErr)
        console.error(message);

        // 2. Future: Send Email (e.g., via SendGrid/AWS SES)
        // await EmailService.sendAdminAlert(message);

        // 3. Future: Send Slack Notification
        // await Axios.post(process.env.SLACK_WEBHOOK, { text: message });
    }
}
