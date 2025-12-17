# Groomsta Backend 🛡️

A "Fintech-grade" secure backend for the Groomsta platform, built with Node.js, Express, and TypeScript. This repository implements a robust authentication system complying with strict cybersecurity guidelines.

## 🚀 Key Features

### 🔐 Security First ("Fort Knox" Architecture)
*   **Secure Headers**: Implemented using `helmet` to protect against common vulnerabilities.
*   **Rate Limiting**: Global limiter (100 requests per 15 mins) configured to prevent DDoS and Brute Force attacks.
*   **CORS Policy**: Restrictive Cross-Origin Resource Sharing settings.
*   **Data Minimization**: Adheres to a strict "Zero Trust" policy for sensitive data.

### 🔑 Authentication Module
*   **OTP-Based Login**: Secure, passwordless authentication flow.
*   **Email/Password Login**: Standard authentication with bcrypt hasing.
*   **Cryptographic Strength**: Uses `crypto.randomBytes` for non-predictable OTP generation.
*   **Secure Storage**: OTPs & Passwords are hashed using `bcrypt` (12 salt rounds).
*   **Session Management**: Issues **JWT (Access & Refresh Tokens)** for secure, scalable sessions.

### 💳 Payment Integration
*   **Razorpay Support**: Backend controllers setup for creating orders and verifying payments.
*   **Secure Transactions**: All payment requests are authenticated via JWT.

### 🛠️ Tech Stack
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: PostgreSQL (via Prisma ORM)
*   **Cache/Session**: Redis (with Auto-Failover)
*   **Security**: Helmet, Bcrypt, JsonWebToken, Express-Rate-Limit

## 📂 Project Structure

```bash
src/
├── config/         # Environment and configuration setup
├── modules/        # Feature-based modules (Auth, User, Payment)
│   ├── auth/       # Authentication (OTP, Email, JWT)
│   └── payment/    # Payment processing (Razorpay)
├── shared/         # Shared utilities (Prisma Client, Redis Client)
├── middleware/     # Custom security middleware
├── apps.ts         # Express Application setup
├── server.ts       # Server entry point
└── scripts/        # Verification and Test scripts
    └── test-all-systems.js # Master verification suite
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v16+)
*   npm
*   PostgreSQL
*   Redis (Optional - App falls back to DB if missing)

### Installation

1.  **Navigate to directory**
    ```bash
    cd backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=3000
    NODE_ENV=development
    DATABASE_URL="postgresql://user:password@localhost:5432/groomsta?schema=public"
    REDIS_URL="redis://localhost:6379"
    JWT_SECRET="your-super-secret-key"
    ```

4.  **Run the Server**
    ```bash
    # Development Mode
    npm run dev

    # Production Build
    npm run build
    npm start
    ```

5.  **Run Verification** (Optional)
    To verify all systems (OTP, Email, Payments) are working correctly:
    ```bash
    # Ensure server is running in another terminal
    node scripts/test-all-systems.js
    ```

## 🛡️ Compliance
See [docs/compliance_strategy.md](docs/compliance_strategy.md) for details on our Cybersecurity and Payment Security protocols.
