# Groomsta Security & Compliance Strategy
Based on Groomsta Cybersecurity Guidelines v1.0

## 1. Authentication Security
* **OTP Policies:** 5-minute expiry, max 3 attempts, hashed in DB (never plain text).
* **Session Management:** Refresh tokens stored in HTTPOnly cookies, 15-min access token life.

## 2. Payment Security (Fintech Standard)
* **Zero Trust:** Never trust client-side amounts. Always verify signature on backend.
* **Reconciliation:** Double-entry logging for all wallet transactions.
* **Data Minimization:** Never store CVV or full card numbers.

## 3. Financial Compliance (SOP)
* **Payout Audits:** All weekly payouts are generated via automated Cron jobs but require Admin Manual Review (see `payout_sop.md`).
* **Traceability:** Every wallet credit (Referral, Refund) references a specific Source ID.
* **Approval Limits:** Transfers > ₹50,000 require Secondary Authorization.

## 4. API Security
*   **Rate Limiting**: 100 requests per 15 minutes per IP.
*   **Headers**: HSTS enabled, X-Frame-Options DENY.
*   **Input Validation**: Zod-based validation for all incoming payloads.

## 5. Security Auditing & Incident Response (Week 4)
*   **Automated Audits**: `scripts/security-audit.ts` runs weekly to check for SQL Injection and Header vulnerabilities.
*   **Incident Response**: See [Playbook](../incident_response_playbook.md) for Sev-1/Sev-2 outage protocols.
*   **Penetration Testing**: Regular checks using OWASP ZAP guidelines.
