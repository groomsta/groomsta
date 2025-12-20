# Pending Requirements & Dynamic Data Needs
**Status as of 2025-12-20 (Week 2 Complete)**

This document lists the status of integration points required to convert the UI prototypes into a fully functional application.

## 1. Authentication Module
- [x] **Backend API:** Connect `/api/auth/send-otp` and `/api/auth/verify-otp`. (**COMPLETED**)
- [ ] **JWT Management:** Implement `middleware.ts` to protect routes like `/booking`, `/track`, `/profile` (Frontend).
- [ ] **State Management:** persistent `useAuth` store to holding the user session (Frontend).

## 2. Dynamic Content (Home Services)
- [ ] **Categories API:** `GET /api/services/categories`
    - Needs `id`, `name`, `iconUrl`, `accentColor`.
- [ ] **Services Listing API:** `GET /api/services?category={id}`
    - Needs `price`, `duration`, `description`, `variants` (e.g. Men/Women).

## 3. Booking & Checkout
- [ ] **Time Slots API:** `GET /api/bookings/slots?date={YYYY-MM-DD}` (Partner Availability).
- [ ] **Address Management:**
    - `POST /api/user/addresses` to save new addresses.
    - `GET /api/user/addresses` to list saved addresses.
- [x] **Payment Gateway:** Razorpay Integration (Order Creation, Verification, Webhooks). (**COMPLETED ON BACKEND**)
    - *Frontend Task*: Connect to `/api/payments/create-order` and Razorpay Checkout SDK.

## 4. Wallet & Financials (Week 2 Feats)
- [x] **Wallet System:** Credits, Debits, Balance API. (**COMPLETED ON BACKEND**)
    - *Frontend Task*: Build Wallet UI pages.
- [x] **Payout System:** Weekly Commission Calculation & Transfers. (**COMPLETED ON BACKEND**)
- [x] **Referral System:** Code Generation & Instant Rewards. (**COMPLETED ON BACKEND**)

## 5. Order Tracking (Real-time)
- [ ] **WebSocket / SSE:** Socket connection for real-time order status updates.
    - Events: `order_accepted`, `partner_location_update`, `service_started`, `service_completed`.
- [ ] **Partner Data:** API to fetch assigned partner details.

## 6. Profile & Dashboard
- [ ] **User Profile:** `GET /api/user/profile` (Name, Email, Phone).
- [ ] **Booking History:** `GET /api/user/bookings` (Active, Past, Cancelled).

## 7. Critical Blockers
- [ ] **Database Activation**: `Payout` and `Referral` tables need to be pushed to the active database (Waiting for Credentials).
