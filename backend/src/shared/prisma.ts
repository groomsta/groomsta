// Mock implementation with In-Memory State
// This enables the "Login -> Verify" flow to actually work without a real DB

const store: any = {
    users: [],
    otps: []
};

const mockPrisma = {
    user: {
        findUnique: async ({ where }: any) => {
            let user = null;
            if (where.phone) {
                user = store.users.find((u: any) => u.phone === where.phone);
            } else if (where.id) {
                user = store.users.find((u: any) => u.id === where.id);
            } else if (where.email) {
                user = store.users.find((u: any) => u.email === where.email);
            }
            return user || null;
        },
        findFirst: async ({ where }: any) => {
            // Basic mock support for OR query
            if (where.OR) {
                for (const condition of where.OR) {
                    if (condition.phone) {
                        const match = store.users.find((u: any) => u.phone === condition.phone);
                        if (match) return match;
                    }
                    if (condition.email) {
                        const match = store.users.find((u: any) => u.email === condition.email);
                        if (match) return match;
                    }
                }
                return null;
            }
            return null;
        },
        create: async ({ data }: any) => {
            const newUser = { ...data, id: 'mock-user-' + Date.now() };
            store.users.push(newUser);
            console.log('[MockDB] Created User:', newUser);
            return newUser;
        },
    },
    otpVerification: {
        create: async ({ data }: any) => {
            const newOtp = { ...data, id: 'mock-otp-' + Date.now() };
            store.otps.push(newOtp);
            console.log('[MockDB] Stored OTP:', newOtp);
            return newOtp;
        },
        findFirst: async ({ where }: any) => {
            // Simple search logic for Mock
            const matches = store.otps
                .filter((o: any) => o.phone === where.phone)
                .sort((a: any, b: any) => b.created_at - a.created_at);

            const latest = matches[0];
            // console.log('[MockDB] Find OTP:', where, latest ? 'Found' : 'Not Found');
            return latest || null;
        },
        update: async ({ where, data }: any) => {
            // console.log('[MockDB] Update OTP:', where);
            return { count: 1 };
        }
    },
    // Adding session support for full flow
    userSession: {
        create: async ({ data }: any) => {
            console.log('[MockDB] Created Session:', data);
            return data;
        }
    },
    $disconnect: async () => { },
};

export default mockPrisma as any;
