# Groomsta Backend 🛡️

A "Fintech-grade" secure backend for the Groomsta platform, built with Node.js, Express, and TypeScript. This repository implements a robust system handling Payments, Wallets, Payouts, and Referrals.

## 🚀 Key Features

### 🔐 Security First ("Fort Knox" Architecture)
*   **Secure Headers**: Implemented using `helmet`.
*   **Rate Limiting**: Global limiter (100 requests per 15 mins).
*   **CORS Policy**: Strict Origin and Credentials settings.
*   **Authentication**:
    *   **OTP-Based Login**: Passwordless flow via SMS.
    *   **MFA-Ready**: Architecture supports 2FA enforcement.
    *   **JWT Sessions**: Secure Access & Refresh Token rotation.

### 🛡️ Security & Notification Engine (Week 4)
*   **Notification Queue**: High-performance Redis/BullMQ system for SMS & Email.
*   **Unified Service**: Single API to send across channels.
*   **Security Audit**: Automated vulnerability scanning scripts.
*   **Production Ready**: Swagger Docs & Production Configs included.

### � Payments & Wallet (Week 2)
*   **Razorpay Integration**: Seamless checkout with `create_order` and `verify_signature`.
*   **Wallet System**: Credits/debits with double-entry logging.
*   **Refund Logic**: Automated refunds to Wallet or Source.

### 💰 Payouts & Referrals (Week 3)
*   **Weekly Payouts**: Cron job auto-calculates commissions and initiates transfers.
*   **Referral System**: Unique codes, instant rewards (`₹100`), and tracking.
*   **Membership**: Gold/Platinum plan subscriptions.

---

## 📂 API Reference

### Authentication
*   `POST /auth/send-otp` - Request Login OTP
*   `POST /auth/verify-otp` - Verify & Get Token
*   `POST /auth/refresh-token` - Renew Session

### Payments
*   `POST /api/payments/create-order` - Initialize Checkout (Supports partial)
*   `POST /api/payments/verify` - Confirm Payment Success
*   `POST /api/payments/refund` - Initiate Refund

### Wallet
*   `GET /api/wallet/balance` - View Cash & History
*   `POST /api/wallet/add-credits` - Load Money
*   `POST /api/wallet/deduct` - Spend Money

### Payouts (Partners)
*   `GET /api/payouts/my-payouts` - View Earning History
*   `POST /api/payouts/initiate` - [Admin] Trigger Bank Transfer

### Referrals
*   `POST /api/referrals/generate` - Get My Code
*   `POST /api/referrals/apply` - Apply a Code
*   `GET /api/referrals/stats` - View Performance

### Membership System (Week 3)
*   `GET /api/memberships/plans` - List available tiers
*   `POST /api/memberships/subscribe` - Start subscription
*   `GET /api/memberships/benefits` - Check status

### Notification & Automation (Week 4)
*   **Cron Job**: Runs every Sunday (23:59) to calculate Payouts.
*   **Notifications**: `POST /api/notifications/send` (via BullMQ).
*   **Reports**: Auto-generates Reconciliation Templates.

---

## ⚡ Setup & Activation

### 1. Installation
```bash
cd backend
npm install
```

### 2. Environment Variables (.env)
Create a `.env` file with these keys:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/groomsta?schema=public"
JWT_SECRET="secret"
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="secret"
RAZORPAY_WEBHOOK_SECRET="secret"
RAZORPAY_ACCOUNT_NUMBER="232323"
REDIS_HOST="localhost"
REDIS_PORT=6379
```

### 3. Database Activation (IMPORTANT)
The Payout & Referral tables need to be created in your database.
Once you have your PostgreSQL credentials:
```bash
npx prisma db push
```

### 4. Run Server
```bash
npm run dev
# Server starts at http://localhost:5000
```

## 🛡️ Documentation & Security (Week 4)

*   **API Documentation (Swagger)**: Visit `http://localhost:5000/api-docs` to interact with the API.
*   **Security Audit**: Run `npx ts-node scripts/security-audit.ts` to test vulnerabilities.
*   **Incident Response**: [View Playbook](docs/incident_response_playbook.md)
*   [Compliance Strategy](docs/compliance_strategy.md)
*   [Payment & Webhook Guide](payment_webhook_guide.md)
