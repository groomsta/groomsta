# Pending Requirements & Dynamic Data Needs

## Dev 1 Deliverables: ✅ COMPLETE
- [x] **Authentication**: OTP System & JWT Auth
- [x] **Security Middleware**: Helmet/RateLimit
- [x] **Payments**: Razorpay Integration
- [x] **Wallet**: Full Credit/Debit System & Refunds
- [x] **Payouts**: Automated Weekly Cron Job
- [x] **Referrals & Membership**: Growth engines
- [x] **Notifications**: BullMQ Redis Queue
- [x] **Security Audit**: Script & Swagger Docs

---

## Pending Frontend Integration

### 1. Authentication Module
- [ ] **Backend API:** Connect `/api/auth/send-otp` and `/api/auth/verify-otp` (Dev 1 Trigger).
- [ ] **JWT Management:** Implement `middleware.ts` to protect routes like `/booking`, `/track`, `/profile`.
- [ ] **State Management:** persistent `useAuth` store to hold the user session.

### 2. Dynamic Content (Home Services)
- [ ] **Categories API:** `GET /api/services/categories`
- [ ] **Services Listing API:** `GET /api/services?category={id}`

### 3. Booking & Checkout
- [ ] **Time Slots API:** `GET /api/bookings/slots?date={YYYY-MM-DD}`
- [ ] **Address Management:** `POST /api/user/addresses` / `GET /api/user/addresses`
- [ ] **Payment Gateway:** Razorpay integration at checkout

### 4. Order Tracking (Real-time)
- [ ] **WebSocket / SSE:** Real-time order status updates
- [ ] **Partner Data:** Assigned partner details API

### 5. Profile & Dashboard
- [ ] **User Profile:** `GET /api/user/profile`
- [ ] **Booking History:** `GET /api/user/bookings`

### 6. Salon Services
- [ ] **Salon Listing:** Separate flow/API for salon-type services

### 7. Loyalty, Wallet & Referrals
- [ ] **Wallet API:** `GET /api/user/wallet/balance`, `GET /api/user/wallet/transactions`
- [ ] **Membership API:** `GET /api/user/membership`, `GET /api/membership/plans`
- [ ] **Referral API:** `GET /api/user/referral`, `POST /api/user/referral/claim`

---

## External Dependencies
- [ ] **Partner Module**: Onboarding & Profile APIs.
- [ ] **Booking Module**: Core flow & Job matching.
- [ ] **Frontend**: Full integration with Dev 1's APIs.
