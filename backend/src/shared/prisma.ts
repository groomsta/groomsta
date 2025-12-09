// Mock implementation with In-Memory State
// This enables the "Login -> Verify" flow to actually work without a real DB

const store: any = {
    users: [],
    otps: []
};

const mockPrisma = {
    user: {
        findUnique: async ({ where }: any) => {
            const user = store.users.find((u: any) => u.phone === where.phone);
            // console.log('[MockDB] Find User:', where, user ? 'Found' : 'Not Found');
            return user || null;
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
