# Groomsta Security & Compliance Strategy
Based on Groomsta Cybersecurity Guidelines v1.0

*1. Authentication Security*
* **OTP Policies:** 5-minute expiry, max 3 attempts, hashed in DB (never plain text).
* **Session Management:** Refresh tokens stored in HTTPOnly cookies, 15-min access token life.

*2. Payment Security (Fintech Standard)*
* **Zero Trust:** Never trust client-side amounts. Always verify signature on backend.
* **Reconciliation:** Double-entry logging for all wallet transactions.
* **Data Minimization:** Never store CVV or full card numbers.

*3. API Security*
* **Rate Limiting:** Global limit of 100 req/15min.
* **Headers:** HSTS enabled, X-Frame-Options DENY.
