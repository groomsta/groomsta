# Groomsta Backend Structure Document

## Document Information

### Version: 1.

### Last Updated: December 2024

### Prepared By: Senior Backend Engineering Team

### Status: Ready for Implementation

## Table of Contents

### 1. Architecture Overview

### 2. Technology Stack

### 3. Database Design

### 4. API Structure

### 5. Authentication & Authorization

### 6. Real-time Communication

### 7. Payment Integration

### 8. Notification System

### 9. Cron Jobs & Scheduled Tasks

### 10. File Storage

### 11. Caching Strategy

### 12. Security Considerations

### 13. Error Handling

### 14. Logging & Monitoring

### 15. Deployment Architecture

## 1. Architecture Overview

### 1.1 System Architecture Pattern

### Microservices-Ready Monolithic Architecture (Modular Monolith for MVP, easy migration to microservices)


### 1.2 Core Modules

##### ┌─────────────────────────────────────────────────────────────┐

##### ┌─────────────────────────────────────────────────────────────┐

```
│ Load Balancer ││ Load Balancer │
```
```
│ (AWS ALB / Nginx) │
```
```
│ (AWS ALB / Nginx) │
```
##### └──────────────────────┬──────────────────────────────────────┘

##### └──────────────────────┬──────────────────────────────────────┘

##### ││

##### ┌───────────────┴───────────────┐

##### ┌───────────────┴───────────────┐

##### │ │

##### │ │

##### ┌──────▼──────┐ ┌─────▼──────┐┌──────▼──────┐ ┌─────▼──────┐

```
│ API │ │ WebSocket │
```
```
│ API │ │ WebSocket │
```
```
│ Gateway │ │ Server │
```
```
│ Gateway │ │ Server │
```
##### └──────┬──────┘ └─────┬──────┘

##### └──────┬──────┘ └─────┬──────┘

##### │ │

##### │ │

##### ├───────────────┬───────────────┤

##### ├───────────────┬───────────────┤

##### │ │ │

##### │ │ │

##### ┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐

```
│ Auth │ │ Business │ │ Real-time │
```
```
│ Auth │ │ Business │ │ Real-time │
```
```
│ Service │ │ Logic │ │ Events │
```
```
│ Service │ │ Logic │ │ Events │
```
##### └──────┬──────┘ └─────┬─────┘ └─────┬──────┘└──────┬──────┘ └─────┬─────┘ └─────┬──────┘

##### │ │ │

##### │ │ │

##### └───────────────┴───────────────┘

##### └───────────────┴───────────────┘

##### ││

##### ┌───────────────┼───────────────┐

##### ┌───────────────┼───────────────┐

##### │ │ │

##### │ │ │

##### ┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐

```
│ PostgreSQL │ │ Redis │ │ S3 │
```
```
│ PostgreSQL │ │ Redis │ │ S3 │
```
```
│ (Primary) │ │ (Cache) │ │ (Storage) │
```
```
│ (Primary) │ │ (Cache) │ │ (Storage) │
```
##### └─────────────┘ └───────────┘ └────────────┘

##### └─────────────┘ └───────────┘ └────────────┘

##### │

##### │

##### ┌──────▼──────┐

##### ┌──────▼──────┐

```
│ PostgreSQL │
```
```
│ PostgreSQL │
```
```
│ (Replica) ││ (Replica) │
```
##### └─────────────┘

##### └─────────────┘

```
src/
```
```
src/
```
```
├── modules/
```
```
├── modules/
```
```
│ ├── auth/ # │ ├── auth/ # Authentication & Authentication & AuthorizationAuthorization
```
```
│ ├── users/ # Customer Management
```
```
│ ├── users/ # Customer Management
```
```
│ ├── partners/ # Partner Management
```
```
│ ├── partners/ # Partner Management
```
```
│ ├── services/ # Service Catalog│ ├── services/ # Service Catalog
```
```
│ ├── bookings/ # Booking Management
```
```
│ ├── bookings/ # Booking Management
```
```
│ ├── payments/ # Payment Processing
```
```
│ ├── payments/ # Payment Processing
```
```
│ ├── notifications/ # Multi-channel Notifications
```
```
│ ├── notifications/ # Multi-channel Notifications
```
```
│ ├── wallet/ # Wallet & Credits
```
```
│ ├── wallet/ # Wallet & Credits
```
```
│ ├── payouts/ # Partner Payouts
```
```
│ ├── payouts/ # Partner Payouts
```

## 2. Technology Stack

### 2.1 Core Technologies

```
 
```
```
Component Technology Version Justification
```
```
Runtime Node.js 20.x LTS Performance, async I/O, ecosystem
```
```
Framework NestJS 10.x Scalable, TypeScript, modular architecture
```
```
Language TypeScript 5.x Type safety, maintainability
```
```
Database PostgreSQL 16.x ACID compliance, JSON support, reliability
```
```
Cache Redis 7.x High-performance caching, pub/sub
```
```
ORM TypeORM 0.3.x TypeScript native, migrations, relations
```
```
Real-time Socket.io 4.x WebSocket, fallback support, rooms
```
```
API Documentation Swagger 7.x Auto-generated docs, testing interface
```
```
│ ├── reviews/ # Ratings & Reviews
```
```
│ ├── reviews/ # Ratings & Reviews
```
```
│ ├── referrals/ # Referral System
```
```
│ ├── referrals/ # Referral System
```
```
│ ├── memberships/ # Membership Plans│ ├── memberships/ # Membership Plans
```
```
│ ├── admin/ # Admin Operations
```
```
│ ├── admin/ # Admin Operations
```
```
│ └── analytics/ # Metrics & Reporting
```
```
│ └── analytics/ # Metrics & Reporting
```
```
├── common/├── common/
```
```
│ ├── config/ # Configuration
```
```
│ ├── config/ # Configuration
```
```
│ ├── constants/ # Constants & Enums
```
```
│ ├── constants/ # Constants & Enums
```
```
│ ├── decorators/ # Custom Decorators│ ├── decorators/ # Custom Decorators
```
```
│ ├── dto/ # Data Transfer Objects
```
```
│ ├── dto/ # Data Transfer Objects
```
```
│ ├── guards/ # Route Guards
```
```
│ ├── guards/ # Route Guards
```
```
│ ├── interceptors/ # Response Interceptors│ ├── interceptors/ # Response Interceptors
```
```
│ ├── middleware/ # Middleware
```
```
│ ├── middleware/ # Middleware
```
```
│ ├── utils/ # Utility Functions
```
```
│ ├── utils/ # Utility Functions
```
```
│ └── validators/ # Custom Validators
```
```
│ └── validators/ # Custom Validators
```
```
├── database/
```
```
├── database/
```
```
│ ├── migrations/ # Database Migrations
```
```
│ ├── migrations/ # Database Migrations
```
```
│ ├── seeds/ # Seed Data
```
```
│ ├── seeds/ # Seed Data
```
```
│ └── entities/ # Database Entities│ └── entities/ # Database Entities
```
```
└── integrations/
```
```
└── integrations/
```
```
├── razorpay/ # Payment Gateway
```
```
├── razorpay/ # Payment Gateway
```
```
├── firebase/ # Push Notifications├── firebase/ # Push Notifications
```
```
├── aws/ # AWS Services
```
```
├── aws/ # AWS Services
```
```
├── sms/ # SMS Gateway
```
```
├── sms/ # SMS Gateway
```
```
├── whatsapp/ # ├── whatsapp/ # WhatsApp Business WhatsApp Business APIAPI
```
```
└── email/ # Email Service
```
```
└── email/ # Email Service
```

### 2.2 External Services

```
 
```
```
Service Provider Purpose
```
```
Payment Gateway Razorpay Online payments, refunds
```
```
File Storage AWS S3 / Supabase Document storage, images
```
```
SMS Gateway MSG91 / Twilio OTP, alerts
```
```
WhatsApp API Gupshup / Twilio Notifications
```
```
Email Service SendGrid / AWS SES Transactional emails
```
```
Push Notifications Firebase Cloud Messaging Real-time push
```
```
Maps API Google Maps Location, distance calculation
```
### 2.3 Development Tools

### Logging: Winston / Pino

### Monitoring: Sentry (errors), New Relic (APM)

### API Testing: Jest, Supertest

### Code Quality: ESLint, Prettier, Husky

### Documentation: Swagger/OpenAPI 3.

### Task Queue: Bull (Redis-based)

## 3. Database Design

### 3.1 Database Schema

### 3.1.1 Users & Authentication

```
sql
```

_-- Users T-- Users Table (Customers)able (Customers)_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
users
```
```
users
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

phone phone VARCHARVARCHAR(( 1515 )) UNIQUEUNIQUE NOTNOT NULLNULL,,

email

email
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### UNIQUE

##### UNIQUE

##### ,

##### ,

password_hash

password_hash
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### ,

##### ,

```
-- For optional email login
```
```
-- For optional email login
```
full_name

full_name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### ,

##### ,

profile_image_url

profile_image_url
TEXT

##### TEXT

##### ,

##### ,

is_verified

is_verified
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

last_login_at last_login_at TIMESTTIMESTAMPAMP,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_users_phone
```
```
idx_users_phone
(
```
##### (

```
phone
```
```
phone
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_users_email
```
```
idx_users_email
(
```
##### (

```
email
```
```
email
)
```
##### )

##### ));;

_-- OTP Verification_

_-- OTP Verification_

CREACREATETE TABLETABLE otp_verifications otp_verifications ((

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

phone

phone
VARCHAR

##### VARCHAR

##### (

##### (

##### 15

##### 15

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

otp

otp
VARCHAR

##### VARCHAR

##### (

##### (

##### 6

##### 6

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

purpose

purpose
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'login', 'registration', 'verification'
```
```
-- 'login', 'registration', 'verification'
```
expires_at

expires_at
TIMESTAMP

##### TIMESTAMP

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

is_used

is_used
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

attempts attempts INTINT DEFAULTDEFAULT 00 ,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

INDEXINDEX idx_otp_phone idx_otp_phone ((phonephone)),,

##### INDEX

##### INDEX

```
idx_otp_expires
```
```
idx_otp_expires
(
```
##### (

```
expires_at
```
```
expires_at
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Sessions_

_-- Sessions_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
user_sessions
```
```
user_sessions
(
```
##### (

id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,

user_id UUID

user_id UUID
REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

partner_id UUID

partner_id UUID
REFERENCES

##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

refresh_token

refresh_token
VARCHAR

##### VARCHAR

##### (

##### (

##### 500

##### 500

##### )

##### )

##### UNIQUE

##### UNIQUE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

device_info JSONB

device_info JSONB
,

##### ,

```
-- User agent, IP, device type
```
```
-- User agent, IP, device type
```
expires_at

expires_at
TIMESTAMP

##### TIMESTAMP

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

##### INDEX

##### INDEX

```
idx_sessions_user
```
```
idx_sessions_user
(
```
##### (

```
user_id
```
```
user_id
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_sessions_partner idx_sessions_partner ((partner_idpartner_id)),,


### 3.1.2 Partners

##### INDEX

##### INDEX

```
idx_sessions_token
```
```
idx_sessions_token
(
```
##### (

```
refresh_token
```
```
refresh_token
)
```
##### )

##### )

##### )

##### ;

##### ;

```
sql
```

_-- Partners T-- Partners Tableable_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
partners
```
```
partners
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

partner_type partner_type VARCHARVARCHAR(( 5050 )) NOTNOT NULLNULL,, _-- 'individual', 'salon'-- 'individual', 'salon'_

phone

phone
VARCHAR

##### VARCHAR

##### (

##### (

##### 15

##### 15

##### )

##### )

##### UNIQUE

##### UNIQUE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

email

email
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### UNIQUE

##### UNIQUE

##### ,

##### ,

password_hash

password_hash
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### ,

##### ,

full_name

full_name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

profile_image_url

profile_image_url
TEXT

##### TEXT

##### ,

##### ,

_-- Professional Details-- Professional Details_

experience_years

experience_years
INT

##### INT

##### ,

##### ,

skills

skills
TEXT

##### TEXT

##### [

##### [

##### ]

##### ]

##### ,

##### ,

bio bio TEXTTEXT,,

```
-- Verification Status
```
```
-- Verification Status
```
verification_status verification_status VARCHARVARCHAR(( 5050 )) DEFAULTDEFAULT 'pending''pending',, _-- 'pending', 'verified', 'r-- 'pending', 'verified', 'rejected', 'suspended'ejected', 'suspended'_

verified_at

verified_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

verified_by UUID

verified_by UUID
REFERENCES

##### REFERENCES

```
admin_users
```
```
admin_users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

rejection_reason rejection_reason TEXTTEXT,,

```
-- Location
```
```
-- Location
```
latitude

latitude
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 8

##### 8

##### )

##### )

##### ,

##### ,

longitude

longitude
DECIMAL

##### DECIMAL

##### (

##### (

##### 11

##### 11

##### ,

##### ,

##### 8

##### 8

##### )

##### )

##### ,

##### ,

service_radius_km

service_radius_km
DECIMAL

##### DECIMAL

##### (

##### (

##### 5

##### 5

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 10.

##### 10.

##### ,

##### ,

_-- Availability-- Availability_

is_available

is_available
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

```
-- Ratings
```
```
-- Ratings
```
average_rating

average_rating
DECIMAL

##### DECIMAL

##### (

##### (

##### 3

##### 3

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 0.

##### 0.

##### ,

##### ,

total_ratings total_ratings INTINT DEFAULTDEFAULT 00 ,,

total_jobs_completed

total_jobs_completed
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_partners_phone
```
```
idx_partners_phone
(
```
##### (

```
phone
```
```
phone
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_partners_location
```
```
idx_partners_location
(
```
##### (

```
latitude
```
```
latitude
,
```
##### ,

```
longitude
```
```
longitude
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_partners_status
```
```
idx_partners_status
(
```
##### (

```
verification_status
```
```
verification_status
,
```
##### ,

```
is_active
```
```
is_active
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Partner Documents (KYC)_

_-- Partner Documents (KYC)_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
partner_documents
```
```
partner_documents
(
```
##### (

id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,


partner_id UUID

partner_id UUID
REFERENCES

##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

document_type

document_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'aadhaar', 'pan', 'license', 'photo'
```
```
-- 'aadhaar', 'pan', 'license', 'photo'
```
document_url document_url TEXTTEXT NOTNOT NULLNULL,,

document_number

document_number
VARCHAR

##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### ,

##### ,

verification_status

verification_status
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### DEFAULT

##### DEFAULT

```
'pending'
```
```
'pending'
,
```
##### ,

verified_at verified_at TIMESTTIMESTAMPAMP,,

verified_by UUID

verified_by UUID
REFERENCES

##### REFERENCES

```
admin_users
```
```
admin_users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

notes

notes
TEXT

##### TEXT

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

##### INDEX

##### INDEX

```
idx_partner_docs_partner
```
```
idx_partner_docs_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_partner_docs_status idx_partner_docs_status ((verification_statusverification_status))

##### )

##### )

##### ;

##### ;

_-- Partner Bank Details_

_-- Partner Bank Details_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
partner_bank_details
```
```
partner_bank_details
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

partner_id UUID

partner_id UUID
UNIQUE

##### UNIQUE

##### REFERENCES

##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

bank_name bank_name VARCHARVARCHAR(( 255255 )) NOTNOT NULLNULL,,

account_holder_name

account_holder_name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

account_number

account_number
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

ifsc_code ifsc_code VARCHARVARCHAR(( 2020 )) NOTNOT NULLNULL,,

account_type

account_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### ,

##### ,

```
-- 'savings', 'current'
```
```
-- 'savings', 'current'
```
is_verified

is_verified
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

verified_at verified_at TIMESTTIMESTAMPAMP,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_bank_partner
```
```
idx_bank_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Salon Details (if partner_type = 'salon')_

_-- Salon Details (if partner_type = 'salon')_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
salon_details
```
```
salon_details
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

partner_id UUID partner_id UUID UNIQUEUNIQUE REFERENCESREFERENCES partners partners((idid)) ONON DELETEDELETE CASCADECASCADE,,

salon_name

salon_name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

salon_address

salon_address
TEXT

##### TEXT

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

pincode pincode VARCHARVARCHAR(( 1010 )) NOTNOT NULLNULL,,

latitude

latitude
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 8

##### 8

##### )

##### )

##### ,

##### ,

longitude

longitude
DECIMAL

##### DECIMAL

##### (

##### (

##### 11

##### 11

##### ,

##### ,

##### 8

##### 8

##### )

##### )

##### ,

##### ,

operating_hours JSONB operating_hours JSONB,, _-- {"monday": {"open": "09:00", "close": "21:00"}, ...}-- {"monday": {"open": "09:00", "close": "21:00"}, ...}_

amenities

amenities
TEXT

##### TEXT

##### [

##### [

##### ]

##### ]

##### ,

##### ,

photos

photos
TEXT

##### TEXT

##### [

##### [

##### ]

##### ]

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_salon_partner
```
```
idx_salon_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ,

##### ,


### 3.1.3 Services Catalog

##### INDEX

##### INDEX

```
idx_salon_location
```
```
idx_salon_location
(
```
##### (

```
latitude
```
```
latitude
,
```
##### ,

```
longitude
```
```
longitude
)
```
##### )

##### )

##### )

##### ;

##### ;

```
-- Partner Availability
```
```
-- Partner Availability
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
partner_availability
```
```
partner_availability
(
```
##### (

```
id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,
```
```
partner_id UUID
```
```
partner_id UUID
REFERENCES
```
##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

```
day_of_week
```
```
day_of_week
INT
```
##### INT

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 0=Sunday, 6=Saturday
```
```
-- 0=Sunday, 6=Saturday
```
```
start_time start_time TIMETIME NOTNOT NULLNULL,,
```
```
end_time
```
```
end_time
TIME
```
##### TIME

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
is_available
```
```
is_available
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

```
created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,
```
##### UNIQUE

##### UNIQUE

##### (

##### (

```
partner_id
```
```
partner_id
,
```
##### ,

```
day_of_week
```
```
day_of_week
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_availability_partner
```
```
idx_availability_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### )

##### )

##### ;

##### ;

```
-- Partner Blocked Dates
```
```
-- Partner Blocked Dates
```
```
CREACREATETE TABLETABLE partner_blocked_dates partner_blocked_dates ((
```
```
id UUID
```
```
id UUID
PRIMARY
```
##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

```
partner_id UUID
```
```
partner_id UUID
REFERENCES
```
##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

```
blocked_date blocked_date DATEDATE NOTNOT NULLNULL,,
```
```
reason
```
```
reason
TEXT
```
##### TEXT

##### ,

##### ,

```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### UNIQUE

##### UNIQUE

##### (

##### (

```
partner_id
```
```
partner_id
,
```
##### ,

```
blocked_date
```
```
blocked_date
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_blocked_partner_date
```
```
idx_blocked_partner_date
(
```
##### (

```
partner_id
```
```
partner_id
,
```
##### ,

```
blocked_date
```
```
blocked_date
)
```
##### )

##### ));;

```
sql
```

_-- Service Categories-- Service Categories_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
service_categories
```
```
service_categories
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

name name VARCHARVARCHAR(( 255255 )) NOTNOT NULLNULL,,

slug

slug
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### UNIQUE

##### UNIQUE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description

description
TEXT

##### TEXT

##### ,

##### ,

icon_url

icon_url
TEXT

##### TEXT

##### ,

##### ,

display_order

display_order
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at updated_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

##### INDEX

##### INDEX

```
idx_categories_slug
```
```
idx_categories_slug
(
```
##### (

```
slug
```
```
slug
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_categories_order idx_categories_order ((display_orderdisplay_order))

##### )

##### )

##### ;

##### ;

_-- Service Subcategories-- Service Subcategories_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
service_subcategories
```
```
service_subcategories
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

category_id UUID category_id UUID REFERENCESREFERENCES service_categories service_categories((idid)) ONON DELETEDELETE CASCADECASCADE,,

name

name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

slug

slug
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description

description
TEXT

##### TEXT

##### ,

##### ,

icon_url

icon_url
TEXT

##### TEXT

##### ,

##### ,

display_order

display_order
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

UNIQUEUNIQUE((category_idcategory_id,, slug slug)),,

##### INDEX

##### INDEX

```
idx_subcategories_category
```
```
idx_subcategories_category
(
```
##### (

```
category_id
```
```
category_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_subcategories_slug
```
```
idx_subcategories_slug
(
```
##### (

```
slug
```
```
slug
)
```
##### )

##### ));;

_-- Services_

_-- Services_

CREACREATETE TABLETABLE services services ((

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

subcategory_id UUID

subcategory_id UUID
REFERENCES

##### REFERENCES

```
service_subcategories
```
```
service_subcategories
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

name

name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

slug

slug
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description

description
TEXT

##### TEXT

##### ,

##### ,

long_description

long_description
TEXT

##### TEXT

##### ,

##### ,

```
-- Pricing
```
```
-- Pricing
```
base_price

base_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

partner_price_range_percent partner_price_range_percent DECIMALDECIMAL(( 55 ,, 22 )) DEFAULTDEFAULT 20.020.0,, _-- ± per-- ± percentagecentage_


```
-- Service Details
```
```
-- Service Details
```
duration_minutes duration_minutes INTINT NOTNOT NULLNULL,,

service_type

service_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'home', 'salon', 'both'
```
```
-- 'home', 'salon', 'both'
```
_-- Variants-- Variants_

has_gender_variants

has_gender_variants
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

has_location_variants

has_location_variants
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

```
-- Media
```
```
-- Media
```
image_url

image_url
TEXT

##### TEXT

##### ,

##### ,

images images TEXTTEXT[[]],,

```
-- Status
```
```
-- Status
```
is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

display_order

display_order
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at updated_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

##### INDEX

##### INDEX

```
idx_services_subcategory
```
```
idx_services_subcategory
(
```
##### (

```
subcategory_id
```
```
subcategory_id
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_services_slug idx_services_slug ((slugslug)),,

##### INDEX

##### INDEX

```
idx_services_type
```
```
idx_services_type
(
```
##### (

```
service_type
```
```
service_type
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Service Variants_

_-- Service Variants_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
service_variants
```
```
service_variants
(
```
##### (

id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,

service_id UUID

service_id UUID
REFERENCES

##### REFERENCES

```
services
```
```
services
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

variant_type

variant_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'gender', 'location'
```
```
-- 'gender', 'location'
```
variant_value

variant_value
VARCHAR

##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'male', 'female', 'delhi', 'noida'
```
```
-- 'male', 'female', 'delhi', 'noida'
```
price_adjustment

price_adjustment
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 0.

##### 0.

##### ,

##### ,

```
-- Additional price
```
```
-- Additional price
```
is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

UNIQUEUNIQUE((service_idservice_id,, variant_type variant_type,, variant_value variant_value)),,

##### INDEX

##### INDEX

```
idx_variants_service
```
```
idx_variants_service
(
```
##### (

```
service_id
```
```
service_id
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Service Add-ons_

_-- Service Add-ons_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
service_addons
```
```
service_addons
(
```
##### (

id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,

service_id UUID

service_id UUID
REFERENCES

##### REFERENCES

```
services
```
```
services
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

name

name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description description TEXTTEXT,,

base_price

base_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

duration_minutes

duration_minutes
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,


##### INDEX

##### INDEX

```
idx_addons_service
```
```
idx_addons_service
(
```
##### (

```
service_id
```
```
service_id
)
```
##### )

##### ));;

_-- Service Bundles_

_-- Service Bundles_

CREACREATETE TABLETABLE service_bundles service_bundles ((

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

name

name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description description TEXTTEXT,,

bundle_price

bundle_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

discount_percent

discount_percent
DECIMAL

##### DECIMAL

##### (

##### (

##### 5

##### 5

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### ,

##### ,

is_active is_active BOOLEANBOOLEAN DEFAULTDEFAULT TRUETRUE,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_bundles_active
```
```
idx_bundles_active
(
```
##### (

```
is_active
```
```
is_active
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Bundle Services (Many-to-Many)_

_-- Bundle Services (Many-to-Many)_

CREACREATETE TABLETABLE bundle_services bundle_services ((

bundle_id UUID

bundle_id UUID
REFERENCES

##### REFERENCES

```
service_bundles
```
```
service_bundles
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

service_id UUID

service_id UUID
REFERENCES

##### REFERENCES

```
services
```
```
services
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

PRIMARPRIMARYY KEYKEY ((bundle_idbundle_id,, service_id service_id))

##### )

##### )

##### ;

##### ;

_-- Partner Services (Services offer-- Partner Services (Services offered by partners with custom pricing)ed by partners with custom pricing)_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
partner_services
```
```
partner_services
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

partner_id UUID partner_id UUID REFERENCESREFERENCES partners partners((idid)) ONON DELETEDELETE CASCADECASCADE,,

service_id UUID

service_id UUID
REFERENCES

##### REFERENCES

```
services
```
```
services
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

custom_price

custom_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

is_available

is_available
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

UNIQUEUNIQUE((partner_idpartner_id,, service_id service_id)),,

##### INDEX

##### INDEX

```
idx_partner_services_partner
```
```
idx_partner_services_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_partner_services_service
```
```
idx_partner_services_service
(
```
##### (

```
service_id
```
```
service_id
)
```
##### )

##### ));;

_-- Partner Add-on Pricing_

_-- Partner Add-on Pricing_

CREACREATETE TABLETABLE partner_addon_pricing partner_addon_pricing ((

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

partner_id UUID

partner_id UUID
REFERENCES

##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

addon_id UUID addon_id UUID REFERENCESREFERENCES service_addons service_addons((idid)) ONON DELETEDELETE CASCADECASCADE,,

custom_price

custom_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

is_available

is_available
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,


### 3.1.4 Addresses & Locations

### 3.1.5 Bookings

##### UNIQUE

##### UNIQUE

##### (

##### (

```
partner_id
```
```
partner_id
,
```
##### ,

```
addon_id
```
```
addon_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_partner_addons_partner
```
```
idx_partner_addons_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ));;

```
sql
```
```
-- User Addresses
```
```
-- User Addresses
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
user_addresses
```
```
user_addresses
(
```
##### (

```
id UUID
```
```
id UUID
PRIMARY
```
##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

```
user_id UUID
```
```
user_id UUID
REFERENCES
```
##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

```
address_type
```
```
address_type
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### DEFAULT

##### DEFAULT

```
'home'
```
```
'home'
,
```
##### ,

```
-- 'home', 'work', 'other'
```
```
-- 'home', 'work', 'other'
```
```
house_number
```
```
house_number
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### ,

##### ,

```
street_address street_address TEXTTEXT NOTNOT NULLNULL,,
```
```
landmark
```
```
landmark
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### ,

##### ,

```
pincode
```
```
pincode
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 10

##### 10

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
city city VARCHARVARCHAR(( 100100 )) NOTNOT NULLNULL,,
```
```
state
```
```
state
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
latitude
```
```
latitude
DECIMAL
```
##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 8

##### 8

##### )

##### )

##### ,

##### ,

```
longitude longitude DECIMALDECIMAL(( 1111 ,, 88 )),,
```
```
is_default
```
```
is_default
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
updated_at updated_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,
```
##### INDEX

##### INDEX

```
idx_addresses_user
```
```
idx_addresses_user
(
```
##### (

```
user_id
```
```
user_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_addresses_pincode
```
```
idx_addresses_pincode
(
```
##### (

```
pincode
```
```
pincode
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_addresses_location
```
```
idx_addresses_location
(
```
##### (

```
latitude
```
```
latitude
,
```
##### ,

```
longitude
```
```
longitude
)
```
##### )

##### )

##### )

##### ;

##### ;

```
-- Serviceable Locations-- Serviceable Locations
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
serviceable_locations
```
```
serviceable_locations
(
```
##### (

```
id UUID
```
```
id UUID
PRIMARY
```
##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

```
pincode pincode VARCHARVARCHAR(( 1010 )) UNIQUEUNIQUE NOTNOT NULLNULL,,
```
```
city
```
```
city
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
state
```
```
state
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
is_active is_active BOOLEANBOOLEAN DEFAULTDEFAULT TRUETRUE,,
```
```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
INDEXINDEX idx_serviceable_pincode idx_serviceable_pincode ((pincodepincode))
```
##### )

##### )

##### ;

##### ;

```
sql
```

_-- Bookings-- Bookings_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
bookings
```
```
bookings
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

booking_number booking_number VARCHARVARCHAR(( 5050 )) UNIQUEUNIQUE NOTNOT NULLNULL,, _-- Human-r-- Human-readable: GRM-2024-001234eadable: GRM-2024-_

```
-- User Info
```
```
-- User Info
```
user_id UUID

user_id UUID
REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
-- NULL for guest bookings
```
```
-- NULL for guest bookings
```
guest_phone

guest_phone
VARCHAR

##### VARCHAR

##### (

##### (

##### 15

##### 15

##### )

##### )

##### ,

##### ,

guest_name

guest_name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### ,

##### ,

_-- Partner Info-- Partner Info_

partner_id UUID

partner_id UUID
REFERENCES

##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

_-- Service Details-- Service Details_

service_id UUID

service_id UUID
REFERENCES

##### REFERENCES

```
services
```
```
services
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

service_type

service_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'home', 'salon'
```
```
-- 'home', 'salon'
```
```
-- Location
```
```
-- Location
```
address_id UUID

address_id UUID
REFERENCES

##### REFERENCES

```
user_addresses
```
```
user_addresses
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

salon_id UUID salon_id UUID REFERENCESREFERENCES salon_details salon_details((idid)),,

```
-- Scheduling
```
```
-- Scheduling
```
booking_date

booking_date
DATE

##### DATE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

time_slot

time_slot
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- 'morning', 'afternoon', 'evening'
```
```
-- 'morning', 'afternoon', 'evening'
```
preferred_start_time

preferred_start_time
TIME

##### TIME

##### ,

##### ,

actual_start_time

actual_start_time
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

actual_end_time actual_end_time TIMESTTIMESTAMPAMP,,

```
-- Pricing
```
```
-- Pricing
```
service_base_price service_base_price DECIMALDECIMAL(( 1010 ,, 22 )) NOTNOT NULLNULL,,

addons_price

addons_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 0.

##### 0.

##### ,

##### ,

surge_multiplier

surge_multiplier
DECIMAL

##### DECIMAL

##### (

##### (

##### 4

##### 4

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 1.

##### 1.

##### ,

##### ,

discount_amount discount_amount DECIMALDECIMAL(( 1010 ,, 22 )) DEFAULTDEFAULT 0.00.0,,

total_amount

total_amount
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

partner_earning

partner_earning
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

commission_amount commission_amount DECIMALDECIMAL(( 1010 ,, 22 )) NOTNOT NULLNULL,,

commission_percent

commission_percent
DECIMAL

##### DECIMAL

##### (

##### (

##### 5

##### 5

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

adjustments

adjustments
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 0.

##### 0.

##### ,

##### ,

```
-- penalties, bonuses
```
```
-- penalties, bonuses
```
net_payout_amount

net_payout_amount
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- Bank Details (snapshot at payout time)
```
```
-- Bank Details (snapshot at payout time)
```
bank_account_number

bank_account_number
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

bank_ifsc_code bank_ifsc_code VARCHARVARCHAR(( 2020 )) NOTNOT NULLNULL,,

bank_account_holder

bank_account_holder
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

_-- Status-- Status_


### 3.1.8 Reviews & Ratings

```
payout_status
```
```
payout_status
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### DEFAULT

##### DEFAULT

```
'pending'
```
```
'pending'
,
```
##### ,

```
-- 'pending', 'processing', 'completed', 'failed', 'on_hold'
```
```
-- 'pending', 'processing', 'completed', 'failed', 'on_hold'
```
```
-- Transaction
```
```
-- Transaction
```
```
transaction_reference
```
```
transaction_reference
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### ,

##### ,

```
payment_gateway_response JSONB payment_gateway_response JSONB,,
```
```
processed_at
```
```
processed_at
TIMESTAMP
```
##### TIMESTAMP

##### ,

##### ,

```
completed_at completed_at TIMESTTIMESTAMPAMP,,
```
```
failed_at
```
```
failed_at
TIMESTAMP
```
##### TIMESTAMP

##### ,

##### ,

```
failure_reason
```
```
failure_reason
TEXT
```
##### TEXT

##### ,

##### ,

```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
updated_at
```
```
updated_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_payouts_batch
```
```
idx_payouts_batch
(
```
##### (

```
payout_batch_id
```
```
payout_batch_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_payouts_partner
```
```
idx_payouts_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_payouts_status
```
```
idx_payouts_status
(
```
##### (

```
payout_status
```
```
payout_status
)
```
##### )

##### ,

##### ,

```
INDEXINDEX idx_payouts_period idx_payouts_period ((period_start_dateperiod_start_date,, period_end_date period_end_date))
```
##### )

##### )

##### ;

##### ;

```
-- Payout Booking Items (Which bookings ar-- Payout Booking Items (Which bookings are in this payout)e in this payout)
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
payout_booking_items
```
```
payout_booking_items
(
```
##### (

```
id UUID
```
```
id UUID
PRIMARY
```
##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

```
payout_id UUID payout_id UUID REFERENCESREFERENCES partner_payouts partner_payouts((idid)) ONON DELETEDELETE CASCADECASCADE,,
```
```
booking_id UUID
```
```
booking_id UUID
REFERENCES
```
##### REFERENCES

```
bookings
```
```
bookings
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
service_amount service_amount DECIMALDECIMAL(( 1010 ,, 22 )) NOTNOT NULLNULL,,
```
```
commission_amount
```
```
commission_amount
DECIMAL
```
##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
partner_earning
```
```
partner_earning
DECIMAL
```
##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_payout_items_payout
```
```
idx_payout_items_payout
(
```
##### (

```
payout_id
```
```
payout_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_payout_items_booking
```
```
idx_payout_items_booking
(
```
##### (

```
booking_id
```
```
booking_id
)
```
##### )

##### )

##### )

##### ;

##### ;

```
sql
```

### 3.1.9 Referrals & Memberships

```
-- Reviews-- Reviews
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
reviews
```
```
reviews
(
```
##### (

```
id UUID
```
```
id UUID
PRIMARY
```
##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

```
booking_id UUID booking_id UUID UNIQUEUNIQUE REFERENCESREFERENCES bookings bookings((idid)) ONON DELETEDELETE CASCADECASCADE,,
```
```
user_id UUID
```
```
user_id UUID
REFERENCES
```
##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
partner_id UUID
```
```
partner_id UUID
REFERENCES
```
##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
-- Ratings (1-5)
```
```
-- Ratings (1-5)
```
```
overall_rating
```
```
overall_rating
DECIMAL
```
##### DECIMAL

##### (

##### (

##### 2

##### 2

##### ,

##### ,

##### 1

##### 1

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### CHECK

##### CHECK

##### (

##### (

```
overall_rating
```
```
overall_rating
>=
```
##### >=

##### 1

##### 1

##### AND

##### AND

```
overall_rating
```
```
overall_rating
<=
```
##### <=

##### 5

##### 5

##### )

##### )

##### ,

##### ,

```
professionalism_rating
```
```
professionalism_rating
DECIMAL
```
##### DECIMAL

##### (

##### (

##### 2

##### 2

##### ,

##### ,

##### 1

##### 1

##### )

##### )

##### ,

##### ,

```
quality_rating quality_rating DECIMALDECIMAL(( 22 ,, 11 )),,
```
```
punctuality_rating
```
```
punctuality_rating
DECIMAL
```
##### DECIMAL

##### (

##### (

##### 2

##### 2

##### ,

##### ,

##### 1

##### 1

##### )

##### )

##### ,

##### ,

```
-- Review-- Review
```
```
review_text
```
```
review_text
TEXT
```
##### TEXT

##### ,

##### ,

```
review_images
```
```
review_images
TEXT
```
##### TEXT

##### [

##### [

##### ]

##### ]

##### ,

##### ,

```
-- Partner Response
```
```
-- Partner Response
```
```
partner_response
```
```
partner_response
TEXT
```
##### TEXT

##### ,

##### ,

```
partner_responded_at partner_responded_at TIMESTTIMESTAMPAMP,,
```
```
-- Status
```
```
-- Status
```
```
is_verified
```
```
is_verified
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

```
is_visible
```
```
is_visible
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

```
is_flagged
```
```
is_flagged
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

```
flagged_reason
```
```
flagged_reason
TEXT
```
##### TEXT

##### ,

##### ,

```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
updated_at
```
```
updated_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_reviews_booking
```
```
idx_reviews_booking
(
```
##### (

```
booking_id
```
```
booking_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_reviews_user
```
```
idx_reviews_user
(
```
##### (

```
user_id
```
```
user_id
)
```
##### )

##### ,

##### ,

```
INDEXINDEX idx_reviews_partner idx_reviews_partner ((partner_idpartner_id)),,
```
##### INDEX

##### INDEX

```
idx_reviews_rating
```
```
idx_reviews_rating
(
```
##### (

```
overall_rating
```
```
overall_rating
DESC
```
##### DESC

##### )

##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_reviews_visible
```
```
idx_reviews_visible
(
```
##### (

```
is_visible
```
```
is_visible
,
```
##### ,

```
created_at
```
```
created_at
DESC
```
##### DESC

##### )

##### )

##### ));;

```
sql
```

_-- Referrals-- Referrals_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
referrals
```
```
referrals
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

referrer_user_id UUID referrer_user_id UUID REFERENCESREFERENCES users users((idid)),,

referee_user_id UUID

referee_user_id UUID
REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

referral_code

referral_code
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- Status
```
```
-- Status
```
referral_status

referral_status
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### DEFAULT

##### DEFAULT

```
'pending'
```
```
'pending'
,
```
##### ,

_-- 'pending', 'completed', 'expir-- 'pending', 'completed', 'expired', 'cancelled'ed', 'cancelled'_

```
-- Rewards
```
```
-- Rewards
```
referrer_reward_amount referrer_reward_amount DECIMALDECIMAL(( 1010 ,, 22 )) DEFAULTDEFAULT 100.00100.00,,

referee_reward_amount

referee_reward_amount
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### DEFAULT

##### DEFAULT

##### 100.

##### 100.

##### ,

##### ,

referrer_credited referrer_credited BOOLEANBOOLEAN DEFAULTDEFAULT FALSEFALSE,,

referee_credited

referee_credited
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

referrer_credited_at referrer_credited_at TIMESTTIMESTAMPAMP,,

referee_credited_at

referee_credited_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

```
-- First booking by referee
```
```
-- First booking by referee
```
first_booking_id UUID

first_booking_id UUID
REFERENCES

##### REFERENCES

```
bookings
```
```
bookings
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

completed_at

completed_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

expires_at

expires_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

INDEXINDEX idx_referrals_referrer idx_referrals_referrer ((referrer_user_idreferrer_user_id)),,

##### INDEX

##### INDEX

```
idx_referrals_referee
```
```
idx_referrals_referee
(
```
##### (

```
referee_user_id
```
```
referee_user_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_referrals_code
```
```
idx_referrals_code
(
```
##### (

```
referral_code
```
```
referral_code
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_referrals_status idx_referrals_status ((referral_statusreferral_status))

##### )

##### )

##### ;

##### ;

_-- User Referral Codes-- User Referral Codes_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
user_referral_codes
```
```
user_referral_codes
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

user_id UUID

user_id UUID
UNIQUE

##### UNIQUE

##### REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ON

##### ON

##### DELETE

##### DELETE

##### CASCADE

##### CASCADE

##### ,

##### ,

referral_code

referral_code
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### UNIQUE

##### UNIQUE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

total_referrals

total_referrals
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

successful_referrals

successful_referrals
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

total_earned total_earned DECIMALDECIMAL(( 1010 ,, 22 )) DEFAULTDEFAULT 0.00.0,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

INDEXINDEX idx_referral_codes_user idx_referral_codes_user ((user_iduser_id)),,


##### INDEX

##### INDEX

```
idx_referral_codes_code
```
```
idx_referral_codes_code
(
```
##### (

```
referral_code
```
```
referral_code
)
```
##### )

##### )

##### )

##### ;

##### ;

_-- Membership Plans_

_-- Membership Plans_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
membership_plans
```
```
membership_plans
(
```
##### (

id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,

name

name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description

description
TEXT

##### TEXT

##### ,

##### ,

```
-- Pricing
```
```
-- Pricing
```
monthly_price

monthly_price
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

validity_days validity_days INTINT NOTNOT NULLNULL,,

```
-- Benefits
```
```
-- Benefits
```
discount_percent

discount_percent
DECIMAL

##### DECIMAL

##### (

##### (

##### 5

##### 5

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### ,

##### ,

flat_discount_amount

flat_discount_amount
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### ,

##### ,

priority_support

priority_support
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

priority_booking

priority_booking
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

```
-- Limits
```
```
-- Limits
```
max_bookings_per_month

max_bookings_per_month
INT

##### INT

##### ,

##### ,

is_active

is_active
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at updated_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

##### INDEX

##### INDEX

```
idx_membership_plans_active
```
```
idx_membership_plans_active
(
```
##### (

```
is_active
```
```
is_active
)
```
##### )

##### ));;

_-- User Memberships_

_-- User Memberships_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
user_memberships
```
```
user_memberships
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

user_id UUID

user_id UUID
REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

plan_id UUID

plan_id UUID
REFERENCES

##### REFERENCES

```
membership_plans
```
```
membership_plans
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
-- Subscription
```
```
-- Subscription
```
subscription_status

subscription_status
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### DEFAULT

##### DEFAULT

```
'active'
```
```
'active'
,
```
##### ,

_-- 'active', 'expir-- 'active', 'expired', 'cancelled', 'paused'ed', 'cancelled', 'paused'_

started_at

started_at
TIMESTAMP

##### TIMESTAMP

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

expires_at expires_at TIMESTTIMESTAMPAMP NOTNOT NULLNULL,,

cancelled_at

cancelled_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

_-- Payment-- Payment_

payment_id UUID

payment_id UUID
REFERENCES

##### REFERENCES

```
payments
```
```
payments
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
-- Usage
```
```
-- Usage
```

### 3.1.10 Coupons & Promotions

```
bookings_used
```
```
bookings_used
INT
```
##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

```
created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,
```
```
updated_at
```
```
updated_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
INDEXINDEX idx_memberships_user idx_memberships_user ((user_iduser_id)),,
```
##### INDEX

##### INDEX

```
idx_memberships_status
```
```
idx_memberships_status
(
```
##### (

```
subscription_status
```
```
subscription_status
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_memberships_expires
```
```
idx_memberships_expires
(
```
##### (

```
expires_at
```
```
expires_at
)
```
##### )

##### ));;

```
sql
```

_-- Coupons-- Coupons_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
coupons
```
```
coupons
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

code code VARCHARVARCHAR(( 5050 )) UNIQUEUNIQUE NOTNOT NULLNULL,,

```
-- Details
```
```
-- Details
```
title

title
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

description

description
TEXT

##### TEXT

##### ,

##### ,

```
-- Discount
```
```
-- Discount
```
discount_type discount_type VARCHARVARCHAR(( 5050 )) NOTNOT NULLNULL,, _-- 'percentage', 'fixed'-- 'percentage', 'fixed'_

discount_value

discount_value
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

max_discount_amount

max_discount_amount
DECIMAL

##### DECIMAL

##### (

##### (

##### 10

##### 10

##### ,

##### ,

##### 2

##### 2

##### )

##### )

##### ,

##### ,

min_order_amount min_order_amount DECIMALDECIMAL(( 1010 ,, 22 )),,

```
-- Usage Limits
```
```
-- Usage Limits
```
usage_limit_per_user usage_limit_per_user INTINT DEFAULTDEFAULT 11 ,,

total_usage_limit

total_usage_limit
INT

##### INT

##### ,

##### ,

current_usage_count

current_usage_count
INT

##### INT

##### DEFAULT

##### DEFAULT

##### 0

##### 0

##### ,

##### ,

```
-- Validity
```
```
-- Validity
```
valid_from

valid_from
TIMESTAMP

##### TIMESTAMP

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

valid_until

valid_until
TIMESTAMP

##### TIMESTAMP

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- Restrictions
```
```
-- Restrictions
```
applicable_service_ids UUID

applicable_service_ids UUID
[

##### [

##### ]

##### ]

##### ,

##### ,

applicable_user_ids UUID applicable_user_ids UUID[[]],,

first_order_only

first_order_only
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

is_active is_active BOOLEANBOOLEAN DEFAULTDEFAULT TRUETRUE,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_coupons_code
```
```
idx_coupons_code
(
```
##### (

```
code
```
```
code
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_coupons_active
```
```
idx_coupons_active
(
```
##### (

```
is_active
```
```
is_active
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_coupons_validity idx_coupons_validity ((valid_fromvalid_from,, valid_until valid_until))

##### )

##### )

##### ;

##### ;

_-- Coupon Usage_

_-- Coupon Usage_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
coupon_usage
```
```
coupon_usage
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

coupon_id UUID

coupon_id UUID
REFERENCES

##### REFERENCES

```
coupons
```
```
coupons
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

user_id UUID user_id UUID REFERENCESREFERENCES users users((idid)),,

booking_id UUID

booking_id UUID
REFERENCES

##### REFERENCES

```
bookings
```
```
bookings
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

discount_amount discount_amount DECIMALDECIMAL(( 1010 ,, 22 )) NOTNOT NULLNULL,,


### 3.1.11 Notifications

```
used_at
```
```
used_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
INDEXINDEX idx_coupon_usage_coupon idx_coupon_usage_coupon ((coupon_idcoupon_id)),,
```
##### INDEX

##### INDEX

```
idx_coupon_usage_user
```
```
idx_coupon_usage_user
(
```
##### (

```
user_id
```
```
user_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_coupon_usage_booking
```
```
idx_coupon_usage_booking
(
```
##### (

```
booking_id
```
```
booking_id
)
```
##### )

##### ));;

```
sql
```

_-- Notifications-- Notifications_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
notifications
```
```
notifications
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

```
-- Recipient
```
```
-- Recipient
```
user_id UUID

user_id UUID
REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

partner_id UUID

partner_id UUID
REFERENCES

##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
-- Notification Details
```
```
-- Notification Details
```
notification_type

notification_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

_-- 'booking_confirmed', 'partner_assigned', 'service_started', etc.-- 'booking_confirmed', 'partner_assigned', 'service_started', etc._

title

title
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

message message TEXTTEXT NOTNOT NULLNULL,,

```
-- Channels
```
```
-- Channels
```
channels channels TEXTTEXT[[]] NOTNOT NULLNULL,, _-- ['sms', 'email', 'whatsapp', 'push']-- ['sms', 'email', 'whatsapp', 'push']_

```
-- Delivery Status per Channel
```
```
-- Delivery Status per Channel
```
delivery_status JSONB delivery_status JSONB,,

```
-- {"sms": {"status": "sent", "sent_at": "..."}, "email": {...}}
```
```
-- {"sms": {"status": "sent", "sent_at": "..."}, "email": {...}}
```
```
-- Metadata
```
```
-- Metadata
```
booking_id UUID

booking_id UUID
REFERENCES

##### REFERENCES

```
bookings
```
```
bookings
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

metadata JSONB

metadata JSONB
,

##### ,

_-- Status-- Status_

is_read

is_read
BOOLEAN

##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### FALSE

##### FALSE

##### ,

##### ,

read_at

read_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

INDEXINDEX idx_notifications_user idx_notifications_user ((user_iduser_id)),,

##### INDEX

##### INDEX

```
idx_notifications_partner
```
```
idx_notifications_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_notifications_type
```
```
idx_notifications_type
(
```
##### (

```
notification_type
```
```
notification_type
)
```
##### )

##### ,

##### ,

INDEXINDEX idx_notifications_read idx_notifications_read ((is_readis_read,, created_at created_at DESCDESC))

##### )

##### )

##### ;

##### ;

_-- Notification Templates_

_-- Notification Templates_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
notification_templates
```
```
notification_templates
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

template_key

template_key
VARCHAR

##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### UNIQUE

##### UNIQUE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

template_name template_name VARCHARVARCHAR(( 255255 )) NOTNOT NULLNULL,,

```
-- Channel-specific templates
```
```
-- Channel-specific templates
```
sms_template sms_template TEXTTEXT,,


### 3.1.12 Admin & System

```
email_subject
```
```
email_subject
TEXT
```
##### TEXT

##### ,

##### ,

```
email_template
```
```
email_template
TEXT
```
##### TEXT

##### ,

##### ,

```
whatsapp_template whatsapp_template TEXTTEXT,,
```
```
push_title
```
```
push_title
TEXT
```
##### TEXT

##### ,

##### ,

```
push_body
```
```
push_body
TEXT
```
##### TEXT

##### ,

##### ,

```
-- Variables in template
```
```
-- Variables in template
```
```
template_variables
```
```
template_variables
TEXT
```
##### TEXT

##### [

##### [

##### ]

##### ]

##### ,

##### ,

```
is_active
```
```
is_active
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

```
updated_at updated_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,
```
##### INDEX

##### INDEX

```
idx_templates_key
```
```
idx_templates_key
(
```
##### (

```
template_key
```
```
template_key
)
```
##### )

##### )

##### )

##### ;

##### ;

```
-- Push Notification Tokens
```
```
-- Push Notification Tokens
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
push_notification_tokens
```
```
push_notification_tokens
(
```
##### (

```
id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,
```
```
user_id UUID
```
```
user_id UUID
REFERENCES
```
##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
partner_id UUID
```
```
partner_id UUID
REFERENCES
```
##### REFERENCES

```
partners
```
```
partners
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
token
```
```
token
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 500

##### 500

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
device_type
```
```
device_type
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### ,

##### ,

```
-- 'android', 'ios', 'web'
```
```
-- 'android', 'ios', 'web'
```
```
device_info JSONB device_info JSONB,,
```
```
is_active
```
```
is_active
BOOLEAN
```
##### BOOLEAN

##### DEFAULT

##### DEFAULT

##### TRUE

##### TRUE

##### ,

##### ,

```
last_used_at last_used_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,
```
```
created_at
```
```
created_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_push_tokens_user
```
```
idx_push_tokens_user
(
```
##### (

```
user_id
```
```
user_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_push_tokens_partner
```
```
idx_push_tokens_partner
(
```
##### (

```
partner_id
```
```
partner_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_push_tokens_active
```
```
idx_push_tokens_active
(
```
##### (

```
is_active
```
```
is_active
)
```
##### )

##### )

##### )

##### ;

##### ;

```
sql
```

_-- Admin Users-- Admin Users_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
admin_users
```
```
admin_users
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

email email VARCHARVARCHAR(( 255255 )) UNIQUEUNIQUE NOTNOT NULLNULL,,

password_hash

password_hash
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

full_name

full_name
VARCHAR

##### VARCHAR

##### (

##### (

##### 255

##### 255

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
-- Role & Permissions
```
```
-- Role & Permissions
```
role

role
VARCHAR

##### VARCHAR

##### (

##### (

##### 50

##### 50

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### DEFAULT

##### DEFAULT

```
'admin'
```
```
'admin'
,
```
##### ,

```
-- 'super_admin', 'admin', 'finance', 'support', 'operations'
```
```
-- 'super_admin', 'admin', 'finance', 'support', 'operations'
```
permissions JSONB

permissions JSONB
,

##### ,

```
-- Granular permissions
```
```
-- Granular permissions
```
is_active is_active BOOLEANBOOLEAN DEFAULTDEFAULT TRUETRUE,,

last_login_at

last_login_at
TIMESTAMP

##### TIMESTAMP

##### ,

##### ,

created_at created_at TIMESTTIMESTAMPAMP DEFAULTDEFAULT CURRENT_TIMESTCURRENT_TIMESTAMPAMP,,

updated_at

updated_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

INDEXINDEX idx_admin_email idx_admin_email ((emailemail))

##### )

##### )

##### ;

##### ;

_-- Audit Logs_

_-- Audit Logs_

##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
audit_logs
```
```
audit_logs
(
```
##### (

id UUID

id UUID
PRIMARY

##### PRIMARY

##### KEY

##### KEY

##### DEFAULT

##### DEFAULT

```
gen_random_uuid
```
```
gen_random_uuid
(
```
##### (

##### )

##### )

##### ,

##### ,

_-- Actor-- Actor_

admin_user_id UUID

admin_user_id UUID
REFERENCES

##### REFERENCES

```
admin_users
```
```
admin_users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

user_id UUID

user_id UUID
REFERENCES

##### REFERENCES

```
users
```
```
users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

partner_id UUID partner_id UUID REFERENCESREFERENCES partners partners((idid)),,

```
-- Action
```
```
-- Action
```
actionaction VARCHARVARCHAR(( 100100 )) NOTNOT NULLNULL,,

entity_type

entity_type
VARCHAR

##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

entity_id UUID

entity_id UUID
,

##### ,

```
-- Details
```
```
-- Details
```
old_values JSONB

old_values JSONB
,

##### ,

new_values JSONB

new_values JSONB
,

##### ,

metadata JSONB

metadata JSONB
,

##### ,

ip_address INET

ip_address INET
,

##### ,

user_agent user_agent TEXTTEXT,,

created_at

created_at
TIMESTAMP

##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,


### 3.2 Database Indexes Strategy

##### INDEX

##### INDEX

```
idx_audit_entity
```
```
idx_audit_entity
(
```
##### (

```
entity_type
```
```
entity_type
,
```
##### ,

```
entity_id
```
```
entity_id
)
```
##### )

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_audit_admin
```
```
idx_audit_admin
(
```
##### (

```
admin_user_id
```
```
admin_user_id
)
```
##### )

##### ,

##### ,

```
INDEXINDEX idx_audit_action idx_audit_action ((actionaction)),,
```
##### INDEX

##### INDEX

```
idx_audit_created
```
```
idx_audit_created
(
```
##### (

```
created_at
```
```
created_at
DESC
```
##### DESC

##### )

##### )

##### )

##### )

##### ;

##### ;

```
-- System Settings
```
```
-- System Settings
```
##### CREATE

##### CREATE

##### TABLE

##### TABLE

```
system_settings
```
```
system_settings
(
```
##### (

```
id UUID id UUID PRIMARPRIMARYY KEYKEY DEFAULTDEFAULT gen_random_uuid gen_random_uuid(()),,
```
```
setting_key
```
```
setting_key
VARCHAR
```
##### VARCHAR

##### (

##### (

##### 100

##### 100

##### )

##### )

##### UNIQUE

##### UNIQUE

##### NOT

##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
setting_value JSONB
```
```
setting_value JSONB
NOT
```
##### NOT

##### NULL

##### NULL

##### ,

##### ,

```
description description TEXTTEXT,,
```
```
updated_by UUID
```
```
updated_by UUID
REFERENCES
```
##### REFERENCES

```
admin_users
```
```
admin_users
(
```
##### (

```
id
```
```
id
)
```
##### )

##### ,

##### ,

```
updated_at
```
```
updated_at
TIMESTAMP
```
##### TIMESTAMP

##### DEFAULT

##### DEFAULT

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ,

##### ,

##### INDEX

##### INDEX

```
idx_settings_key
```
```
idx_settings_key
(
```
##### (

```
setting_key
```
```
setting_key
)
```
##### )

##### )

##### )

##### ;

##### ;

```
-- Example settings:
```
```
-- Example settings:
```
```
-- 'commission_percent': 20
```
```
-- 'commission_percent': 20
```
```
-- 'job_r-- 'job_request_timeout_seconds': 20equest_timeout_seconds': 20
```
```
-- 'surge_pricing_config': {...}
```
```
-- 'surge_pricing_config': {...}
```
```
-- 'payment_config': {...}
```
```
-- 'payment_config': {...}
```
```
sql
```

### 3.3 Database Constraints & Triggers

```
-- Additional Performance Indexes-- Additional Performance Indexes
```
```
-- Composite indexes for common queries
```
```
-- Composite indexes for common queries
```
```
CREACREATETE INDEXINDEX idx_bookings_partner_status_date idx_bookings_partner_status_date
```
##### ON

##### ON

```
bookings
```
```
bookings
(
```
##### (

```
partner_id
```
```
partner_id
,
```
##### ,

```
status
```
```
status
,
```
##### ,

```
booking_date
```
```
booking_date
)
```
##### )

##### ;

##### ;

##### CREATE

##### CREATE

##### INDEX

##### INDEX

```
idx_bookings_user_status_date
```
```
idx_bookings_user_status_date
```
##### ON

##### ON

```
bookings
```
```
bookings
(
```
##### (

```
user_id
```
```
user_id
,
```
##### ,

```
status
```
```
status
,
```
##### ,

```
booking_date
```
```
booking_date
DESC
```
##### DESC

##### )

##### )

##### ;

##### ;

```
-- Full-text search indexes
```
```
-- Full-text search indexes
```
```
CREACREATETE INDEXINDEX idx_services_search idx_services_search
```
##### ON

##### ON

```
services
```
```
services
USING
```
##### USING

```
gin
```
```
gin
(
```
##### (

```
to_tsvector
```
```
to_tsvector
(
```
##### (

```
'english'
```
```
'english'
,
```
##### ,

```
name
```
```
name
||
```
##### ||

##### ' '

##### ' '

##### ||

##### ||

```
description
```
```
description
)
```
##### )

##### )

##### )

##### ;

##### ;

```
CREACREATETE INDEXINDEX idx_partners_search idx_partners_search
```
##### ON

##### ON

```
partners
```
```
partners
USING
```
##### USING

```
gin
```
```
gin
(
```
##### (

```
to_tsvector
```
```
to_tsvector
(
```
##### (

```
'english'
```
```
'english'
,
```
##### ,

```
full_name
```
```
full_name
||
```
##### ||

##### ' '

##### ' '

##### ||

##### ||

##### COALESCE

##### COALESCE

##### (

##### (

```
bio
```
```
bio
,
```
##### ,

##### ''

##### ''

##### )

##### )

##### )

##### )

##### )

##### )

##### ;

##### ;

```
-- GIN indexes for JSONB columns-- GIN indexes for JSONB columns
```
##### CREATE

##### CREATE

##### INDEX

##### INDEX

```
idx_notifications_delivery_status
```
```
idx_notifications_delivery_status
```
##### ON

##### ON

```
notifications
```
```
notifications
USING
```
##### USING

```
gin
```
```
gin
(
```
##### (

```
delivery_status
```
```
delivery_status
)
```
##### )

##### ;

##### ;

```
-- Partial indexes for active records only
```
```
-- Partial indexes for active records only
```
##### CREATE

##### CREATE

##### INDEX

##### INDEX

```
idx_partners_active_location
```
```
idx_partners_active_location
```
##### ON

##### ON

```
partners
```
```
partners
(
```
##### (

```
latitude
```
```
latitude
,
```
##### ,

```
longitude
```
```
longitude
)
```
##### )

##### WHERE

##### WHERE

```
is_active
```
```
is_active
=
```
##### =

```
true
```
```
true
AND
```
##### AND

```
verification_status
```
```
verification_status
=
```
##### =

```
'verified'
```
```
'verified'
;
```
##### ;

##### CREATE

##### CREATE

##### INDEX

##### INDEX

```
idx_services_active
```
```
idx_services_active
```
```
ONON services services((subcategory_idsubcategory_id,, display_order display_order))
```
##### WHERE

##### WHERE

```
is_active
```
```
is_active
=
```
##### =

```
true
```
```
true
;
```
##### ;

```
sql
```

_-- Constraints-- Constraints_

##### ALTER

##### ALTER

##### TABLE

##### TABLE

```
bookings
```
```
bookings
```
##### ADD

##### ADD

##### CONSTRAINT

##### CONSTRAINT

```
booking_user_or_guest
```
```
booking_user_or_guest
```
CHECKCHECK ((((user_id user_id ISIS NOTNOT NULLNULL)) OROR ((guest_phone guest_phone ISIS NOTNOT NULLNULL ANDAND guest_name guest_name ISIS NOTNOT NULLNULL))));;

##### ALTER

##### ALTER

##### TABLE

##### TABLE

```
bookings
```
```
bookings
```
##### ADD

##### ADD

##### CONSTRAINT

##### CONSTRAINT

```
booking_location
```
```
booking_location
```
##### CHECK

##### CHECK

##### (

##### (

##### (

##### (

```
service_type
```
```
service_type
=
```
##### =

```
'home'
```
```
'home'
AND
```
##### AND

```
address_id
```
```
address_id
IS
```
##### IS

##### NOT

##### NOT

##### NULL

##### NULL

##### )

##### )

##### OR

##### OR

##### (

##### (

```
service_type
```
```
service_type
=
```
##### =

```
'salon'
```
```
'salon'
AND
```
##### AND

```
salon_id
```
```
salon_id
IS
```
##### IS

##### NOT

##### NOT

##### NULL

##### NULL

##### )

##### )

##### )

##### )

##### ;

##### ;

_-- Triggers for updated_at-- Triggers for updated_at_

##### CREATE

##### CREATE

##### OR

##### OR

##### REPLACE

##### REPLACE

##### FUNCTION

##### FUNCTION

```
update_updated_at_column
```
```
update_updated_at_column
(
```
##### (

##### )

##### )

##### RETURNS

##### RETURNS

##### TRIGGER

##### TRIGGER

##### AS

##### AS

##### $

##### $

##### BEGINBEGIN

##### NEW

##### NEW

##### .

##### .

```
updated_at
```
```
updated_at
=
```
##### =

##### CURRENT_TIMESTAMP

##### CURRENT_TIMESTAMP

##### ;

##### ;

##### RETURN

##### RETURN

##### NEW

##### NEW

##### ;

##### ;

##### ENDEND;;

##### $

##### $

##### LANGUAGE

##### LANGUAGE

```
plpgsql
```
```
plpgsql
;
```
##### ;

CREACREATETE TRIGGERTRIGGER update_users_updated_at BEFORE update_users_updated_at BEFORE UPDAUPDATETE ONON users users

##### FOR EACH ROW

##### FOR EACH ROW

##### EXECUTE

##### EXECUTE

##### FUNCTION

##### FUNCTION

```
update_updated_at_column
```
```
update_updated_at_column
(
```
##### (

##### )

##### )

##### ;

##### ;

_-- Apply to all tables with updated_at column_

_-- Apply to all tables with updated_at column_

_-- (repeat for partners, bookings, services, etc.)_

_-- (repeat for partners, bookings, services, etc.)_

_-- Trigger to update partner ratings_

_-- Trigger to update partner ratings_

CREACREATETE OROR REPLACEREPLACE FUNCTIONFUNCTION update_partner_rating update_partner_rating(())

##### RETURNS

##### RETURNS

##### TRIGGER

##### TRIGGER

##### AS

##### AS

##### $

##### $

##### BEGIN

##### BEGIN

UPDAUPDATETE partners partners

##### SET

##### SET

average_rating

average_rating
=

##### =

##### (

##### (

SELECTSELECT AVGAVG((overall_ratingoverall_rating))

##### FROM

##### FROM

```
reviews
```
```
reviews
```
##### WHERE

##### WHERE

```
partner_id
```
```
partner_id
=
```
##### =

##### NEW

##### NEW

##### .

##### .

```
partner_id
```
```
partner_id
AND
```
##### AND

```
is_visible
```
```
is_visible
=
```
##### =

```
true
```
```
true
```
##### )),,

total_ratings

total_ratings
=

##### =

##### (

##### (

##### SELECT

##### SELECT

##### COUNT

##### COUNT

##### (

##### (

##### *

##### *

##### )

##### )

##### FROM

##### FROM

```
reviews
```
```
reviews
```
##### WHERE

##### WHERE

```
partner_id
```
```
partner_id
=
```
##### =

##### NEW

##### NEW

##### .

##### .

```
partner_id
```
```
partner_id
AND
```
##### AND

```
is_visible
```
```
is_visible
=
```
##### =

```
true
```
```
true
```
##### )

##### )

##### WHERE

##### WHERE

```
id
```
```
id
=
```
##### =

##### NEW

##### NEW

##### .

##### .

```
partner_id
```
```
partner_id
;
```
##### ;

##### RETURNRETURN NEW NEW;;

##### END

##### END

##### ;

##### ;

##### $

##### $

##### LANGUAGE

##### LANGUAGE

```
plpgsql
```
```
plpgsql
;
```
##### ;


## 4. API Structure

### 4.1 API Versioning

### Base URL: https://api.groomsta.com/v1

### Versioning strategy: URI versioning for major changes

### 4.2 RESTful API Endpoints

### 4.2.1 Authentication & Authorization

##### CREATE

##### CREATE

##### TRIGGER

##### TRIGGER

```
update_partner_rating_trigger
```
```
update_partner_rating_trigger
```
##### AFTER

##### AFTER

##### INSERT

##### INSERT

##### OR

##### OR

##### UPDATE

##### UPDATE

##### ON

##### ON

```
reviews
```
```
reviews
```
```
FOR EACH ROWFOR EACH ROW EXECUTEEXECUTE FUNCTIONFUNCTION update_partner_rating update_partner_rating(());;
```
```
-- Trigger to validate wallet balance
```
```
-- Trigger to validate wallet balance
```
```
CREACREATETE OROR REPLACEREPLACE FUNCTIONFUNCTION validate_wallet_transaction validate_wallet_transaction(())
```
##### RETURNS

##### RETURNS

##### TRIGGER

##### TRIGGER

##### AS

##### AS

##### $

##### $

##### BEGIN

##### BEGIN

```
IFIF NEW NEW..transaction_type transaction_type == 'debit''debit' THENTHEN
```
##### IF

##### IF

##### NEW

##### NEW

##### .

##### .

```
balance_before
```
```
balance_before
<
```
##### <

##### NEW

##### NEW

##### .

##### .

```
amount
```
```
amount
THEN
```
##### THEN

##### RAISE EXCEPTION

##### RAISE EXCEPTION

```
'Insufficient wallet balance'
```
```
'Insufficient wallet balance'
;
```
##### ;

##### ENDEND IFIF;;

##### END

##### END

##### IF

##### IF

##### ;

##### ;

##### RETURN

##### RETURN

##### NEW

##### NEW

##### ;

##### ;

##### END

##### END

##### ;

##### ;

##### $

##### $

##### LANGUAGE

##### LANGUAGE

```
plpgsql
```
```
plpgsql
;
```
##### ;

##### CREATE

##### CREATE

##### TRIGGER

##### TRIGGER

```
validate_wallet_debit
```
```
validate_wallet_debit
```
```
BEFORE BEFORE INSERINSERTT ONON wallet_transactions wallet_transactions
```
##### FOR EACH ROW

##### FOR EACH ROW

##### EXECUTE

##### EXECUTE

##### FUNCTION

##### FUNCTION

```
validate_wallet_transaction
```
```
validate_wallet_transaction
(
```
##### (

##### )

##### )

##### ;

##### ;

```
typescript
```

### 4.2.2 User Management

```
// Auth Module Endpoints// Auth Module Endpoints
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
send
```
```
send
```
-

##### -

```
otp
```
```
otp
// Send OTP for login/registration
```
```
// Send OTP for login/registration
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
verify
```
```
verify
```
-

##### -

```
otp
```
```
otp
// Verify OTP and issue tokens
```
```
// Verify OTP and issue tokens
```
```
POSTPOST //authauth//login login // Email/passwor// Email/password logind login
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
refresh
```
```
refresh
```
-

##### -

```
token
```
```
token
// Refresh access token
```
```
// Refresh access token
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
logout
```
```
logout
// Logout (invalidate session)
```
```
// Logout (invalidate session)
```
```
// Partner Auth
```
```
// Partner Auth
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
partner
```
```
partner
/
```
##### /

```
send
```
```
send
```
-

##### -

```
otp
```
```
otp
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
partner
```
```
partner
/
```
##### /

```
verify
```
```
verify
```
-

##### -

```
otp
```
```
otp
```
```
POSTPOST //authauth//partnerpartner//loginlogin
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
partner
```
```
partner
/
```
##### /

```
refresh
```
```
refresh
```
-

##### -

```
token
```
```
token
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
partner
```
```
partner
/
```
##### /

```
logout
```
```
logout
```
```
// Admin Auth
```
```
// Admin Auth
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
admin
```
```
admin
/
```
##### /

```
login
```
```
login
```
```
POSTPOST //authauth//adminadmin//logoutlogout
```
##### POST

##### POST

##### /

##### /

```
auth
```
```
auth
/
```
##### /

```
admin
```
```
admin
/
```
##### /

```
refresh
```
```
refresh
```
-

##### -

```
token
```
```
token
```
```
typescript
```

### 4.2.3 Partner Management

```
// Users Module// Users Module
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
// Get current user profile
```
```
// Get current user profile
```
##### PUT

##### PUT

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
// Update user profile
```
```
// Update user profile
```
```
DELETEDELETE //usersusers//me me // Delete account// Delete account
```
```
// User Addresses
```
```
// User Addresses
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
addresses
```
```
addresses
// List user addresses
```
```
// List user addresses
```
##### POST

##### POST

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
addresses
```
```
addresses
// Add new address
```
```
// Add new address
```
##### PUT

##### PUT

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
addresses
```
```
addresses
/
```
##### /

##### :

##### :

```
id
```
```
id
// Update address
```
```
// Update address
```
##### DELETE

##### DELETE

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
addresses
```
```
addresses
/
```
##### /

##### :

##### :

```
id
```
```
id
// Delete address
```
```
// Delete address
```
```
PUTPUT //usersusers//meme//addressesaddresses//::idid//defaultdefault // Set default addr// Set default addressess
```
```
// User Wallet
```
```
// User Wallet
```
```
GETGET //usersusers//meme//wallet wallet // Get wallet balance// Get wallet balance
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
wallet
```
```
wallet
/
```
##### /

```
transactions
```
```
transactions
// List wallet transactions
```
```
// List wallet transactions
```
```
// User Bookings// User Bookings
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
bookings
```
```
bookings
// List user bookings
```
```
// List user bookings
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get booking details
```
```
// Get booking details
```
```
// User Reviews
```
```
// User Reviews
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
reviews
```
```
reviews
// List user reviews
```
```
// List user reviews
```
##### POST

##### POST

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
review
```
```
review
// Submit review for booking
```
```
// Submit review for booking
```
```
// User Referrals
```
```
// User Referrals
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
referral
```
```
referral
```
-

##### -

```
code
```
```
code
// Get referral code
```
```
// Get referral code
```
```
GETGET //usersusers//meme//referrals referrals // List r// List referrals and earningseferrals and earnings
```
```
typescript
```

_// Partner Onboar// Partner Onboardingding_

##### POST

##### POST

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
register
```
```
register
// Initial registration
```
```
// Initial registration
```
##### POST

##### POST

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
documents
```
```
documents
/
```
##### /

```
upload
```
```
upload
// Upload KYC documents
```
```
// Upload KYC documents
```
PUTPUT //partnerspartners//profile profile _// Update pr// Update profileofile_

##### PUT

##### PUT

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
bank
```
```
bank
```
-

##### -

```
details
```
```
details
// Update bank details
```
```
// Update bank details
```
##### PUT

##### PUT

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
salon
```
```
salon
```
-

##### -

```
details
```
```
details
// Update salon details (if applicable)
```
```
// Update salon details (if applicable)
```
_// Partner Profile_

_// Partner Profile_

##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
// Get partner profile
```
```
// Get partner profile
```
##### PUT

##### PUT

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
// Update partner profile
```
```
// Update partner profile
```
GETGET //partnerspartners//meme//verificationverification--status status _// Check verification status// Check verification status_

_// Partner Services_

_// Partner Services_

GETGET //partnerspartners//meme//services services _// List partner services// List partner services_

##### PUT

##### PUT

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
pricing
```
```
pricing
// Update service pricing
```
```
// Update service pricing
```
##### PUT

##### PUT

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
toggle
```
```
toggle
// Enable/disable service
```
```
// Enable/disable service
```
_// Partner Availability_

_// Partner Availability_

##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
availability
```
```
availability
// Get availability schedule
```
```
// Get availability schedule
```
PUTPUT //partnerspartners//meme//availability availability _// Update availability// Update availability_

##### POST

##### POST

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
blocked
```
```
blocked
```
-

##### -

```
dates
```
```
dates
// Block specific dates
```
```
// Block specific dates
```
##### DELETE

##### DELETE

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
blocked
```
```
blocked
```
-

##### -

```
dates
```
```
dates
/
```
##### /

##### :

##### :

```
id
```
```
id
// Unblock date
```
```
// Unblock date
```
_// Partner Jobs_

_// Partner Jobs_

##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
jobs
```
```
jobs
/
```
##### /

```
incoming
```
```
incoming
// List incoming job requests
```
```
// List incoming job requests
```
##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
jobs
```
```
jobs
/
```
##### /

```
active
```
```
active
// List active jobs
```
```
// List active jobs
```
GETGET //partnerspartners//meme//jobsjobs//past past _// List past jobs// List past jobs_

##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
jobs
```
```
jobs
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get job details
```
```
// Get job details
```
##### POST

##### POST

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
jobs
```
```
jobs
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
accept
```
```
accept
// Accept job request
```
```
// Accept job request
```
POSTPOST //partnerspartners//meme//jobsjobs//::idid//reject reject _// Reject job r// Reject job requestequest_

_// Job Status Updates_

_// Job Status Updates_

PUTPUT //bookingsbookings//::idid//statusstatus//onon--thethe--way way _// Update status: on the way// Update status: on the way_

##### PUT

##### PUT

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
status
```
```
status
/
```
##### /

```
started
```
```
started
// Update status: service started
```
```
// Update status: service started
```
##### PUT

##### PUT

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
status
```
```
status
/
```
##### /

```
completed
```
```
completed
// Update status: completed
```
```
// Update status: completed
```
_// Partner Earnings_

_// Partner Earnings_

##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
earnings
```
```
earnings
// Current week earnings
```
```
// Current week earnings
```
##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
earnings
```
```
earnings
/
```
##### /

```
summary
```
```
summary
// Earnings summary
```
```
// Earnings summary
```
##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
payouts
```
```
payouts
// Payout history
```
```
// Payout history
```
##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
payouts
```
```
payouts
/
```
##### /

##### :

##### :

```
id
```
```
id
// Payout details
```
```
// Payout details
```
_// Partner Reviews// Partner Reviews_

##### GET

##### GET

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
reviews
```
```
reviews
// List reviews received
```
```
// List reviews received
```
##### PUT

##### PUT

##### /

##### /

```
partners
```
```
partners
/
```
##### /

```
me
```
```
me
/
```
##### /

```
reviews
```
```
reviews
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
response
```
```
response
// Respond to review
```
```
// Respond to review
```

### 4.2.4 Services Catalog

### 4.2.5 Booking Management

### 4.2.6 Payments

```
typescript
```
```
// Public Service Browsing
```
```
// Public Service Browsing
```
##### GET

##### GET

##### /

##### /

```
services
```
```
services
/
```
##### /

```
categories
```
```
categories
// List all categories
```
```
// List all categories
```
##### GET

##### GET

##### /

##### /

```
services
```
```
services
/
```
##### /

```
categories
```
```
categories
/
```
##### /

##### :

##### :

```
slug
```
```
slug
// Get category with subcategories
```
```
// Get category with subcategories
```
##### GET

##### GET

##### /

##### /

```
services
```
```
services
/
```
##### /

```
subcategories
```
```
subcategories
/
```
##### /

##### :

##### :

```
slug
```
```
slug
// Get subcategory with services
```
```
// Get subcategory with services
```
##### GET

##### GET

##### /

##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
slug
```
```
slug
// Get service details
```
```
// Get service details
```
```
GETGET //servicesservices//search search // Search services// Search services
```
```
// Service Details
```
```
// Service Details
```
```
GETGET //servicesservices//::idid//addons addons // Get service add-ons// Get service add-ons
```
##### GET

##### GET

##### /

##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
bundles
```
```
bundles
// Get related bundles
```
```
// Get related bundles
```
##### GET

##### GET

##### /

##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
reviews
```
```
reviews
// Get service reviews
```
```
// Get service reviews
```
```
typescript
```
```
// Booking Creation
```
```
// Booking Creation
```
```
POSTPOST //bookingsbookings//checkcheck--availability availability // Check service availability// Check service availability
```
##### POST

##### POST

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

```
calculate
```
```
calculate
```
-

##### -

```
price
```
```
price
// Calculate booking price
```
```
// Calculate booking price
```
##### POST

##### POST

##### /

##### /

```
bookings
```
```
bookings
// Create new booking
```
```
// Create new booking
```
```
// Booking Management
```
```
// Booking Management
```
##### GET

##### GET

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get booking details
```
```
// Get booking details
```
```
PUTPUT //bookingsbookings//::idid//cancel cancel // Cancel booking// Cancel booking
```
##### GET

##### GET

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
status
```
```
status
// Get booking status
```
```
// Get booking status
```
##### GET

##### GET

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
partner
```
```
partner
```
-

##### -

```
location
```
```
location
// Get partner real-time location (future)
```
```
// Get partner real-time location (future)
```
```
// Guest Booking
```
```
// Guest Booking
```
##### POST

##### POST

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

```
guest
```
```
guest
// Create guest booking
```
```
// Create guest booking
```
##### GET

##### GET

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

```
guest
```
```
guest
/
```
##### /

##### :

##### :

```
bookingNumber
```
```
bookingNumber
// Get guest booking by number
```
```
// Get guest booking by number
```
```
typescript
```

### 4.2.7 Coupons & Promotions

### 4.2.8 Memberships

### 4.2.9 Referrals

### 4.2.10 Admin APIs

```
// Payment Initiation// Payment Initiation
```
##### POST

##### POST

##### /

##### /

```
payments
```
```
payments
/
```
##### /

```
create
```
```
create
```
-

##### -

```
order
```
```
order
// Create Razorpay order
```
```
// Create Razorpay order
```
##### POST

##### POST

##### /

##### /

```
payments
```
```
payments
/
```
##### /

```
verify
```
```
verify
// Verify payment
```
```
// Verify payment
```
```
POSTPOST //paymentspayments//walletwallet//apply apply // Apply wallet balance// Apply wallet balance
```
```
// Payment Status
```
```
// Payment Status
```
##### GET

##### GET

##### /

##### /

```
payments
```
```
payments
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get payment details
```
```
// Get payment details
```
##### GET

##### GET

##### /

##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
payments
```
```
payments
// List booking payments
```
```
// List booking payments
```
```
// Refunds
```
```
// Refunds
```
```
POSTPOST //paymentspayments//::idid//refund refund // Request r// Request refundefund
```
##### GET

##### GET

##### /

##### /

```
refunds
```
```
refunds
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get refund status
```
```
// Get refund status
```
```
typescript
```
```
// Coupons
```
```
// Coupons
```
##### POST

##### POST

##### /

##### /

```
coupons
```
```
coupons
/
```
##### /

```
validate
```
```
validate
// Validate coupon code
```
```
// Validate coupon code
```
##### POST

##### POST

##### /

##### /

```
coupons
```
```
coupons
/
```
##### /

```
apply
```
```
apply
// Apply coupon to booking
```
```
// Apply coupon to booking
```
##### GET

##### GET

##### /

##### /

```
coupons
```
```
coupons
/
```
##### /

```
available
```
```
available
// List available coupons
```
```
// List available coupons
```
```
typescript
```
```
// Membership Plans
```
```
// Membership Plans
```
```
GETGET //membershipsmemberships//plans plans // List membership plans// List membership plans
```
##### GET

##### GET

##### /

##### /

```
memberships
```
```
memberships
/
```
##### /

```
plans
```
```
plans
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get plan details
```
```
// Get plan details
```
```
// User Membership
```
```
// User Membership
```
##### POST

##### POST

##### /

##### /

```
memberships
```
```
memberships
/
```
##### /

```
subscribe
```
```
subscribe
// Subscribe to plan
```
```
// Subscribe to plan
```
##### GET

##### GET

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
membership
```
```
membership
// Get current membership
```
```
// Get current membership
```
##### PUT

##### PUT

##### /

##### /

```
users
```
```
users
/
```
##### /

```
me
```
```
me
/
```
##### /

```
membership
```
```
membership
/
```
##### /

```
cancel
```
```
cancel
// Cancel membership
```
```
// Cancel membership
```
```
typescript
```
```
// Referral System// Referral System
```
##### GET

##### GET

##### /

##### /

```
referrals
```
```
referrals
/
```
##### /

```
my
```
```
my
```
-

##### -

```
code
```
```
code
// Get user's referral code
```
```
// Get user's referral code
```
##### POST

##### POST

##### /

##### /

```
referrals
```
```
referrals
/
```
##### /

```
apply
```
```
apply
// Apply referral code
```
```
// Apply referral code
```
##### GET

##### GET

##### /

##### /

```
referrals
```
```
referrals
/
```
##### /

```
stats
```
```
stats
// Get referral statistics
```
```
// Get referral statistics
```

typescript


_// Dashboar// Dashboardd_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
dashboard
```
```
dashboard
/
```
##### /

```
stats
```
```
stats
// Dashboard statistics
```
```
// Dashboard statistics
```
##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
dashboard
```
```
dashboard
/
```
##### /

```
metrics
```
```
metrics
// Key metrics
```
```
// Key metrics
```
_// Service Management_

_// Service Management_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
services
```
```
services
// List all services
```
```
// List all services
```
##### POST

##### POST

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
services
```
```
services
// Create service
```
```
// Create service
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
id
```
```
id
// Update service
```
```
// Update service
```
##### DELETE

##### DELETE

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
services
```
```
services
/
```
##### /

##### :

##### :

```
id
```
```
id
// Delete service
```
```
// Delete service
```
GETGET //adminadmin//categories categories _// List categories// List categories_

##### POST

##### POST

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
categories
```
```
categories
// Create category
```
```
// Create category
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
categories
```
```
categories
/
```
##### /

##### :

##### :

```
id
```
```
id
// Update category
```
```
// Update category
```
_// Partner Management_

_// Partner Management_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
partners
```
```
partners
// List all partners
```
```
// List all partners
```
GETGET //adminadmin//partnerspartners//pending pending _// List pending verifications// List pending verifications_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
partners
```
```
partners
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get partner details
```
```
// Get partner details
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
partners
```
```
partners
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
verify
```
```
verify
// Verify partner
```
```
// Verify partner
```
PUTPUT //adminadmin//partnerspartners//::idid//reject reject _// Reject partner// Reject partner_

##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
partners
```
```
partners
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
suspend
```
```
suspend
// Suspend partner
```
```
// Suspend partner
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
partners
```
```
partners
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
activate
```
```
activate
// Activate partner
```
```
// Activate partner
```
_// Booking Management_

_// Booking Management_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
bookings
```
```
bookings
// List all bookings
```
```
// List all bookings
```
##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get booking details
```
```
// Get booking details
```
PUTPUT //adminadmin//bookingsbookings//::id id _// Update booking// Update booking_

##### POST

##### POST

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
bookings
```
```
bookings
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
refund
```
```
refund
// Process refund
```
```
// Process refund
```
_// Payout Management// Payout Management_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
payouts
```
```
payouts
/
```
##### /

```
pending
```
```
pending
// Pending payouts
```
```
// Pending payouts
```
##### POST

##### POST

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
payouts
```
```
payouts
/
```
##### /

```
generate
```
```
generate
// Generate payout batch
```
```
// Generate payout batch
```
PUTPUT //adminadmin//payoutspayouts//processprocess//::batchId batchId _// Process payout batch// Process payout batch_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
payouts
```
```
payouts
/
```
##### /

```
history
```
```
history
// Payout history
```
```
// Payout history
```
_// Coupon Management// Coupon Management_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
coupons
```
```
coupons
// List coupons
```
```
// List coupons
```
##### POST

##### POST

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
coupons
```
```
coupons
// Create coupon
```
```
// Create coupon
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
coupons
```
```
coupons
/
```
##### /

##### :

##### :

```
id
```
```
id
// Update coupon
```
```
// Update coupon
```
##### DELETE

##### DELETE

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
coupons
```
```
coupons
/
```
##### /

##### :

##### :

```
id
```
```
id
// Delete coupon
```
```
// Delete coupon
```
_// User Management_

_// User Management_

GETGET //adminadmin//users users _// List users// List users_

##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
users
```
```
users
/
```
##### /

##### :

##### :

```
id
```
```
id
// Get user details
```
```
// Get user details
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
users
```
```
users
/
```
##### /

##### :

##### :

```
id
```
```
id
/
```
##### /

```
block
```
```
block
// Block user
```
```
// Block user
```

### 4.3 API Response Format

```
// Analytics & Reports
```
```
// Analytics & Reports
```
##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
reports
```
```
reports
/
```
##### /

```
revenue
```
```
revenue
// Revenue reports
```
```
// Revenue reports
```
```
GETGET //adminadmin//reportsreports//bookings bookings // Booking r// Booking reportseports
```
##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
reports
```
```
reports
/
```
##### /

```
partners
```
```
partners
// Partner performance
```
```
// Partner performance
```
##### GET

##### GET

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
reports
```
```
reports
/
```
##### /

```
customers
```
```
customers
// Customer metrics
```
```
// Customer metrics
```
```
POSTPOST //adminadmin//reportsreports//exportexport // Export data// Export data
```
```
// System Settings
```
```
// System Settings
```
```
GETGET //adminadmin//settings settings // List settings// List settings
```
##### PUT

##### PUT

##### /

##### /

```
admin
```
```
admin
/
```
##### /

```
settings
```
```
settings
/
```
##### /

##### :

##### :

```
key
```
```
key
// Update setting
```
```
// Update setting
```
```
typescript
```

### 4.4 API Request/Response Examples

```
// Success Response// Success Response
```
##### {

##### {

```
"success"
```
```
"success"
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
"data""data":: {{ /* response data *//* response data */ }},,
```
```
"message"
```
```
"message"
:
```
##### :

```
"Operation successful"
```
```
"Operation successful"
,
```
##### ,

```
"metadata"
```
```
"metadata"
:
```
##### :

##### {

##### {

```
"timestamp"
```
```
"timestamp"
:
```
##### :

##### "2024-12-03T10:30:00Z"

##### "2024-12-03T10:30:00Z"

##### ,

##### ,

```
"requestId"
```
```
"requestId"
:
```
##### :

```
"uuid"
```
```
"uuid"
```
##### }

##### }

##### }

##### }

```
// Paginated Response
```
```
// Paginated Response
```
##### {

##### {

```
"success""success":: truetrue,,
```
```
"data"
```
```
"data"
:
```
##### :

##### [

##### [

```
/* items */
```
```
/* items */
]
```
##### ]

##### ,

##### ,

```
"pagination"
```
```
"pagination"
:
```
##### :

##### {

##### {

```
"page""page":: 11 ,,
```
```
"limit"
```
```
"limit"
:
```
##### :

##### 20

##### 20

##### ,

##### ,

```
"total"
```
```
"total"
:
```
##### :

##### 150

##### 150

##### ,

##### ,

```
"totalPages""totalPages":: 88 ,,
```
```
"hasNext"
```
```
"hasNext"
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
"hasPrevious"
```
```
"hasPrevious"
:
```
##### :

```
false
```
```
false
```
##### }

##### }

##### ,

##### ,

```
"metadata"
```
```
"metadata"
:
```
##### :

##### {

##### {

##### /* ... */

##### /* ... */

##### }

##### }

##### }

##### }

```
// Error Response// Error Response
```
##### {

##### {

```
"success"
```
```
"success"
:
```
##### :

```
false
```
```
false
,
```
##### ,

```
"error""error":: {{
```
```
"code"
```
```
"code"
:
```
##### :

##### "VALIDATION_ERROR"

##### "VALIDATION_ERROR"

##### ,

##### ,

```
"message"
```
```
"message"
:
```
##### :

```
"Invalid input data"
```
```
"Invalid input data"
,
```
##### ,

```
"details""details":: [[
```
##### {

##### {

```
"field"
```
```
"field"
:
```
##### :

```
"phone"
```
```
"phone"
,
```
##### ,

```
"message""message":: "Phone number is required""Phone number is required"
```
##### }

##### }

##### ]

##### ]

##### }

##### }

##### ,

##### ,

```
"metadata"
```
```
"metadata"
:
```
##### :

##### {

##### {

##### /* ... */

##### /* ... */

##### }

##### }

##### }

##### }

```
typescript
```

## 5. Authentication & Authorization

### 5.1 JWT Token Strategy

```
// Example: Cr// Example: Create Bookingeate Booking
```
##### POST

##### POST

##### /

##### /

```
bookings
```
```
bookings
```
```
Authorization
```
```
Authorization
:
```
##### :

```
Bearer
```
```
Bearer
{
```
##### {

```
token
```
```
token
}
```
##### }

```
Request
```
```
Request
Body
```
```
Body
:
```
##### :

##### {

##### {

```
"serviceId"
```
```
"serviceId"
:
```
##### :

```
"uuid"
```
```
"uuid"
,
```
##### ,

```
"serviceType"
```
```
"serviceType"
:
```
##### :

```
"home"
```
```
"home"
,
```
##### ,

```
"addressId"
```
```
"addressId"
:
```
##### :

```
"uuid"
```
```
"uuid"
,
```
##### ,

```
"bookingDate"
```
```
"bookingDate"
:
```
##### :

##### "2024-12-10"

##### "2024-12-10"

##### ,

##### ,

```
"timeSlot""timeSlot":: "morning""morning",,
```
```
"addons"
```
```
"addons"
:
```
##### :

##### [

##### [

```
"uuid1"
```
```
"uuid1"
,
```
##### ,

```
"uuid2"
```
```
"uuid2"
]
```
##### ]

##### ,

##### ,

```
"paymentType"
```
```
"paymentType"
:
```
##### :

```
"full"
```
```
"full"
,
```
##### ,

```
"customerNotes""customerNotes":: "Please bring professional equipment""Please bring professional equipment"
```
##### }

##### }

```
ResponseResponse (( 201201 ))::
```
##### {

##### {

```
"success"
```
```
"success"
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
"data""data":: {{
```
```
"bookingId"
```
```
"bookingId"
:
```
##### :

```
"uuid"
```
```
"uuid"
,
```
##### ,

```
"bookingNumber"
```
```
"bookingNumber"
:
```
##### :

##### "GRM-2024-001234"

##### "GRM-2024-001234"

##### ,

##### ,

```
"status"
```
```
"status"
:
```
##### :

```
"pending"
```
```
"pending"
,
```
##### ,

```
"estimatedPrice"
```
```
"estimatedPrice"
:
```
##### :

##### {

##### {

```
"min"
```
```
"min"
:
```
##### :

##### 500

##### 500

##### ,

##### ,

```
"max"
```
```
"max"
:
```
##### :

##### 700

##### 700

##### }},,

```
"paymentOrderId"
```
```
"paymentOrderId"
:
```
##### :

```
"order_xyz123"
```
```
"order_xyz123"
,
```
##### ,

```
"expiresAt"
```
```
"expiresAt"
:
```
##### :

##### "2024-12-03T10:40:00Z"

##### "2024-12-03T10:40:00Z"

##### }},,

```
"message"
```
```
"message"
:
```
##### :

```
"Booking created successfully"
```
```
"Booking created successfully"
```
##### }

##### }

```
typescript
```

### 5.2 Authorization Guards

```
// Token Structur// Token Structuree
```
```
interface
```
```
interface
AccessToken
```
```
AccessToken
{
```
##### {

```
sub
```
```
sub
:
```
##### :

```
string
```
```
string
;
```
##### ;

```
// User/Partner ID
```
```
// User/Partner ID
```
```
type type:: 'user''user' || 'partner''partner' || 'admin''admin';;
```
```
email
```
```
email
?
```
##### ?

##### :

##### :

```
string
```
```
string
;
```
##### ;

```
phone
```
```
phone
?
```
##### ?

##### :

##### :

```
string
```
```
string
;
```
##### ;

```
role
```
```
role
?
```
##### ?

##### :

##### :

```
string
```
```
string
;
```
##### ;

```
// For admin
```
```
// For admin
```
```
iat
```
```
iat
:
```
##### :

```
number
```
```
number
;
```
##### ;

```
// Issued at
```
```
// Issued at
```
```
exp
```
```
exp
:
```
##### :

```
number
```
```
number
;
```
##### ;

```
// Expires at (15 minutes)
```
```
// Expires at (15 minutes)
```
##### }

##### }

```
interface
```
```
interface
RefreshToken
```
```
RefreshToken
{
```
##### {

```
sub
```
```
sub
:
```
##### :

```
string
```
```
string
;
```
##### ;

```
type type:: 'user''user' || 'partner''partner' || 'admin''admin';;
```
```
sessionId
```
```
sessionId
:
```
##### :

```
string
```
```
string
;
```
##### ;

```
iat
```
```
iat
:
```
##### :

```
number
```
```
number
;
```
##### ;

```
exp exp:: numbernumber;; // Expir// Expires at (7 days)es at (7 days)
```
##### }

##### }

```
// Token Generation// Token Generation
```
```
const
```
```
const
generateTokens
```
```
generateTokens
=
```
##### =

```
async
```
```
async
(
```
##### (

```
userId
```
```
userId
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
type
```
```
type
:
```
##### :

```
string
```
```
string
)
```
##### )

##### =>

##### =>

##### {

##### {

```
const
```
```
const
accessToken
```
```
accessToken
=
```
##### =

```
jwt
```
```
jwt
.
```
##### .

```
sign
```
```
sign
(
```
##### (

##### {

##### {

```
sub
```
```
sub
:
```
##### :

```
userId
```
```
userId
,
```
##### ,

```
type
```
```
type
}
```
##### }

##### ,

##### ,

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### JWT_SECRET

##### JWT_SECRET

##### ,

##### ,

##### {

##### {

```
expiresIn
```
```
expiresIn
:
```
##### :

```
'15m'
```
```
'15m'
}
```
##### }

##### )

##### )

##### ;

##### ;

```
const
```
```
const
refreshToken
```
```
refreshToken
=
```
##### =

```
jwt
```
```
jwt
.
```
##### .

```
sign
```
```
sign
(
```
##### (

##### {

##### {

```
sub
```
```
sub
:
```
##### :

```
userId
```
```
userId
,
```
##### ,

```
type
```
```
type
,
```
##### ,

```
sessionId
```
```
sessionId
:
```
##### :

```
generateUUID
```
```
generateUUID
(
```
##### (

##### )

##### )

##### }

##### }

##### ,

##### ,

```
process process..envenv..JWT_REFRESH_SECRETJWT_REFRESH_SECRET,,
```
##### {

##### {

```
expiresIn
```
```
expiresIn
:
```
##### :

```
'7d'
```
```
'7d'
}
```
##### }

##### )

##### )

##### ;

##### ;

```
// Store refresh token in database
```
```
// Store refresh token in database
```
```
await
```
```
await
storeRefreshToken
```
```
storeRefreshToken
(
```
##### (

```
userId
```
```
userId
,
```
##### ,

```
refreshToken
```
```
refreshToken
)
```
##### )

##### ;

##### ;

```
return
```
```
return
{
```
##### {

```
accessToken
```
```
accessToken
,
```
##### ,

```
refreshToken
```
```
refreshToken
}
```
##### }

##### ;

##### ;

##### }

##### }

##### ;

##### ;

```
typescript
```

### 5.3 OTP System

```
// Role-based // Role-based Access ContrAccess Controlol
```
```
enum
```
```
enum
UserRole
```
```
UserRole
{
```
##### {

##### CUSTOMER

##### CUSTOMER

##### =

##### =

```
'customer'
```
```
'customer'
,
```
##### ,

```
PARTNERPARTNER == 'partner''partner',,
```
##### ADMIN

##### ADMIN

##### =

##### =

```
'admin'
```
```
'admin'
,
```
##### ,

##### SUPER_ADMIN

##### SUPER_ADMIN

##### =

##### =

```
'super_admin'
```
```
'super_admin'
```
##### }

##### }

```
// Guard Decorator
```
```
// Guard Decorator
```
##### @

##### @

```
UseGuards
```
```
UseGuards
(
```
##### (

```
JwtAuthGuard
```
```
JwtAuthGuard
,
```
##### ,

```
RolesGuard
```
```
RolesGuard
)
```
##### )

```
@@RolesRoles((UserRoleUserRole..ADMINADMIN,, UserRoleUserRole..SUPER_ADMINSUPER_ADMIN))
```
##### @

##### @

```
Get
```
```
Get
(
```
##### (

```
'/admin/dashboard'
```
```
'/admin/dashboard'
)
```
##### )

```
async
```
```
async
getDashboard
```
```
getDashboard
(
```
##### (

##### )

##### )

##### {

##### {

```
// Only accessible by admin r// Only accessible by admin rolesoles
```
##### }

##### }

```
// Permission-based // Permission-based Access ContrAccess Controlol
```
```
enum
```
```
enum
Permission
```
```
Permission
{
```
##### {

```
// Bookings
```
```
// Bookings
```
```
VIEW_BOOKINGSVIEW_BOOKINGS == 'view_bookings''view_bookings',,
```
##### MANAGE_BOOKINGS

##### MANAGE_BOOKINGS

##### =

##### =

```
'manage_bookings'
```
```
'manage_bookings'
,
```
##### ,

##### CANCEL_BOOKINGS

##### CANCEL_BOOKINGS

##### =

##### =

```
'cancel_bookings'
```
```
'cancel_bookings'
,
```
##### ,

```
// Partners
```
```
// Partners
```
##### VIEW_PARTNERS

##### VIEW_PARTNERS

##### =

##### =

```
'view_partners'
```
```
'view_partners'
,
```
##### ,

##### VERIFY_PARTNERS

##### VERIFY_PARTNERS

##### =

##### =

```
'verify_partners'
```
```
'verify_partners'
,
```
##### ,

```
MANAGE_PMANAGE_PARTNERSARTNERS == 'manage_partners''manage_partners',,
```
```
// Payouts
```
```
// Payouts
```
```
VIEW_PVIEW_PAYOUTSAYOUTS == 'view_payouts''view_payouts',,
```
##### PROCESS_PAYOUTS

##### PROCESS_PAYOUTS

##### =

##### =

```
'process_payouts'
```
```
'process_payouts'
,
```
##### ,

```
// Settings// Settings
```
##### MANAGE_SETTINGS

##### MANAGE_SETTINGS

##### =

##### =

```
'manage_settings'
```
```
'manage_settings'
```
##### }

##### }

##### @

##### @

```
UseGuards
```
```
UseGuards
(
```
##### (

```
PermissionGuard
```
```
PermissionGuard
)
```
##### )

##### @

##### @

```
RequirePermissions
```
```
RequirePermissions
(
```
##### (

```
Permission
```
```
Permission
.
```
##### .

##### PROCESS_PAYOUTS

##### PROCESS_PAYOUTS

##### )

##### )

##### @

##### @

```
Post
```
```
Post
(
```
##### (

```
'/admin/payouts/process/:batchId'
```
```
'/admin/payouts/process/:batchId'
)
```
##### )

```
async
```
```
async
processPayouts
```
```
processPayouts
(
```
##### (

##### @

##### @

```
Param
```
```
Param
(
```
##### (

```
'batchId'
```
```
'batchId'
)
```
##### )

```
batchId
```
```
batchId
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
// Only accessible by users with payout processing permission
```
```
// Only accessible by users with payout processing permission
```
##### }

##### }

```
typescript
```

_// OTP Service// OTP Service_

class

class
OtpService

```
OtpService
{
```
##### {

```
async
```
```
async
sendOtp
```
```
sendOtp
(
```
##### (

```
phone
```
```
phone
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
purpose
```
```
purpose
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
void
```
```
void
>
```
##### >

##### {

##### {

_// Generate 6-digit OTP// Generate 6-digit OTP_

```
const
```
```
const
otp
```
```
otp
=
```
##### =

```
Math
```
```
Math
.
```
##### .

```
floor
```
```
floor
(
```
##### (

##### 100000

##### 100000

##### +

##### +

```
Math
```
```
Math
.
```
##### .

```
random
```
```
random
(
```
##### (

##### )

##### )

##### *

##### *

##### 900000

##### 900000

##### )

##### )

##### .

##### .

```
toString
```
```
toString
(
```
##### (

##### )

##### )

##### ;

##### ;

```
// Store in database with expiration (5 minutes)
```
```
// Store in database with expiration (5 minutes)
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
otpRepository
```
```
otpRepository
.
```
##### .

```
save
```
```
save
(
```
##### (

##### {

##### {

phone

phone
,

##### ,

otp

otp
:

##### :

```
await
```
```
await
bcrypt
```
```
bcrypt
.
```
##### .

```
hash
```
```
hash
(
```
##### (

```
otp
```
```
otp
,
```
##### ,

##### 10

##### 10

##### )

##### )

##### ,

##### ,

```
// Hash OTP
```
```
// Hash OTP
```
purpose purpose,,

expiresAt

expiresAt
:

##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

```
Date
```
```
Date
.
```
##### .

```
now
```
```
now
(
```
##### (

##### )

##### )

##### +

##### +

##### 5

##### 5

##### *

##### *

##### 60

##### 60

##### *

##### *

##### 1000

##### 1000

##### )

##### )

##### ,

##### ,

attempts

attempts
:

##### :

##### 0

##### 0

##### }}));;

```
// Send via SMS gateway
```
```
// Send via SMS gateway
```
awaitawait thisthis..smsServicesmsService..sendsend((phonephone,, ``Your Groomsta OTPYour Groomsta OTP is: is: ${${otpotp}}. Valid for 5 minutes.. Valid for 5 minutes.``));;

```
// Rate limiting: max 3 OTPs per phone per hour
```
```
// Rate limiting: max 3 OTPs per phone per hour
```
awaitawait thisthis..redisredis..incrincr((``otp:ratelimit:otp:ratelimit:${${phonephone}}``));;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
expire
```
```
expire
(
```
##### (

##### `

##### `

```
otp:ratelimit:
```
```
otp:ratelimit:
${
```
##### ${

```
phone
```
```
phone
}
```
##### }

##### `

##### `

##### ,

##### ,

##### 3600

##### 3600

##### )

##### )

##### ;

##### ;

##### }

##### }

```
async
```
```
async
verifyOtp
```
```
verifyOtp
(
```
##### (

```
phone
```
```
phone
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
otp
```
```
otp
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
purpose
```
```
purpose
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
boolean
```
```
boolean
>
```
##### >

##### {

##### {

```
const
```
```
const
record
```
```
record
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
otpRepository
```
```
otpRepository
.
```
##### .

```
findOne
```
```
findOne
(
```
##### (

##### {

##### {

where

where
:

##### :

##### {

##### {

```
phone
```
```
phone
,
```
##### ,

```
purpose
```
```
purpose
,
```
##### ,

```
isUsed
```
```
isUsed
:
```
##### :

```
false
```
```
false
}
```
##### }

##### ,

##### ,

order order:: {{ createdAt createdAt:: 'DESC''DESC' }}

##### }

##### }

##### )

##### )

##### ;

##### ;

ifif ((!!record record |||| newnew DateDate(()) >> record record..expiresAtexpiresAt)) {{

```
throw
```
```
throw
new
```
```
new
BadRequestException
```
```
BadRequestException
(
```
##### (

```
'OTP expired or invalid'
```
```
'OTP expired or invalid'
)
```
##### )

##### ;

##### ;

##### }

##### }

```
// Max 3 attempts
```
```
// Max 3 attempts
```
```
if
```
```
if
(
```
##### (

```
record
```
```
record
.
```
##### .

```
attempts
```
```
attempts
>=
```
##### >=

##### 3

##### 3

##### )

##### )

##### {

##### {

throwthrow newnew BadRequestExceptionBadRequestException(('Maximum OTP'Maximum OTP attempts exceeded' attempts exceeded'));;

##### }

##### }

```
// Verify OTP
```
```
// Verify OTP
```
```
const
```
```
const
isValid
```
```
isValid
=
```
##### =

```
await
```
```
await
bcrypt
```
```
bcrypt
.
```
##### .

```
compare
```
```
compare
(
```
##### (

```
otp
```
```
otp
,
```
##### ,

```
record
```
```
record
.
```
##### .

```
otp
```
```
otp
)
```
##### )

##### ;

##### ;

```
if
```
```
if
(
```
##### (

##### !

##### !

```
isValid
```
```
isValid
)
```
##### )

##### {

##### {

awaitawait thisthis..otpRepositoryotpRepository..updateupdate((recordrecord..idid,, {{

attempts

attempts
:

##### :

```
record
```
```
record
.
```
##### .

```
attempts
```
```
attempts
+
```
##### +

##### 1

##### 1

##### }

##### }

##### )

##### )

##### ;

##### ;

throwthrow newnew BadRequestExceptionBadRequestException(('Invalid OTP''Invalid OTP'));;


## 6. Real-time Communication

### 6.1 WebSocket Architecture

##### }

##### }

```
// Mark as used// Mark as used
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
otpRepository
```
```
otpRepository
.
```
##### .

```
update
```
```
update
(
```
##### (

```
record
```
```
record
.
```
##### .

```
id
```
```
id
,
```
##### ,

##### {

##### {

```
isUsed
```
```
isUsed
:
```
##### :

```
true
```
```
true
}
```
##### }

##### )

##### )

##### ;

##### ;

```
returnreturn truetrue;;
```
##### }

##### }

##### }

##### }

```
typescript
```

_// Socket.io Gateway// Socket.io Gateway_

##### @

##### @

```
WebSocketGateway
```
```
WebSocketGateway
(
```
##### (

##### {

##### {

cors

cors
:

##### :

##### {

##### {

```
origin
```
```
origin
:
```
##### :

##### '*'

##### '*'

##### }

##### }

##### ,

##### ,

namespace namespace:: '/ws''/ws'

##### }

##### }

##### )

##### )

export

export
class

```
class
EventsGateway
```
```
EventsGateway
implements
```
```
implements
OnGatewayConnection
```
```
OnGatewayConnection
,
```
##### ,

```
OnGatewayDisconnect
```
```
OnGatewayDisconnect
{
```
##### {

##### @

##### @

```
WebSocketServer
```
```
WebSocketServer
(
```
##### (

##### )

##### )

server

server
:

##### :

```
Server
```
```
Server
;
```
##### ;

```
constructor
```
```
constructor
(
```
##### (

privateprivate readonlyreadonly jwtService jwtService:: JwtServiceJwtService,,

```
private
```
```
private
readonly
```
```
readonly
redis
```
```
redis
:
```
##### :

```
Redis
```
```
Redis
```
##### )

##### )

##### {

##### {

##### }

##### }

```
async
```
```
async
handleConnection
```
```
handleConnection
(
```
##### (

```
client
```
```
client
:
```
##### :

```
Socket
```
```
Socket
)
```
##### )

##### {

##### {

```
try
```
```
try
{
```
##### {

_// Authenticate socket connection// Authenticate socket connection_

```
const
```
```
const
token
```
```
token
=
```
##### =

```
client
```
```
client
.
```
##### .

```
handshake
```
```
handshake
.
```
##### .

```
auth
```
```
auth
.
```
##### .

```
token
```
```
token
;
```
##### ;

```
const
```
```
const
payload
```
```
payload
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
jwtService
```
```
jwtService
.
```
##### .

```
verify
```
```
verify
(
```
##### (

```
token
```
```
token
)
```
##### )

##### ;

##### ;

```
// Join user/partner-specific room
```
```
// Join user/partner-specific room
```
```
if
```
```
if
(
```
##### (

```
payload
```
```
payload
.
```
##### .

```
type
```
```
type
===
```
##### ===

```
'partner'
```
```
'partner'
)
```
##### )

##### {

##### {

client

client
.

##### .

```
join
```
```
join
(
```
##### (

##### `

##### `

```
partner:
```
```
partner:
${
```
##### ${

```
payload
```
```
payload
.
```
##### .

```
sub
```
```
sub
}
```
##### }

##### `

##### `

##### )

##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
set
```
```
set
(
```
##### (

##### `

##### `

```
partner:online:
```
```
partner:online:
${
```
##### ${

```
payload
```
```
payload
.
```
##### .

```
sub
```
```
sub
}
```
##### }

##### `

##### `

##### ,

##### ,

##### '1'

##### '1'

##### ,

##### ,

##### 'EX'

##### 'EX'

##### ,

##### ,

##### 3600

##### 3600

##### )

##### )

##### ;

##### ;

##### }

##### }

```
else
```
```
else
if
```
```
if
(
```
##### (

```
payload
```
```
payload
.
```
##### .

```
type
```
```
type
===
```
##### ===

```
'user'
```
```
'user'
)
```
##### )

##### {

##### {

client

client
.

##### .

```
join
```
```
join
(
```
##### (

##### `

##### `

```
user:
```
```
user:
${
```
##### ${

```
payload
```
```
payload
.
```
##### .

```
sub
```
```
sub
}
```
##### }

##### `

##### `

##### )

##### )

##### ;

##### ;

##### }}

client

client
.

##### .

```
data
```
```
data
.
```
##### .

```
userId
```
```
userId
=
```
##### =

```
payload
```
```
payload
.
```
##### .

```
sub
```
```
sub
;
```
##### ;

client client..datadata..userTypeuserType == payload payload..typetype;;

##### }

##### }

```
catch
```
```
catch
(
```
##### (

```
error
```
```
error
)
```
##### )

##### {

##### {

client client..disconnectdisconnect(());;

##### }

##### }

##### }

##### }

```
async
```
```
async
handleDisconnect
```
```
handleDisconnect
(
```
##### (

```
client
```
```
client
:
```
##### :

```
Socket
```
```
Socket
)
```
##### )

##### {

##### {

```
if
```
```
if
(
```
##### (

```
client
```
```
client
.
```
##### .

```
data
```
```
data
.
```
##### .

```
userType
```
```
userType
===
```
##### ===

```
'partner'
```
```
'partner'
)
```
##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
del
```
```
del
(
```
##### (

##### `

##### `

```
partner:online:
```
```
partner:online:
${
```
##### ${

```
client
```
```
client
.
```
##### .

```
data
```
```
data
.
```
##### .

```
userId
```
```
userId
}
```
##### }

##### `

##### `

##### )

##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

_// Emit job r// Emit job request to nearby partnersequest to nearby partners_

```
async
```
```
async
emitJobRequest
```
```
emitJobRequest
(
```
##### (

```
partnerIds
```
```
partnerIds
:
```
##### :

```
string
```
```
string
[
```
##### [

##### ]

##### ]

##### ,

##### ,

```
bookingData
```
```
bookingData
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

partnerIds

partnerIds
.

##### .

```
forEach
```
```
forEach
(
```
##### (

```
partnerId
```
```
partnerId
=>
```
##### =>

##### {

##### {

thisthis..serverserver..toto((``partner:partner:${${partnerIdpartnerId}}``))..emitemit(('job:request''job:request',, {{


### 6.2 Real-time Events

```
bookingId
```
```
bookingId
:
```
##### :

```
bookingData
```
```
bookingData
.
```
##### .

```
id
```
```
id
,
```
##### ,

```
service
```
```
service
:
```
##### :

```
bookingData
```
```
bookingData
.
```
##### .

```
service
```
```
service
,
```
##### ,

```
locationlocation:: bookingData bookingData..locationlocation,,
```
```
estimatedEarning
```
```
estimatedEarning
:
```
##### :

```
bookingData
```
```
bookingData
.
```
##### .

```
partnerEarning
```
```
partnerEarning
,
```
##### ,

```
expiresAt
```
```
expiresAt
:
```
##### :

```
bookingData
```
```
bookingData
.
```
##### .

```
expiresAt
```
```
expiresAt
```
##### }}));;

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
// Emit booking status updates to customer
```
```
// Emit booking status updates to customer
```
```
emitBookingStatusUpdate
```
```
emitBookingStatusUpdate
(
```
##### (

```
userId
```
```
userId
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
bookingId
```
```
bookingId
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
status
```
```
status
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
data
```
```
data
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

```
thisthis..serverserver..toto((``user:user:${${userIduserId}}``))..emitemit(('booking:status''booking:status',, {{
```
```
bookingId
```
```
bookingId
,
```
##### ,

```
status
```
```
status
,
```
##### ,

##### ...

##### ...

```
data
```
```
data
```
##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
// Emit partner location updates// Emit partner location updates
```
```
emitPartnerLocation
```
```
emitPartnerLocation
(
```
##### (

```
userId
```
```
userId
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
location
```
```
location
:
```
##### :

##### {

##### {

```
latitude
```
```
latitude
:
```
##### :

```
number
```
```
number
;
```
##### ;

```
longitude
```
```
longitude
:
```
##### :

```
number
```
```
number
}
```
##### }

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
server
```
```
server
.
```
##### .

```
to
```
```
to
(
```
##### (

##### `

##### `

```
user:
```
```
user:
${
```
##### ${

```
userId
```
```
userId
}
```
##### }

##### `

##### `

##### )

##### )

##### .

##### .

```
emit
```
```
emit
(
```
##### (

```
'partner:location'
```
```
'partner:location'
,
```
##### ,

```
location
```
```
location
)
```
##### )

##### ;

##### ;

##### }}

##### }

##### }

```
typescript
```

_// Event T// Event Typesypes_

enum

enum
SocketEvent

```
SocketEvent
{
```
##### {

```
// Job Events (Partner)
```
```
// Job Events (Partner)
```
JOB_REQUESTJOB_REQUEST == 'job:request''job:request',,

##### JOB_ACCEPTED

##### JOB_ACCEPTED

##### =

##### =

```
'job:accepted'
```
```
'job:accepted'
,
```
##### ,

##### JOB_CANCELLED

##### JOB_CANCELLED

##### =

##### =

```
'job:cancelled'
```
```
'job:cancelled'
,
```
##### ,

```
// Booking Events (Customer)
```
```
// Booking Events (Customer)
```
##### BOOKING_STATUS

##### BOOKING_STATUS

##### =

##### =

```
'booking:status'
```
```
'booking:status'
,
```
##### ,

##### PARTNER_ASSIGNED

##### PARTNER_ASSIGNED

##### =

##### =

```
'booking:partner_assigned'
```
```
'booking:partner_assigned'
,
```
##### ,

PARTNER_LOCAPARTNER_LOCATIONTION == 'partner:location''partner:location',,

```
// General
```
```
// General
```
NOTIFICANOTIFICATIONTION == 'notification''notification',,

##### PING

##### PING

##### =

##### =

```
'ping'
```
```
'ping'
,
```
##### ,

##### PONG

##### PONG

##### =

##### =

```
'pong'
```
```
'pong'
```
##### }}

_// Client Event Handlers_

_// Client Event Handlers_

@@SubscribeMessageSubscribeMessage(('partner:accept_job''partner:accept_job'))

async

async
handleAcceptJob

```
handleAcceptJob
(
```
##### (

##### @

##### @

```
MessageBody
```
```
MessageBody
(
```
##### (

##### )

##### )

```
data
```
```
data
:
```
##### :

##### {

##### {

```
bookingId
```
```
bookingId
:
```
##### :

```
string
```
```
string
}
```
##### }

##### ,

##### ,

##### @

##### @

```
ConnectedSocket
```
```
ConnectedSocket
(
```
##### (

##### )

##### )

```
client
```
```
client
:
```
##### :

```
Socket
```
```
Socket
```
##### )

##### )

##### {

##### {

```
const
```
```
const
partnerId
```
```
partnerId
=
```
##### =

```
client
```
```
client
.
```
##### .

```
data
```
```
data
.
```
##### .

```
userId
```
```
userId
;
```
##### ;

_// Process job acceptance// Process job acceptance_

```
const
```
```
const
result
```
```
result
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
bookingService
```
```
bookingService
.
```
##### .

```
acceptJob
```
```
acceptJob
(
```
##### (

```
data
```
```
data
.
```
##### .

```
bookingId
```
```
bookingId
,
```
##### ,

```
partnerId
```
```
partnerId
)
```
##### )

##### ;

##### ;

ifif ((resultresult..successsuccess)) {{

```
// Notify customer
```
```
// Notify customer
```
```
this
```
```
this
.
```
##### .

```
emitBookingStatusUpdate
```
```
emitBookingStatusUpdate
(
```
##### (

result result..bookingbooking..userIduserId,,

data

data
.

##### .

```
bookingId
```
```
bookingId
,
```
##### ,

```
'partner_assigned'
```
```
'partner_assigned'
,
```
##### ,

{{ partner partner:: result result..partnerpartner }}

##### )

##### )

##### ;

##### ;

```
// Notify other partners that job is taken
```
```
// Notify other partners that job is taken
```
result

result
.

##### .

```
rejectedPartners
```
```
rejectedPartners
.
```
##### .

```
forEach
```
```
forEach
(
```
##### (

```
pId
```
```
pId
=>
```
##### =>

##### {

##### {

```
this
```
```
this
.
```
##### .

```
server
```
```
server
.
```
##### .

```
to
```
```
to
(
```
##### (

##### `

##### `

```
partner:
```
```
partner:
${
```
##### ${

```
pId
```
```
pId
}
```
##### }

##### `

##### `

##### )

##### )

##### .

##### .

```
emit
```
```
emit
(
```
##### (

```
'job:taken'
```
```
'job:taken'
,
```
##### ,

##### {

##### {

```
bookingId
```
```
bookingId
:
```
##### :

```
data
```
```
data
.
```
##### .

```
bookingId
```
```
bookingId
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

```
return
```
```
return
result
```
```
result
;
```
##### ;

##### }}


### 6.3 Redis Pub/Sub for Multi-Server

##### @

##### @

```
SubscribeMessage
```
```
SubscribeMessage
(
```
##### (

```
'partner:update_location'
```
```
'partner:update_location'
)
```
##### )

```
asyncasync handleLocationUpdatehandleLocationUpdate((
```
##### @

##### @

```
MessageBody
```
```
MessageBody
(
```
##### (

##### )

##### )

```
data
```
```
data
:
```
##### :

##### {

##### {

```
latitude
```
```
latitude
:
```
##### :

```
number
```
```
number
;
```
##### ;

```
longitude
```
```
longitude
:
```
##### :

```
number
```
```
number
;
```
##### ;

```
bookingId
```
```
bookingId
:
```
##### :

```
string
```
```
string
}
```
##### }

##### ,

##### ,

##### @

##### @

```
ConnectedSocket
```
```
ConnectedSocket
(
```
##### (

##### )

##### )

```
client
```
```
client
:
```
##### :

```
Socket
```
```
Socket
```
##### )) {{

```
const
```
```
const
partnerId
```
```
partnerId
=
```
##### =

```
client
```
```
client
.
```
##### .

```
data
```
```
data
.
```
##### .

```
userId
```
```
userId
;
```
##### ;

```
// Update partner location in Redis// Update partner location in Redis
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
set
```
```
set
(
```
##### (

##### `

##### `

```
partner:location:
```
```
partner:location:
${
```
##### ${

```
partnerId
```
```
partnerId
}
```
##### }

##### `

##### `

##### ,

##### ,

```
JSONJSON..stringifystringify(({{ lat lat:: data data..latitudelatitude,, lng lng:: data data..longitudelongitude }})),,
```
##### 'EX'

##### 'EX'

##### ,

##### ,

##### 300

##### 300

##### )

##### )

##### ;

##### ;

```
// Emit to customer if they're tracking this booking
```
```
// Emit to customer if they're tracking this booking
```
```
const
```
```
const
booking
```
```
booking
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
bookingService
```
```
bookingService
.
```
##### .

```
findOne
```
```
findOne
(
```
##### (

```
data
```
```
data
.
```
##### .

```
bookingId
```
```
bookingId
)
```
##### )

##### ;

##### ;

```
ifif ((booking booking &&&& booking booking..userIduserId)) {{
```
```
this
```
```
this
.
```
##### .

```
emitPartnerLocation
```
```
emitPartnerLocation
(
```
##### (

```
booking
```
```
booking
.
```
##### .

```
userId
```
```
userId
,
```
##### ,

##### {

##### {

```
latitude
```
```
latitude
:
```
##### :

```
data
```
```
data
.
```
##### .

```
latitude
```
```
latitude
,
```
##### ,

```
longitude longitude:: data data..longitudelongitude
```
##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

##### }}

```
typescript
```

## 7. Payment Integration

### 7.1 Razorpay Integration

```
// For horizontal scaling acr// For horizontal scaling across multiple serversoss multiple servers
```
```
class
```
```
class
RedisEventBus
```
```
RedisEventBus
{
```
##### {

```
private
```
```
private
publisher
```
```
publisher
:
```
##### :

```
Redis
```
```
Redis
;
```
##### ;

```
privateprivate subscriber subscriber:: RedisRedis;;
```
```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
publisher
```
```
publisher
=
```
##### =

```
new
```
```
new
Redis
```
```
Redis
(
```
##### (

```
config
```
```
config
.
```
##### .

```
redis
```
```
redis
)
```
##### )

##### ;

##### ;

```
this
```
```
this
.
```
##### .

```
subscriber
```
```
subscriber
=
```
##### =

```
new
```
```
new
Redis
```
```
Redis
(
```
##### (

```
config
```
```
config
.
```
##### .

```
redis
```
```
redis
)
```
##### )

##### ;

##### ;

```
this
```
```
this
.
```
##### .

```
setupSubscriptions
```
```
setupSubscriptions
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }}

```
async
```
```
async
publish
```
```
publish
(
```
##### (

```
channel
```
```
channel
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
data
```
```
data
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

```
awaitawait thisthis..publisherpublisher..publishpublish((channelchannel,, JSONJSON..stringifystringify((datadata))));;
```
##### }

##### }

```
privateprivate setupSubscriptionssetupSubscriptions(()) {{
```
```
this
```
```
this
.
```
##### .

```
subscriber
```
```
subscriber
.
```
##### .

```
subscribe
```
```
subscribe
(
```
##### (

```
'job:requests'
```
```
'job:requests'
,
```
##### ,

```
'booking:updates'
```
```
'booking:updates'
,
```
##### ,

```
'notifications'
```
```
'notifications'
)
```
##### )

##### ;

##### ;

```
thisthis..subscribersubscriber..onon(('message''message',, ((channelchannel,, message message)) =>=> {{
```
```
const
```
```
const
data
```
```
data
=
```
##### =

##### JSON

##### JSON

##### .

##### .

```
parse
```
```
parse
(
```
##### (

```
message
```
```
message
)
```
##### )

##### ;

##### ;

```
switch
```
```
switch
(
```
##### (

```
channel
```
```
channel
)
```
##### )

##### {

##### {

```
case
```
```
case
'job:requests'
```
```
'job:requests'
:
```
##### :

```
// Emit to connected partners on this server instance
```
```
// Emit to connected partners on this server instance
```
```
this
```
```
this
.
```
##### .

```
handleJobRequest
```
```
handleJobRequest
(
```
##### (

```
data
```
```
data
)
```
##### )

##### ;

##### ;

```
breakbreak;;
```
```
case
```
```
case
'booking:updates'
```
```
'booking:updates'
:
```
##### :

```
this
```
```
this
.
```
##### .

```
handleBookingUpdate
```
```
handleBookingUpdate
(
```
##### (

```
data
```
```
data
)
```
##### )

##### ;

##### ;

```
breakbreak;;
```
```
case
```
```
case
'notifications'
```
```
'notifications'
:
```
##### :

```
this
```
```
this
.
```
##### .

```
handleNotification
```
```
handleNotification
(
```
##### (

```
data
```
```
data
)
```
##### )

##### ;

##### ;

```
breakbreak;;
```
##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

```
typescript
```

_// Razorpay Service// Razorpay Service_

class

class
RazorpayService

```
RazorpayService
{
```
##### {

```
private
```
```
private
razorpay
```
```
razorpay
:
```
##### :

```
Razorpay
```
```
Razorpay
;
```
##### ;

```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
razorpay
```
```
razorpay
=
```
##### =

```
new
```
```
new
Razorpay
```
```
Razorpay
(
```
##### (

##### {

##### {

key_id

key_id
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### RAZORPAY_KEY_ID

##### RAZORPAY_KEY_ID

##### ,

##### ,

key_secret

key_secret
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### RAZORPAY_KEY_SECRET

##### RAZORPAY_KEY_SECRET

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
// Create order
```
```
// Create order
```
```
async
```
```
async
createOrder
```
```
createOrder
(
```
##### (

```
amount
```
```
amount
:
```
##### :

```
number
```
```
number
,
```
##### ,

```
bookingId
```
```
bookingId
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
metadata
```
```
metadata
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

constconst order order == awaitawait thisthis..razorpayrazorpay..ordersorders..createcreate(({{

amount

amount
:

##### :

```
amount
```
```
amount
*
```
##### *

##### 100

##### 100

##### ,

##### ,

```
// Convert to paise
```
```
// Convert to paise
```
currency

currency
:

##### :

##### 'INR'

##### 'INR'

##### ,

##### ,

receipt receipt:: ``booking_booking_${${bookingIdbookingId}}``,,

notes

notes
:

##### :

##### {

##### {

bookingId

bookingId
,

##### ,

......metadatametadata

##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

```
// Store order in database
```
```
// Store order in database
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
paymentRepository
```
```
paymentRepository
.
```
##### .

```
save
```
```
save
(
```
##### (

##### {

##### {

bookingId

bookingId
,

##### ,

paymentGateway paymentGateway:: 'razorpay''razorpay',,

gatewayOrderId

gatewayOrderId
:

##### :

```
order
```
```
order
.
```
##### .

```
id
```
```
id
,
```
##### ,

amount

amount
,

##### ,

paymentStatus paymentStatus:: 'pending''pending'

##### }

##### }

##### )

##### )

##### ;

##### ;

returnreturn {{

orderId

orderId
:

##### :

```
order
```
```
order
.
```
##### .

```
id
```
```
id
,
```
##### ,

amount

amount
:

##### :

```
order
```
```
order
.
```
##### .

```
amount
```
```
amount
,
```
##### ,

currency currency:: order order..currencycurrency

##### }

##### }

##### ;

##### ;

##### }

##### }

```
// Verify payment
```
```
// Verify payment
```
```
async
```
```
async
verifyPayment
```
```
verifyPayment
(
```
##### (

orderId

orderId
:

##### :

```
string
```
```
string
,
```
##### ,

paymentId paymentId:: stringstring,,

signature

signature
:

##### :

```
string
```
```
string
```
##### )

##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
boolean
```
```
boolean
>
```
##### >

##### {

##### {

constconst text text == ``${${orderIdorderId}}||${${paymentIdpaymentId}}``;;


```
const
```
```
const
expectedSignature
```
```
expectedSignature
=
```
##### =

```
crypto
```
```
crypto
```
##### .

##### .

```
createHmac
```
```
createHmac
(
```
##### (

```
'sha256'
```
```
'sha256'
,
```
##### ,

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### RAZORPAY_KEY_SECRET

##### RAZORPAY_KEY_SECRET

##### )

##### )

..updateupdate((texttext))

##### .

##### .

```
digest
```
```
digest
(
```
##### (

```
'hex'
```
```
'hex'
)
```
##### )

##### ;

##### ;

ifif ((signature signature !==!== expectedSignature expectedSignature)) {{

```
throw
```
```
throw
new
```
```
new
BadRequestException
```
```
BadRequestException
(
```
##### (

```
'Invalid payment signature'
```
```
'Invalid payment signature'
)
```
##### )

##### ;

##### ;

##### }

##### }

```
// Update payment record
```
```
// Update payment record
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
paymentRepository
```
```
paymentRepository
.
```
##### .

```
update
```
```
update
(
```
##### (

{{ gatewayOrderId gatewayOrderId:: orderId orderId }},,

##### {

##### {

gatewayPaymentId

gatewayPaymentId
:

##### :

```
paymentId
```
```
paymentId
,
```
##### ,

paymentStatus

paymentStatus
:

##### :

```
'success'
```
```
'success'
,
```
##### ,

completedAt

completedAt
:

##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### }

##### }

##### )

##### )

##### ;

##### ;

```
return
```
```
return
true
```
```
true
;
```
##### ;

##### }

##### }

```
// Process refund
```
```
// Process refund
```
```
async
```
```
async
processRefund
```
```
processRefund
(
```
##### (

```
paymentId
```
```
paymentId
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
amount
```
```
amount
:
```
##### :

```
number
```
```
number
,
```
##### ,

```
notes
```
```
notes
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

constconst payment payment == awaitawait thisthis..paymentRepositorypaymentRepository..findOnefindOne(({{

where

where
:

##### :

##### {

##### {

```
gatewayPaymentId
```
```
gatewayPaymentId
:
```
##### :

```
paymentId
```
```
paymentId
}
```
##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

```
if
```
```
if
(
```
##### (

##### !

##### !

```
payment
```
```
payment
)
```
##### )

##### {

##### {

```
throw
```
```
throw
new
```
```
new
NotFoundException
```
```
NotFoundException
(
```
##### (

```
'Payment not found'
```
```
'Payment not found'
)
```
##### )

##### ;

##### ;

##### }

##### }

```
const
```
```
const
refund
```
```
refund
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
razorpay
```
```
razorpay
.
```
##### .

```
payments
```
```
payments
.
```
##### .

```
refund
```
```
refund
(
```
##### (

```
paymentId
```
```
paymentId
,
```
##### ,

##### {

##### {

amount

amount
:

##### :

```
amount
```
```
amount
*
```
##### *

##### 100

##### 100

##### ,

##### ,

notes notes

##### }

##### }

##### )

##### )

##### ;

##### ;

_// Create refund r// Create refund recordecord_

```
await
```
```
await
this
```
```
this
.
```
##### .

```
refundRepository
```
```
refundRepository
.
```
##### .

```
save
```
```
save
(
```
##### (

##### {

##### {

paymentId

paymentId
:

##### :

```
payment
```
```
payment
.
```
##### .

```
id
```
```
id
,
```
##### ,

bookingId bookingId:: payment payment..bookingIdbookingId,,

userId

userId
:

##### :

```
payment
```
```
payment
.
```
##### .

```
userId
```
```
userId
,
```
##### ,

refundAmount

refundAmount
:

##### :

```
amount
```
```
amount
,
```
##### ,

refundT refundTypeype:: amount amount ====== payment payment..amountamount ?? 'full''full' :: 'partial''partial',,

refundMethod

refundMethod
:

##### :

```
'original_source'
```
```
'original_source'
,
```
##### ,

gatewayRefundId

gatewayRefundId
:

##### :

```
refund
```
```
refund
.
```
##### .

```
id
```
```
id
,
```
##### ,

gatewayResponse

gatewayResponse
:

##### :

```
refund
```
```
refund
,
```
##### ,


### 7.2 Wallet Management

```
refundStatus
```
```
refundStatus
:
```
##### :

```
'processing'
```
```
'processing'
,
```
##### ,

```
initiatedBy
```
```
initiatedBy
:
```
##### :

```
'system'
```
```
'system'
```
##### }}));;

```
return
```
```
return
refund
```
```
refund
;
```
##### ;

##### }}

```
// Webhook handler
```
```
// Webhook handler
```
```
asyncasync handleWhandleWebhookebhook((payloadpayload:: anyany,, signature signature:: stringstring)) {{
```
```
// Verify webhook signature
```
```
// Verify webhook signature
```
```
const
```
```
const
isValid
```
```
isValid
=
```
##### =

```
this
```
```
this
.
```
##### .

```
verifyWebhookSignature
```
```
verifyWebhookSignature
(
```
##### (

```
payload
```
```
payload
,
```
##### ,

```
signature
```
```
signature
)
```
##### )

##### ;

##### ;

```
ifif ((!!isValidisValid)) {{
```
```
throw
```
```
throw
new
```
```
new
BadRequestException
```
```
BadRequestException
(
```
##### (

```
'Invalid webhook signature'
```
```
'Invalid webhook signature'
)
```
##### )

##### ;

##### ;

##### }

##### }

```
const
```
```
const
event
```
```
event
=
```
##### =

```
payload
```
```
payload
.
```
##### .

```
event
```
```
event
;
```
##### ;

```
switch
```
```
switch
(
```
##### (

```
event
```
```
event
)
```
##### )

##### {

##### {

```
casecase 'payment.captured''payment.captured'::
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
handlePaymentCaptured
```
```
handlePaymentCaptured
(
```
##### (

```
payload
```
```
payload
.
```
##### .

```
payload
```
```
payload
.
```
##### .

```
payment
```
```
payment
.
```
##### .

```
entity
```
```
entity
)
```
##### )

##### ;

##### ;

```
break
```
```
break
;
```
##### ;

```
casecase 'payment.failed''payment.failed'::
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
handlePaymentFailed
```
```
handlePaymentFailed
(
```
##### (

```
payload
```
```
payload
.
```
##### .

```
payload
```
```
payload
.
```
##### .

```
payment
```
```
payment
.
```
##### .

```
entity
```
```
entity
)
```
##### )

##### ;

##### ;

```
break
```
```
break
;
```
##### ;

```
casecase 'refund.created''refund.created'::
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
handleRefundCreated
```
```
handleRefundCreated
(
```
##### (

```
payload
```
```
payload
.
```
##### .

```
payload
```
```
payload
.
```
##### .

```
refund
```
```
refund
.
```
##### .

```
entity
```
```
entity
)
```
##### )

##### ;

##### ;

```
break
```
```
break
;
```
##### ;

```
casecase 'refund.processed''refund.processed'::
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
handleRefundProcessed
```
```
handleRefundProcessed
(
```
##### (

```
payload
```
```
payload
.
```
##### .

```
payload
```
```
payload
.
```
##### .

```
refund
```
```
refund
.
```
##### .

```
entity
```
```
entity
)
```
##### )

##### ;

##### ;

```
break
```
```
break
;
```
##### ;

##### }

##### }

##### }

##### }

```
private
```
```
private
verifyWebhookSignature
```
```
verifyWebhookSignature
(
```
##### (

```
payload
```
```
payload
:
```
##### :

```
any
```
```
any
,
```
##### ,

```
signature
```
```
signature
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
boolean
```
```
boolean
{
```
##### {

```
constconst expectedSignature expectedSignature == crypto crypto
```
##### .

##### .

```
createHmac
```
```
createHmac
(
```
##### (

```
'sha256'
```
```
'sha256'
,
```
##### ,

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### RAZORPAY_WEBHOOK_SECRET

##### RAZORPAY_WEBHOOK_SECRET

##### )

##### )

##### .

##### .

```
update
```
```
update
(
```
##### (

##### JSON

##### JSON

##### .

##### .

```
stringify
```
```
stringify
(
```
##### (

```
payload
```
```
payload
)
```
##### )

##### )

##### )

```
..digestdigest(('hex''hex'));;
```
```
return
```
```
return
signature
```
```
signature
===
```
##### ===

```
expectedSignature
```
```
expectedSignature
;
```
##### ;

##### }}

##### }

##### }

```
typescript
```

_// Wallet Service// Wallet Service_

class

class
WalletService

```
WalletService
{
```
##### {

```
async
```
```
async
credit
```
```
credit
(
```
##### (

userId userId:: stringstring,,

amount

amount
:

##### :

```
number
```
```
number
,
```
##### ,

transactionType

transactionType
:

##### :

```
string
```
```
string
,
```
##### ,

metadata

metadata
:

##### :

```
any
```
```
any
```
##### )

##### )

##### {

##### {

```
return
```
```
return
await
```
```
await
this
```
```
this
.
```
##### .

```
db
```
```
db
.
```
##### .

```
transaction
```
```
transaction
(
```
##### (

```
async
```
```
async
(
```
##### (

```
entityManager
```
```
entityManager
)
```
##### )

##### =>

##### =>

##### {

##### {

```
// Get or create wallet
```
```
// Get or create wallet
```
letlet wallet wallet == awaitawait entityManager entityManager..findOnefindOne((UserWUserWalletallet,, {{

where

where
:

##### :

##### {

##### {

```
userId
```
```
userId
}
```
##### }

##### ,

##### ,

lock

lock
:

##### :

##### {

##### {

```
mode
```
```
mode
:
```
##### :

```
'pessimistic_write'
```
```
'pessimistic_write'
}
```
##### }

```
// Lock for concurrent safety
```
```
// Lock for concurrent safety
```
##### }}));;

```
if
```
```
if
(
```
##### (

##### !

##### !

```
wallet
```
```
wallet
)
```
##### )

##### {

##### {

wallet wallet == awaitawait entityManager entityManager..savesave((UserWUserWalletallet,, {{

userId

userId
,

##### ,

balance

balance
:

##### :

##### 0

##### 0

##### ,

##### ,

totalCredited totalCredited:: 00 ,,

totalDebited

totalDebited
:

##### :

##### 0

##### 0

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
const
```
```
const
balanceBefore
```
```
balanceBefore
=
```
##### =

```
wallet
```
```
wallet
.
```
##### .

```
balance
```
```
balance
;
```
##### ;

```
const
```
```
const
balanceAfter
```
```
balanceAfter
=
```
##### =

```
balanceBefore
```
```
balanceBefore
+
```
##### +

```
amount
```
```
amount
;
```
##### ;

```
// Update wallet
```
```
// Update wallet
```
```
await
```
```
await
entityManager
```
```
entityManager
.
```
##### .

```
update
```
```
update
(
```
##### (

```
UserWallet
```
```
UserWallet
,
```
##### ,

```
wallet
```
```
wallet
.
```
##### .

```
id
```
```
id
,
```
##### ,

##### {

##### {

balance balance:: balanceAfter balanceAfter,,

totalCredited

totalCredited
:

##### :

```
wallet
```
```
wallet
.
```
##### .

```
totalCredited
```
```
totalCredited
+
```
##### +

```
amount
```
```
amount
```
##### }

##### }

##### )

##### )

##### ;

##### ;

```
// Create transaction record
```
```
// Create transaction record
```
```
const
```
```
const
transaction
```
```
transaction
=
```
##### =

```
await
```
```
await
entityManager
```
```
entityManager
.
```
##### .

```
save
```
```
save
(
```
##### (

```
WalletTransaction
```
```
WalletTransaction
,
```
##### ,

##### {

##### {

walletId walletId:: wallet wallet..idid,,

userId

userId
,

##### ,

transactionType

transactionType
,

##### ,

amount

amount
,

##### ,

balanceBefore

balanceBefore
,

##### ,

balanceAfter

balanceAfter
,

##### ,

##### ...

##### ...

```
metadata
```
```
metadata
```
##### }}));;

```
return
```
```
return
transaction
```
```
transaction
;
```
##### ;

##### }}));;


##### }

##### }

asyncasync debitdebit((

userId

userId
:

##### :

```
string
```
```
string
,
```
##### ,

amount

amount
:

##### :

```
number
```
```
number
,
```
##### ,

transactionT transactionTypeype:: stringstring,,

metadata

metadata
:

##### :

```
any
```
```
any
```
##### )

##### )

##### {

##### {

returnreturn awaitawait thisthis..dbdb..transactiontransaction((asyncasync ((entityManagerentityManager)) =>=> {{

```
const
```
```
const
wallet
```
```
wallet
=
```
##### =

```
await
```
```
await
entityManager
```
```
entityManager
.
```
##### .

```
findOne
```
```
findOne
(
```
##### (

```
UserWallet
```
```
UserWallet
,
```
##### ,

##### {

##### {

where

where
:

##### :

##### {

##### {

```
userId
```
```
userId
}
```
##### }

##### ,

##### ,

lock lock:: {{ mode mode:: 'pessimistic_write''pessimistic_write' }}

##### }

##### }

##### )

##### )

##### ;

##### ;

```
if
```
```
if
(
```
##### (

##### !

##### !

```
wallet
```
```
wallet
||
```
##### ||

```
wallet
```
```
wallet
.
```
##### .

```
balance
```
```
balance
<
```
##### <

```
amount
```
```
amount
)
```
##### )

##### {

##### {

```
throw
```
```
throw
new
```
```
new
BadRequestException
```
```
BadRequestException
(
```
##### (

```
'Insufficient wallet balance'
```
```
'Insufficient wallet balance'
)
```
##### )

##### ;

##### ;

##### }

##### }

constconst balanceBefore balanceBefore == wallet wallet..balancebalance;;

```
const
```
```
const
balanceAfter
```
```
balanceAfter
=
```
##### =

```
balanceBefore
```
```
balanceBefore
```
-

##### -

```
amount
```
```
amount
;
```
##### ;

_// Update wallet// Update wallet_

```
await
```
```
await
entityManager
```
```
entityManager
.
```
##### .

```
update
```
```
update
(
```
##### (

```
UserWallet
```
```
UserWallet
,
```
##### ,

```
wallet
```
```
wallet
.
```
##### .

```
id
```
```
id
,
```
##### ,

##### {

##### {

balance

balance
:

##### :

```
balanceAfter
```
```
balanceAfter
,
```
##### ,

totalDebited totalDebited:: wallet wallet..totalDebitedtotalDebited ++ amount amount

##### }

##### }

##### )

##### )

##### ;

##### ;

_// Create transaction r// Create transaction recordecord_

```
const
```
```
const
transaction
```
```
transaction
=
```
##### =

```
await
```
```
await
entityManager
```
```
entityManager
.
```
##### .

```
save
```
```
save
(
```
##### (

```
WalletTransaction
```
```
WalletTransaction
,
```
##### ,

##### {

##### {

walletId

walletId
:

##### :

```
wallet
```
```
wallet
.
```
##### .

```
id
```
```
id
,
```
##### ,

userId

userId
,

##### ,

transactionType

transactionType
,

##### ,

amount

amount
,

##### ,

balanceBefore

balanceBefore
,

##### ,

balanceAfter balanceAfter,,

##### ...

##### ...

```
metadata
```
```
metadata
```
##### }

##### }

##### )

##### )

##### ;

##### ;

```
return
```
```
return
transaction
```
```
transaction
;
```
##### ;

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

```
async
```
```
async
getBalance
```
```
getBalance
(
```
##### (

```
userId
```
```
userId
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
number
```
```
number
>
```
##### >

##### {

##### {

constconst wallet wallet == awaitawait thisthis..walletRepositorywalletRepository..findOnefindOne(({{ where where:: {{ userId userId }} }}));;

```
return
```
```
return
wallet
```
```
wallet
?
```
##### ?

```
wallet
```
```
wallet
.
```
##### .

```
balance
```
```
balance
:
```
##### :

##### 0

##### 0

##### ;

##### ;


## 8. Notification System

### 8.1 Multi-Channel Notification Service

##### }

##### }

##### }

##### }

```
typescript
```

_// Notification Service// Notification Service_

class

class
NotificationService

```
NotificationService
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

privateprivate readonlyreadonly smsService smsService:: SmsServiceSmsService,,

```
private
```
```
private
readonly
```
```
readonly
emailService
```
```
emailService
:
```
##### :

```
EmailService
```
```
EmailService
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
whatsappService
```
```
whatsappService
:
```
##### :

```
WhatsappService
```
```
WhatsappService
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
pushService
```
```
pushService
:
```
##### :

```
PushNotificationService
```
```
PushNotificationService
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
templateService
```
```
templateService
:
```
##### :

```
TemplateService
```
```
TemplateService
```
##### )

##### )

##### {

##### {

##### }

##### }

asyncasync sendsend((notificationnotification:: NotificationDtoNotificationDto)) {{

```
const
```
```
const
{
```
##### {

```
recipientId
```
```
recipientId
,
```
##### ,

```
recipientType
```
```
recipientType
,
```
##### ,

```
type
```
```
type
,
```
##### ,

```
channels
```
```
channels
,
```
##### ,

```
data
```
```
data
}
```
##### }

##### =

##### =

```
notification
```
```
notification
;
```
##### ;

_// Get template// Get template_

```
const
```
```
const
template
```
```
template
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
getTemplate
```
```
getTemplate
(
```
##### (

```
type
```
```
type
)
```
##### )

##### ;

##### ;

_// Get r// Get recipient contact infoecipient contact info_

```
const
```
```
const
recipient
```
```
recipient
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
getRecipient
```
```
getRecipient
(
```
##### (

```
recipientId
```
```
recipientId
,
```
##### ,

```
recipientType
```
```
recipientType
)
```
##### )

##### ;

##### ;

_// Prepare delivery status// Prepare delivery status_

```
const
```
```
const
deliveryStatus
```
```
deliveryStatus
:
```
##### :

```
any
```
```
any
=
```
##### =

##### {

##### {

##### }

##### }

##### ;

##### ;

```
// Send via each channel
```
```
// Send via each channel
```
```
const
```
```
const
promises
```
```
promises
=
```
##### =

```
channels
```
```
channels
.
```
##### .

```
map
```
```
map
(
```
##### (

```
async
```
```
async
(
```
##### (

```
channel
```
```
channel
)
```
##### )

##### =>

##### =>

##### {

##### {

```
try
```
```
try
{
```
##### {

```
switch
```
```
switch
(
```
##### (

```
channel
```
```
channel
)
```
##### )

##### {

##### {

casecase 'sms''sms'::

```
if
```
```
if
(
```
##### (

```
recipient
```
```
recipient
.
```
##### .

```
phone
```
```
phone
)
```
##### )

##### {

##### {

```
const
```
```
const
message
```
```
message
=
```
##### =

```
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
render
```
```
render
(
```
##### (

```
template
```
```
template
.
```
##### .

```
smsTemplate
```
```
smsTemplate
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ;

##### ;

awaitawait thisthis..smsServicesmsService..sendsend((recipientrecipient..phonephone,, message message));;

deliveryStatus

deliveryStatus
.

##### .

```
sms
```
```
sms
=
```
##### =

##### {

##### {

```
status
```
```
status
:
```
##### :

```
'sent'
```
```
'sent'
,
```
##### ,

```
sentAt
```
```
sentAt
:
```
##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### }

##### }

##### ;

##### ;

##### }

##### }

breakbreak;;

```
case
```
```
case
'email'
```
```
'email'
:
```
##### :

ifif ((recipientrecipient..emailemail)) {{

```
const
```
```
const
subject
```
```
subject
=
```
##### =

```
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
render
```
```
render
(
```
##### (

```
template
```
```
template
.
```
##### .

```
emailSubject
```
```
emailSubject
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ;

##### ;

```
const
```
```
const
body
```
```
body
=
```
##### =

```
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
render
```
```
render
(
```
##### (

```
template
```
```
template
.
```
##### .

```
emailTemplate
```
```
emailTemplate
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
emailService
```
```
emailService
.
```
##### .

```
send
```
```
send
(
```
##### (

```
recipient
```
```
recipient
.
```
##### .

```
email
```
```
email
,
```
##### ,

```
subject
```
```
subject
,
```
##### ,

```
body
```
```
body
)
```
##### )

##### ;

##### ;

deliveryStatus

deliveryStatus
.

##### .

```
email
```
```
email
=
```
##### =

##### {

##### {

```
status
```
```
status
:
```
##### :

```
'sent'
```
```
'sent'
,
```
##### ,

```
sentAt
```
```
sentAt
:
```
##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### }

##### }

##### ;

##### ;

##### }

##### }

```
break
```
```
break
;
```
##### ;

```
case
```
```
case
'whatsapp'
```
```
'whatsapp'
:
```
##### :

```
if
```
```
if
(
```
##### (

```
recipient
```
```
recipient
.
```
##### .

```
phone
```
```
phone
)
```
##### )

##### {

##### {

constconst message message == thisthis..templateServicetemplateService..renderrender((templatetemplate..whatsappTwhatsappTemplateemplate,, data data));;


```
await
```
```
await
this
```
```
this
.
```
##### .

```
whatsappService
```
```
whatsappService
.
```
##### .

```
send
```
```
send
(
```
##### (

```
recipient
```
```
recipient
.
```
##### .

```
phone
```
```
phone
,
```
##### ,

```
message
```
```
message
)
```
##### )

##### ;

##### ;

deliveryStatus

deliveryStatus
.

##### .

```
whatsapp
```
```
whatsapp
=
```
##### =

##### {

##### {

```
status
```
```
status
:
```
##### :

```
'sent'
```
```
'sent'
,
```
##### ,

```
sentAt
```
```
sentAt
:
```
##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### }

##### }

##### ;

##### ;

##### }}

```
break
```
```
break
;
```
##### ;

casecase 'push''push'::

```
const
```
```
const
tokens
```
```
tokens
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
pushService
```
```
pushService
.
```
##### .

```
getTokens
```
```
getTokens
(
```
##### (

```
recipientId
```
```
recipientId
,
```
##### ,

```
recipientType
```
```
recipientType
)
```
##### )

##### ;

##### ;

```
if
```
```
if
(
```
##### (

```
tokens
```
```
tokens
.
```
##### .

```
length
```
```
length
>
```
##### >

##### 0

##### 0

##### )

##### )

##### {

##### {

constconst title title == thisthis..templateServicetemplateService..renderrender((templatetemplate..pushTpushTitleitle,, data data));;

```
const
```
```
const
body
```
```
body
=
```
##### =

```
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
render
```
```
render
(
```
##### (

```
template
```
```
template
.
```
##### .

```
pushBody
```
```
pushBody
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
pushService
```
```
pushService
.
```
##### .

```
sendToTokens
```
```
sendToTokens
(
```
##### (

```
tokens
```
```
tokens
,
```
##### ,

```
title
```
```
title
,
```
##### ,

```
body
```
```
body
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ;

##### ;

deliveryStatus deliveryStatus..pushpush == {{ status status:: 'sent''sent',, sentAt sentAt:: newnew DateDate(()) }};;

##### }

##### }

```
break
```
```
break
;
```
##### ;

##### }

##### }

##### }

##### }

```
catch
```
```
catch
(
```
##### (

```
error
```
```
error
)
```
##### )

##### {

##### {

deliveryStatus

deliveryStatus
[

##### [

```
channel
```
```
channel
]
```
##### ]

##### =

##### =

##### {

##### {

status

status
:

##### :

```
'failed'
```
```
'failed'
,
```
##### ,

error error:: error error..messagemessage,,

failedAt

failedAt
:

##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### }

##### }

##### ;

##### ;

##### }}

##### }

##### }

##### )

##### )

##### ;

##### ;

awaitawait PromisePromise..allSettledallSettled((promisespromises));;

```
// Save notification record
```
```
// Save notification record
```
awaitawait thisthis..notificationRepositorynotificationRepository..savesave(({{

userId

userId
:

##### :

```
recipientType
```
```
recipientType
===
```
##### ===

```
'user'
```
```
'user'
?
```
##### ?

```
recipientId
```
```
recipientId
:
```
##### :

```
null
```
```
null
,
```
##### ,

partnerId

partnerId
:

##### :

```
recipientType
```
```
recipientType
===
```
##### ===

```
'partner'
```
```
'partner'
?
```
##### ?

```
recipientId
```
```
recipientId
:
```
##### :

```
null
```
```
null
,
```
##### ,

notificationType

notificationType
:

##### :

```
type
```
```
type
,
```
##### ,

title

title
:

##### :

```
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
render
```
```
render
(
```
##### (

```
template
```
```
template
.
```
##### .

```
pushTitle
```
```
pushTitle
||
```
##### ||

```
template
```
```
template
.
```
##### .

```
emailSubject
```
```
emailSubject
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ,

##### ,

message

message
:

##### :

```
this
```
```
this
.
```
##### .

```
templateService
```
```
templateService
.
```
##### .

```
render
```
```
render
(
```
##### (

```
template
```
```
template
.
```
##### .

```
pushBody
```
```
pushBody
||
```
##### ||

```
template
```
```
template
.
```
##### .

```
smsTemplate
```
```
smsTemplate
,
```
##### ,

```
data
```
```
data
)
```
##### )

##### ,

##### ,

channels

channels
,

##### ,

deliveryStatus deliveryStatus,,

metadata

metadata
:

##### :

```
data
```
```
data
```
##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

```
// Notification event handlers
```
```
// Notification event handlers
```
asyncasync onBookingCreatedonBookingCreated((bookingbooking:: BookingBooking)) {{

```
await
```
```
await
this
```
```
this
.
```
##### .

```
send
```
```
send
(
```
##### (

##### {

##### {

recipientId

recipientId
:

##### :

```
booking
```
```
booking
.
```
##### .

```
userId
```
```
userId
,
```
##### ,

recipientT recipientTypeype:: 'user''user',,

type

type
:

##### :

```
'booking_created'
```
```
'booking_created'
,
```
##### ,

channels

channels
:

##### :

##### [

##### [

```
'sms'
```
```
'sms'
,
```
##### ,

```
'whatsapp'
```
```
'whatsapp'
,
```
##### ,

```
'email'
```
```
'email'
]
```
##### ]

##### ,

##### ,

data

data
:

##### :

##### {

##### {


bookingNumber

bookingNumber
:

##### :

```
booking
```
```
booking
.
```
##### .

```
bookingNumber
```
```
bookingNumber
,
```
##### ,

serviceName

serviceName
:

##### :

```
booking
```
```
booking
.
```
##### .

```
service
```
```
service
.
```
##### .

```
name
```
```
name
,
```
##### ,

bookingDate bookingDate:: booking booking..bookingDatebookingDate,,

timeSlot

timeSlot
:

##### :

```
booking
```
```
booking
.
```
##### .

```
timeSlot
```
```
timeSlot
```
##### }

##### }

##### }}));;

##### }

##### }

asyncasync onPartnerAssignedonPartnerAssigned((bookingbooking:: BookingBooking,, partner partner:: PartnerPartner)) {{

```
// Notify customer
```
```
// Notify customer
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
send
```
```
send
(
```
##### (

##### {

##### {

recipientId recipientId:: booking booking..userIduserId,,

recipientType

recipientType
:

##### :

```
'user'
```
```
'user'
,
```
##### ,

type

type
:

##### :

```
'partner_assigned'
```
```
'partner_assigned'
,
```
##### ,

channels

channels
:

##### :

##### [

##### [

```
'sms'
```
```
'sms'
,
```
##### ,

```
'whatsapp'
```
```
'whatsapp'
,
```
##### ,

```
'push'
```
```
'push'
]
```
##### ]

##### ,

##### ,

data

data
:

##### :

##### {

##### {

bookingNumber

bookingNumber
:

##### :

```
booking
```
```
booking
.
```
##### .

```
bookingNumber
```
```
bookingNumber
,
```
##### ,

partnerName

partnerName
:

##### :

```
partner
```
```
partner
.
```
##### .

```
fullName
```
```
fullName
,
```
##### ,

partnerPhone partnerPhone:: partner partner..phonephone,,

partnerRating

partnerRating
:

##### :

```
partner
```
```
partner
.
```
##### .

```
averageRating
```
```
averageRating
```
##### }

##### }

##### }}));;

```
// Notify partner
```
```
// Notify partner
```
awaitawait thisthis..sendsend(({{

recipientId

recipientId
:

##### :

```
partner
```
```
partner
.
```
##### .

```
id
```
```
id
,
```
##### ,

recipientType

recipientType
:

##### :

```
'partner'
```
```
'partner'
,
```
##### ,

type type:: 'job_assigned''job_assigned',,

channels

channels
:

##### :

##### [

##### [

```
'sms'
```
```
'sms'
,
```
##### ,

```
'push'
```
```
'push'
]
```
##### ]

##### ,

##### ,

data

data
:

##### :

##### {

##### {

bookingNumber

bookingNumber
:

##### :

```
booking
```
```
booking
.
```
##### .

```
bookingNumber
```
```
bookingNumber
,
```
##### ,

customerName

customerName
:

##### :

```
booking
```
```
booking
.
```
##### .

```
user
```
```
user
?.
```
##### ?.

```
fullName
```
```
fullName
||
```
##### ||

```
booking
```
```
booking
.
```
##### .

```
guestName
```
```
guestName
,
```
##### ,

serviceName

serviceName
:

##### :

```
booking
```
```
booking
.
```
##### .

```
service
```
```
service
.
```
##### .

```
name
```
```
name
,
```
##### ,

address

address
:

##### :

```
booking
```
```
booking
.
```
##### .

```
address
```
```
address
.
```
##### .

```
streetAddress
```
```
streetAddress
,
```
##### ,

timeSlot timeSlot:: booking booking..timeSlottimeSlot

##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

```
async
```
```
async
onServiceCompleted
```
```
onServiceCompleted
(
```
##### (

```
booking
```
```
booking
:
```
##### :

```
Booking
```
```
Booking
)
```
##### )

##### {

##### {

awaitawait thisthis..sendsend(({{

recipientId

recipientId
:

##### :

```
booking
```
```
booking
.
```
##### .

```
userId
```
```
userId
,
```
##### ,

recipientType

recipientType
:

##### :

```
'user'
```
```
'user'
,
```
##### ,

type type:: 'service_completed''service_completed',,

channels

channels
:

##### :

##### [

##### [

```
'whatsapp'
```
```
'whatsapp'
,
```
##### ,

```
'email'
```
```
'email'
,
```
##### ,

```
'push'
```
```
'push'
]
```
##### ]

##### ,

##### ,

data

data
:

##### :

##### {

##### {

bookingNumber

bookingNumber
:

##### :

```
booking
```
```
booking
.
```
##### .

```
bookingNumber
```
```
bookingNumber
,
```
##### ,


### 8.2 SMS Integration

```
serviceName
```
```
serviceName
:
```
##### :

```
booking
```
```
booking
.
```
##### .

```
service
```
```
service
.
```
##### .

```
name
```
```
name
,
```
##### ,

```
amount
```
```
amount
:
```
##### :

```
booking
```
```
booking
.
```
##### .

```
totalAmount
```
```
totalAmount
,
```
##### ,

```
partnerName partnerName:: booking booking..partnerpartner..fullNamefullName
```
##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

```
async
```
```
async
onPayoutProcessed
```
```
onPayoutProcessed
(
```
##### (

```
payout
```
```
payout
:
```
##### :

```
PartnerPayout
```
```
PartnerPayout
)
```
##### )

##### {

##### {

```
awaitawait thisthis..sendsend(({{
```
```
recipientId
```
```
recipientId
:
```
##### :

```
payout
```
```
payout
.
```
##### .

```
partnerId
```
```
partnerId
,
```
##### ,

```
recipientType
```
```
recipientType
:
```
##### :

```
'partner'
```
```
'partner'
,
```
##### ,

```
type type:: 'payout_processed''payout_processed',,
```
```
channels
```
```
channels
:
```
##### :

##### [

##### [

```
'sms'
```
```
'sms'
,
```
##### ,

```
'email'
```
```
'email'
]
```
##### ]

##### ,

##### ,

```
data
```
```
data
:
```
##### :

##### {

##### {

```
amount
```
```
amount
:
```
##### :

```
payout
```
```
payout
.
```
##### .

```
netPayoutAmount
```
```
netPayoutAmount
,
```
##### ,

```
periodStart
```
```
periodStart
:
```
##### :

```
payout
```
```
payout
.
```
##### .

```
periodStartDate
```
```
periodStartDate
,
```
##### ,

```
periodEnd
```
```
periodEnd
:
```
##### :

```
payout
```
```
payout
.
```
##### .

```
periodEndDate
```
```
periodEndDate
,
```
##### ,

```
totalBookings
```
```
totalBookings
:
```
##### :

```
payout
```
```
payout
.
```
##### .

```
totalBookings
```
```
totalBookings
,
```
##### ,

```
transactionReference transactionReference:: payout payout..transactionReferencetransactionReference
```
##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

```
typescript
```

### 8.3 WhatsApp Integration

```
// SMS Service (MSG91 / T// SMS Service (MSG91 / Twilio)wilio)
```
```
class
```
```
class
SmsService
```
```
SmsService
{
```
##### {

```
async
```
```
async
send
```
```
send
(
```
##### (

```
phone
```
```
phone
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
message
```
```
message
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
trytry {{
```
##### // MSG91 API

##### // MSG91 API

```
const
```
```
const
response
```
```
response
=
```
##### =

```
await
```
```
await
axios
```
```
axios
.
```
##### .

```
post
```
```
post
(
```
##### (

```
'https://api.msg91.com/api/v5/flow/'
```
```
'https://api.msg91.com/api/v5/flow/'
,
```
##### ,

##### {

##### {

```
template_id
```
```
template_id
:
```
##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### MSG91_TEMPLATE_ID

##### MSG91_TEMPLATE_ID

##### ,

##### ,

```
short_url
```
```
short_url
:
```
##### :

##### '0'

##### '0'

##### ,

##### ,

```
recipients recipients:: [[{{
```
```
mobiles
```
```
mobiles
:
```
##### :

```
phone
```
```
phone
,
```
##### ,

```
var1
```
```
var1
:
```
##### :

```
message
```
```
message
```
##### }}]]

##### }

##### }

##### ,

##### ,

##### {

##### {

```
headers headers:: {{
```
```
'authkey'
```
```
'authkey'
:
```
##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### MSG91_AUTH_KEY

##### MSG91_AUTH_KEY

##### ,

##### ,

```
'content-type'
```
```
'content-type'
:
```
##### :

```
'application/json'
```
```
'application/json'
```
##### }}

##### }

##### }

##### )

##### )

##### ;

##### ;

```
return
```
```
return
response
```
```
response
.
```
##### .

```
data
```
```
data
;
```
##### ;

##### }

##### }

```
catch
```
```
catch
(
```
##### (

```
error
```
```
error
)
```
##### )

##### {

##### {

```
console
```
```
console
.
```
##### .

```
error
```
```
error
(
```
##### (

```
'SMS send failed:'
```
```
'SMS send failed:'
,
```
##### ,

```
error
```
```
error
)
```
##### )

##### ;

##### ;

```
throwthrow error error;;
```
##### }

##### }

##### }

##### }

##### }}

```
typescript
```

### 8.4 Push Notifications

```
// WhatsApp Service (Gupshup)// WhatsApp Service (Gupshup)
```
```
class
```
```
class
WhatsappService
```
```
WhatsappService
{
```
##### {

```
async
```
```
async
send
```
```
send
(
```
##### (

```
phone
```
```
phone
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
message
```
```
message
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
trytry {{
```
```
const
```
```
const
response
```
```
response
=
```
##### =

```
await
```
```
await
axios
```
```
axios
.
```
##### .

```
post
```
```
post
(
```
##### (

```
'https://api.gupshup.io/sm/api/v1/msg'
```
```
'https://api.gupshup.io/sm/api/v1/msg'
,
```
##### ,

```
new
```
```
new
URLSearchParams
```
```
URLSearchParams
(
```
##### (

##### {

##### {

```
channel
```
```
channel
:
```
##### :

```
'whatsapp'
```
```
'whatsapp'
,
```
##### ,

```
source
```
```
source
:
```
##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### WHATSAPP_SOURCE_NUMBER

##### WHATSAPP_SOURCE_NUMBER

##### ,

##### ,

```
destination
```
```
destination
:
```
##### :

```
phone
```
```
phone
,
```
##### ,

```
'src.name''src.name':: 'Groomsta''Groomsta',,
```
```
message
```
```
message
:
```
##### :

##### JSON

##### JSON

##### .

##### .

```
stringify
```
```
stringify
(
```
##### (

##### {

##### {

```
type
```
```
type
:
```
##### :

```
'text'
```
```
'text'
,
```
##### ,

```
text text:: message message
```
##### }

##### }

##### )

##### )

##### }

##### }

##### )

##### )

##### ,

##### ,

##### {{

```
headers
```
```
headers
:
```
##### :

##### {

##### {

```
'apikey'
```
```
'apikey'
:
```
##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### GUPSHUP_API_KEY

##### GUPSHUP_API_KEY

##### ,

##### ,

```
'Content-T'Content-Type'ype':: 'application/x-www-form-urlencoded''application/x-www-form-urlencoded'
```
##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

```
return
```
```
return
response
```
```
response
.
```
##### .

```
data
```
```
data
;
```
##### ;

##### }

##### }

```
catch
```
```
catch
(
```
##### (

```
error
```
```
error
)
```
##### )

##### {

##### {

```
consoleconsole..errorerror(('WhatsApp send failed:''WhatsApp send failed:',, error error));;
```
```
throw
```
```
throw
error
```
```
error
;
```
##### ;

##### }

##### }

##### }}

##### }

##### }

```
typescript
```

_// Firebase Cloud Messaging Service// Firebase Cloud Messaging Service_

class

class
PushNotificationService

```
PushNotificationService
{
```
##### {

```
private
```
```
private
admin
```
```
admin
:
```
##### :

```
admin
```
```
admin
.
```
##### .

```
app
```
```
app
.
```
##### .

```
App
```
```
App
;
```
##### ;

```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
admin
```
```
admin
=
```
##### =

```
admin
```
```
admin
.
```
##### .

```
initializeApp
```
```
initializeApp
(
```
##### (

##### {

##### {

credential

credential
:

##### :

```
admin
```
```
admin
.
```
##### .

```
credential
```
```
credential
.
```
##### .

```
cert
```
```
cert
(
```
##### (

##### {

##### {

projectId

projectId
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### FIREBASE_PROJECT_ID

##### FIREBASE_PROJECT_ID

##### ,

##### ,

clientEmail

clientEmail
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### FIREBASE_CLIENT_EMAIL

##### FIREBASE_CLIENT_EMAIL

##### ,

##### ,

privateKey

privateKey
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### FIREBASE_PRIVATE_KEY

##### FIREBASE_PRIVATE_KEY

##### .

##### .

```
replace
```
```
replace
(
```
##### (

##### /

##### /

```
\\n
```
```
\\n
/
```
##### /

```
g
```
```
g
,
```
##### ,

```
'\n'
```
```
'\n'
)
```
##### )

##### }}))

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
async
```
```
async
sendToTokens
```
```
sendToTokens
(
```
##### (

tokens

tokens
:

##### :

```
string
```
```
string
[
```
##### [

##### ]

##### ]

##### ,

##### ,

title title:: stringstring,,

body

body
:

##### :

```
string
```
```
string
,
```
##### ,

data

data
?

##### ?

##### :

##### :

```
any
```
```
any
```
##### )) {{

```
const
```
```
const
message
```
```
message
=
```
##### =

##### {

##### {

notification

notification
:

##### :

##### {

##### {

title

title
,

##### ,

body

body

##### }

##### }

##### ,

##### ,

data

data
:

##### :

```
data
```
```
data
||
```
##### ||

##### {

##### {

##### }

##### }

##### ,

##### ,

tokens tokens

##### }

##### }

##### ;

##### ;

constconst response response == awaitawait thisthis..adminadmin..messagingmessaging(())..sendMulticastsendMulticast((messagemessage));;

```
// Remove invalid tokens
```
```
// Remove invalid tokens
```
ifif ((responseresponse..failureCountfailureCount >> 00 )) {{

```
const
```
```
const
failedTokens
```
```
failedTokens
=
```
##### =

##### [

##### [

##### ]

##### ]

##### ;

##### ;

response

response
.

##### .

```
responses
```
```
responses
.
```
##### .

```
forEach
```
```
forEach
(
```
##### (

##### (

##### (

```
resp
```
```
resp
,
```
##### ,

```
idx
```
```
idx
)
```
##### )

##### =>

##### =>

##### {

##### {

ifif ((!!respresp..successsuccess)) {{

failedTokens

failedTokens
.

##### .

```
push
```
```
push
(
```
##### (

```
tokens
```
```
tokens
[
```
##### [

```
idx
```
```
idx
]
```
##### ]

##### )

##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
removeInvalidTokens
```
```
removeInvalidTokens
(
```
##### (

```
failedTokens
```
```
failedTokens
)
```
##### )

##### ;

##### ;

##### }

##### }

returnreturn response response;;

##### }

##### }

asyncasync getTokensgetTokens((userIduserId:: stringstring,, userT userTypeype:: stringstring)) {{


## 9. Cron Jobs & Scheduled Tasks

### 9.1 Task Scheduler Setup

```
const
```
```
const
tokens
```
```
tokens
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
tokenRepository
```
```
tokenRepository
.
```
##### .

```
find
```
```
find
(
```
##### (

##### {

##### {

```
where
```
```
where
:
```
##### :

##### {

##### {

```
......((userType userType ====== 'user''user' ?? {{ userId userId }} :: {{ partnerId partnerId:: userId userId }})),,
```
```
isActive
```
```
isActive
:
```
##### :

```
true
```
```
true
```
##### }

##### }

##### }}));;

```
return
```
```
return
tokens
```
```
tokens
.
```
##### .

```
map
```
```
map
(
```
##### (

```
t
```
```
t
=>
```
##### =>

```
t
```
```
t
.
```
##### .

```
token
```
```
token
)
```
##### )

##### ;

##### ;

##### }}

```
async
```
```
async
removeInvalidTokens
```
```
removeInvalidTokens
(
```
##### (

```
tokens
```
```
tokens
:
```
##### :

```
string
```
```
string
[
```
##### [

##### ]

##### ]

##### )

##### )

##### {

##### {

```
awaitawait thisthis..tokenRepositorytokenRepository..updateupdate((
```
##### {

##### {

```
token
```
```
token
:
```
##### :

```
In
```
```
In
(
```
##### (

```
tokens
```
```
tokens
)
```
##### )

##### }

##### }

##### ,

##### ,

##### {

##### {

```
isActive
```
```
isActive
:
```
##### :

```
false
```
```
false
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

```
typescript
```

_// Using Bull Queue for job scheduling// Using Bull Queue for job scheduling_

import

import
Queue

```
Queue
from
```
```
from
'bull'
```
```
'bull'
;
```
##### ;

classclass TaskSchedulerTaskScheduler {{

```
private
```
```
private
payoutQueue
```
```
payoutQueue
:
```
##### :

```
Queue
```
```
Queue
.
```
##### .

```
Queue
```
```
Queue
;
```
##### ;

```
private
```
```
private
reminderQueue
```
```
reminderQueue
:
```
##### :

```
Queue
```
```
Queue
.
```
##### .

```
Queue
```
```
Queue
;
```
##### ;

```
private
```
```
private
cleanupQueue
```
```
cleanupQueue
:
```
##### :

```
Queue
```
```
Queue
.
```
##### .

```
Queue
```
```
Queue
;
```
##### ;

```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
payoutQueue
```
```
payoutQueue
=
```
##### =

```
new
```
```
new
Queue
```
```
Queue
(
```
##### (

```
'payouts'
```
```
'payouts'
,
```
##### ,

##### {

##### {

redis redis:: {{

host

host
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_HOST

##### REDIS_HOST

##### ,

##### ,

port

port
:

##### :

```
parseInt
```
```
parseInt
(
```
##### (

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_PORT

##### REDIS_PORT

##### )

##### )

##### }}

##### }

##### }

##### )

##### )

##### ;

##### ;

thisthis..reminderQueuereminderQueue == newnew QueueQueue(('reminders''reminders',, {{

redis

redis
:

##### :

##### {

##### {

host

host
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_HOST

##### REDIS_HOST

##### ,

##### ,

port port:: parseIntparseInt((processprocess..envenv..REDIS_PORREDIS_PORTT))

##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

```
this
```
```
this
.
```
##### .

```
cleanupQueue
```
```
cleanupQueue
=
```
##### =

```
new
```
```
new
Queue
```
```
Queue
(
```
##### (

```
'cleanup'
```
```
'cleanup'
,
```
##### ,

##### {

##### {

redis

redis
:

##### :

##### {

##### {

host

host
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_HOST

##### REDIS_HOST

##### ,

##### ,

port port:: parseIntparseInt((processprocess..envenv..REDIS_PORREDIS_PORTT))

##### }

##### }

##### }

##### }

##### )

##### )

##### ;

##### ;

```
this
```
```
this
.
```
##### .

```
setupProcessors
```
```
setupProcessors
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }

##### }

```
private
```
```
private
setupProcessors
```
```
setupProcessors
(
```
##### (

##### )

##### )

##### {

##### {

```
// Weekly payout processing
```
```
// Weekly payout processing
```
thisthis..payoutQueuepayoutQueue..processprocess(('generate-weekly-payouts''generate-weekly-payouts',, asyncasync ((jobjob)) =>=> {{

```
return
```
```
return
await
```
```
await
this
```
```
this
.
```
##### .

```
generateWeeklyPayouts
```
```
generateWeeklyPayouts
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }

##### }

##### )

##### )

##### ;

##### ;

```
// Booking reminders
```
```
// Booking reminders
```
```
this
```
```
this
.
```
##### .

```
reminderQueue
```
```
reminderQueue
.
```
##### .

```
process
```
```
process
(
```
##### (

```
'booking-reminder'
```
```
'booking-reminder'
,
```
##### ,

```
async
```
```
async
(
```
##### (

```
job
```
```
job
)
```
##### )

##### =>

##### =>

##### {

##### {

```
return
```
```
return
await
```
```
await
this
```
```
this
.
```
##### .

```
sendBookingReminders
```
```
sendBookingReminders
(
```
##### (

```
job
```
```
job
.
```
##### .

```
data
```
```
data
)
```
##### )

##### ;

##### ;

##### }}));;

```
// Cleanup expired OTPs
```
```
// Cleanup expired OTPs
```
thisthis..cleanupQueuecleanupQueue..processprocess(('cleanup-otps''cleanup-otps',, asyncasync ((jobjob)) =>=> {{


### 9.2 Scheduled Jobs

```
return
```
```
return
await
```
```
await
this
```
```
this
.
```
##### .

```
cleanupExpiredOTPs
```
```
cleanupExpiredOTPs
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

```
typescript
```

_// Cron Jobs// Cron Jobs_

##### @

##### @

```
Injectable
```
```
Injectable
(
```
##### (

##### )

##### )

export

export
class

```
class
CronService
```
```
CronService
{
```
##### {

constructorconstructor((

```
private
```
```
private
readonly
```
```
readonly
payoutService
```
```
payoutService
:
```
##### :

```
PayoutService
```
```
PayoutService
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
bookingService
```
```
bookingService
:
```
##### :

```
BookingService
```
```
BookingService
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
notificationService
```
```
notificationService
:
```
##### :

```
NotificationService
```
```
NotificationService
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
cleanupService
```
```
cleanupService
:
```
##### :

```
CleanupService
```
```
CleanupService
```
##### )

##### )

##### {

##### {

##### }

##### }

_// Every Monday at 12:00 // Every Monday at 12:00 AM - Generate weekly payoutsAM - Generate weekly payouts_

##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '0 0 * * 1'

##### '0 0 * * 1'

##### )

##### )

```
async
```
```
async
generateWeeklyPayouts
```
```
generateWeeklyPayouts
(
```
##### (

##### )

##### )

##### {

##### {

consoleconsole..loglog(('Starting weekly payout generation...''Starting weekly payout generation...'));;

```
const
```
```
const
endDate
```
```
endDate
=
```
##### =

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### ;

##### ;

constconst startDate startDate == newnew DateDate(());;

startDate

startDate
.

##### .

```
setDate
```
```
setDate
(
```
##### (

```
startDate
```
```
startDate
.
```
##### .

```
getDate
```
```
getDate
(
```
##### (

##### )

##### )

##### -

##### -

##### 7

##### 7

##### )

##### )

##### ;

##### ;

awaitawait thisthis..payoutServicepayoutService..generatePayoutBatchgeneratePayoutBatch((startDatestartDate,, endDate endDate));;

##### }

##### }

```
// Every day at 9:00 AM - Send booking reminders
```
```
// Every day at 9:00 AM - Send booking reminders
```
##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '0 9 * * *'

##### '0 9 * * *'

##### )

##### )

```
async
```
```
async
sendBookingReminders
```
```
sendBookingReminders
(
```
##### (

##### )

##### )

##### {

##### {

```
const
```
```
const
tomorrow
```
```
tomorrow
=
```
##### =

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### ;

##### ;

tomorrow tomorrow..setDatesetDate((tomorrowtomorrow..getDategetDate(()) ++ 11 ));;

```
const
```
```
const
bookings
```
```
bookings
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
bookingService
```
```
bookingService
.
```
##### .

```
findByDate
```
```
findByDate
(
```
##### (

```
tomorrow
```
```
tomorrow
)
```
##### )

##### ;

##### ;

```
for
```
```
for
(
```
##### (

```
const
```
```
const
booking
```
```
booking
of
```
```
of
bookings
```
```
bookings
)
```
##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
notificationService
```
```
notificationService
.
```
##### .

```
send
```
```
send
(
```
##### (

##### {

##### {

recipientId recipientId:: booking booking..userIduserId,,

recipientType

recipientType
:

##### :

```
'user'
```
```
'user'
,
```
##### ,

type

type
:

##### :

```
'booking_reminder'
```
```
'booking_reminder'
,
```
##### ,

channels channels:: [['sms''sms',, 'whatsapp''whatsapp']],,

data

data
:

##### :

##### {

##### {

bookingNumber

bookingNumber
:

##### :

```
booking
```
```
booking
.
```
##### .

```
bookingNumber
```
```
bookingNumber
,
```
##### ,

serviceName

serviceName
:

##### :

```
booking
```
```
booking
.
```
##### .

```
service
```
```
service
.
```
##### .

```
name
```
```
name
,
```
##### ,

date

date
:

##### :

```
booking
```
```
booking
.
```
##### .

```
bookingDate
```
```
bookingDate
,
```
##### ,

timeSlot

timeSlot
:

##### :

```
booking
```
```
booking
.
```
##### .

```
timeSlot
```
```
timeSlot
```
##### }

##### }

##### }}));;

##### }

##### }

##### }

##### }


```
// Every hour - Cleanup expired OTPs
```
```
// Every hour - Cleanup expired OTPs
```
##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '0 * * * *'

##### '0 * * * *'

##### )

##### )

asyncasync cleanupExpiredOTPscleanupExpiredOTPs(()) {{

```
await
```
```
await
this
```
```
this
.
```
##### .

```
cleanupService
```
```
cleanupService
.
```
##### .

```
deleteExpiredOTPs
```
```
deleteExpiredOTPs
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }

##### }

```
// Every hour - Expire inactive booking requests
```
```
// Every hour - Expire inactive booking requests
```
##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '0 * * * *'

##### '0 * * * *'

##### )

##### )

asyncasync expireBookingRequestsexpireBookingRequests(()) {{

```
const
```
```
const
expiredRequests
```
```
expiredRequests
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
bookingService
```
```
bookingService
.
```
##### .

```
findExpiredRequests
```
```
findExpiredRequests
(
```
##### (

##### )

##### )

##### ;

##### ;

forfor ((constconst request request ofof expiredRequests expiredRequests)) {{

```
await
```
```
await
this
```
```
this
.
```
##### .

```
bookingService
```
```
bookingService
.
```
##### .

```
markRequestExpired
```
```
markRequestExpired
(
```
##### (

```
request
```
```
request
.
```
##### .

```
id
```
```
id
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

```
// Every day at 2:00 AM - Clean up old sessions
```
```
// Every day at 2:00 AM - Clean up old sessions
```
##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '0 2 * * *'

##### '0 2 * * *'

##### )

##### )

asyncasync cleanupOldSessionscleanupOldSessions(()) {{

```
await
```
```
await
this
```
```
this
.
```
##### .

```
cleanupService
```
```
cleanupService
.
```
##### .

```
deleteExpiredSessions
```
```
deleteExpiredSessions
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }

##### }

```
// Every day at 3:00 AM - Generate daily reports
```
```
// Every day at 3:00 AM - Generate daily reports
```
##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '0 3 * * *'

##### '0 3 * * *'

##### )

##### )

asyncasync generateDailyReportsgenerateDailyReports(()) {{

```
const
```
```
const
yesterday
```
```
yesterday
=
```
##### =

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### ;

##### ;

yesterday

yesterday
.

##### .

```
setDate
```
```
setDate
(
```
##### (

```
yesterday
```
```
yesterday
.
```
##### .

```
getDate
```
```
getDate
(
```
##### (

##### )

##### )

##### -

##### -

##### 1

##### 1

##### )

##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
reportService
```
```
reportService
.
```
##### .

```
generateDailyReport
```
```
generateDailyReport
(
```
##### (

```
yesterday
```
```
yesterday
)
```
##### )

##### ;

##### ;

##### }

##### }

```
// Every 15 minutes - Check for stuck bookings
```
```
// Every 15 minutes - Check for stuck bookings
```
##### @

##### @

```
Cron
```
```
Cron
(
```
##### (

##### '*/15 * * * *'

##### '*/15 * * * *'

##### )

##### )

```
async
```
```
async
checkStuckBookings
```
```
checkStuckBookings
(
```
##### (

##### )

##### )

##### {

##### {

constconst stuckBookings stuckBookings == awaitawait thisthis..bookingServicebookingService..findStuckBookingsfindStuckBookings(());;

```
for
```
```
for
(
```
##### (

```
const
```
```
const
booking
```
```
booking
of
```
```
of
stuckBookings
```
```
stuckBookings
)
```
##### )

##### {

##### {

_// Auto-cancel or r// Auto-cancel or reassigneassign_

```
await
```
```
await
this
```
```
this
.
```
##### .

```
bookingService
```
```
bookingService
.
```
##### .

```
handleStuckBooking
```
```
handleStuckBooking
(
```
##### (

```
booking
```
```
booking
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }}

```
// First day of every month - Update membership status
```
```
// First day of every month - Update membership status
```
@@CronCron(('0 0 1 * *''0 0 1 * *'))

```
async
```
```
async
updateMembershipStatus
```
```
updateMembershipStatus
(
```
##### (

##### )

##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
membershipService
```
```
membershipService
.
```
##### .

```
processExpiredMemberships
```
```
processExpiredMemberships
(
```
##### (

##### )

##### )

##### ;

##### ;


## 10. File Storage

### 10.1 AWS S3 Integration

##### }

##### }

##### }

##### }

```
typescript
```

_// S3 Service// S3 Service_

import

import
{

##### {

##### S3

##### S3

##### }

##### }

```
from
```
```
from
'aws-sdk'
```
```
'aws-sdk'
;
```
##### ;

classclass StorageServiceStorageService {{

```
private
```
```
private
s3
```
```
s3
:
```
##### :

##### S3

##### S3

##### ;

##### ;

```
private
```
```
private
bucketName
```
```
bucketName
:
```
##### :

```
string
```
```
string
;
```
##### ;

```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
s3
```
```
s3
=
```
##### =

```
new
```
```
new
S3
```
##### S3

##### (

##### (

##### {

##### {

accessKeyId

accessKeyId
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### AWS_ACCESS_KEY_ID

##### AWS_ACCESS_KEY_ID

##### ,

##### ,

secretAccessKey secretAccessKey:: process process..envenv..AWS_SECRET_ACCESS_KEYAWS_SECRET_ACCESS_KEY,,

region

region
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### AWS_REGION

##### AWS_REGION

##### }

##### }

##### )

##### )

##### ;

##### ;

thisthis..bucketNamebucketName == process process..envenv..AWS_S3_BUCKETAWS_S3_BUCKET;;

##### }

##### }

asyncasync uploadFileuploadFile((

file

file
:

##### :

```
Express
```
```
Express
.
```
##### .

```
Multer
```
```
Multer
.
```
##### .

```
File
```
```
File
,
```
##### ,

folder

folder
:

##### :

```
string
```
```
string
```
)):: PromisePromise<<stringstring>> {{

```
const
```
```
const
fileName
```
```
fileName
=
```
##### =

##### `

##### `

##### ${

##### ${

```
folder
```
```
folder
}
```
##### }

##### /

##### /

##### ${

##### ${

```
Date
```
```
Date
.
```
##### .

```
now
```
```
now
(
```
##### (

##### )

##### )

##### }

##### }

##### -

##### -

##### ${

##### ${

```
file
```
```
file
.
```
##### .

```
originalname
```
```
originalname
}
```
##### }

##### `

##### `

##### ;

##### ;

```
const
```
```
const
params
```
```
params
=
```
##### =

##### {

##### {

```
Bucket
```
```
Bucket
:
```
##### :

```
this
```
```
this
.
```
##### .

```
bucketName
```
```
bucketName
,
```
##### ,

```
Key
```
```
Key
:
```
##### :

```
fileName
```
```
fileName
,
```
##### ,

```
Body
```
```
Body
:
```
##### :

```
file
```
```
file
.
```
##### .

```
buffer
```
```
buffer
,
```
##### ,

ContentTContentTypeype:: file file..mimetypemimetype,,

##### ACL

##### ACL

##### :

##### :

```
'public-read'
```
```
'public-read'
```
##### }

##### }

##### ;

##### ;

```
const
```
```
const
result
```
```
result
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
s3
```
```
s3
.
```
##### .

```
upload
```
```
upload
(
```
##### (

```
params
```
```
params
)
```
##### )

##### .

##### .

```
promise
```
```
promise
(
```
##### (

##### )

##### )

##### ;

##### ;

```
return
```
```
return
result
```
```
result
.
```
##### .

```
Location
```
```
Location
;
```
##### ;

##### }}

```
async
```
```
async
deleteFile
```
```
deleteFile
(
```
##### (

```
fileUrl
```
```
fileUrl
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
void
```
```
void
>
```
##### >

##### {

##### {

constconst key key == fileUrl fileUrl..splitsplit(('.com/''.com/'))[[ 11 ]];;

```
const
```
```
const
params
```
```
params
=
```
##### =

##### {

##### {

```
Bucket
```
```
Bucket
:
```
##### :

```
this
```
```
this
.
```
##### .

```
bucketName
```
```
bucketName
,
```
##### ,

```
Key
```
```
Key
:
```
##### :

```
key
```
```
key
```
##### }

##### }

##### ;

##### ;

awaitawait thisthis..s3s3..deleteObjectdeleteObject((paramsparams))..promisepromise(());;

##### }

##### }

asyncasync getSignedUrlgetSignedUrl((keykey:: stringstring,, expiresIn expiresIn:: numbernumber == 36003600 )):: PromisePromise<<stringstring>> {{


```
const
```
```
const
params
```
```
params
=
```
##### =

##### {

##### {

```
Bucket
```
```
Bucket
:
```
##### :

```
this
```
```
this
.
```
##### .

```
bucketName
```
```
bucketName
,
```
##### ,

KeyKey:: key key,,

```
Expires
```
```
Expires
:
```
##### :

```
expiresIn
```
```
expiresIn
```
##### }

##### }

##### ;

##### ;

```
return
```
```
return
this
```
```
this
.
```
##### .

```
s3
```
```
s3
.
```
##### .

```
getSignedUrl
```
```
getSignedUrl
(
```
##### (

```
'getObject'
```
```
'getObject'
,
```
##### ,

```
params
```
```
params
)
```
##### )

##### ;

##### ;

##### }

##### }

```
// Upload multiple files
```
```
// Upload multiple files
```
```
async
```
```
async
uploadMultipleFiles
```
```
uploadMultipleFiles
(
```
##### (

files files:: ExpressExpress..MulterMulter..FileFile[[]],,

folder

folder
:

##### :

```
string
```
```
string
```
##### )

##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
string
```
```
string
[
```
##### [

##### ]

##### ]

##### >

##### >

##### {

##### {

```
const
```
```
const
uploadPromises
```
```
uploadPromises
=
```
##### =

```
files
```
```
files
.
```
##### .

```
map
```
```
map
(
```
##### (

```
file
```
```
file
=>
```
##### =>

```
this
```
```
this
.
```
##### .

```
uploadFile
```
```
uploadFile
(
```
##### (

```
file
```
```
file
,
```
##### ,

```
folder
```
```
folder
)
```
##### )

##### )

##### )

##### ;

##### ;

```
return
```
```
return
await
```
```
await
Promise
```
```
Promise
.
```
##### .

```
all
```
```
all
(
```
##### (

```
uploadPromises
```
```
uploadPromises
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

_// File Upload Controller_

_// File Upload Controller_

##### @

##### @

```
Controller
```
```
Controller
(
```
##### (

```
'upload'
```
```
'upload'
)
```
##### )

exportexport classclass UploadControllerUploadController {{

```
constructor
```
```
constructor
(
```
##### (

```
private
```
```
private
readonly
```
```
readonly
storageService
```
```
storageService
:
```
##### :

```
StorageService
```
```
StorageService
)
```
##### )

##### {

##### {

##### }

##### }

@@PostPost(('partner'partner-documents'-documents'))

##### @

##### @

```
UseGuards
```
```
UseGuards
(
```
##### (

```
JwtAuthGuard
```
```
JwtAuthGuard
)
```
##### )

##### @

##### @

```
UseInterceptors
```
```
UseInterceptors
(
```
##### (

```
FileInterceptor
```
```
FileInterceptor
(
```
##### (

```
'document'
```
```
'document'
)
```
##### )

##### )

##### )

asyncasync uploadPartnerDocumentuploadPartnerDocument((

##### @

##### @

```
UploadedFile
```
```
UploadedFile
(
```
##### (

##### )

##### )

```
file
```
```
file
:
```
##### :

```
Express
```
```
Express
.
```
##### .

```
Multer
```
```
Multer
.
```
##### .

```
File
```
```
File
,
```
##### ,

##### @

##### @

```
Request
```
```
Request
(
```
##### (

##### )

##### )

```
req
```
```
req
,
```
##### ,

##### @

##### @

```
Body
```
```
Body
(
```
##### (

##### )

##### )

```
body
```
```
body
:
```
##### :

##### {

##### {

```
documentType
```
```
documentType
:
```
##### :

```
string
```
```
string
}
```
##### }

##### )

##### )

##### {

##### {

```
// Validate file type
```
```
// Validate file type
```
```
const
```
```
const
allowedTypes
```
```
allowedTypes
=
```
##### =

##### [

##### [

```
'image/jpeg'
```
```
'image/jpeg'
,
```
##### ,

```
'image/png'
```
```
'image/png'
,
```
##### ,

```
'application/pdf'
```
```
'application/pdf'
]
```
##### ]

##### ;

##### ;

ifif ((!!allowedTallowedTypesypes..includesincludes((filefile..mimetypemimetype)))) {{

```
throw
```
```
throw
new
```
```
new
BadRequestException
```
```
BadRequestException
(
```
##### (

```
'Invalid file type'
```
```
'Invalid file type'
)
```
##### )

##### ;

##### ;

##### }

##### }

```
// Validate file size (max 5MB)
```
```
// Validate file size (max 5MB)
```
```
if
```
```
if
(
```
##### (

```
file
```
```
file
.
```
##### .

```
size
```
```
size
>
```
##### >

##### 5

##### 5

##### *

##### *

##### 1024

##### 1024

##### *

##### *

##### 1024

##### 1024

##### )

##### )

##### {

##### {

throwthrow newnew BadRequestExceptionBadRequestException(('File size exceeds 5MB''File size exceeds 5MB'));;

##### }

##### }

constconst fileUrl fileUrl == awaitawait thisthis..storageServicestorageService..uploadFileuploadFile((

file

file
,

##### ,

##### `

##### `

```
partners/
```
```
partners/
${
```
##### ${

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
sub
```
```
sub
}
```
##### }

```
/documents
```
```
/documents
`
```
##### `

##### )

##### )

##### ;

##### ;


## 11. Caching Strategy

### 11.1 Redis Caching Implementation

```
// Save document record
```
```
// Save document record
```
```
awaitawait thisthis..partnerDocumentRepositorypartnerDocumentRepository..savesave(({{
```
```
partnerId
```
```
partnerId
:
```
##### :

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
sub
```
```
sub
,
```
##### ,

```
documentType
```
```
documentType
:
```
##### :

```
body
```
```
body
.
```
##### .

```
documentType
```
```
documentType
,
```
##### ,

```
documentUrl documentUrl:: fileUrl fileUrl,,
```
```
verificationStatus
```
```
verificationStatus
:
```
##### :

```
'pending'
```
```
'pending'
```
##### }

##### }

##### )

##### )

##### ;

##### ;

```
return
```
```
return
{
```
##### {

```
success
```
```
success
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
fileUrl
```
```
fileUrl
}
```
##### }

##### ;

##### ;

##### }

##### }

##### @

##### @

```
Post
```
```
Post
(
```
##### (

```
'profile-image'
```
```
'profile-image'
)
```
##### )

##### @

##### @

```
UseGuards
```
```
UseGuards
(
```
##### (

```
JwtAuthGuard
```
```
JwtAuthGuard
)
```
##### )

##### @

##### @

```
UseInterceptors
```
```
UseInterceptors
(
```
##### (

```
FileInterceptor
```
```
FileInterceptor
(
```
##### (

```
'image'
```
```
'image'
)
```
##### )

##### )

##### )

```
async
```
```
async
uploadProfileImage
```
```
uploadProfileImage
(
```
##### (

##### @

##### @

```
UploadedFile
```
```
UploadedFile
(
```
##### (

##### )

##### )

```
file
```
```
file
:
```
##### :

```
Express
```
```
Express
.
```
##### .

```
Multer
```
```
Multer
.
```
##### .

```
File
```
```
File
,
```
##### ,

##### @

##### @

```
Request
```
```
Request
(
```
##### (

##### )

##### )

```
req
```
```
req
```
##### )) {{

```
// Validate image
```
```
// Validate image
```
```
if
```
```
if
(
```
##### (

##### !

##### !

```
file
```
```
file
.
```
##### .

```
mimetype
```
```
mimetype
.
```
##### .

```
startsWith
```
```
startsWith
(
```
##### (

```
'image/'
```
```
'image/'
)
```
##### )

##### )

##### )

##### {

##### {

```
throwthrow newnew BadRequestExceptionBadRequestException(('Only images are allowed''Only images are allowed'));;
```
##### }

##### }

```
constconst fileUrl fileUrl == awaitawait thisthis..storageServicestorageService..uploadFileuploadFile((
```
```
file
```
```
file
,
```
##### ,

##### `

##### `

##### ${

##### ${

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
type
```
```
type
}
```
##### }

```
s/
```
```
s/
${
```
##### ${

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
sub
```
```
sub
}
```
##### }

```
/profile
```
```
/profile
`
```
##### `

##### ));;

```
// Update user/partner profile
```
```
// Update user/partner profile
```
```
if
```
```
if
(
```
##### (

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
type
```
```
type
===
```
##### ===

```
'user'
```
```
'user'
)
```
##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
userRepository
```
```
userRepository
.
```
##### .

```
update
```
```
update
(
```
##### (

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
sub
```
```
sub
,
```
##### ,

##### {

##### {

```
profileImageUrl
```
```
profileImageUrl
:
```
##### :

```
fileUrl
```
```
fileUrl
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
else
```
```
else
{
```
##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
partnerRepository
```
```
partnerRepository
.
```
##### .

```
update
```
```
update
(
```
##### (

```
req
```
```
req
.
```
##### .

```
user
```
```
user
.
```
##### .

```
sub
```
```
sub
,
```
##### ,

##### {

##### {

```
profileImageUrl
```
```
profileImageUrl
:
```
##### :

```
fileUrl
```
```
fileUrl
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }}

```
return
```
```
return
{
```
##### {

```
success
```
```
success
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
fileUrl
```
```
fileUrl
}
```
##### }

##### ;

##### ;

##### }}

##### }

##### }

```
typescript
```

_// Cache Service// Cache Service_

class

class
CacheService

```
CacheService
{
```
##### {

```
private
```
```
private
redis
```
```
redis
:
```
##### :

```
Redis
```
```
Redis
;
```
##### ;

```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
redis
```
```
redis
=
```
##### =

```
new
```
```
new
Redis
```
```
Redis
(
```
##### (

##### {

##### {

host

host
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_HOST

##### REDIS_HOST

##### ,

##### ,

port

port
:

##### :

```
parseInt
```
```
parseInt
(
```
##### (

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_PORT

##### REDIS_PORT

##### )

##### )

##### ,

##### ,

password

password
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### REDIS_PASSWORD

##### REDIS_PASSWORD

##### ,

##### ,

db

db
:

##### :

##### 0

##### 0

##### }}));;

##### }

##### }

asyncasync getget<<TT>>((keykey:: stringstring)):: PromisePromise<<TT || nullnull>> {{

```
const
```
```
const
data
```
```
data
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
get
```
```
get
(
```
##### (

```
key
```
```
key
)
```
##### )

##### ;

##### ;

```
return
```
```
return
data
```
```
data
?
```
##### ?

##### JSON

##### JSON

##### .

##### .

```
parse
```
```
parse
(
```
##### (

```
data
```
```
data
)
```
##### )

##### :

##### :

```
null
```
```
null
;
```
##### ;

##### }}

```
async
```
```
async
set
```
```
set
(
```
##### (

```
key
```
```
key
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
value
```
```
value
:
```
##### :

```
any
```
```
any
,
```
##### ,

```
ttl
```
```
ttl
?
```
##### ?

##### :

##### :

```
number
```
```
number
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
void
```
```
void
>
```
##### >

##### {

##### {

constconst serialized serialized == JSONJSON..stringifystringify((valuevalue));;

```
if
```
```
if
(
```
##### (

```
ttl
```
```
ttl
)
```
##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
setex
```
```
setex
(
```
##### (

```
key
```
```
key
,
```
##### ,

```
ttl
```
```
ttl
,
```
##### ,

```
serialized
```
```
serialized
)
```
##### )

##### ;

##### ;

##### }

##### }

```
else
```
```
else
{
```
##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
set
```
```
set
(
```
##### (

```
key
```
```
key
,
```
##### ,

```
serialized
```
```
serialized
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

```
async
```
```
async
delete
```
```
delete
(
```
##### (

```
key
```
```
key
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
void
```
```
void
>
```
##### >

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
del
```
```
del
(
```
##### (

```
key
```
```
key
)
```
##### )

##### ;

##### ;

##### }}

```
async
```
```
async
deletePattern
```
```
deletePattern
(
```
##### (

```
pattern
```
```
pattern
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
void
```
```
void
>
```
##### >

##### {

##### {

constconst keys keys == awaitawait thisthis..redisredis..keyskeys((patternpattern));;

```
if
```
```
if
(
```
##### (

```
keys
```
```
keys
.
```
##### .

```
length
```
```
length
>
```
##### >

##### 0

##### 0

##### )

##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
del
```
```
del
(
```
##### (

##### ...

##### ...

```
keys
```
```
keys
)
```
##### )

##### ;

##### ;

##### }}

##### }

##### }

```
async
```
```
async
increment
```
```
increment
(
```
##### (

```
key
```
```
key
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
amount
```
```
amount
:
```
##### :

```
number
```
```
number
=
```
##### =

##### 1

##### 1

##### )

##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
number
```
```
number
>
```
##### >

##### {

##### {

```
return
```
```
return
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
incrby
```
```
incrby
(
```
##### (

```
key
```
```
key
,
```
##### ,

```
amount
```
```
amount
)
```
##### )

##### ;

##### ;

##### }

##### }

asyncasync setExpiresetExpire((keykey:: stringstring,, seconds seconds:: numbernumber)):: PromisePromise<<voidvoid>> {{

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
expire
```
```
expire
(
```
##### (

```
key
```
```
key
,
```
##### ,

```
seconds
```
```
seconds
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }}


### 11.2 Cache Strategy by Module

```
// Cache Interceptor for automatic caching
```
```
// Cache Interceptor for automatic caching
```
```
@@InjectableInjectable(())
```
```
export
```
```
export
class
```
```
class
CacheInterceptor
```
```
CacheInterceptor
implements
```
```
implements
NestInterceptor
```
```
NestInterceptor
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

```
private
```
```
private
readonly
```
```
readonly
cacheService
```
```
cacheService
:
```
##### :

```
CacheService
```
```
CacheService
)
```
##### )

##### {

##### {

##### }

##### }

```
async
```
```
async
intercept
```
```
intercept
(
```
##### (

```
context
```
```
context
:
```
##### :

```
ExecutionContext
```
```
ExecutionContext
,
```
##### ,

```
next
```
```
next
:
```
##### :

```
CallHandler
```
```
CallHandler
)
```
##### )

##### :

##### :

```
Promise
```
```
Promise
<
```
##### <

```
Observable
```
```
Observable
<
```
##### <

```
any
```
```
any
>>
```
##### >>

##### {

##### {

```
const
```
```
const
request
```
```
request
=
```
##### =

```
context
```
```
context
.
```
##### .

```
switchToHttp
```
```
switchToHttp
(
```
##### (

##### )

##### )

##### .

##### .

```
getRequest
```
```
getRequest
(
```
##### (

##### )

##### )

##### ;

##### ;

```
constconst cacheKey cacheKey == thisthis..generateCacheKeygenerateCacheKey((requestrequest));;
```
```
// Try to get from cache
```
```
// Try to get from cache
```
```
constconst cachedResponse cachedResponse == awaitawait thisthis..cacheServicecacheService..getget((cacheKeycacheKey));;
```
```
if
```
```
if
(
```
##### (

```
cachedResponse
```
```
cachedResponse
)
```
##### )

##### {

##### {

```
return
```
```
return
of
```
```
of
(
```
##### (

```
cachedResponse
```
```
cachedResponse
)
```
##### )

##### ;

##### ;

##### }

##### }

```
// Execute request and cache response
```
```
// Execute request and cache response
```
```
return
```
```
return
next
```
```
next
.
```
##### .

```
handle
```
```
handle
(
```
##### (

##### )

##### )

##### .

##### .

```
pipe
```
```
pipe
(
```
##### (

```
taptap((asyncasync ((responseresponse)) =>=> {{
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

```
cacheKey
```
```
cacheKey
,
```
##### ,

```
response
```
```
response
,
```
##### ,

##### 300

##### 300

##### )

##### )

##### ;

##### ;

```
// 5 minutes
```
```
// 5 minutes
```
##### }

##### }

##### )

##### )

##### ));;

##### }

##### }

```
privateprivate generateCacheKeygenerateCacheKey((requestrequest:: anyany)):: stringstring {{
```
```
return
```
```
return
`
```
##### `

```
cache:
```
```
cache:
${
```
##### ${

```
request
```
```
request
.
```
##### .

```
url
```
```
url
}
```
##### }

##### :

##### :

##### ${

##### ${

##### JSON

##### JSON

##### .

##### .

```
stringify
```
```
stringify
(
```
##### (

```
request
```
```
request
.
```
##### .

```
query
```
```
query
)
```
##### )

##### }

##### }

##### `

##### `

##### ;

##### ;

##### }

##### }

##### }}

```
typescript
```

### 11.3 Cache Invalidation

```
// Services Cache - TTL: 1 hour// Services Cache - TTL: 1 hour
```
```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

```
'services:all'
```
```
'services:all'
,
```
##### ,

```
services
```
```
services
,
```
##### ,

##### 3600

##### 3600

##### )

##### )

##### ;

##### ;

```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

##### `

##### `

```
service:
```
```
service:
${
```
##### ${

```
serviceId
```
```
serviceId
}
```
##### }

##### `

##### `

##### ,

##### ,

```
service
```
```
service
,
```
##### ,

##### 3600

##### 3600

##### )

##### )

##### ;

##### ;

```
// Categories Cache - TTL: 1 hour
```
```
// Categories Cache - TTL: 1 hour
```
```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

```
'categories:all'
```
```
'categories:all'
,
```
##### ,

```
categories
```
```
categories
,
```
##### ,

##### 3600

##### 3600

##### )

##### )

##### ;

##### ;

```
// Partner Cache - TTL: 5 minutes
```
```
// Partner Cache - TTL: 5 minutes
```
```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

##### `

##### `

```
partner:
```
```
partner:
${
```
##### ${

```
partnerId
```
```
partnerId
}
```
##### }

```
:services
```
```
:services
`
```
##### `

##### ,

##### ,

```
partnerServices
```
```
partnerServices
,
```
##### ,

##### 300

##### 300

##### )

##### )

##### ;

##### ;

```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

##### `

##### `

```
partner:
```
```
partner:
${
```
##### ${

```
partnerId
```
```
partnerId
}
```
##### }

```
:availability
```
```
:availability
`
```
##### `

##### ,

##### ,

```
availability
```
```
availability
,
```
##### ,

##### 300

##### 300

##### )

##### )

##### ;

##### ;

```
// User Cache - TTL: 15 minutes
```
```
// User Cache - TTL: 15 minutes
```
```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
set
```
```
set
(
```
##### (

##### `

##### `

```
user:
```
```
user:
${
```
##### ${

```
userId
```
```
userId
}
```
##### }

```
:profile
```
```
:profile
`
```
##### `

##### ,

##### ,

```
userProfile
```
```
userProfile
,
```
##### ,

##### 900

##### 900

##### )

##### )

##### ;

##### ;

```
awaitawait cacheService cacheService..setset((``user:user:${${userIduserId}}:addresses:addresses``,, addresses addresses,, 900900 ));;
```
```
// Booking Cache - TTL: 1 minute (frequently changing)
```
```
// Booking Cache - TTL: 1 minute (frequently changing)
```
```
awaitawait cacheService cacheService..setset((``booking:booking:${${bookingIdbookingId}}``,, booking booking,, 6060 ));;
```
```
// Location-based Cache - TTL: 10 minutes
```
```
// Location-based Cache - TTL: 10 minutes
```
```
awaitawait cacheService cacheService..setset((
```
##### `

##### `

```
partners:nearby:
```
```
partners:nearby:
${
```
##### ${

```
latitude
```
```
latitude
}
```
##### }

##### :

##### :

##### ${

##### ${

```
longitude
```
```
longitude
}
```
##### }

##### `

##### `

##### ,

##### ,

```
nearbyPartners
```
```
nearbyPartners
,
```
##### ,

##### 600

##### 600

##### )

##### )

##### ;

##### ;

```
// Session Cache - TTL: 15 minutes
```
```
// Session Cache - TTL: 15 minutes
```
```
awaitawait cacheService cacheService..setset((``session:session:${${sessionIdsessionId}}``,, sessionData sessionData,, 900900 ));;
```
```
// Rate Limiting Cache - TTL: 1 hour
```
```
// Rate Limiting Cache - TTL: 1 hour
```
```
awaitawait cacheService cacheService..incrementincrement((``ratelimit:ratelimit:${${userIduserId}}::${${endpointendpoint}}``));;
```
```
await
```
```
await
cacheService
```
```
cacheService
.
```
##### .

```
setExpire
```
```
setExpire
(
```
##### (

##### `

##### `

```
ratelimit:
```
```
ratelimit:
${
```
##### ${

```
userId
```
```
userId
}
```
##### }

##### :

##### :

##### ${

##### ${

```
endpoint
```
```
endpoint
}
```
##### }

##### `

##### `

##### ,

##### ,

##### 3600

##### 3600

##### )

##### )

##### ;

##### ;

```
typescript
```

## 12. Security Considerations

### 12.1 Rate Limiting

```
// Cache Invalidation Service// Cache Invalidation Service
```
```
class
```
```
class
CacheInvalidationService
```
```
CacheInvalidationService
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

```
private
```
```
private
readonly
```
```
readonly
cacheService
```
```
cacheService
:
```
##### :

```
CacheService
```
```
CacheService
)
```
##### )

##### {

##### {

##### }

##### }

```
async
```
```
async
invalidateService
```
```
invalidateService
(
```
##### (

```
serviceId
```
```
serviceId
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
delete
```
```
delete
(
```
##### (

##### `

##### `

```
service:
```
```
service:
${
```
##### ${

```
serviceId
```
```
serviceId
}
```
##### }

##### `

##### `

##### )

##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
deletePattern
```
```
deletePattern
(
```
##### (

```
'services:*'
```
```
'services:*'
)
```
##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
deletePattern
```
```
deletePattern
(
```
##### (

```
'categories:*'
```
```
'categories:*'
)
```
##### )

##### ;

##### ;

##### }

##### }

```
asyncasync invalidatePartnerinvalidatePartner((partnerIdpartnerId:: stringstring)) {{
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
deletePattern
```
```
deletePattern
(
```
##### (

##### `

##### `

```
partner:
```
```
partner:
${
```
##### ${

```
partnerId
```
```
partnerId
}
```
##### }

##### :*

##### :*

##### `

##### `

##### )

##### )

##### ;

##### ;

```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
deletePattern
```
```
deletePattern
(
```
##### (

```
'partners:nearby:*'
```
```
'partners:nearby:*'
)
```
##### )

##### ;

##### ;

##### }}

```
async
```
```
async
invalidateUser
```
```
invalidateUser
(
```
##### (

```
userId
```
```
userId
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
awaitawait thisthis..cacheServicecacheService..deletePatterndeletePattern((``user:user:${${userIduserId}}:*:*``));;
```
##### }

##### }

```
asyncasync invalidateBookinginvalidateBooking((bookingIdbookingId:: stringstring)) {{
```
```
await
```
```
await
this
```
```
this
.
```
##### .

```
cacheService
```
```
cacheService
.
```
##### .

```
delete
```
```
delete
(
```
##### (

##### `

##### `

```
booking:
```
```
booking:
${
```
##### ${

```
bookingId
```
```
bookingId
}
```
##### }

##### `

##### `

##### )

##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

```
typescript
```

### 12.2 Input Validation & Sanitization

```
// Rate Limiter Middlewar// Rate Limiter Middlewaree
```
##### @

##### @

```
Injectable
```
```
Injectable
(
```
##### (

##### )

##### )

```
export
```
```
export
class
```
```
class
RateLimiterMiddleware
```
```
RateLimiterMiddleware
implements
```
```
implements
NestMiddleware
```
```
NestMiddleware
{
```
##### {

```
constructorconstructor((privateprivate readonlyreadonly redis redis:: RedisRedis)) {{}}
```
```
async
```
```
async
use
```
```
use
(
```
##### (

```
req
```
```
req
:
```
##### :

```
Request
```
```
Request
,
```
##### ,

```
res
```
```
res
:
```
##### :

```
Response
```
```
Response
,
```
##### ,

```
next
```
```
next
:
```
##### :

```
NextFunction
```
```
NextFunction
)
```
##### )

##### {

##### {

```
const
```
```
const
key
```
```
key
=
```
##### =

##### `

##### `

```
ratelimit:
```
```
ratelimit:
${
```
##### ${

```
req
```
```
req
.
```
##### .

```
ip
```
```
ip
}
```
##### }

##### :

##### :

##### ${

##### ${

```
req
```
```
req
.
```
##### .

```
path
```
```
path
}
```
##### }

##### `

##### `

##### ;

##### ;

```
const
```
```
const
limit
```
```
limit
=
```
##### =

```
this
```
```
this
.
```
##### .

```
getLimit
```
```
getLimit
(
```
##### (

```
req
```
```
req
.
```
##### .

```
path
```
```
path
)
```
##### )

##### ;

##### ;

```
const
```
```
const
window
```
```
window
=
```
##### =

##### 60

##### 60

##### ;

##### ;

```
// 1 minute
```
```
// 1 minute
```
```
constconst current current == awaitawait thisthis..redisredis..incrincr((keykey));;
```
```
if
```
```
if
(
```
##### (

```
current
```
```
current
===
```
##### ===

##### 1

##### 1

##### )

##### )

##### {

##### {

```
awaitawait thisthis..redisredis..expireexpire((keykey,, windowwindow));;
```
##### }

##### }

```
ifif ((current current >> limit limit)) {{
```
```
throw
```
```
throw
new
```
```
new
HttpException
```
```
HttpException
(
```
##### (

```
'Too many requests'
```
```
'Too many requests'
,
```
##### ,

##### 429

##### 429

##### )

##### )

##### ;

##### ;

##### }

##### }

```
next
```
```
next
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }

##### }

```
private
```
```
private
getLimit
```
```
getLimit
(
```
##### (

```
path
```
```
path
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
number
```
```
number
{
```
##### {

```
// Different limits for different endpoints
```
```
// Different limits for different endpoints
```
```
if
```
```
if
(
```
##### (

```
path
```
```
path
.
```
##### .

```
includes
```
```
includes
(
```
##### (

```
'/auth/send-otp'
```
```
'/auth/send-otp'
)
```
##### )

##### )

##### )

```
return
```
```
return
3
```
##### 3

##### ;

##### ;

```
ifif ((pathpath..includesincludes(('/bookings''/bookings')))) returnreturn 2020 ;;
```
```
return
```
```
return
100
```
##### 100

##### ;

##### ;

```
// Default
```
```
// Default
```
##### }

##### }

##### }}

```
// Apply rate limiting
```
```
// Apply rate limiting
```
```
@@UseGuardsUseGuards((RateLimiterGuardRateLimiterGuard))
```
##### @

##### @

```
Post
```
```
Post
(
```
##### (

```
'/auth/send-otp'
```
```
'/auth/send-otp'
)
```
##### )

```
async
```
```
async
sendOtp
```
```
sendOtp
(
```
##### (

##### @

##### @

```
Body
```
```
Body
(
```
##### (

##### )

##### )

```
body
```
```
body
:
```
##### :

```
SendOtpDto
```
```
SendOtpDto
)
```
##### )

##### {

##### {

##### // ...// ...

##### }

##### }

```
typescript
```

_// DTOs with validation// DTOs with validation_

import

import
{

##### {

```
IsString
```
```
IsString
,
```
##### ,

```
IsEmail
```
```
IsEmail
,
```
##### ,

```
IsPhoneNumber
```
```
IsPhoneNumber
,
```
##### ,

```
IsUUID
```
```
IsUUID
,
```
##### ,

```
Min
```
```
Min
,
```
##### ,

```
Max
```
```
Max
}
```
##### }

```
from
```
```
from
'class-validator'
```
```
'class-validator'
;
```
##### ;

import

import
{

##### {

```
Transform
```
```
Transform
}
```
##### }

```
from
```
```
from
'class-transformer'
```
```
'class-transformer'
;
```
##### ;

importimport ** asas sanitizeHtml sanitizeHtml fromfrom 'sanitize-html''sanitize-html';;

export

export
class

```
class
CreateBookingDto
```
```
CreateBookingDto
{
```
##### {

##### @

##### @

```
IsUUID
```
```
IsUUID
(
```
##### (

##### )

##### )

serviceId

serviceId
:

##### :

```
string
```
```
string
;
```
##### ;

##### @

##### @

```
IsString
```
```
IsString
(
```
##### (

##### )

##### )

@@IsInIsIn(([['home''home',, 'salon''salon']]))

serviceType

serviceType
:

##### :

```
string
```
```
string
;
```
##### ;

@@IsUUIDIsUUID(())

##### @

##### @

```
IsOptional
```
```
IsOptional
(
```
##### (

##### )

##### )

addressId

addressId
?

##### ?

##### :

##### :

```
string
```
```
string
;
```
##### ;

##### @

##### @

```
IsDateString
```
```
IsDateString
(
```
##### (

##### )

##### )

bookingDate

bookingDate
:

##### :

```
string
```
```
string
;
```
##### ;

##### @

##### @

```
IsString
```
```
IsString
(
```
##### (

##### )

##### )

##### @

##### @

```
IsIn
```
```
IsIn
(
```
##### (

##### [

##### [

```
'morning'
```
```
'morning'
,
```
##### ,

```
'afternoon'
```
```
'afternoon'
,
```
##### ,

```
'evening'
```
```
'evening'
]
```
##### ]

##### )

##### )

timeSlot

timeSlot
:

##### :

```
string
```
```
string
;
```
##### ;

##### @

##### @

```
IsArray
```
```
IsArray
(
```
##### (

##### )

##### )

##### @

##### @

```
IsUUID
```
```
IsUUID
(
```
##### (

##### '4'

##### '4'

##### ,

##### ,

##### {

##### {

```
each
```
```
each
:
```
##### :

```
true
```
```
true
}
```
##### }

##### )

##### )

@@IsOptionalIsOptional(())

addons

addons
?

##### ?

##### :

##### :

```
string
```
```
string
[
```
##### [

##### ]

##### ]

##### ;

##### ;

@@IsStringIsString(())

##### @

##### @

```
MaxLength
```
```
MaxLength
(
```
##### (

##### 500

##### 500

##### )

##### )

##### @

##### @

```
Transform
```
```
Transform
(
```
##### (

##### (

##### (

##### {

##### {

```
value
```
```
value
}
```
##### }

##### )

##### )

##### =>

##### =>

```
sanitizeHtml
```
```
sanitizeHtml
(
```
##### (

```
value
```
```
value
)
```
##### )

##### )

##### )

@@IsOptionalIsOptional(())

customerNotes

customerNotes
?

##### ?

##### :

##### :

```
string
```
```
string
;
```
##### ;

##### }

##### }

_// Global Validation Pipe_

_// Global Validation Pipe_

app

app
.

##### .

```
useGlobalPipes
```
```
useGlobalPipes
(
```
##### (

```
new
```
```
new
ValidationPipe
```
```
ValidationPipe
(
```
##### (

##### {

##### {

whitelist

whitelist
:

##### :

```
true
```
```
true
,
```
##### ,

```
// Strip non-whitelisted properties
```
```
// Strip non-whitelisted properties
```
forbidNonWhitelisted

forbidNonWhitelisted
:

##### :

```
true
```
```
true
,
```
##### ,

```
// Throw error for non-whitelisted
```
```
// Throw error for non-whitelisted
```
transform

transform
:

##### :

```
true
```
```
true
,
```
##### ,

```
// Auto-transform to DTO instances
```
```
// Auto-transform to DTO instances
```
transformOptions transformOptions:: {{

enableImplicitConversion

enableImplicitConversion
:

##### :

```
true
```
```
true
```
##### }

##### }


### 12.3 SQL Injection Prevention

### 12.4 XSS Protection

##### }

##### }

##### )

##### )

##### )

##### )

##### ;

##### ;

```
typescript
```
```
// Using T// Using TypeORM parameterized queries (automatically prypeORM parameterized queries (automatically prevents SQLevents SQL injection) injection)
```
```
const
```
```
const
users
```
```
users
=
```
##### =

```
await
```
```
await
this
```
```
this
.
```
##### .

```
userRepository
```
```
userRepository
```
##### .

##### .

```
createQueryBuilder
```
```
createQueryBuilder
(
```
##### (

```
'user'
```
```
'user'
)
```
##### )

```
..wherewhere(('user.phone = :phone''user.phone = :phone',, {{ phone phone:: phoneNumber phoneNumber }}))
```
##### .

##### .

```
getMany
```
```
getMany
(
```
##### (

##### )

##### )

##### ;

##### ;

```
// Never use raw queries with string concatenation// Never use raw queries with string concatenation
```
#### // ❌ Bad:

#### // ❌ Bad:

```
const
```
```
const
query
```
```
query
=
```
##### =

##### `

##### `

```
SELECT * FROM users WHERE phone = '
```
```
SELECT * FROM users WHERE phone = '
${
```
##### ${

```
phoneNumber
```
```
phoneNumber
}
```
##### }

##### '

##### '

##### `

##### `

##### ;

##### ;

#### // ✅ Good:

#### // ✅ Good:

```
const
```
```
const
query
```
```
query
=
```
##### =

```
this
```
```
this
.
```
##### .

```
userRepository
```
```
userRepository
```
##### .

##### .

```
query
```
```
query
(
```
##### (

```
'SELECT * FROM users WHERE phone = $1'
```
```
'SELECT * FROM users WHERE phone = $1'
,
```
##### ,

##### [

##### [

```
phoneNumber
```
```
phoneNumber
]
```
##### ]

##### )

##### )

##### ;

##### ;

```
typescript
```

### 12.5 CORS Configuration

```
// Helmet middlewar// Helmet middleware for security headerse for security headers
```
```
import
```
```
import
helmet
```
```
helmet
from
```
```
from
'helmet'
```
```
'helmet'
;
```
##### ;

```
appapp..useuse((helmethelmet(({{
```
```
contentSecurityPolicy
```
```
contentSecurityPolicy
:
```
##### :

##### {

##### {

```
directives
```
```
directives
:
```
##### :

##### {

##### {

```
defaultSrc
```
```
defaultSrc
:
```
##### :

##### [

##### [

```
"'self'"
```
```
"'self'"
]
```
##### ]

##### ,

##### ,

```
styleSrc
```
```
styleSrc
:
```
##### :

##### [

##### [

```
"'self'"
```
```
"'self'"
,
```
##### ,

```
"'unsafe-inline'"
```
```
"'unsafe-inline'"
]
```
##### ]

##### ,

##### ,

```
scriptSrc
```
```
scriptSrc
:
```
##### :

##### [

##### [

```
"'self'"
```
```
"'self'"
]
```
##### ]

##### ,

##### ,

```
imgSrc
```
```
imgSrc
:
```
##### :

##### [

##### [

```
"'self'"
```
```
"'self'"
,
```
##### ,

```
'data:'
```
```
'data:'
,
```
##### ,

```
'https:'
```
```
'https:'
]
```
##### ]

##### ,

##### ,

##### }},,

##### }

##### }

##### ,

##### ,

```
hsts
```
```
hsts
:
```
##### :

##### {

##### {

```
maxAge maxAge:: 3153600031536000 ,,
```
```
includeSubDomains
```
```
includeSubDomains
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
preload
```
```
preload
:
```
##### :

```
true
```
```
true
```
##### }}

##### }

##### }

##### )

##### )

##### )

##### )

##### ;

##### ;

```
// Sanitize all text inputs// Sanitize all text inputs
```
```
import
```
```
import
*
```
##### *

```
as
```
```
as
sanitizeHtml
```
```
sanitizeHtml
from
```
```
from
'sanitize-html'
```
```
'sanitize-html'
;
```
##### ;

##### @

##### @

```
Transform
```
```
Transform
(
```
##### (

##### (

##### (

##### {

##### {

```
value
```
```
value
}
```
##### }

##### )

##### )

##### =>

##### =>

```
sanitizeHtml
```
```
sanitizeHtml
(
```
##### (

```
value
```
```
value
,
```
##### ,

##### {

##### {

```
allowedTags
```
```
allowedTags
:
```
##### :

##### [

##### [

##### ]

##### ]

##### ,

##### ,

```
allowedAttributes
```
```
allowedAttributes
:
```
##### :

##### {

##### {

##### }

##### }

##### }

##### }

##### )

##### )

##### )

##### )

```
@@IsStringIsString(())
```
```
description
```
```
description
:
```
##### :

```
string
```
```
string
;
```
##### ;

```
typescript
```
```
// CORS setup
```
```
// CORS setup
```
```
appapp..enableCorsenableCors(({{
```
```
origin
```
```
origin
:
```
##### :

##### [

##### [

```
'https://groomsta.com'
```
```
'https://groomsta.com'
,
```
##### ,

```
'https://www'https://www.groomsta.com'.groomsta.com',,
```
```
'https://admin.groomsta.com'
```
```
'https://admin.groomsta.com'
,
```
##### ,

```
'http://localhost:3000'
```
```
'http://localhost:3000'
// Development only
```
```
// Development only
```
##### ]

##### ]

##### ,

##### ,

```
credentials
```
```
credentials
:
```
##### :

```
true
```
```
true
,
```
##### ,

```
methods
```
```
methods
:
```
##### :

##### [

##### [

##### 'GET'

##### 'GET'

##### ,

##### ,

##### 'POST'

##### 'POST'

##### ,

##### ,

##### 'PUT'

##### 'PUT'

##### ,

##### ,

##### 'DELETE'

##### 'DELETE'

##### ,

##### ,

##### 'PATCH'

##### 'PATCH'

##### ]

##### ]

##### ,

##### ,

```
allowedHeaders
```
```
allowedHeaders
:
```
##### :

##### [

##### [

```
'Content-Type'
```
```
'Content-Type'
,
```
##### ,

```
'Authorization'
```
```
'Authorization'
]
```
##### ]

##### }}));;


### 12.6 Secrets Management

```
typescript
```

_// Envir// Environment variables structuronment variables structuree_

_// .env file (never commit to git)_

_// .env file (never commit to git)_

##### DATABASE_URL

##### DATABASE_URL

##### =

##### =

```
postgresql
```
```
postgresql
:
```
##### :

##### /

##### /

##### /

##### /

```
user
```
```
user
:
```
##### :

```
pass
```
```
pass
@
```
##### @

```
localhost
```
```
localhost
:
```
##### :

##### 5432

##### 5432

##### /

##### /

```
groomsta
```
```
groomsta
```
REDIS_HOSTREDIS_HOST==localhostlocalhost

##### REDIS_PORT

##### REDIS_PORT

##### =

##### =

##### 6379

##### 6379

##### REDIS_PASSWORD

##### REDIS_PASSWORD

##### =

##### =

```
secret
```
```
secret
```
##### JWT_SECRET

##### JWT_SECRET

##### =

##### =

```
your
```
```
your
```
-

##### -

```
very
```
```
very
```
-

##### -

```
long
```
```
long
```
-

##### -

```
random
```
```
random
```
-

##### -

```
secret
```
```
secret
```
-

##### -

```
key
```
```
key
```
##### JWT_REFRESH_SECRET

##### JWT_REFRESH_SECRET

##### =

##### =

```
another
```
```
another
```
-

##### -

```
very
```
```
very
```
-

##### -

```
long
```
```
long
```
-

##### -

```
random
```
```
random
```
-

##### -

```
secret
```
```
secret
```
-

##### -

```
key
```
```
key
```
RAZORPRAZORPAY_KEY_IDAY_KEY_ID==rzp_test_xxxrzp_test_xxx

##### RAZORPAY_KEY_SECRET

##### RAZORPAY_KEY_SECRET

##### =

##### =

```
xxx
```
```
xxx
```
##### RAZORPAY_WEBHOOK_SECRET

##### RAZORPAY_WEBHOOK_SECRET

##### =

##### =

```
xxx
```
```
xxx
```
##### AWS_ACCESS_KEY_ID

##### AWS_ACCESS_KEY_ID

##### =

##### =

```
xxx
```
```
xxx
```
##### AWS_SECRET_ACCESS_KEY

##### AWS_SECRET_ACCESS_KEY

##### =

##### =

```
xxx
```
```
xxx
```
AWS_REGIONAWS_REGION==apap--southsouth-- 11

##### AWS_S3_BUCKET

##### AWS_S3_BUCKET

##### =

##### =

```
groomsta
```
```
groomsta
```
-

##### -

```
uploads
```
```
uploads
```
MSG91_AUTH_KEYMSG91_AUTH_KEY==xxxxxx

##### GUPSHUP_API_KEY

##### GUPSHUP_API_KEY

##### =

##### =

```
xxx
```
```
xxx
```
##### FIREBASE_PROJECT_ID

##### FIREBASE_PROJECT_ID

##### =

##### =

```
xxx
```
```
xxx
```
##### FIREBASE_PRIVATE_KEY

##### FIREBASE_PRIVATE_KEY

##### =

##### =

```
xxx
```
```
xxx
```
_// Config service_

_// Config service_

##### @

##### @

```
Injectable
```
```
Injectable
(
```
##### (

##### )

##### )

exportexport classclass ConfigServiceConfigService {{

```
get
```
```
get
(
```
##### (

```
key
```
```
key
:
```
##### :

```
string
```
```
string
)
```
##### )

##### :

##### :

```
string
```
```
string
{
```
##### {

```
const
```
```
const
value
```
```
value
=
```
##### =

```
process
```
```
process
.
```
##### .

```
env
```
```
env
[
```
##### [

```
key
```
```
key
]
```
##### ]

##### ;

##### ;

ifif ((!!valuevalue)) {{

```
throw
```
```
throw
new
```
```
new
Error
```
```
Error
(
```
##### (

##### `

##### `

```
Config key
```
```
Config key
${
```
##### ${

```
key
```
```
key
}
```
##### }

```
is missing
```
```
is missing
`
```
##### `

##### )

##### )

##### ;

##### ;

##### }

##### }

returnreturn value value;;

##### }

##### }

getDatabaseConfiggetDatabaseConfig(()) {{

```
return
```
```
return
{
```
##### {

type

type
:

##### :

```
'postgres'
```
```
'postgres'
,
```
##### ,

url

url
:

##### :

```
this
```
```
this
.
```
##### .

```
get
```
```
get
(
```
##### (

##### 'DATABASE_URL'

##### 'DATABASE_URL'

##### )

##### )

##### ,

##### ,

entities

entities
:

##### :

##### [

##### [

```
__dirname
```
```
__dirname
+
```
##### +

```
'/../**/*.entity{.ts,.js}'
```
```
'/../**/*.entity{.ts,.js}'
]
```
##### ]

##### ,

##### ,

synchronize

synchronize
:

##### :

```
false
```
```
false
,
```
##### ,

```
// Always false in production
```
```
// Always false in production
```
logging

logging
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### NODE_ENV

##### NODE_ENV

##### ===

##### ===

```
'development'
```
```
'development'
,
```
##### ,

ssl ssl:: process process..envenv..NODE_ENVNODE_ENV ====== 'production''production' ?? {{ rejectUnauthorized rejectUnauthorized:: falsefalse }} :: falsefalse

##### }

##### }

##### ;

##### ;


## 13. Error Handling

### 13.1 Global Exception Filter

##### }

##### }

##### }

##### }

```
typescript
```

_// Global Exception Filter// Global Exception Filter_

##### @

##### @

```
Catch
```
```
Catch
(
```
##### (

##### )

##### )

export

export
class

```
class
AllExceptionsFilter
```
```
AllExceptionsFilter
implements
```
```
implements
ExceptionFilter
```
```
ExceptionFilter
{
```
##### {

constructorconstructor((privateprivate readonlyreadonly logger logger:: LoggerLogger)) {{}}

```
catch
```
```
catch
(
```
##### (

```
exception
```
```
exception
:
```
##### :

```
unknown
```
```
unknown
,
```
##### ,

```
host
```
```
host
:
```
##### :

```
ArgumentsHost
```
```
ArgumentsHost
)
```
##### )

##### {

##### {

```
const
```
```
const
ctx
```
```
ctx
=
```
##### =

```
host
```
```
host
.
```
##### .

```
switchToHttp
```
```
switchToHttp
(
```
##### (

##### )

##### )

##### ;

##### ;

```
const
```
```
const
response
```
```
response
=
```
##### =

```
ctx
```
```
ctx
.
```
##### .

```
getResponse
```
```
getResponse
<
```
##### <

```
Response
```
```
Response
>
```
##### >

##### (

##### (

##### )

##### )

##### ;

##### ;

```
const
```
```
const
request
```
```
request
=
```
##### =

```
ctx
```
```
ctx
.
```
##### .

```
getRequest
```
```
getRequest
<
```
##### <

```
Request
```
```
Request
>
```
##### >

##### (

##### (

##### )

##### )

##### ;

##### ;

letlet status status == 500500 ;;

```
let
```
```
let
message
```
```
message
=
```
##### =

```
'Internal server error'
```
```
'Internal server error'
;
```
##### ;

```
let
```
```
let
code
```
```
code
=
```
##### =

##### 'INTERNAL_ERROR'

##### 'INTERNAL_ERROR'

##### ;

##### ;

letlet details details == nullnull;;

```
if
```
```
if
(
```
##### (

```
exception
```
```
exception
instanceof
```
```
instanceof
HttpException
```
```
HttpException
)
```
##### )

##### {

##### {

status status == exception exception..getStatusgetStatus(());;

```
const
```
```
const
exceptionResponse
```
```
exceptionResponse
=
```
##### =

```
exception
```
```
exception
.
```
##### .

```
getResponse
```
```
getResponse
(
```
##### (

##### )

##### )

##### ;

##### ;

ifif ((typeoftypeof exceptionResponse exceptionResponse ====== 'object''object')) {{

message

message
=

##### =

```
exceptionResponse
```
```
exceptionResponse
[
```
##### [

```
'message'
```
```
'message'
]
```
##### ]

##### ||

##### ||

```
message
```
```
message
;
```
##### ;

details

details
=

##### =

```
exceptionResponse
```
```
exceptionResponse
[
```
##### [

```
'details'
```
```
'details'
]
```
##### ]

##### ||

##### ||

```
null
```
```
null
;
```
##### ;

##### }

##### }

```
else
```
```
else
{
```
##### {

message

message
=

##### =

```
exceptionResponse
```
```
exceptionResponse
;
```
##### ;

##### }

##### }

code code == thisthis..getErrorCodegetErrorCode((statusstatus));;

##### }

##### }

```
else
```
```
else
if
```
```
if
(
```
##### (

```
exception
```
```
exception
instanceof
```
```
instanceof
Error
```
```
Error
)
```
##### )

##### {

##### {

message

message
=

##### =

```
exception
```
```
exception
.
```
##### .

```
message
```
```
message
;
```
##### ;

thisthis..loggerlogger..errorerror((exceptionexception..stackstack));;

##### }

##### }

_// Log err// Log erroror_

```
this
```
```
this
.
```
##### .

```
logger
```
```
logger
.
```
##### .

```
error
```
```
error
(
```
##### (

##### `

##### `

##### ${

##### ${

```
request
```
```
request
.
```
##### .

```
method
```
```
method
}
```
##### }

##### ${

##### ${

```
request
```
```
request
.
```
##### .

```
url
```
```
url
}
```
##### }

##### -

##### -

##### ${

##### ${

```
status
```
```
status
}
```
##### }

##### -

##### -

##### ${

##### ${

```
message
```
```
message
}
```
##### }

##### `

##### `

##### ,

##### ,

exception exception instanceofinstanceof ErrorError ?? exception exception..stackstack :: ''''

##### )

##### )

##### ;

##### ;

```
// Send response
```
```
// Send response
```
response

response
.

##### .

```
status
```
```
status
(
```
##### (

```
status
```
```
status
)
```
##### )

##### .

##### .

```
json
```
```
json
(
```
##### (

##### {

##### {

success

success
:

##### :

```
false
```
```
false
,
```
##### ,

error

error
:

##### :

##### {

##### {

code code,,

message

message
,

##### ,

details

details

##### }},,


### 13.2 Custom Exception Classes

```
metadata
```
```
metadata
:
```
##### :

##### {

##### {

```
timestamp
```
```
timestamp
:
```
##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### .

##### .

```
toISOString
```
```
toISOString
(
```
##### (

##### )

##### )

##### ,

##### ,

```
path path:: request request..urlurl,,
```
```
method
```
```
method
:
```
##### :

```
request
```
```
request
.
```
##### .

```
method
```
```
method
,
```
##### ,

```
requestId
```
```
requestId
:
```
##### :

```
request
```
```
request
[
```
##### [

```
'id'
```
```
'id'
]
```
##### ]

##### }}

##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
private
```
```
private
getErrorCode
```
```
getErrorCode
(
```
##### (

```
status
```
```
status
:
```
##### :

```
number
```
```
number
)
```
##### )

##### :

##### :

```
string
```
```
string
{
```
##### {

```
const
```
```
const
codes
```
```
codes
=
```
##### =

##### {

##### {

##### 400400 :: 'BAD_REQUEST''BAD_REQUEST',,

##### 401

##### 401

##### :

##### :

##### 'UNAUTHORIZED'

##### 'UNAUTHORIZED'

##### ,

##### ,

##### 403

##### 403

##### :

##### :

##### 'FORBIDDEN'

##### 'FORBIDDEN'

##### ,

##### ,

##### 404

##### 404

##### :

##### :

##### 'NOT_FOUND'

##### 'NOT_FOUND'

##### ,

##### ,

##### 409

##### 409

##### :

##### :

##### 'CONFLICT'

##### 'CONFLICT'

##### ,

##### ,

##### 422

##### 422

##### :

##### :

##### 'VALIDATION_ERROR'

##### 'VALIDATION_ERROR'

##### ,

##### ,

##### 429

##### 429

##### :

##### :

##### 'RATE_LIMIT_EXCEEDED'

##### 'RATE_LIMIT_EXCEEDED'

##### ,

##### ,

##### 500500 :: 'INTERNAL_ERROR''INTERNAL_ERROR',,

##### 503

##### 503

##### :

##### :

##### 'SERVICE_UNAVAILABLE'

##### 'SERVICE_UNAVAILABLE'

##### }

##### }

##### ;

##### ;

```
returnreturn codes codes[[statusstatus]] |||| 'UNKNOWN_ERROR''UNKNOWN_ERROR';;
```
##### }

##### }

##### }

##### }

```
typescript
```

## 14. Logging & Monitoring

### 14.1 Winston Logger Setup

```
// Custom Exceptions// Custom Exceptions
```
```
export
```
```
export
class
```
```
class
BusinessLogicException
```
```
BusinessLogicException
extends
```
```
extends
HttpException
```
```
HttpException
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

```
message
```
```
message
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
code
```
```
code
:
```
##### :

```
string
```
```
string
=
```
##### =

##### 'BUSINESS_ERROR'

##### 'BUSINESS_ERROR'

##### )

##### )

##### {

##### {

```
supersuper(({{ message message,, code code }},, 400400 ));;
```
##### }

##### }

##### }

##### }

```
export
```
```
export
class
```
```
class
ResourceNotFoundException
```
```
ResourceNotFoundException
extends
```
```
extends
HttpException
```
```
HttpException
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

```
resource
```
```
resource
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
id
```
```
id
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
super
```
```
super
(
```
##### (

##### {

##### {

```
message message:: ``${${resourceresource}} with id with id ${${idid}} not found not found``,,
```
```
code
```
```
code
:
```
##### :

##### 'RESOURCE_NOT_FOUND'

##### 'RESOURCE_NOT_FOUND'

##### }

##### }

##### ,

##### ,

##### 404

##### 404

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

```
exportexport classclass InsufficientBalanceExceptionInsufficientBalanceException extendsextends BusinessLogicExceptionBusinessLogicException {{
```
```
constructor
```
```
constructor
(
```
##### (

##### )

##### )

##### {

##### {

```
super
```
```
super
(
```
##### (

```
'Insufficient wallet balance'
```
```
'Insufficient wallet balance'
,
```
##### ,

##### 'INSUFFICIENT_BALANCE'

##### 'INSUFFICIENT_BALANCE'

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

```
export
```
```
export
class
```
```
class
BookingNotFoundException
```
```
BookingNotFoundException
extends
```
```
extends
ResourceNotFoundException
```
```
ResourceNotFoundException
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

```
bookingId
```
```
bookingId
:
```
##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
super
```
```
super
(
```
##### (

```
'Booking'
```
```
'Booking'
,
```
##### ,

```
bookingId
```
```
bookingId
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }}

```
// Usage
```
```
// Usage
```
```
ifif ((!!bookingbooking)) {{
```
```
throw
```
```
throw
new
```
```
new
BookingNotFoundException
```
```
BookingNotFoundException
(
```
##### (

```
bookingId
```
```
bookingId
)
```
##### )

##### ;

##### ;

##### }

##### }

```
if
```
```
if
(
```
##### (

```
walletBalance
```
```
walletBalance
<
```
##### <

```
amount
```
```
amount
)
```
##### )

##### {

##### {

```
throw
```
```
throw
new
```
```
new
InsufficientBalanceException
```
```
InsufficientBalanceException
(
```
##### (

##### )

##### )

##### ;

##### ;

##### }}

```
typescript
```

_// Logger Configuration// Logger Configuration_

import

import
*

##### *

```
as
```
```
as
winston
```
```
winston
from
```
```
from
'winston'
```
```
'winston'
;
```
##### ;

import

import
*

##### *

```
as
```
```
as
DailyRotateFile
```
```
DailyRotateFile
from
```
```
from
'winston-daily-rotate-file'
```
```
'winston-daily-rotate-file'
;
```
##### ;

const

const
logger

```
logger
=
```
##### =

```
winston
```
```
winston
.
```
##### .

```
createLogger
```
```
createLogger
(
```
##### (

##### {

##### {

level

level
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### LOG_LEVEL

##### LOG_LEVEL

##### ||

##### ||

```
'info'
```
```
'info'
,
```
##### ,

format

format
:

##### :

```
winston
```
```
winston
.
```
##### .

```
format
```
```
format
.
```
##### .

```
combine
```
```
combine
(
```
##### (

winston

winston
.

##### .

```
format
```
```
format
.
```
##### .

```
timestamp
```
```
timestamp
(
```
##### (

##### )

##### )

##### ,

##### ,

winston

winston
.

##### .

```
format
```
```
format
.
```
##### .

```
errors
```
```
errors
(
```
##### (

##### {

##### {

```
stack
```
```
stack
:
```
##### :

```
true
```
```
true
}
```
##### }

##### )

##### )

##### ,

##### ,

winston

winston
.

##### .

```
format
```
```
format
.
```
##### .

```
json
```
```
json
(
```
##### (

##### )

##### )

##### )),,

defaultMeta

defaultMeta
:

##### :

##### {

##### {

service

service
:

##### :

```
'groomsta-api'
```
```
'groomsta-api'
,
```
##### ,

environment environment:: process process..envenv..NODE_ENVNODE_ENV

##### }

##### }

##### ,

##### ,

transports

transports
:

##### :

##### [

##### [

_// Error logs// Error logs_

```
new
```
```
new
DailyRotateFile
```
```
DailyRotateFile
(
```
##### (

##### {

##### {

filename

filename
:

##### :

```
'logs/error-%DATE%.log'
```
```
'logs/error-%DATE%.log'
,
```
##### ,

datePattern datePattern:: 'YYYY'YYYY-MM-DD'-MM-DD',,

level

level
:

##### :

```
'error'
```
```
'error'
,
```
##### ,

maxFiles

maxFiles
:

##### :

```
'30d'
```
```
'30d'
,
```
##### ,

maxSize

maxSize
:

##### :

```
'20m'
```
```
'20m'
```
##### }

##### }

##### )

##### )

##### ,

##### ,

```
// Combined logs
```
```
// Combined logs
```
newnew DailyRotateFileDailyRotateFile(({{

filename

filename
:

##### :

```
'logs/combined-%DATE%.log'
```
```
'logs/combined-%DATE%.log'
,
```
##### ,

datePattern

datePattern
:

##### :

##### 'YYYY-MM-DD'

##### 'YYYY-MM-DD'

##### ,

##### ,

maxFiles maxFiles:: '14d''14d',,

maxSize

maxSize
:

##### :

```
'20m'
```
```
'20m'
```
##### }

##### }

##### )

##### )

##### ,

##### ,

```
// Console output (development)
```
```
// Console output (development)
```
```
new
```
```
new
winston
```
```
winston
.
```
##### .

```
transports
```
```
transports
.
```
##### .

```
Console
```
```
Console
(
```
##### (

##### {

##### {

format format:: winston winston..formatformat..combinecombine((

winston

winston
.

##### .

```
format
```
```
format
.
```
##### .

```
colorize
```
```
colorize
(
```
##### (

##### )

##### )

##### ,

##### ,

winston

winston
.

##### .

```
format
```
```
format
.
```
##### .

```
simple
```
```
simple
(
```
##### (

##### )

##### )

##### )

##### )

##### }

##### }

##### )

##### )

##### ]

##### ]

##### }

##### }

##### )

##### )

##### ;

##### ;

_// Logger Service_

_// Logger Service_

##### @

##### @

```
Injectable
```
```
Injectable
(
```
##### (

##### )

##### )

exportexport classclass LoggerServiceLoggerService {{


### 14.2 Application Performance Monitoring

```
private
```
```
private
logger
```
```
logger
:
```
##### :

```
winston
```
```
winston
.
```
##### .

```
Logger
```
```
Logger
;
```
##### ;

```
constructorconstructor(()) {{
```
```
this
```
```
this
.
```
##### .

```
logger
```
```
logger
=
```
##### =

```
logger
```
```
logger
;
```
##### ;

##### }

##### }

```
log
```
```
log
(
```
##### (

```
message
```
```
message
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
context
```
```
context
?
```
##### ?

##### :

##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
logger
```
```
logger
.
```
##### .

```
info
```
```
info
(
```
##### (

```
message
```
```
message
,
```
##### ,

##### {

##### {

```
context
```
```
context
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }}

```
error
```
```
error
(
```
##### (

```
message
```
```
message
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
trace
```
```
trace
?
```
##### ?

##### :

##### :

```
string
```
```
string
,
```
##### ,

```
context
```
```
context
?
```
##### ?

##### :

##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
thisthis..loggerlogger..errorerror((messagemessage,, {{ trace trace,, context context }}));;
```
##### }

##### }

```
warn
```
```
warn
(
```
##### (

```
message
```
```
message
:
```
##### :

```
string
```
```
string
,
```
##### ,

```
context
```
```
context
?
```
##### ?

##### :

##### :

```
string
```
```
string
)
```
##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
logger
```
```
logger
.
```
##### .

```
warn
```
```
warn
(
```
##### (

```
message
```
```
message
,
```
##### ,

##### {

##### {

```
context
```
```
context
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
debugdebug((messagemessage:: stringstring,, context context??:: stringstring)) {{
```
```
this
```
```
this
.
```
##### .

```
logger
```
```
logger
.
```
##### .

```
debug
```
```
debug
(
```
##### (

```
message
```
```
message
,
```
##### ,

##### {

##### {

```
context
```
```
context
}
```
##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
// Structured logging
```
```
// Structured logging
```
```
logBookingCreated
```
```
logBookingCreated
(
```
##### (

```
booking
```
```
booking
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

```
thisthis..loggerlogger..infoinfo(('Booking created''Booking created',, {{
```
```
event
```
```
event
:
```
##### :

```
'booking_created'
```
```
'booking_created'
,
```
##### ,

```
bookingId
```
```
bookingId
:
```
##### :

```
booking
```
```
booking
.
```
##### .

```
id
```
```
id
,
```
##### ,

```
userId userId:: booking booking..userIduserId,,
```
```
serviceId
```
```
serviceId
:
```
##### :

```
booking
```
```
booking
.
```
##### .

```
serviceId
```
```
serviceId
,
```
##### ,

```
amount
```
```
amount
:
```
##### :

```
booking
```
```
booking
.
```
##### .

```
totalAmount
```
```
totalAmount
```
##### }

##### }

##### )

##### )

##### ;

##### ;

##### }

##### }

```
logPaymentProcessed
```
```
logPaymentProcessed
(
```
##### (

```
payment
```
```
payment
:
```
##### :

```
any
```
```
any
)
```
##### )

##### {

##### {

```
thisthis..loggerlogger..infoinfo(('Payment processed''Payment processed',, {{
```
```
event
```
```
event
:
```
##### :

```
'payment_processed'
```
```
'payment_processed'
,
```
##### ,

```
paymentId
```
```
paymentId
:
```
##### :

```
payment
```
```
payment
.
```
##### .

```
id
```
```
id
,
```
##### ,

```
amount amount:: payment payment..amountamount,,
```
```
status
```
```
status
:
```
##### :

```
payment
```
```
payment
.
```
##### .

```
paymentStatus
```
```
paymentStatus
```
##### }

##### }

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

```
typescript
```

_// Sentry Integration for Err// Sentry Integration for Error Trackingor Tracking_

import

import
*

##### *

```
as
```
```
as
Sentry
```
```
Sentry
from
```
```
from
'@sentry/node'
```
```
'@sentry/node'
;
```
##### ;

SentrySentry..initinit(({{

dsn

dsn
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### SENTRY_DSN

##### SENTRY_DSN

##### ,

##### ,

environment

environment
:

##### :

```
process
```
```
process
.
```
##### .

```
env
```
```
env
.
```
##### .

##### NODE_ENV

##### NODE_ENV

##### ,

##### ,

tracesSampleRate

tracesSampleRate
:

##### :

##### 1.0

##### 1.0

##### }

##### }

##### )

##### )

##### ;

##### ;

_// Sentry Interceptor_

_// Sentry Interceptor_

@@InjectableInjectable(())

export

export
class

```
class
SentryInterceptor
```
```
SentryInterceptor
implements
```
```
implements
NestInterceptor
```
```
NestInterceptor
{
```
##### {

```
intercept
```
```
intercept
(
```
##### (

```
context
```
```
context
:
```
##### :

```
ExecutionContext
```
```
ExecutionContext
,
```
##### ,

```
next
```
```
next
:
```
##### :

```
CallHandler
```
```
CallHandler
)
```
##### )

##### :

##### :

```
Observable
```
```
Observable
<
```
##### <

```
any
```
```
any
>
```
##### >

##### {

##### {

returnreturn next next..handlehandle(())..pipepipe((

```
catchError
```
```
catchError
(
```
##### (

##### (

##### (

```
error
```
```
error
)
```
##### )

##### =>

##### =>

##### {

##### {

```
Sentry
```
```
Sentry
.
```
##### .

```
captureException
```
```
captureException
(
```
##### (

```
error
```
```
error
)
```
##### )

##### ;

##### ;

throwthrow error error;;

##### }

##### }

##### )

##### )

##### )

##### )

##### ;

##### ;

##### }}

##### }

##### }

_// Performance monitoring interceptor_

_// Performance monitoring interceptor_

##### @

##### @

```
Injectable
```
```
Injectable
(
```
##### (

##### )

##### )

export

export
class

```
class
PerformanceInterceptor
```
```
PerformanceInterceptor
implements
```
```
implements
NestInterceptor
```
```
NestInterceptor
{
```
##### {

```
constructor
```
```
constructor
(
```
##### (

```
private
```
```
private
readonly
```
```
readonly
logger
```
```
logger
:
```
##### :

```
LoggerService
```
```
LoggerService
)
```
##### )

##### {

##### {

##### }

##### }

```
intercept
```
```
intercept
(
```
##### (

```
context
```
```
context
:
```
##### :

```
ExecutionContext
```
```
ExecutionContext
,
```
##### ,

```
next
```
```
next
:
```
##### :

```
CallHandler
```
```
CallHandler
)
```
##### )

##### :

##### :

```
Observable
```
```
Observable
<
```
##### <

```
any
```
```
any
>
```
##### >

##### {

##### {

```
const
```
```
const
request
```
```
request
=
```
##### =

```
context
```
```
context
.
```
##### .

```
switchToHttp
```
```
switchToHttp
(
```
##### (

##### )

##### )

##### .

##### .

```
getRequest
```
```
getRequest
(
```
##### (

##### )

##### )

##### ;

##### ;

constconst {{ method method,, url url }} == request request;;

```
const
```
```
const
start
```
```
start
=
```
##### =

```
Date
```
```
Date
.
```
##### .

```
now
```
```
now
(
```
##### (

##### )

##### )

##### ;

##### ;

returnreturn next next..handlehandle(())..pipepipe((

```
tap
```
```
tap
(
```
##### (

##### (

##### (

##### )

##### )

##### =>

##### =>

##### {

##### {

```
const
```
```
const
duration
```
```
duration
=
```
##### =

```
Date
```
```
Date
.
```
##### .

```
now
```
```
now
(
```
##### (

##### )

##### )

##### -

##### -

```
start
```
```
start
;
```
##### ;

thisthis..loggerlogger..loglog((``${${methodmethod}} ${${urlurl}} - - ${${durationduration}}msms``,, 'Performance''Performance'));;

```
// Alert if slow
```
```
// Alert if slow
```
```
if
```
```
if
(
```
##### (

```
duration
```
```
duration
>
```
##### >

##### 1000

##### 1000

##### )

##### )

##### {

##### {

```
this
```
```
this
.
```
##### .

```
logger
```
```
logger
.
```
##### .

```
warn
```
```
warn
(
```
##### (

##### `

##### `

```
Slow request:
```
```
Slow request:
${
```
##### ${

```
method
```
```
method
}
```
##### }

##### ${

##### ${

```
url
```
```
url
}
```
##### }

##### -

##### -

##### ${

##### ${

```
duration
```
```
duration
}
```
##### }

```
ms
```
```
ms
`
```
##### `

##### ,

##### ,

```
'Performance'
```
```
'Performance'
)
```
##### )

##### ;

##### ;

##### }

##### }

##### }

##### }

##### )

##### )

##### ));;

##### }

##### }

##### }

##### }


### 14.3 Health Checks

```
typescript
```

_// Health Check Contr// Health Check Controlleroller_

##### @

##### @

```
Controller
```
```
Controller
(
```
##### (

```
'health'
```
```
'health'
)
```
##### )

export

export
class

```
class
HealthController
```
```
HealthController
{
```
##### {

constructorconstructor((

```
private
```
```
private
readonly
```
```
readonly
db
```
```
db
:
```
##### :

```
DataSource
```
```
DataSource
,
```
##### ,

```
private
```
```
private
readonly
```
```
readonly
redis
```
```
redis
:
```
##### :

```
Redis
```
```
Redis
```
##### )

##### )

##### {

##### {

##### }

##### }

##### @

##### @

```
Get
```
```
Get
(
```
##### (

##### )

##### )

```
async
```
```
async
check
```
```
check
(
```
##### (

##### )

##### )

##### {

##### {

constconst health health == {{

status

status
:

##### :

```
'ok'
```
```
'ok'
,
```
##### ,

timestamp

timestamp
:

##### :

```
new
```
```
new
Date
```
```
Date
(
```
##### (

##### )

##### )

##### .

##### .

```
toISOString
```
```
toISOString
(
```
##### (

##### )

##### )

##### ,

##### ,

uptime uptime:: process process..uptimeuptime(()),,

checks

checks
:

##### :

##### {

##### {

database

database
:

##### :

```
await
```
```
await
this
```
```
this
.
```
##### .

```
checkDatabase
```
```
checkDatabase
(
```
##### (

##### )

##### )

##### ,

##### ,

redis redis:: awaitawait thisthis..checkRedischeckRedis(()),,

memory

memory
:

##### :

```
this
```
```
this
.
```
##### .

```
checkMemory
```
```
checkMemory
(
```
##### (

##### )

##### )

##### }

##### }

##### }};;

```
const
```
```
const
allHealthy
```
```
allHealthy
=
```
##### =

```
Object
```
```
Object
.
```
##### .

```
values
```
```
values
(
```
##### (

```
health
```
```
health
.
```
##### .

```
checks
```
```
checks
)
```
##### )

##### .

##### .

```
every
```
```
every
(
```
##### (

```
check
```
```
check
=>
```
##### =>

```
check
```
```
check
.
```
##### .

```
status
```
```
status
===
```
##### ===

```
'ok'
```
```
'ok'
)
```
##### )

##### ;

##### ;

```
const
```
```
const
status
```
```
status
=
```
##### =

```
allHealthy
```
```
allHealthy
?
```
##### ?

##### 200

##### 200

##### :

##### :

##### 503

##### 503

##### ;

##### ;

```
return
```
```
return
{
```
##### {

##### ...

##### ...

```
health
```
```
health
,
```
##### ,

```
status
```
```
status
:
```
##### :

```
allHealthy
```
```
allHealthy
?
```
##### ?

```
'ok'
```
```
'ok'
:
```
##### :

```
'degraded'
```
```
'degraded'
}
```
##### }

##### ;

##### ;

##### }

##### }

```
private
```
```
private
async
```
```
async
checkDatabase
```
```
checkDatabase
(
```
##### (

##### )

##### )

##### {

##### {

```
try
```
```
try
{
```
##### {

awaitawait thisthis..dbdb..queryquery(('SELECT'SELECT 1' 1'));;

```
return
```
```
return
{
```
##### {

```
status
```
```
status
:
```
##### :

```
'ok'
```
```
'ok'
,
```
##### ,

```
message
```
```
message
:
```
##### :

```
'Database is reachable'
```
```
'Database is reachable'
}
```
##### }

##### ;

##### ;

##### }

##### }

```
catch
```
```
catch
(
```
##### (

```
error
```
```
error
)
```
##### )

##### {

##### {

returnreturn {{ status status:: 'error''error',, message message:: error error..messagemessage }};;

##### }

##### }

##### }

##### }

```
private
```
```
private
async
```
```
async
checkRedis
```
```
checkRedis
(
```
##### (

##### )

##### )

##### {

##### {

```
try
```
```
try
{
```
##### {

```
await
```
```
await
this
```
```
this
.
```
##### .

```
redis
```
```
redis
.
```
##### .

```
ping
```
```
ping
(
```
##### (

##### )

##### )

##### ;

##### ;

```
return
```
```
return
{
```
##### {

```
status
```
```
status
:
```
##### :

```
'ok'
```
```
'ok'
,
```
##### ,

```
message
```
```
message
:
```
##### :

```
'Redis is reachable'
```
```
'Redis is reachable'
}
```
##### }

##### ;

##### ;

##### }

##### }

```
catch
```
```
catch
(
```
##### (

```
error
```
```
error
)
```
##### )

##### {

##### {

```
return
```
```
return
{
```
##### {

```
status
```
```
status
:
```
##### :

```
'error'
```
```
'error'
,
```
##### ,

```
message
```
```
message
:
```
##### :

```
error
```
```
error
.
```
##### .

```
message
```
```
message
}
```
##### }

##### ;

##### ;

##### }}

##### }

##### }

privateprivate checkMemorycheckMemory(()) {{


## 15. Deployment Architecture

### 15.1 Docker Configuration

```
const
```
```
const
used
```
```
used
=
```
##### =

```
process
```
```
process
.
```
##### .

```
memoryUsage
```
```
memoryUsage
(
```
##### (

##### )

##### )

##### ;

##### ;

```
return
```
```
return
{
```
##### {

```
status status:: 'ok''ok',,
```
```
heapUsed
```
```
heapUsed
:
```
##### :

##### `

##### `

##### ${

##### ${

```
Math
```
```
Math
.
```
##### .

```
round
```
```
round
(
```
##### (

```
used
```
```
used
.
```
##### .

```
heapUsed
```
```
heapUsed
/
```
##### /

##### 1024

##### 1024

##### /

##### /

##### 1024

##### 1024

##### )

##### )

##### }

##### }

##### MB

##### MB

##### `

##### `

##### ,

##### ,

```
heapTotal
```
```
heapTotal
:
```
##### :

##### `

##### `

##### ${

##### ${

```
Math
```
```
Math
.
```
##### .

```
round
```
```
round
(
```
##### (

```
used
```
```
used
.
```
##### .

```
heapTotal
```
```
heapTotal
/
```
##### /

##### 1024

##### 1024

##### /

##### /

##### 1024

##### 1024

##### )

##### )

##### }

##### }

##### MB

##### MB

##### `

##### `

##### ,

##### ,

```
rss rss:: ``${${MathMath..roundround((usedused..rssrss // 10241024 // 10241024 ))}} MB MB``
```
##### }

##### }

##### ;

##### ;

##### }

##### }

##### }}

```
dockerfile
```

_# Dockerfile# Dockerfile_

##### FROM

##### FROM

```
node:20-alpine
```
```
node:20-alpine
AS
```
##### AS

```
builder
```
```
builder
```
WORKDIRWORKDIR /app /app

_# Copy package files_

_# Copy package files_

##### COPY

##### COPY

```
package*.json ./
```
```
package*.json ./
```
##### RUN

##### RUN

```
npm ci --only=production && npm cache clean --force
```
```
npm ci --only=production && npm cache clean --force
```
_# Copy source code_

_# Copy source code_

##### COPYCOPY....

_# Build application_

_# Build application_

RUNRUN npm run build npm run build

_# Production image_

_# Production image_

FROMFROM node:20-alpine node:20-alpine

##### WORKDIR

##### WORKDIR

```
/app
```
```
/app
```
_# Copy built application_

_# Copy built application_

##### COPY

##### COPY

```
--from
```
```
--from
=
```
##### =

```
builder
```
```
builder
/app/dist ./dist
```
```
/app/dist ./dist
```
##### COPY

##### COPY

```
--from
```
```
--from
=
```
##### =

```
builder
```
```
builder
/app/node_modules ./node_modules
```
```
/app/node_modules ./node_modules
```
##### COPY

##### COPY

```
--from
```
```
--from
=
```
##### =

```
builder
```
```
builder
/app/package*.json ./
```
```
/app/package*.json ./
```
_# Set environment_

_# Set environment_

ENVENV NODE_ENV=production NODE_ENV=production

_# Expose port_

_# Expose port_

##### EXPOSEEXPOSE 3000 3000

_# Start application_

_# Start application_

CMDCMD [ ["node""node", , "dist/main.js""dist/main.js"]]

yaml


_# docker# docker-compose.yml-compose.yml_

version

version
:

##### :

##### '3.8'

##### '3.8'

servicesservices::

```
api
```
```
api
:
```
##### :

```
build
```
```
build
:
```
##### :

##### .

##### .

```
ports
```
```
ports
:
```
##### :

##### -

##### -

##### "3000:3000"

##### "3000:3000"

```
environment
```
```
environment
:
```
##### :

##### -

##### -

```
NODE_ENV=production
```
```
NODE_ENV=production
```
- - DATABASE_URL=postgresql DATABASE_URL=postgresql:://postgres//postgres::password@postgrespassword@postgres::5432/groomsta5432/groomsta

##### -

##### -

```
REDIS_HOST=redis
```
```
REDIS_HOST=redis
```
```
depends_on
```
```
depends_on
:
```
##### :

- - postgres postgres

##### -

##### -

```
redis
```
```
redis
```
```
restart
```
```
restart
:
```
##### :

```
unless
```
```
unless
```
-

##### -

```
stopped
```
```
stopped
```
```
postgres
```
```
postgres
:
```
##### :

```
image
```
```
image
:
```
##### :

```
postgres
```
```
postgres
:
```
##### :

##### 16

##### 16

##### -

##### -

```
alpine
```
```
alpine
```
volumesvolumes::

##### -

##### -

```
postgres_data
```
```
postgres_data
:
```
##### :

```
/var/lib/postgresql/data
```
```
/var/lib/postgresql/data
```
```
environment
```
```
environment
:
```
##### :

##### -

##### -

```
POSTGRES_DB=groomsta
```
```
POSTGRES_DB=groomsta
```
##### -

##### -

```
POSTGRES_USER=postgres
```
```
POSTGRES_USER=postgres
```
##### -

##### -

```
POSTGRES_PASSWORD=password
```
```
POSTGRES_PASSWORD=password
```
```
ports
```
```
ports
:
```
##### :

##### - - "5432:5432""5432:5432"

```
restart
```
```
restart
:
```
##### :

```
unless
```
```
unless
```
-

##### -

```
stopped
```
```
stopped
```
redisredis::

```
image
```
```
image
:
```
##### :

```
redis
```
```
redis
:
```
##### :

##### 7

##### 7

##### -

##### -

```
alpine
```
```
alpine
```
```
volumes
```
```
volumes
:
```
##### :

- - redis_data redis_data::/data/data

```
ports
```
```
ports
:
```
##### :

##### -

##### -

##### "6379:6379"

##### "6379:6379"

restartrestart:: unless unless--stoppedstopped

```
nginx
```
```
nginx
:
```
##### :

```
image
```
```
image
:
```
##### :

```
nginx
```
```
nginx
:
```
##### :

```
alpine
```
```
alpine
```
```
ports
```
```
ports
:
```
##### :

##### -

##### -

##### "80:80"

##### "80:80"

##### -

##### -

##### "443:443"

##### "443:443"

volumesvolumes::

##### -

##### -

```
./nginx.conf
```
```
./nginx.conf
:
```
##### :

```
/etc/nginx/nginx.conf
```
```
/etc/nginx/nginx.conf
```
##### -

##### -

```
./ssl
```
```
./ssl
:
```
##### :

```
/etc/nginx/ssl
```
```
/etc/nginx/ssl
```
depends_ondepends_on::


### 15.2 CI/CD Pipeline

##### -

##### -

```
api
```
```
api
```
```
restart
```
```
restart
:
```
##### :

```
unless
```
```
unless
```
-

##### -

```
stopped
```
```
stopped
```
```
volumes
```
```
volumes
:
```
##### :

```
postgres_data
```
```
postgres_data
:
```
##### :

```
redis_data redis_data::
```
```
yaml
```

_# .github/workflows/deploy# .github/workflows/deploy.yml.yml_

name

name
:

##### :

```
Deploy to Production
```
```
Deploy to Production
```
onon::

```
push
```
```
push
:
```
##### :

```
branches
```
```
branches
:
```
##### :

##### [

##### [

```
main
```
```
main
]
```
##### ]

jobs

jobs
:

##### :

```
test
```
```
test
:
```
##### :

```
runs-on
```
```
runs-on
:
```
##### :

```
ubuntu
```
```
ubuntu
```
-

##### -

```
latest
```
```
latest
```
stepssteps::

##### -

##### -

```
uses
```
```
uses
:
```
##### :

```
actions/checkout@v3
```
```
actions/checkout@v3
```
- - namename:: Setup Node.js Setup Node.js

```
uses
```
```
uses
:
```
##### :

```
actions/setup
```
```
actions/setup
```
-

##### -

```
node@v3
```
```
node@v3
```
```
with
```
```
with
:
```
##### :

node-versionnode-version:: '20''20'

##### -

##### -

```
name
```
```
name
:
```
##### :

```
Install dependencies
```
```
Install dependencies
```
runrun:: npm ci npm ci

##### -

##### -

```
name
```
```
name
:
```
##### :

```
Run tests
```
```
Run tests
```
```
run
```
```
run
:
```
##### :

```
npm test
```
```
npm test
```
##### -

##### -

```
name
```
```
name
:
```
##### :

```
Run linter
```
```
Run linter
```
```
run
```
```
run
:
```
##### :

```
npm run lint
```
```
npm run lint
```
```
build
```
```
build
:
```
##### :

```
needs
```
```
needs
:
```
##### :

```
test
```
```
test
```
runs-onruns-on:: ubuntu ubuntu--latestlatest

```
steps
```
```
steps
:
```
##### :

##### -

##### -

```
uses
```
```
uses
:
```
##### :

```
actions/checkout@v3
```
```
actions/checkout@v3
```
##### -

##### -

```
name
```
```
name
:
```
##### :

```
Build Docker image
```
```
Build Docker image
```
```
run
```
```
run
:
```
##### :

```
docker build
```
```
docker build
```
-

##### -

```
t groomsta
```
```
t groomsta
```
-

##### -

```
api
```
```
api
:
```
##### :

##### $

##### $

##### {

##### {

##### {

##### {

```
github.sha
```
```
github.sha
}
```
##### }

##### }

##### }

##### .

##### .

##### -

##### -

```
name
```
```
name
:
```
##### :

```
Push to Registry
```
```
Push to Registry
```
```
run
```
```
run
:
```
##### :

##### |

##### |

docker tag groomsta-api:${{ github.sha }} registry.example.com/groomsta-api:latest

docker tag groomsta-api:${{ github.sha }} registry.example.com/groomsta-api:latest

docker push registry.example.com/groomsta-api:latest

docker push registry.example.com/groomsta-api:latest

```
deploy
```
```
deploy
:
```
##### :

needsneeds:: build build

```
runs-on
```
```
runs-on
:
```
##### :

```
ubuntu
```
```
ubuntu
```
-

##### -

```
latest
```
```
latest
```
```
steps
```
```
steps
:
```
##### :

- - namename:: Deploy to Deploy to AWS ECSAWS ECS


### 15.3 Production Environment

## Document Summary

### This backend structure document provides a complete foundation for building Groomsta's backend system with:

### ✅ Scalable Architecture - Modular design ready for microservices migration

### ✅ Comprehensive Database Schema - 30+ tables with relationships and constraints

### ✅ RESTful API Design - 100+ endpoints across all modules

### ✅ Robust Authentication - JWT + OTP with role-based access control

### ✅ Real-time Communication - WebSocket for live updates

```
run
```
```
run
:
```
##### :

##### |

##### |

```
aws ecs update-service \
```
```
aws ecs update-service \
```
```
--cluster groomsta-cluster \ --cluster groomsta-cluster \
```
```
--service groomsta-api \
```
```
--service groomsta-api \
```
```
--force-new-deployment
```
```
--force-new-deployment
```
##### ┌─────────────────────────────────────────────────────────┐

##### ┌─────────────────────────────────────────────────────────┐

```
│ Route 53 (DNS) ││ Route 53 (DNS) │
```
##### └────────────────────┬────────────────────────────────────┘

##### └────────────────────┬────────────────────────────────────┘

##### │

##### │

##### ┌────────────────────▼────────────────────────────────────┐┌────────────────────▼────────────────────────────────────┐

```
│ CloudFront (CDN) │
```
```
│ CloudFront (CDN) │
```
##### └────────────────────┬────────────────────────────────────┘

##### └────────────────────┬────────────────────────────────────┘

##### │

##### │

##### ┌────────────────────▼────────────────────────────────────┐

##### ┌────────────────────▼────────────────────────────────────┐

```
│ Application Load Balancer (ALB) │
```
```
│ Application Load Balancer (ALB) │
```
##### └────────────┬───────────────────┬────────────────────────┘

##### └────────────┬───────────────────┬────────────────────────┘

##### │ ││ │

##### ┌────────▼────────┐ ┌─────▼──────────┐

##### ┌────────▼────────┐ ┌─────▼──────────┐

```
│ ECS Service │ │ ECS Service │
```
```
│ ECS Service │ │ ECS Service │
```
##### │ (API - │ (API - AZ1) │ │ (API - AZ1) │ │ (API - AZ2) │AZ2) │

##### └────────┬────────┘ └─────┬──────────┘

##### └────────┬────────┘ └─────┬──────────┘

##### │ │

##### │ │

##### └──────────┬────────┘└──────────┬────────┘

##### │

##### │

##### ┌───────────────┼───────────────┐

##### ┌───────────────┼───────────────┐

##### │ │ ││ │ │

##### ┌───────▼───────┐ ┌────▼────┐ ┌────────▼────────┐

##### ┌───────▼───────┐ ┌────▼────┐ ┌────────▼────────┐

```
│ RDS │ │ Elastic│ │ S3 │
```
```
│ RDS │ │ Elastic│ │ S3 │
```
```
│ PostgreSQL │ │ Cache │ │ (Storage) │
```
```
│ PostgreSQL │ │ Cache │ │ (Storage) │
```
```
│ (Multi-AZ) │ │ Redis │ │ │
```
```
│ (Multi-AZ) │ │ Redis │ │ │
```
##### └───────────────┘ └─────────┘ └─────────────────┘

##### └───────────────┘ └─────────┘ └─────────────────┘


### ✅ Payment Integration - Razorpay with wallet system

### ✅ Multi-channel Notifications - SMS, Email, WhatsApp, Push

### ✅ Automated Tasks - Cron jobs for payouts and reminders

### ✅ Security Best Practices - Rate limiting, validation, encryption

### ✅ Performance Optimization - Redis caching strategy

### ✅ Production-Ready - Docker, CI/CD, monitoring, logging

### Next Steps:

### 1. Set up development environment

### 2. Initialize NestJS project structure

### 3. Implement database migrations

### 4. Build authentication module

### 5. Develop core booking flow

### 6. Integrate payment gateway

### 7. Implement notification system

### 8. Deploy to staging environment

### Estimated Development Timeline: 12-16 weeks for MVP , 2) NOT NULL,


### );

### -- Booking Add-ons

### CREATE TABLE booking_addons (

### id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

### booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

### addon_id UUID REFERENCES service_addons(id),

### addon_name VARCHAR(255) NOT NULL,

### addon_price DECIMAL(10, 2) NOT NULL,

### quantity INT DEFAULT 1,

### );

```
-- Status
```
```
-- Status
```
```
status status VARCHAR(50) NOTVARCHAR(50) NOT NULL NULL DEFAULT 'pending', DEFAULT 'pending',
```
```
-- 'pending', 'partner_assigned', 'confirmed', 'on_the_way',
```
```
-- 'pending', 'partner_assigned', 'confirmed', 'on_the_way',
```
```
-- 'in_progress', 'completed', 'cancelled', 'refunded'
```
```
-- 'in_progress', 'completed', 'cancelled', 'refunded'
```
```
-- Timestamps
```
```
-- Timestamps
```
```
partner_assigned_at TIMESTAMP,
```
```
partner_assigned_at TIMESTAMP,
```
```
confirmed_at confirmed_at TIMESTTIMESTAMP,AMP,
```
```
started_at TIMESTAMP,
```
```
started_at TIMESTAMP,
```
```
completed_at TIMESTAMP,
```
```
completed_at TIMESTAMP,
```
```
cancelled_at TIMESTAMP,
```
```
cancelled_at TIMESTAMP,
```
```
-- Cancellation
```
```
-- Cancellation
```
```
cancelled_by VARCHAR(50), -- 'customer', 'partner', 'admin'
```
```
cancelled_by VARCHAR(50), -- 'customer', 'partner', 'admin'
```
```
cancellation_reason cancellation_reason TEXTTEXT,,
```
```
-- Notes
```
```
-- Notes
```
```
customer_notes customer_notes TEXTTEXT,,
```
```
partner_notes TEXT,
```
```
partner_notes TEXT,
```
```
admin_notes TEXT,
```
```
admin_notes TEXT,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
INDEX idx_bookings_user (user_id),
```
```
INDEX idx_bookings_user (user_id),
```
```
INDEX idx_bookings_partner (partner_id),
```
```
INDEX idx_bookings_partner (partner_id),
```
```
INDEX idx_bookings_date (booking_date),
```
```
INDEX idx_bookings_date (booking_date),
```
```
INDEX idx_bookings_status (status),
```
```
INDEX idx_bookings_status (status),
```
```
INDEX idx_bookings_number (booking_number)
```
```
INDEX idx_bookings_number (booking_number)
```
```
INDEX idx_booking_addons (booking_id)
```
```
INDEX idx_booking_addons (booking_id)
```

### -- Booking Requests (Job Assignment System)

### CREATE TABLE booking_requests (

### id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

### booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

### partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,

### );

### -- Booking Status History

### CREATE TABLE booking_status_history (

### id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

### booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,

### from_status VARCHAR(50),

### to_status VARCHAR(50) NOT NULL,

### changed_by_user_id UUID REFERENCES users(id),

### changed_by_partner_id UUID REFERENCES partners(id),

### changed_by_admin_id UUID REFERENCES admin_users(id),

### notes TEXT,

### created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

### );

```
-- Request Details
```
```
-- Request Details
```
```
request_status VARCHAR(50) NOT NULL DEFAULT 'sent',
```
```
request_status VARCHAR(50) NOT NULL DEFAULT 'sent',
```
```
-- 'sent', 'seen', 'accepted', 'rejected', 'expired'
```
```
-- 'sent', 'seen', 'accepted', 'rejected', 'expired'
```
```
sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
seen_at TIMESTAMP,
```
```
seen_at TIMESTAMP,
```
```
responded_at responded_at TIMESTTIMESTAMP,AMP,
```
```
expires_at TIMESTAMP NOT NULL, -- 20 seconds from sent_at
```
```
expires_at TIMESTAMP NOT NULL, -- 20 seconds from sent_at
```
```
-- Partner of-- Partner offerfer
```
```
offered_price DECIMAL(10, 2),
```
```
offered_price DECIMAL(10, 2),
```
```
-- Metadata-- Metadata
```
```
distance_km DECIMAL(5, 2),
```
```
distance_km DECIMAL(5, 2),
```
```
estimated_travel_time_minutes INT,
```
```
estimated_travel_time_minutes INT,
```
```
INDEX idx_booking_requests_booking (booking_id),
```
```
INDEX idx_booking_requests_booking (booking_id),
```
```
INDEX idx_booking_requests_partner (partner_id),
```
```
INDEX idx_booking_requests_partner (partner_id),
```
```
INDEX idx_booking_requests_status (request_status)
```
```
INDEX idx_booking_requests_status (request_status)
```
```
INDEX idx_status_history_booking (booking_id)
```
```
INDEX idx_status_history_booking (booking_id)
```

#### 3.1.6 Payments & #### 3.1.6 Payments & WalletWallet

```sql

```sql

-- Payments

-- Payments

CREACREATE TABLE payments (TE TABLE payments (

```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
booking_id UUID REFERENCES bookings(id),
```
```
booking_id UUID REFERENCES bookings(id),
```
user_id UUID REFERENCES users(id),user_id UUID REFERENCES users(id),

```
-- Payment Details
```
```
-- Payment Details
```
```
payment_type VARCHAR(50) NOT NULL, -- 'full', 'partial', 'post_service'
```
```
payment_type VARCHAR(50) NOT NULL, -- 'full', 'partial', 'post_service'
```
```
payment_method VARCHAR(50) NOT NULL, -- 'online', 'cash', 'wallet'
```
```
payment_method VARCHAR(50) NOT NULL, -- 'online', 'cash', 'wallet'
```
```
payment_stage VARCHAR(50) NOT NULL, -- 'advance', 'final'
```
```
payment_stage VARCHAR(50) NOT NULL, -- 'advance', 'final'
```
-- Amounts-- Amounts

```
amount DECIMAL(10, 2) NOT NULL,
```
```
amount DECIMAL(10, 2) NOT NULL,
```
```
wallet_amount_used DECIMAL(10, 2) DEFAULT 0.0,
```
```
wallet_amount_used DECIMAL(10, 2) DEFAULT 0.0,
```
gateway_amount DECIMAL(10, 2) DEFgateway_amount DECIMAL(10, 2) DEFAULT 0.0,AULT 0.0,

```
-- Gateway Info
```
```
-- Gateway Info
```
payment_gateway payment_gateway VARCHAR(50), -- 'razorpay', 'cash'VARCHAR(50), -- 'razorpay', 'cash'

```
gateway_transaction_id VARCHAR(255),
```
```
gateway_transaction_id VARCHAR(255),
```
```
gateway_order_id VARCHAR(255),
```
```
gateway_order_id VARCHAR(255),
```
gateway_payment_id gateway_payment_id VARCHAR(255),VARCHAR(255),

```
gateway_response JSONB,
```
```
gateway_response JSONB,
```
```
-- Status
```
```
-- Status
```
```
payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
```
```
payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
```
```
-- 'pending', 'processing', 'success', 'failed', 'refunded'
```
```
-- 'pending', 'processing', 'success', 'failed', 'refunded'
```
-- Timestamps-- Timestamps

```
initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
completed_at TIMESTAMP,
```
```
completed_at TIMESTAMP,
```
failed_at failed_at TIMESTTIMESTAMP,AMP,

```
failure_reason TEXT,
```
```
failure_reason TEXT,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
INDEX idx_payments_booking (booking_id),
```
```
INDEX idx_payments_booking (booking_id),
```
```
INDEX idx_payments_user (user_id),
```
```
INDEX idx_payments_user (user_id),
```
```
INDEX idx_payments_status (payment_status),
```
```
INDEX idx_payments_status (payment_status),
```
```
INDEX idx_payments_gateway_order (gateway_order_id)
```
```
INDEX idx_payments_gateway_order (gateway_order_id)
```
##### );

##### );


-- User Wallet

-- User Wallet

CREATE TABLE user_wallets (

CREATE TABLE user_wallets (

id UUID PRIMARid UUID PRIMARY KEYY KEY DEFAULT gen_random_uuid(), DEFAULT gen_random_uuid(),

```
user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
```
```
user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
```
```
balance DECIMAL(10, 2) DEFAULT 0.0,
```
```
balance DECIMAL(10, 2) DEFAULT 0.0,
```
total_credited DECIMAL(10, 2) DEFtotal_credited DECIMAL(10, 2) DEFAULT 0.0,AULT 0.0,

```
total_debited DECIMAL(10, 2) DEFAULT 0.0,
```
```
total_debited DECIMAL(10, 2) DEFAULT 0.0,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
updated_at updated_at TIMESTTIMESTAMP DEFAULT CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,AMP,

```
INDEX idx_wallet_user (user_id),
```
```
INDEX idx_wallet_user (user_id),
```
CHECK (balance >= 0)CHECK (balance >= 0)

##### );

##### );

-- Wallet Transactions

-- Wallet Transactions

CREATE TABLE wallet_transactions (

CREATE TABLE wallet_transactions (

```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
wallet_id UUID REFERENCES user_wallets(id) ON DELETE CASCADE,
```
```
wallet_id UUID REFERENCES user_wallets(id) ON DELETE CASCADE,
```
user_id UUID REFERENCES users(id),user_id UUID REFERENCES users(id),

```
-- Transaction Details
```
```
-- Transaction Details
```
transaction_type transaction_type VARCHAR(50) NOTVARCHAR(50) NOT NULL, NULL,

```
-- 'credit', 'debit', 'refund', 'referral', 'membership_discount'
```
```
-- 'credit', 'debit', 'refund', 'referral', 'membership_discount'
```
amount DECIMAL(10, 2) NOTamount DECIMAL(10, 2) NOT NULL, NULL,

```
balance_before DECIMAL(10, 2) NOT NULL,
```
```
balance_before DECIMAL(10, 2) NOT NULL,
```
```
balance_after DECIMAL(10, 2) NOT NULL,
```
```
balance_after DECIMAL(10, 2) NOT NULL,
```
```
-- References
```
```
-- References
```
```
booking_id UUID REFERENCES bookings(id),
```
```
booking_id UUID REFERENCES bookings(id),
```
```
payment_id UUID REFERENCES payments(id),
```
```
payment_id UUID REFERENCES payments(id),
```
```
referral_id UUID REFERENCES referrals(id),
```
```
referral_id UUID REFERENCES referrals(id),
```
```
description TEXT,
```
```
description TEXT,
```
metadata JSONB,metadata JSONB,

```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
```
```
INDEX idx_wallet_txn_wallet (wallet_id),
```
```
INDEX idx_wallet_txn_wallet (wallet_id),
```
```
INDEX idx_wallet_txn_user (user_id),
```
```
INDEX idx_wallet_txn_user (user_id),
```
INDEX idx_wallet_txn_type (transaction_type),INDEX idx_wallet_txn_type (transaction_type),

```
INDEX idx_wallet_txn_created (created_at DESC)
```
```
INDEX idx_wallet_txn_created (created_at DESC)
```
##### );

##### );

-- Refunds

-- Refunds

CREATE TABLE refunds (

CREATE TABLE refunds (

```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```

```
payment_id UUID REFERENCES payments(id),
```
```
payment_id UUID REFERENCES payments(id),
```
```
booking_id UUID REFERENCES bookings(id),
```
```
booking_id UUID REFERENCES bookings(id),
```
user_id UUID REFERENCES users(id),user_id UUID REFERENCES users(id),

```
refund_amount DECIMAL(10, 2) NOT NULL,
```
```
refund_amount DECIMAL(10, 2) NOT NULL,
```
refund_type refund_type VARCHAR(50) NOTVARCHAR(50) NOT NULL, -- 'full', 'partial' NULL, -- 'full', 'partial'

```
refund_method VARCHAR(50) NOT NULL, -- 'wallet', 'original_source'
```
```
refund_method VARCHAR(50) NOT NULL, -- 'wallet', 'original_source'
```
-- Gateway Info-- Gateway Info

```
gateway_refund_id VARCHAR(255),
```
```
gateway_refund_id VARCHAR(255),
```
```
gateway_response JSONB,
```
```
gateway_response JSONB,
```
```
refund_status VARCHAR(50) NOT NULL DEFAULT 'pending',
```
```
refund_status VARCHAR(50) NOT NULL DEFAULT 'pending',
```
```
-- 'pending', 'processing', 'completed', 'failed'
```
```
-- 'pending', 'processing', 'completed', 'failed'
```
```
reason TEXT,
```
```
reason TEXT,
```
```
initiated_by VARCHAR(50), -- 'customer', 'partner', 'admin', 'system'
```
```
initiated_by VARCHAR(50), -- 'customer', 'partner', 'admin', 'system'
```
initiated_at initiated_at TIMESTTIMESTAMP DEFAULT CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,AMP,

```
completed_at TIMESTAMP,
```
```
completed_at TIMESTAMP,
```
INDEX idx_refunds_payment (payment_id),INDEX idx_refunds_payment (payment_id),

```
INDEX idx_refunds_booking (booking_id),
```
```
INDEX idx_refunds_booking (booking_id),
```
```
INDEX idx_refunds_user (user_id)
```
```
INDEX idx_refunds_user (user_id)
```
##### ););

##### ```

##### ```

#### 3.1.7 Partner Payouts#### 3.1.7 Partner Payouts

```sql

```sql

-- Payout Batches

-- Payout Batches

CREATE TABLE payout_batches (

CREATE TABLE payout_batches (

```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
batch_number VARCHAR(50) UNIQUE NOT NULL, -- PAY-2024-W01
```
```
batch_number VARCHAR(50) UNIQUE NOT NULL, -- PAY-2024-W01
```
-- Period-- Period

```
period_start_date DATE NOT NULL,
```
```
period_start_date DATE NOT NULL,
```
```
period_end_date DATE NOT NULL,
```
```
period_end_date DATE NOT NULL,
```
```
-- Amounts
```
```
-- Amounts
```
```
total_partners INT NOT NULL,
```
```
total_partners INT NOT NULL,
```
total_gross_amount DECIMAL(12, 2) NOTtotal_gross_amount DECIMAL(12, 2) NOT NULL, NULL,

```
total_commission DECIMAL(12, 2) NOT NULL,
```
```
total_commission DECIMAL(12, 2) NOT NULL,
```
```
total_net_amount DECIMAL(12, 2) NOT NULL,
```
```
total_net_amount DECIMAL(12, 2) NOT NULL,
```
```
-- Status
```
```
-- Status
```
```
payout_status VARCHAR(50) NOT NULL DEFAULT 'pending',
```
```
payout_status VARCHAR(50) NOT NULL DEFAULT 'pending',
```
```
-- 'pending', 'processing', 'completed', 'failed', 'partially_completed'
```
```
-- 'pending', 'processing', 'completed', 'failed', 'partially_completed'
```

```
-- Processing
```
```
-- Processing
```
generated_at generated_at TIMESTTIMESTAMP DEFAULT CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,AMP,

```
processed_at TIMESTAMP,
```
```
processed_at TIMESTAMP,
```
```
processed_by UUID REFERENCES admin_users(id),
```
```
processed_by UUID REFERENCES admin_users(id),
```
```
notes TEXT,
```
```
notes TEXT,
```
INDEX idx_payout_batches_status (payout_status),INDEX idx_payout_batches_status (payout_status),

```
INDEX idx_payout_batches_period (period_start_date, period_end_date)
```
```
INDEX idx_payout_batches_period (period_start_date, period_end_date)
```
##### );

##### );

-- Individual Payouts

-- Individual Payouts

CREATE TABLE partner_payouts (

CREATE TABLE partner_payouts (

```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
```
```
payout_batch_id UUID REFERENCES payout_batches(id),
```
```
payout_batch_id UUID REFERENCES payout_batches(id),
```
```
partner_id UUID REFERENCES partners(id),
```
```
partner_id UUID REFERENCES partners(id),
```
-- Period-- Period

```
period_start_date DATE NOT NULL,
```
```
period_start_date DATE NOT NULL,
```
```
period_end_date DATE NOT NULL,
```
```
period_end_date DATE NOT NULL,
```
```
-- Amounts
```
```
-- Amounts
```
```
total_bookings INT NOT NULL,
```
```
total_bookings INT NOT NULL,
```
gross_earnings DECIMAL(10, 2) NOTgross_earnings DECIMAL(10, 2) NOT NULL, NULL,

```
commission_amount DECIMAL(10, 2) NOT NULL,
```
```
commission_amount DECIMAL(10, 2) NOT NULL,
```
```
commission_percent DECIMAL(5
```
```
commission_percent DECIMAL(5
```

