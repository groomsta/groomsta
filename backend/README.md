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

### � Payment System (Advanced)
*   **Provider**: Razorpay Integration.
*   **Booking Advance**: Logic to accept **Partial Payments** (e.g., 20% advance).
*   **Full Payments**: Standard full amount checkout.
*   **Refunds**: Automated refund processing via API (Partial & Full).
*   **Webhooks**: Real-time status updates (`payment.captured`, `refund.processed`) verified with HMAC SHA256 signatures.

### 💰 Wallet System
*   **Internal Ledger**: Users can hold credits (Prepaid/Rewards).
*   **Transactions**:
    *   `Top-up`: Add money to wallet.
    *   `Deduct`: Pay for services using wallet balance.
*   **Audit Trail**: Immutable history of `CREDIT` and `DEBIT` transactions.

### � Payout System (Partner Earnings)
*   **Weekly Cycle**: Automated calculation of partner earnings.
*   **Commission**: Built-in logic to deduct platform fees (Default: 20%).
*   **Transfers**: Integration with **Razorpay Route/X** for direct bank transfers.
*   **Admin Tools**: Endpoints to calculate, initiate, and verify payouts.

### 🎁 Referral System
*   **viral Growth**: Unique referral code generation (e.g., `HAMM1234`).
*   **Instant Rewards**: Triggers **₹100 Wallet Credit** for both Referrer and Referee upon successful signup/usage.
*   **Stats**: Track total referrals and earnings.

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

## 🛡️ Documentation
*   [Compliance Strategy](docs/compliance_strategy.md)
*   [Payment & Webhook Guide](payment_webhook_guide.md)
