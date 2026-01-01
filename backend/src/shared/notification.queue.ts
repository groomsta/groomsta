import { Queue, Worker, Job } from 'bullmq';

// 1. Connection Config (Use Env Redis URL)
const redisOptions = {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379
    }
};

// 2. Define Queue
export const notificationQueue = new Queue('notifications', redisOptions);

// 3. Define Worker (Consumer)
// In a real microservice, this might be in a separate process
const worker = new Worker('notifications', async (job: Job) => {
    console.log(`[Job ${job.id}] Processing Notification: ${job.name}`);
    console.log(`Payload:`, job.data);

    // Simulate External API Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (job.name === 'SMS') {
        console.log(`📲 SMS Sent to ${job.data.to}: ${job.data.message}`);
    } else if (job.name === 'EMAIL') {
        console.log(`📧 Email Sent to ${job.data.to}: ${job.data.subject}`);
    }

    console.log(`[Job ${job.id}] Completed ✅`);
}, redisOptions);

worker.on('completed', (job: Job) => {
    console.log(`[Queue] Job ${job.id} has completed!`);
});

worker.on('failed', (job: Job | undefined, err: Error) => {
    console.log(`[Queue] Job ${job?.id} has failed with ${err.message}`);
});

export const NotificationService = {
    async sendSMS(to: string, message: string) {
        return await notificationQueue.add('SMS', { to, message });
    },

    async sendEmail(to: string, subject: string, body: string) {
        return await notificationQueue.add('EMAIL', { to, subject, body });
    }
};
