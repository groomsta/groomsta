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
*   **Cryptographic Strength**: Uses `crypto.randomBytes` for non-predictable OTP generation.
*   **Secure Storage**: OTPs are hashed using `bcrypt` (12 salt rounds) before storage; never stored in plain text.
*   **Session Management**: Issues **JWT (JSON Web Tokens)** upon successful verification for stateless, scalable sessions.

### 🛠️ Tech Stack
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: PostgreSQL (via Prisma ORM)
*   **Security**: Helmet, Bcrypt, JsonWebToken, Express-Rate-Limit

## 📂 Project Structure

```bash
src/
├── config/         # Environment and configuration setup
├── modules/        # Feature-based modules (Auth, User, etc.)
│   └── auth/       # Authentication Controller, Service, and Routes
├── shared/         # Shared utilities (Prisma Client, etc.)
├── middleware/     # Custom security middleware
├── docs/           # Compliance and Security strategy documentation
├── app.ts          # Express Application setup
└── server.ts       # Server entry point
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v16+)
*   npm
*   PostgreSQL (Optional for Dev, Mock DB supported)

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

## 🛡️ Compliance
See [docs/compliance_strategy.md](docs/compliance_strategy.md) for details on our Cybersecurity and Payment Security protocols.
