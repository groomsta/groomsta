# Groomsta Project Status & Overview

## 1. Technology Stack

The project is a modern web application built with the following technologies, verified from `package.json`:

*   **Framework**: [Next.js 16.0.8](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Library**: [React 19.2.1](https://react.dev/)
*   **Styling**:
    *   [Tailwind CSS v4](https://tailwindcss.com/)
    *   Utilities: `clsx`, `tailwind-merge`, `class-variance-authority`
    *   Animations: `tailwindcss-animate`
*   **Icons**: `lucide-react`, `react-icons`
*   **State & Validation**: `zustand`, `react-hook-form`, `zod`
*   **Backend Integration**: `axios`, `@tanstack/react-query`, `@supabase/supabase-js`, `prisma`
*   **Backend Runtime**: Node.js, Express, PostgreSQL

## 2. Implemented Application Flow

The application focuses on the **Customer Journey** at the root, with separate portals for Partners and Admins.

### 2.1 Landing Page (Customer)
**Entry Point**: [`src/app/(customer)/page.tsx`](src/app/(customer)/page.tsx) (Serves as the root `/` page)

The landing page is fully componentized and includes the following sections to convert visitors:
*   **Hero Section**: [`src/app/components/landingpage/Hero.tsx`](src/app/components/landingpage/Hero.tsx)
*   **Serviceability**: [`src/app/components/landingpage/ServiceabilityCheck.tsx`](src/app/components/landingpage/ServiceabilityCheck.tsx)
*   **Categories**: [`src/app/components/landingpage/PopularCategories.tsx`](src/app/components/landingpage/PopularCategories.tsx)
*   **Service Modes**: [`src/app/components/landingpage/ServiceModes.tsx`](src/app/components/landingpage/ServiceModes.tsx)
*   **Value Props**: [`src/app/components/landingpage/WhyChooseUs.tsx`](src/app/components/landingpage/WhyChooseUs.tsx)
*   **Reviews**: [`src/app/components/landingpage/Reviews.tsx`](src/app/components/landingpage/Reviews.tsx)
*   **CTA**: [`src/app/components/landingpage/CTABanner.tsx`](src/app/components/landingpage/CTABanner.tsx)

### 2.2 Service Discovery
**Routes**:
*   **Home Services**: [`src/app/(customer)/services/home/page.tsx`](src/app/(customer)/services/home/page.tsx)
*   **Category Details**: [`src/app/(customer)/services/home/[category]/page.tsx`](src/app/(customer)/services/home/%5Bcategory%5D/page.tsx) (Dynamic Route)

Uses shared components to display service cards and categories.

### 2.3 Booking Flow
**Entry Point**: [`src/app/(customer)/booking/page.tsx`](src/app/(customer)/booking/page.tsx)

The booking process is orchestrated by a wizard component that manages the steps:
*   **Wizard Controller**: [`src/app/components/booking/BookingWizard.tsx`](src/app/components/booking/BookingWizard.tsx)

**Steps**:
1.  **Address Selection**: [`src/app/components/booking/AddressSelector.tsx`](src/app/components/booking/AddressSelector.tsx)
2.  **Date & Time**: [`src/app/components/booking/DateTimePicker.tsx`](src/app/components/booking/DateTimePicker.tsx)
3.  **Review & Payment**: [`src/app/components/booking/BookingSummary.tsx`](src/app/components/booking/BookingSummary.tsx)

### 2.4 Salon Services
**Entry Point**: [`src/app/(customer)/services/salon/page.tsx`](src/app/(customer)/services/salon/page.tsx)

A functional dashboard for discovering salon partners:
*   **Hero with Search**: [`src/app/components/salon/SalonHero.tsx`](src/app/components/salon/SalonHero.tsx)
*   **Categories**: [`src/app/components/salon/SalonCategories.tsx`](src/app/components/salon/SalonCategories.tsx)
*   **Featured Salons**: [`src/app/components/salon/FeaturedSalons.tsx`](src/app/components/salon/FeaturedSalons.tsx)

### 2.5 Order Tracking
**Entry Point**: [`src/app/(customer)/track/page.tsx`](src/app/(customer)/track/page.tsx)

After booking, the user is redirected to the tracking page which features:
*   **Timeline Tracker**: [`src/app/components/tracking/OrderTracker.tsx`](src/app/components/tracking/OrderTracker.tsx)
*   **Partner Details**: [`src/app/components/tracking/PartnerCard.tsx`](src/app/components/tracking/PartnerCard.tsx)
*   **Live Map**: [`src/app/components/tracking/LiveStatusMap.tsx`](src/app/components/tracking/LiveStatusMap.tsx)

### 2.6 Authentication
**Entry Point**: [`src/app/auth/login/page.tsx`](src/app/auth/login/page.tsx)
*   **Frontend**: Forms in `src/app/components/auth/`.
*   **Backend**: `POST /auth/send-otp`, `POST /auth/verify-otp`.

### 2.7 Partner & Admin Portal
**Entry Point**: [`src/app/portal/page.tsx`](src/app/portal/page.tsx)
*   Serves as a gateway to:
    *   **Partner Registration**: `/partner/register`
    *   **Admin Dashboard**: `/admin/verifications/pending`

### 2.8 Backend Services (Week 2 Completed)
**Status**: Code Implementation Complete. Pending DB Activation.

*   **Payment & Wallet**:
    *   Razorpay Integration (Orders, Webhooks, Refunds).
    *   Wallet System (Credits, Transaction History).
    *   Partial Payments (20% Advance Logic).
*   **Payout & Referrals**:
    *   Payout System: Weekly commission calculation (20% fee) and Razorpay X transfers.
    *   Referral System: Code generation and ₹100 instant reward logic.
    *   **Endpoints**: `/api/payments`, `/api/wallet`, `/api/payouts`, `/api/referrals`.

## 3. Project Structure

### Key Directories
*   **`src/app/`**: Contains the Next.js App Router file-system based routing.
    *   `src/app/(customer)`: Grouped routes for customer-facing pages (Landing, Services, Booking).
    *   `src/app/components`: Application-specific UI components, organized by feature.
    *   `src/app/portal`: Gateway for internal/partner users.
    *   `src/app/admin`: Admin dashboard routes.
    *   `src/app/partner`: Partner onboarding and profiles.
*   **`src/components/ui/`**: Reusable generic UI components (shadcn/ui), properly aliased.
*   **`backend/`**: Express.js API Server.
*   **`Groomsta Docs/`**: Comprehensive project documentation.

### Documentation Files
*   **Frontend Architecture**: [`Groomsta Docs/frontend.md`](Groomsta%20Docs/frontend.md)
*   **App Flow**: [`Groomsta Docs/app-flow.md`](Groomsta%20Docs/app-flow.md)
*   **Backend Structure**: [`Groomsta Docs/backend.md`](Groomsta%20Docs/backend.md)
