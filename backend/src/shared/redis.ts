import { createClient } from 'redis';

class RedisService {
    private client: ReturnType<typeof createClient> | null = null;
    private isConnected: boolean = false;

    constructor() {
        if (process.env.REDIS_URL) {
            this.client = createClient({
                url: process.env.REDIS_URL
            });

            this.client.on('error', (err) => {
                console.warn('[Redis] Connection Error (Failover Active):', err.message);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                console.log('[Redis] Connected Successfully');
                this.isConnected = true;
            });

            this.connect();
        } else {
            console.warn('[Redis] No REDIS_URL found. Running in Failover Mode.');
        }
    }

    private async connect() {
        if (this.client) {
            try {
                await this.client.connect();
            } catch (error) {
                // Connection failed, isConnected remains false
            }
        }
    }

    public async set(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
        if (this.isConnected && this.client) {
            try {
                await this.client.set(key, value, { EX: ttlSeconds });
                return;
            } catch (error) {
                console.warn('[Redis] Set failed, using fallback.');
            }
        }
        // Fallback: We don't need to do anything here if we are just caching.
        // The real source of truth (Postgres) is handled by the main controller.
    }

    public async get(key: string): Promise<string | null> {
        if (this.isConnected && this.client) {
            try {
                return await this.client.get(key);
            } catch (error) {
                console.warn('[Redis] Get failed, using fallback.');
            }
        }
        return null; // Return null to force DB lookup
    }

    public async del(key: string): Promise<void> {
        if (this.isConnected && this.client) {
            try {
                await this.client.del(key);
            } catch (error) {
                // Ignore delete errors
            }
        }
    }
}

export const redis = new RedisService();
