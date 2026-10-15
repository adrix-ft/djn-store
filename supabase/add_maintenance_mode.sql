-- ============================================================================
-- DJN TECH - ADD MAINTENANCE MODE TO SITE_CONFIG
-- Run this in your Supabase SQL Editor if you want maintenance mode state
-- to be synchronized across remote database instances.
-- ============================================================================

ALTER TABLE public.site_config 
ADD COLUMN IF NOT EXISTS maintenance_mode BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS maintenance_headline TEXT DEFAULT 'Upgrading the Gaming Experience',
ADD COLUMN IF NOT EXISTS maintenance_message TEXT DEFAULT 'We are currently performing scheduled maintenance, optimizing server performance, and restocking our verified PlayStation & Xbox inventory. We will be back online shortly!',
ADD COLUMN IF NOT EXISTS maintenance_estimated_return TEXT DEFAULT 'Back Today at 6:00 PM IST',
ADD COLUMN IF NOT EXISTS standard_shipping_fee NUMERIC DEFAULT 99;
