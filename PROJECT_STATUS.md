# Groomsta Project Status & Overview

## 🏆 Dev 1 Deliverables: 100% COMPLETE
**Overall Status**: All milestones for Weeks 1-4 have been successfully implemented, verified, and documented.

### Week 1: Foundation Clean
*   ✅ **Authentication**: OTP, JWT, Helmet Security.
*   ✅ **Infrastructure**: APIs, Middleware, Logging.

### Week 2: Fintech Core
*   ✅ **Payments**: Razorpay Integration (Live Ready).
*   ✅ **Wallet**: Full Credit/Debit Ledger System.

### Week 3: Operations
*   ✅ **Payouts**: Automated Weekly Distributions (Cron).
*   ✅ **Referrals & Membership**: Growth engines implemented.

### Week 4: Security & Scale
*   ✅ **Notifications**: BullMQ Redis Queue (Email/SMS).
*   ✅ **Compliance**: Security Audit Scripts & Incident Playbook.
*   ✅ **Documentation**: Swagger UI & Production Configs.

---

## 1. Technology Stack

The project is a modern web application built with the following technologies:

*   **Framework**: [Next.js 16.0.8](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Library**: [React 19.2.1](https://react.dev/)
*   **Styling**:
    *   [Tailwind CSS v3.4](https://tailwindcss.com/)
    *   Utilities: `clsx`, `tailwind-merge`, `class-variance-authority`
    *   Animations: `tailwindcss-animate`
*   **Icons**: `lucide-react`, `react-icons`
*   **State & Validation**: `zustand`, `react-hook-form`, `zod`
*   **Backend Integration**: `axios`, `@tanstack/react-query`, `@supabase/supabase-js`, `prisma`

## 2. Implemented Application Flow

The application focuses on the **Customer Journey** at the root, with separate portals for Partners and Admins.

### 2.1 Landing Page (Customer)
**Entry Point**: `src/app/(customer)/page.tsx` (Serves as the root `/` page)

The landing page is fully componentized and includes the following sections:
*   **Hero Section**: `src/app/components/landingpage/Hero.tsx`
*   **Serviceability**: `src/app/components/landingpage/ServiceabilityCheck.tsx`
*   **Categories**: `src/app/components/landingpage/PopularCategories.tsx`
*   **Service Modes**: `src/app/components/landingpage/ServiceModes.tsx`
*   **Value Props**: `src/app/components/landingpage/WhyChooseUs.tsx`
*   **Reviews**: `src/app/components/landingpage/Reviews.tsx`
*   **CTA**: `src/app/components/landingpage/CTABanner.tsx`

### 2.2 Service Discovery
*   **Home Services**: `src/app/(customer)/services/home/page.tsx`
*   **Category Details**: `src/app/(customer)/services/home/[category]/page.tsx` (Dynamic Route)

### 2.3 Booking Flow
**Entry Point**: `src/app/(customer)/booking/page.tsx`

**Steps**:
1.  **Address Selection**: `src/app/components/booking/AddressSelector.tsx`
2.  **Date & Time**: `src/app/components/booking/DateTimePicker.tsx`
3.  **Review & Payment**: `src/app/components/booking/BookingSummary.tsx`

### 2.4 Salon Services
**Entry Point**: `src/app/(customer)/services/salon/page.tsx`

### 2.5 Order Tracking
**Entry Point**: `src/app/(customer)/track/page.tsx`

### 2.6 Authentication
**Entry Point**: `src/app/auth/login/page.tsx`

### 2.7 Partner & Admin Portal
**Entry Point**: `src/app/portal/page.tsx`

### 2.8 User Dashboard
**Entry Point**: `src/app/(customer)/profile/page.tsx`
*   **Wallet**: `src/app/components/profile/WalletSection.tsx`
*   **Membership**: `src/app/components/profile/MembershipSection.tsx`
*   **Referrals**: `src/app/components/profile/ReferralSection.tsx`

## 3. Project Structure

### Key Directories
*   **`src/app/`**: Contains the Next.js App Router file-system based routing.
    *   `src/app/(customer)`: Customer-facing pages (Landing, Services, Booking).
    *   `src/app/components`: Application-specific UI components, organized by feature.
    *   `src/app/portal`: Gateway for internal/partner users.
    *   `src/app/admin`: Admin dashboard routes.
    *   `src/app/partner`: Partner onboarding and profiles.
*   **`src/components/ui/`**: Reusable generic UI components (shadcn/ui).
*   **`backend/`**: Express.js backend with auth, payments, wallet, payouts, referrals, membership, notifications.
*   **`Groomsta Docs/`**: Comprehensive project documentation.
