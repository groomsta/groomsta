# Groomsta App Flow Document

## 1. System Overview

### 1.1 Entry Points

### Customer Flow : Browse → Book → Track → Complete

### Partner Flow : Onboard → Receive Jobs → Accept → Complete → Get Paid

### Admin Flow : Configure → Monitor → Manage → Process Payouts

## 2. Customer Flow

### 2.1 Landing & Authentication

### Flow A: First-Time Visitor

### Flow B: Returning User

```
Landing PageLanding Page
├─> Home Services [Button]├─> Home Services [Button]
├─> Salon Services [Button]├─> Salon Services [Button]
└─> Optional: Search Bar└─> Optional: Search Bar
```
```
Guest User Journey:Guest User Journey:
├─> Browse services (no login required)├─> Browse services (no login required)
├─> Add to cart├─> Add to cart
├─> Checkout triggers OTP├─> Checkout triggers OTP verification verification
│ ├─> Enter phone number│ ├─> Enter phone number
│ ├─> Receive OTP│ ├─> Receive OTP (SMS) (SMS)
│ ├─> │ ├─> Verify OTPVerify OTP
│ └─> │ └─> Account auto-createdAccount auto-created
└─> Complete booking└─> Complete booking
```
```
Landing PageLanding Page
├─> Login prompt (if not logged in)├─> Login prompt (if not logged in)
│ ├─> Phone + OTP│ ├─> Phone + OTP
│ └─> Email + Password (optional)│ └─> Email + Password (optional)
└─> Access full dashboard└─> Access full dashboard
```

### 2.2 Service Discovery & Selection

### 2.3 Location & Address Setup

```
Home/Salon Services SelectionHome/Salon Services Selection
││
├─> Service Categories Display├─> Service Categories Display
│ ├─> Category 1 (e.g., Hair)│ ├─> Category 1 (e.g., Hair)
│ ├─> Category 2 (e.g., Skin)│ ├─> Category 2 (e.g., Skin)
│ └─> Category N│ └─> Category N
││
├─> Select Category├─> Select Category
│ └─> │ └─> View SubcategoriesView Subcategories
│ ├─> Subcategory 1 (e.g., Haircut)│ ├─> Subcategory 1 (e.g., Haircut)
│ ├─> Subcategory 2 (e.g., Coloring)│ ├─> Subcategory 2 (e.g., Coloring)
│ └─> Subcategory N│ └─> Subcategory N
││
├─> Select Subcategory├─> Select Subcategory
│ └─> │ └─> View ServicesView Services
│ ├─> Service with variants (Gender/Location based)│ ├─> Service with variants (Gender/Location based)
│ ├─> Base price or price range│ ├─> Base price or price range
│ └─> Duration indicator│ └─> Duration indicator
││
└─> Click Service → Service Detail Page└─> Click Service → Service Detail Page
├─> Full description├─> Full description
├─> Partner price range├─> Partner price range
├─> Duration├─> Duration
├─> Customer reviews├─> Customer reviews
├─> Available add-ons├─> Available add-ons
├─> Bundle packages├─> Bundle packages
└─> [Add to Booking] button└─> [Add to Booking] button
```
```
Location Entry Point (Before/During Booking)Location Entry Point (Before/During Booking)
││
├─> Pincode Entry├─> Pincode Entry
│ ├─> Check serviceability│ ├─> Check serviceability
│ ├─> If serviceable → Proceed│ ├─> If serviceable → Proceed
│ └─> If not serviceable → Show message + alternative areas│ └─> If not serviceable → Show message + alternative areas
││
└─> Full └─> Full Address EntryAddress Entry
├─> Option ├─> Option A: Manual InputA: Manual Input
│ ├─> House/Flat number│ ├─> House/Flat number
│ ├─> Street/Locality│ ├─> Street/Locality
│ ├─> Landmark│ ├─> Landmark
│ └─> Save address│ └─> Save address
```

### 2.4 Booking Flow

#### ││

```
└─> Option B: Google Maps Picker└─> Option B: Google Maps Picker
├─> Open map interface├─> Open map interface
├─> Pin location├─> Pin location
├─> Confirm address├─> Confirm address
└─> Save address└─> Save address
```
```
Service Selected + Service Selected + Address ConfirmedAddress Confirmed
││
├─> Date Selection├─> Date Selection
│ ├─> Calendar view│ ├─> Calendar view
│ ├─> Show available dates│ ├─> Show available dates
│ └─> Select date│ └─> Select date
││
├─> Time Window Selection├─> Time Window Selection
│ ├─> Morning (9 │ ├─> Morning (9 AM - 12 PM)AM - 12 PM)
│ ├─> │ ├─> Afternoon (12 PM - 4 PM)Afternoon (12 PM - 4 PM)
│ ├─> Evening (4 PM - 8 PM)│ ├─> Evening (4 PM - 8 PM)
│ └─> Select preferred window│ └─> Select preferred window
││
├─> Review Booking Summary├─> Review Booking Summary
│ ├─> Services selected│ ├─> Services selected
│ ├─> │ ├─> Add-ons (if any)Add-ons (if any)
│ ├─> │ ├─> Total amountTotal amount
│ ├─> Price range display│ ├─> Price range display
│ └─> │ └─> Address & timeAddress & time
││
├─> Payment Options├─> Payment Options
│ ├─> Pay Full Online│ ├─> Pay Full Online
│ ├─> Pay Partial + Rest Post-Service│ ├─> Pay Partial + Rest Post-Service
│ └─> Pay │ └─> Pay After ServiceAfter Service
││
├─> Select Payment & Confirm├─> Select Payment & Confirm
│ └─> If online payment selected│ └─> If online payment selected
│ ├─> Razorpay integration│ ├─> Razorpay integration
│ ├─> Payment gateway│ ├─> Payment gateway
│ ├─> Payment success/failure│ ├─> Payment success/failure
│ └─> Return to app│ └─> Return to app
││
└─> Booking Submitted└─> Booking Submitted
├─> Booking ID generated├─> Booking ID generated
```

### 2.5 Partner Matching & Acceptance

### 2.6 Order Tracking

```
├─> Push to nearby partners├─> Push to nearby partners
└─> Customer waits for acceptance└─> Customer waits for acceptance
```
```
Booking Request SentBooking Request Sent
││
├─> System identifies nearby partners├─> System identifies nearby partners
│ ├─> Filter by service capability│ ├─> Filter by service capability
│ ├─> Filter by availability│ ├─> Filter by availability
│ └─> Filter by location radius│ └─> Filter by location radius
││
├─> Broadcast to all eligible partners├─> Broadcast to all eligible partners
│ ├─> 20-second acceptance window│ ├─> 20-second acceptance window
│ └─> Real-time notifications sent│ └─> Real-time notifications sent
││
├─> Partner Response├─> Partner Response
│ ├─> First to │ ├─> First to Accept → Gets jobAccept → Gets job
│ │ ├─> Other partners notified (job taken)│ │ ├─> Other partners notified (job taken)
│ │ ├─> Customer receives confirmation│ │ ├─> Customer receives confirmation
│ │ └─> Exact price locked│ │ └─> Exact price locked
│ ││ │
│ └─> No acceptance within 20 sec│ └─> No acceptance within 20 sec
│ ├─> Re-broadcast to next set│ ├─> Re-broadcast to next set
│ └─> Or notify customer (no partners available)│ └─> Or notify customer (no partners available)
││
└─> Job └─> Job AssignedAssigned
├─> Customer sees partner details├─> Customer sees partner details
├─> Partner sees customer details├─> Partner sees customer details
└─> Both receive confirmation notifications└─> Both receive confirmation notifications
```
```
Job Accepted → Job Accepted → Tracking BeginsTracking Begins
││
├─> Status Updates├─> Status Updates
│ ├─> │ ├─> Accepted (Partner confirmed)Accepted (Partner confirmed)
│ │ └─> Notification: "Partner assigned"│ │ └─> Notification: "Partner assigned"
│ ││ │
│ ├─> On the │ ├─> On the Way (Partner traveling)Way (Partner traveling)
│ │ └─> Notification: "Partner is on the way"│ │ └─> Notification: "Partner is on the way"
│ ││ │
│ ├─> Service Started│ ├─> Service Started
```

### 2.7 Referral & Membership

### Referral Flow

### Membership Flow

```
│ │ └─> Notification: "Service has begun"│ │ └─> Notification: "Service has begun"
│ ││ │
│ └─> Service Completed│ └─> Service Completed
│ └─> Notification: "Service completed"│ └─> Notification: "Service completed"
││
├─> Tracking Page Features├─> Tracking Page Features
│ ├─> Current status indicator│ ├─> Current status indicator
│ ├─> Partner name & photo│ ├─> Partner name & photo
│ ├─> Contact partner button│ ├─> Contact partner button
│ ├─> Service details│ ├─> Service details
│ └─> [Future] Live map tracking│ └─> [Future] Live map tracking
││
└─> Post-Service└─> Post-Service
├─> Payment (if pending)├─> Payment (if pending)
├─> Rate & Review prompt├─> Rate & Review prompt
└─> Booking history update└─> Booking history update
```
```
User DashboardUser Dashboard
││
├─> Referral Section├─> Referral Section
│ ├─> Unique referral code displayed│ ├─> Unique referral code displayed
│ ├─> [Share] button│ ├─> [Share] button
│ │ ├─> │ │ ├─> WhatsAppWhatsApp
│ │ ├─> SMS│ │ ├─> SMS
│ │ └─> Copy link│ │ └─> Copy link
│ ││ │
│ └─> Referral tracking│ └─> Referral tracking
│ ├─> Pending referrals│ ├─> Pending referrals
│ └─> Successful referrals (₹100 credited)│ └─> Successful referrals (₹100 credited)
││
└─> New User Uses Referral└─> New User Uses Referral
├─> Enter referral code at signup/checkout├─> Enter referral code at signup/checkout
├─> First booking completed├─> First booking completed
├─> ₹100 added to both wallets├─> ₹100 added to both wallets
└─> Notifications sent to both parties└─> Notifications sent to both parties
```

## 3. Partner Flow

### 3.1 Partner Onboarding

```
Membership SectionMembership Section
││
├─> View Plan Details├─> View Plan Details
│ ├─> Monthly fee│ ├─> Monthly fee
│ ├─> Flat discount per booking│ ├─> Flat discount per booking
│ └─> Priority support benefits│ └─> Priority support benefits
││
├─> Subscribe├─> Subscribe
│ ├─> Payment (monthly)│ ├─> Payment (monthly)
│ └─> Membership activated│ └─> Membership activated
││
└─> Benefits └─> Benefits AppliedApplied
├─> Auto-discount on bookings├─> Auto-discount on bookings
└─> Priority partner assignment└─> Priority partner assignment
```
```
Partner Registration EntryPartner Registration Entry
││
├─> Choose Partner ├─> Choose Partner TypeType
│ ├─> Individual Groomer│ ├─> Individual Groomer
│ └─> Salon│ └─> Salon
││
├─> Personal Information├─> Personal Information
│ ├─> Full name│ ├─> Full name
│ ├─> Phone number (OTP│ ├─> Phone number (OTP verification) verification)
│ ├─> Email│ ├─> Email
│ └─> Profile photo upload│ └─> Profile photo upload
││
├─> KYC Documents├─> KYC Documents
│ ├─> ID Proof upload (Aadhaar/P│ ├─> ID Proof upload (Aadhaar/PAN/Driving License)AN/Driving License)
│ ├─> Photo verification│ ├─> Photo verification
│ └─> Document verification (admin reviews)│ └─> Document verification (admin reviews)
││
├─> Professional Details├─> Professional Details
│ ├─> │ ├─> Years of experienceYears of experience
│ ├─> Skills & certifications│ ├─> Skills & certifications
│ └─> Previous work (optional portfolio)│ └─> Previous work (optional portfolio)
││
├─> Bank Details├─> Bank Details
│ ├─> Bank name│ ├─> Bank name
│ ├─> │ ├─> Account numberAccount number
```

### 3.2 Job Request & Acceptance

```
│ ├─> IFSC code│ ├─> IFSC code
│ └─> │ └─> Account holder nameAccount holder name
││
├─> Salon Details (if applicable)├─> Salon Details (if applicable)
│ ├─> Salon name│ ├─> Salon name
│ ├─> Salon address│ ├─> Salon address
│ ├─> Salon photos│ ├─> Salon photos
│ └─> Operating hours│ └─> Operating hours
││
├─> Services & Pricing├─> Services & Pricing
│ ├─> Select services of│ ├─> Select services offeredfered
│ ├─> Set pricing within allowed range│ ├─> Set pricing within allowed range
│ │ ├─> Base price shown│ │ ├─> Base price shown
│ │ ├─> │ │ ├─> Allowed range (± X%)Allowed range (± X%)
│ │ └─> Partner sets their price│ │ └─> Partner sets their price
│ └─> │ └─> Add custom add-ons (pre-approved)Add custom add-ons (pre-approved)
││
├─> Submit for Review├─> Submit for Review
│ └─> │ └─> Admin verification pendingAdmin verification pending
││
└─> Approval└─> Approval
├─> Account activated├─> Account activated
├─> Welcome notification├─> Welcome notification
└─> Access to partner dashboard└─> Access to partner dashboard
```
```
Partner Dashboard (Idle State)Partner Dashboard (Idle State)
││
├─> Incoming Job Request Notification├─> Incoming Job Request Notification
│ ├─> Push notification│ ├─> Push notification
│ ├─> SMS alert│ ├─> SMS alert
│ └─> In-app alert│ └─> In-app alert
││
├─> View Job Details├─> View Job Details
│ ├─> Service type│ ├─> Service type
│ ├─> Customer location & distance│ ├─> Customer location & distance
│ ├─> Date & time│ ├─> Date & time
│ ├─> Payment amount (partner earning)│ ├─> Payment amount (partner earning)
│ └─> 20-second countdown timer│ └─> 20-second countdown timer
││
├─> Partner ├─> Partner ActionsActions
│ ├─> │ ├─> Accept JobAccept Job
│ │ ├─> Job assigned immediately│ │ ├─> Job assigned immediately
│ │ ├─> Customer notified│ │ ├─> Customer notified
```

### 3.3 Job Execution

```
│ │ ├─> Job moves to "Active Jobs"│ │ ├─> Job moves to "Active Jobs"
│ │ └─> Other partners notified (job taken)│ │ └─> Other partners notified (job taken)
│ ││ │
│ └─> Reject Job│ └─> Reject Job
│ ├─> Job of│ ├─> Job offered to next partnerfered to next partner
│ └─> No penalty (tracked for metrics)│ └─> No penalty (tracked for metrics)
││
└─> Request Expires (20 seconds)└─> Request Expires (20 seconds)
├─> Auto-reject├─> Auto-reject
└─> Of└─> Offered to next partnerfered to next partner
```
```
Active JobActive Job
││
├─> Job Details ├─> Job Details ViewView
│ ├─> Customer name & contact│ ├─> Customer name & contact
│ ├─> Service address│ ├─> Service address
│ ├─> Navigation link (maps)│ ├─> Navigation link (maps)
│ ├─> Services to be performed│ ├─> Services to be performed
│ └─> Expected payment│ └─> Expected payment
││
├─> Status Updates (Partner Controls)├─> Status Updates (Partner Controls)
│ ├─> [On the │ ├─> [On the Way] buttonWay] button
│ │ └─> Customer notified│ │ └─> Customer notified
│ ││ │
│ ├─> [Service Started] button│ ├─> [Service Started] button
│ │ ├─> Customer notified│ │ ├─> Customer notified
│ │ └─> │ │ └─> Timer startsTimer starts
│ ││ │
│ └─> [Service Completed] button│ └─> [Service Completed] button
│ ├─> Customer notified│ ├─> Customer notified
│ ├─> Payment processed (if online)│ ├─> Payment processed (if online)
│ └─> Job moved to completed│ └─> Job moved to completed
││
├─> Post-Service├─> Post-Service
│ ├─> Customer payment confirmation│ ├─> Customer payment confirmation
│ ├─> Collect cash (if applicable)│ ├─> Collect cash (if applicable)
│ ├─> Upload completion photo (optional)│ ├─> Upload completion photo (optional)
│ └─> Earnings updated in dashboard│ └─> Earnings updated in dashboard
││
└─> Customer Reviews Partner└─> Customer Reviews Partner
└─> Rating visible in partner profile└─> Rating visible in partner profile
```

### 3.4 Partner Dashboard

### 3.5 Pricing Management

```
Dashboard HomeDashboard Home
││
├─> Jobs ├─> Jobs TabTab
│ ├─> Incoming Requests (pending)│ ├─> Incoming Requests (pending)
│ ├─> │ ├─> Active Jobs (ongoing)Active Jobs (ongoing)
│ └─> Past Jobs (completed history)│ └─> Past Jobs (completed history)
││
├─> Earnings ├─> Earnings TabTab
│ ├─> Current week earnings│ ├─> Current week earnings
│ ├─> │ ├─> Weekly payout scheduleWeekly payout schedule
│ ├─> Payout history│ ├─> Payout history
│ ├─> Commission breakdown│ ├─> Commission breakdown
│ └─> │ └─> Total lifetime earningsTotal lifetime earnings
││
├─> Services ├─> Services TabTab
│ ├─> List of services of│ ├─> List of services offeredfered
│ ├─> Edit pricing (within range)│ ├─> Edit pricing (within range)
│ ├─> Enable/disable services│ ├─> Enable/disable services
│ └─> Request new service additions│ └─> Request new service additions
││
├─> Availability ├─> Availability TabTab
│ ├─> Set working hours│ ├─> Set working hours
│ ├─> Set days available│ ├─> Set days available
│ ├─> │ ├─> Toggle availability on/ofToggle availability on/offf
│ └─> Block specific dates│ └─> Block specific dates
││
└─> Profile └─> Profile TabTab
├─> View/edit personal details├─> View/edit personal details
├─> View ratings & reviews├─> View ratings & reviews
├─> Update bank details├─> Update bank details
└─> View verification status└─> View verification status
```
```
Services Pricing SectionServices Pricing Section
││
├─> View Service List├─> View Service List
│ └─> For each service:│ └─> For each service:
│ ├─> Base price (set by Groomsta)│ ├─> Base price (set by Groomsta)
│ ├─> │ ├─> Allowed range (e.g., ±20%)Allowed range (e.g., ±20%)
│ └─> Current partner price│ └─> Current partner price
││
├─> Edit Pricing├─> Edit Pricing
```

### 3.6 Payout Process

## 4. Admin Flow

### 4.1 Admin Dashboard Overview

```
│ ├─> Select service│ ├─> Select service
│ ├─> │ ├─> Adjust price sliderAdjust price slider
│ ├─> │ ├─> View how it compares to othersView how it compares to others
│ └─> Save changes│ └─> Save changes
││
└─> Custom └─> Custom Add-onsAdd-ons
├─> View pre-approved add-ons├─> View pre-approved add-ons
├─> Set prices for add-ons├─> Set prices for add-ons
└─> Enable/disable add-ons└─> Enable/disable add-ons
```
```
Weekly Payout CycleWeekly Payout Cycle
││
├─> Earnings ├─> Earnings AccumulationAccumulation
│ ├─> Each completed job adds to balance│ ├─> Each completed job adds to balance
│ ├─> Commission deducted automatically│ ├─> Commission deducted automatically
│ └─> Net earnings calculated│ └─> Net earnings calculated
││
├─> Payout Day (W├─> Payout Day (Weekly)eekly)
│ ├─> System processes all partner payouts│ ├─> System processes all partner payouts
│ ├─> Payouts initiated to bank accounts│ ├─> Payouts initiated to bank accounts
│ └─> Notification sent to partners│ └─> Notification sent to partners
││
├─> Payout Details ├─> Payout Details ViewView
│ ├─> │ ├─> Total jobs completedTotal jobs completed
│ ├─> Gross earnings│ ├─> Gross earnings
│ ├─> Commission deducted│ ├─> Commission deducted
│ ├─> Net payout amount│ ├─> Net payout amount
│ └─> │ └─> Transaction IDTransaction ID
││
└─> Bank └─> Bank TransferTransfer
├─> Automated via payment gateway├─> Automated via payment gateway
├─> 1-2 business days to reflect├─> 1-2 business days to reflect
└─> Partner can view status└─> Partner can view status
```
```
Admin LoginAdmin Login
││
├─> Dashboard Home├─> Dashboard Home
```

### 4.2 Service Configuration Flow

```
│ ├─> Key metrics overview│ ├─> Key metrics overview
│ ├─> │ ├─> Today's bookingsToday's bookings
│ ├─> │ ├─> Active partnersActive partners
│ └─> Revenue summary│ └─> Revenue summary
││
├─> Services Management├─> Services Management
│ ├─> Categories│ ├─> Categories
│ ├─> Subcategories│ ├─> Subcategories
│ ├─> Services│ ├─> Services
│ └─> Pricing configuration│ └─> Pricing configuration
││
├─> Partners Management├─> Partners Management
│ ├─> Pending verifications│ ├─> Pending verifications
│ ├─> │ ├─> Active partnersActive partners
│ ├─> Suspended partners│ ├─> Suspended partners
│ └─> Performance metrics│ └─> Performance metrics
││
├─> Bookings Management├─> Bookings Management
│ ├─> │ ├─> All bookingsAll bookings
│ ├─> │ ├─> Active bookingsActive bookings
│ ├─> Cancelled bookings│ ├─> Cancelled bookings
│ └─> Disputed bookings│ └─> Disputed bookings
││
├─> Payouts Management├─> Payouts Management
│ ├─> │ ├─> Weekly payout processingWeekly payout processing
│ ├─> Payout reports│ ├─> Payout reports
│ └─> Commission tracking│ └─> Commission tracking
││
├─> Marketing Management├─> Marketing Management
│ ├─> Coupons│ ├─> Coupons
│ ├─> Referral program│ ├─> Referral program
│ └─> Membership plans│ └─> Membership plans
││
└─> Reports & └─> Reports & AnalyticsAnalytics
├─> Revenue reports├─> Revenue reports
├─> Partner performance├─> Partner performance
├─> Customer metrics├─> Customer metrics
└─> Export data└─> Export data
```
```
Services ManagementServices Management
││
├─> Add New Service├─> Add New Service
│ ├─> Select category│ ├─> Select category
```

### 4.3 Partner Verification Flow

```
│ ├─> Select/create subcategory│ ├─> Select/create subcategory
│ ├─> Enter service details│ ├─> Enter service details
│ │ ├─> Name│ │ ├─> Name
│ │ ├─> Description│ │ ├─> Description
│ │ ├─> Base price│ │ ├─> Base price
│ │ ├─> Duration│ │ ├─> Duration
│ │ └─> Partner price range (±%)│ │ └─> Partner price range (±%)
│ ├─> │ ├─> Add variants (gender/location)Add variants (gender/location)
│ └─> Publish service│ └─> Publish service
││
├─> Edit Existing Service├─> Edit Existing Service
│ ├─> Modify details│ ├─> Modify details
│ ├─> │ ├─> Adjust pricingAdjust pricing
│ └─> Enable/disable│ └─> Enable/disable
││
└─> Manage Categories└─> Manage Categories
├─> Add/edit categories├─> Add/edit categories
├─> Reorder display├─> Reorder display
└─> Add icons/images└─> Add icons/images
```
```
Partner Partner Verification QueueVerification Queue
││
├─> View Pending ├─> View Pending ApplicationsApplications
│ └─> For each application:│ └─> For each application:
│ ├─> Review personal details│ ├─> Review personal details
│ ├─> │ ├─> Verify KYC documentsVerify KYC documents
│ ├─> Check experience claims│ ├─> Check experience claims
│ └─> │ └─> Validate bank detailsValidate bank details
││
├─> Verification Decision├─> Verification Decision
│ ├─> │ ├─> Approve PartnerApprove Partner
│ │ ├─> │ │ ├─> Activate accountActivate account
│ │ ├─> Send approval notification│ │ ├─> Send approval notification
│ │ └─> Partner can start accepting jobs│ │ └─> Partner can start accepting jobs
│ ││ │
│ ├─> Request More Information│ ├─> Request More Information
│ │ ├─> Specify required documents│ │ ├─> Specify required documents
│ │ └─> Notify partner│ │ └─> Notify partner
│ ││ │
│ └─> Reject │ └─> Reject ApplicationApplication
│ ├─> Specify rejection reason│ ├─> Specify rejection reason
│ └─> Notify partner│ └─> Notify partner
││
```

### 4.4 Payout Processing Flow

## 5. Cross-Flow Interactions

### 5.1 Notification System

```
└─> Partner Management └─> Partner Management ActionsActions
├─> Suspend partner (violations)├─> Suspend partner (violations)
├─> Edit partner details├─> Edit partner details
└─> View performance metrics└─> View performance metrics
```
```
Weekly Payout ProcessingWeekly Payout Processing
││
├─> Generate Payout Report├─> Generate Payout Report
│ ├─> Calculate earnings for each partner│ ├─> Calculate earnings for each partner
│ ├─> Deduct commissions│ ├─> Deduct commissions
│ ├─> │ ├─> Verify bank detailsVerify bank details
│ └─> Generate payout file│ └─> Generate payout file
││
├─> Review Payouts├─> Review Payouts
│ ├─> Check for anomalies│ ├─> Check for anomalies
│ ├─> │ ├─> Verify amountsVerify amounts
│ └─> Resolve any issues│ └─> Resolve any issues
││
├─> Process Payouts├─> Process Payouts
│ ├─> Initiate batch transfer│ ├─> Initiate batch transfer
│ ├─> Payment gateway processing│ ├─> Payment gateway processing
│ └─> Monitor status│ └─> Monitor status
││
└─> Post-Processing└─> Post-Processing
├─> Mark payouts as complete├─> Mark payouts as complete
├─> Send notifications to partners├─> Send notifications to partners
├─> Archive payout records├─> Archive payout records
└─> Update financial reports└─> Update financial reports
```
```
Event-Based NotificationsEvent-Based Notifications
││
├─> Customer Notifications├─> Customer Notifications
│ ├─> OTP│ ├─> OTP for login (SMS) for login (SMS)
│ ├─> Booking confirmed (WhatsApp + Email)│ ├─> Booking confirmed (WhatsApp + Email)
│ ├─> Partner assigned (WhatsApp)│ ├─> Partner assigned (WhatsApp)
│ ├─> Partner on the way (SMS + Push)│ ├─> Partner on the way (SMS + Push)
│ ├─> Service started (Push)│ ├─> Service started (Push)
```

### 5.2 Payment Flows

```
│ ├─> Service completed (WhatsApp + Email)│ ├─> Service completed (WhatsApp + Email)
│ ├─> Payment receipt (Email)│ ├─> Payment receipt (Email)
│ └─> Referral rewards (Push)│ └─> Referral rewards (Push)
││
├─> Partner Notifications├─> Partner Notifications
│ ├─> New job request (Push + SMS)│ ├─> New job request (Push + SMS)
│ ├─> Job assigned (Push)│ ├─> Job assigned (Push)
│ ├─> Customer updates (Push)│ ├─> Customer updates (Push)
│ ├─> Payout processed (SMS + Email)│ ├─> Payout processed (SMS + Email)
│ └─> │ └─> Account status changes (Email)Account status changes (Email)
││
└─> Admin Notifications└─> Admin Notifications
├─> New partner registration (Email)├─> New partner registration (Email)
├─> Disputed booking (Email)├─> Disputed booking (Email)
└─> System alerts (Email)└─> System alerts (Email)
```
```
Payment ProcessingPayment Processing
││
├─> Customer Payment├─> Customer Payment
│ ├─> Full Online Payment│ ├─> Full Online Payment
│ │ ├─> Razorpay checkout│ │ ├─> Razorpay checkout
│ │ ├─> Payment captured│ │ ├─> Payment captured
│ │ └─> Receipt generated│ │ └─> Receipt generated
│ ││ │
│ ├─> Partial Payment│ ├─> Partial Payment
│ │ ├─> Online advance payment│ │ ├─> Online advance payment
│ │ ├─> Balance after service│ │ ├─> Balance after service
│ │ └─> Both receipts generated│ │ └─> Both receipts generated
│ ││ │
│ └─> Pay │ └─> Pay After ServiceAfter Service
│ ├─> Cash/online post-service│ ├─> Cash/online post-service
│ ├─> Partner confirms payment│ ├─> Partner confirms payment
│ └─> Receipt generated│ └─> Receipt generated
││
├─> Wallet Usage├─> Wallet Usage
│ ├─> Check wallet balance│ ├─> Check wallet balance
│ ├─> │ ├─> Apply credits at checkoutApply credits at checkout
│ ├─> Remaining amount paid via gateway│ ├─> Remaining amount paid via gateway
│ └─> Update wallet balance│ └─> Update wallet balance
││
└─> Refunds└─> Refunds
├─> Cancellation refund├─> Cancellation refund
├─> Dispute resolution refund├─> Dispute resolution refund
```

### 5.3 Dynamic Pricing

## 6. Error Handling & Edge Cases

### 6.1 Booking Failures

```
├─> Credit to wallet or original source├─> Credit to wallet or original source
└─> Notification sent└─> Notification sent
```
```
Price CalculationPrice Calculation
││
├─> Base Price (Set by ├─> Base Price (Set by Admin)Admin)
││
├─> Partner ├─> Partner AdjustmentAdjustment
│ └─> Partner sets price within range│ └─> Partner sets price within range
││
├─> Sur├─> Surge Pricing ge Pricing TriggersTriggers
│ ├─> High demand detected│ ├─> High demand detected
│ │ └─> │ │ └─> Apply surApply surge multiplierge multiplier
│ ││ │
│ └─> Low partner supply│ └─> Low partner supply
│ └─> │ └─> Apply surApply surge multiplierge multiplier
││
├─> Customer ├─> Customer ViewView
│ ├─> Before acceptance: Price range shown│ ├─> Before acceptance: Price range shown
│ └─> │ └─> After acceptance: Exact price lockedAfter acceptance: Exact price locked
││
└─> Final Price Components└─> Final Price Components
├─> Base service price├─> Base service price
├─> Add-ons (if selected)├─> Add-ons (if selected)
├─> Sur├─> Surge (if applicable)ge (if applicable)
├─> Discounts (membership/coupon)├─> Discounts (membership/coupon)
└─> Total amount└─> Total amount
```
```
Booking Error ScenariosBooking Error Scenarios
││
├─> No Partners ├─> No Partners AvailableAvailable
│ ├─> Notify customer immediately│ ├─> Notify customer immediately
│ ├─> Suggest alternative time slots│ ├─> Suggest alternative time slots
│ └─> Refund if payment made│ └─> Refund if payment made
││
├─> Payment Failed├─> Payment Failed
│ ├─> Retry payment option│ ├─> Retry payment option
```

### 6.2 Partner Issues

## 7. Mobile PWA Considerations

```
│ ├─> │ ├─> Alternative payment methodsAlternative payment methods
│ └─> Hold booking for 10 minutes│ └─> Hold booking for 10 minutes
││
├─> Partner Cancellation├─> Partner Cancellation
│ ├─> Re-broadcast to other partners│ ├─> Re-broadcast to other partners
│ ├─> Notify customer of delay│ ├─> Notify customer of delay
│ └─> If no alternate: full refund│ └─> If no alternate: full refund
││
└─> Customer Cancellation└─> Customer Cancellation
├─> Before partner assigned: Full refund├─> Before partner assigned: Full refund
├─> After assigned (>2 hours): Full refund├─> After assigned (>2 hours): Full refund
└─> After assigned (<2 hours): Partial refund└─> After assigned (<2 hours): Partial refund
```
```
Partner Problem ScenariosPartner Problem Scenarios
││
├─> Partner No-Show├─> Partner No-Show
│ ├─> Customer reports issue│ ├─> Customer reports issue
│ ├─> │ ├─> Admin investigatesAdmin investigates
│ ├─> Customer gets full refund│ ├─> Customer gets full refund
│ └─> Partner penalty applied│ └─> Partner penalty applied
││
├─> Service Quality Issues├─> Service Quality Issues
│ ├─> Customer leaves low rating│ ├─> Customer leaves low rating
│ ├─> │ ├─> Admin reviews caseAdmin reviews case
│ ├─> Partial refund to customer│ ├─> Partial refund to customer
│ └─> Partner training/warning│ └─> Partner training/warning
││
└─> Partner └─> Partner Verification FailedVerification Failed
├─> Application rejected├─> Application rejected
├─> Reason communicated├─> Reason communicated
└─> Option to reapply with corrections└─> Option to reapply with corrections
```
```
Progressive Progressive Web App FeaturesWeb App Features
││
├─> Installation├─> Installation
│ ├─> │ ├─> Add to home screen promptAdd to home screen prompt
│ ├─> Of│ ├─> Offline splash screenfline splash screen
│ └─> │ └─> App-like experienceApp-like experience
││
```

## 8. Future Enhancements (Phase 2 & 3)

### Phase 2 Features

### Live map tracking for "On the Way" status

### Enhanced ratings & reviews with photos

### Partner heat maps for demand visualization

### PWA optimizations for app-like performance

### Phase 3 Features

### Native mobile apps (React Native)

### AI-based partner assignment (smart matching)

### Salon marketplace with direct booking

### Loyalty programs and tiered memberships

## Document Version

### Version: 1.

### Last Updated: December 2024

### Status: Ready for Development

```
├─> Of├─> Offline Capabilitiesfline Capabilities
│ ├─> Cache key pages│ ├─> Cache key pages
│ ├─> │ ├─> View past bookings ofView past bookings offlinefline
│ └─> Queue actions when of│ └─> Queue actions when offlinefline
││
├─> Push Notifications├─> Push Notifications
│ ├─> Request permission│ ├─> Request permission
│ ├─> Real-time updates│ ├─> Real-time updates
│ └─> Background sync│ └─> Background sync
││
└─> Performance└─> Performance
├─> Lazy loading├─> Lazy loading
├─> Optimized images├─> Optimized images
└─> Fast navigation└─> Fast navigation
```

