-- =============================================
-- 1. Performance Indexes
-- =============================================

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_bookings_partner_date ON bookings(partner_id, booking_date DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX IF NOT EXISTS idx_payouts_status_date ON payouts(status, created_at DESC);

-- GIN Indexes for Text Search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_services_search ON services USING gin(name gin_trgm_ops, description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_partners_search ON partners USING gin(full_name gin_trgm_ops, bio gin_trgm_ops);

-- Partial Indexes
CREATE INDEX IF NOT EXISTS idx_active_partners_location ON partners(latitude, longitude) 
WHERE is_active = true AND verification_status = 'verified' AND is_available = true;

-- =============================================
-- 2. Triggers & Business Logic
-- =============================================

-- Function: Auto-calculate Partner Rating
CREATE OR REPLACE FUNCTION update_partner_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE partners
    SET 
        average_rating = (
            SELECT COALESCE(AVG(overall_rating), 0)
            FROM reviews 
            WHERE partner_id = NEW.partner_id AND is_visible = true
        ),
        total_ratings = (
            SELECT COUNT(*)
            FROM reviews 
            WHERE partner_id = NEW.partner_id AND is_visible = true
        )
    WHERE id = NEW.partner_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update rating on new/changed review
DROP TRIGGER IF EXISTS trg_update_partner_rating ON reviews;
CREATE TRIGGER trg_update_partner_rating
AFTER INSERT OR UPDATE OF overall_rating, is_visible ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_partner_rating();


-- Function: Wallet Balance Validation
CREATE OR REPLACE FUNCTION validate_wallet_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- Only check for debits
    IF NEW.transaction_type = 'debit' THEN
        IF (SELECT balance FROM user_wallets WHERE user_id = NEW.user_id) < NEW.amount THEN
            RAISE EXCEPTION 'Insufficient wallet balance';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Validate before inserting transaction
-- Note: Assuming `wallet_transactions` table exists or mapped to specific logic.
-- This is a template trigger.


-- Function: Audit Logging
CREATE OR REPLACE FUNCTION log_sensitive_updates()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (id, entity_type, entity_id, action, old_values, new_values, created_at)
    VALUES (
        gen_random_uuid(),
        TG_TABLE_NAME,
        NEW.id,
        TG_OP,
        row_to_json(OLD),
        row_to_json(NEW),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Audit Partner Verification Changes
DROP TRIGGER IF EXISTS trg_audit_partner_status ON partners;
CREATE TRIGGER trg_audit_partner_status
AFTER UPDATE OF verification_status ON partners
FOR EACH ROW
WHEN (OLD.verification_status IS DISTINCT FROM NEW.verification_status)
EXECUTE FUNCTION log_sensitive_updates();
