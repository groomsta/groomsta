# Pending Requirements & Dynamic Data Needs
**Status as of 2025-12-16**

This document lists all the pending items, backend integration points, and dynamic data structures required to convert the current UI prototypes into a fully functional application.

## 1. Authentication Module
- [ ] **Backend API:** Connect `/api/auth/send-otp` and `/api/auth/verify-otp` (Dev 1 Trigger).
- [ ] **JWT Management:** Implement `middleware.ts` to protect routes like `/booking`, `/track`, `/profile`.
- [ ] **State Management:** persistent `useAuth` store to holding the user session.

## 2. Dynamic Content (Home Services)
- [ ] **Categories API:** `GET /api/services/categories`
    - Needs `id`, `name`, `iconUrl`, `accentColor`.
- [ ] **Services Listing API:** `GET /api/services?category={id}`
    - Needs `price`, `duration`, `description`, `variants` (e.g. Men/Women).

## 3. Booking & Checkout
- [ ] **Time Slots API:** `GET /api/bookings/slots?date={YYYY-MM-DD}`
    - To fetch *real* partner availability.
- [ ] **Address Management:**
    - `POST /api/user/addresses` to save new addresses.
    - `GET /api/user/addresses` to list saved addresses.
- [ ] **Payment Gateway:** Razorpay/Stripe integration script injection and `createOrder` call.

## 4. Order Tracking (Real-time)
- [ ] **WebSocket / SSE:** Need a socket connection URL for real-time order status updates.
    - Events: `order_accepted`, `partner_location_update`, `service_started`, `service_completed`.
- [ ] **Partner Data:** API to fetch assigned partner details (Name, Photo, Rating, Phone).

## 5. Profile & Dashboard
- [ ] **User Profile:** `GET /api/user/profile` (Name, Email, Phone).
- [ ] **Booking History:** `GET /api/user/bookings` (Active, Past, Cancelled).

## 6. Salon Services
- [ ] **Salon Listing:** Needs a separate flow/API similar to Home Services but filtering by "Salon" type.

## 7. Loyalty, Wallet & Referrals (New)
- [ ] **Wallet API:**
    - `GET /api/user/wallet/balance`
    - `GET /api/user/wallet/transactions`
- [ ] **Membership API:**
    - `GET /api/user/membership` (Current status)
    - `GET /api/membership/plans` (Available plans)
- [ ] **Referral API:**
    - `GET /api/user/referral` (Code, Stats, Earnings)
    - `POST /api/user/referral/claim` (If manual claim needed)
