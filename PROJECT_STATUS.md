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

## 2. Implemented Application Flow

The application currently focuses on the **Customer Journey**, from landing on the site to tracking a service.

### 2.1 Landing Page
**Entry Point**: [`app/(customer)/page.tsx`](app/(customer)/page.tsx)

The landing page is fully componentized and includes the following sections to convert visitors:
*   **Hero Section**: [`app/components/landingpage/Hero.tsx`](app/components/landingpage/Hero.tsx)
*   **Serviceability**: [`app/components/landingpage/ServiceabilityCheck.tsx`](app/components/landingpage/ServiceabilityCheck.tsx)
*   **Categories**: [`app/components/landingpage/PopularCategories.tsx`](app/components/landingpage/PopularCategories.tsx)
*   **Service Modes**: [`app/components/landingpage/ServiceModes.tsx`](app/components/landingpage/ServiceModes.tsx)
*   **Value Props**: [`app/components/landingpage/WhyChooseUs.tsx`](app/components/landingpage/WhyChooseUs.tsx)
*   **Reviews**: [`app/components/landingpage/Reviews.tsx`](app/components/landingpage/Reviews.tsx)
*   **CTA**: [`app/components/landingpage/CTABanner.tsx`](app/components/landingpage/CTABanner.tsx)

### 2.2 Service Discovery
**Routes**:
*   **Home Services**: [`app/(customer)/services/home/page.tsx`](app/(customer)/services/home/page.tsx)
*   **Category Details**: [`app/(customer)/services/home/[category]/page.tsx`](app/(customer)/services/home/%5Bcategory%5D/page.tsx) (Dynamic Route)

Uses shared components to display service cards and categories.

### 2.3 Booking Flow
**Entry Point**: [`app/(customer)/booking/page.tsx`](app/(customer)/booking/page.tsx)

The booking process is orchestrated by a wizard component that manages the steps:
*   **Wizard Controller**: [`app/components/booking/BookingWizard.tsx`](app/components/booking/BookingWizard.tsx)

**Steps**:
1.  **Address Selection**: [`app/components/booking/AddressSelector.tsx`](app/components/booking/AddressSelector.tsx) - Allows users to pick or enter an address.
2.  **Date & Time**: [`app/components/booking/DateTimePicker.tsx`](app/components/booking/DateTimePicker.tsx) - For scheduling the service.
3.  **Review & Payment**: [`app/components/booking/BookingSummary.tsx`](app/components/booking/BookingSummary.tsx) - Final review and simulated payment.

### 2.4 Salon Services
**Entry Point**: [`app/(customer)/services/salon/page.tsx`](app/(customer)/services/salon/page.tsx)

A functional dashboard for discovering salon partners:
*   **Hero with Search**: [`app/components/salon/SalonHero.tsx`](app/components/salon/SalonHero.tsx)
*   **Categories**: [`app/components/salon/SalonCategories.tsx`](app/components/salon/SalonCategories.tsx)
*   **Featured Salons**: [`app/components/salon/FeaturedSalons.tsx`](app/components/salon/FeaturedSalons.tsx)

### 2.5 Order Tracking
**Entry Point**: [`app/(customer)/track/page.tsx`](app/(customer)/track/page.tsx)

After booking, the user is redirected to the tracking page which features:
*   **Timeline Tracker**: [`app/components/tracking/OrderTracker.tsx`](app/components/tracking/OrderTracker.tsx) - Shows current status (e.g., "On the way").
*   **Partner Details**: [`app/components/tracking/PartnerCard.tsx`](app/components/tracking/PartnerCard.tsx) - Info about the assigned service provider.
*   **Live Map**: [`app/components/tracking/LiveStatusMap.tsx`](app/components/tracking/LiveStatusMap.tsx) - Visualizes location (mocked/integrated).

### 2.6 Authentication
**Entry Point**: [`app/auth/login/page.tsx`](app/auth/login/page.tsx)

*   **Components**: Located in `app/components/auth/` (Login forms, OTP simulation).

## 3. Project Structure

### Key Directories
*   **`app/`**: Contains the Next.js App Router file-system based routing.
    *   `app/(customer)`: Grouped routes for customer-facing pages.
    *   `app/components`: Application-specific UI components, organized by feature (`booking`, `landingpage`, `tracking`, etc.).
*   **`components/ui/`**: Reusable generic UI components (likely from shadcn/ui).
*   **`Groomsta Docs/`**: Comprehensive project documentation including PRDs, App Flow, and Engineering Plans.

### Documentation Files
*   **Frontend Architecture**: [`Groomsta Docs/frontend.md`](Groomsta%20Docs/frontend.md)
*   **App Flow**: [`Groomsta Docs/app-flow.md`](Groomsta%20Docs/app-flow.md)
*   **Backend Structure**: [`Groomsta Docs/backend.md`](Groomsta%20Docs/backend.md)
