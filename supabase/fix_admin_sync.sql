-- ============================================================================
-- DJN TECH - RESTORE ADMIN PANEL WRITE ACCESS IN SUPABASE
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/rudqiwifokllmjpfcnbp/sql)
-- ============================================================================

-- 1. PRODUCTS TABLE: Allow Admin Panel to Insert, Update, and Delete products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Enable full access for products" ON public.products;

CREATE POLICY "Enable full access for products" 
ON public.products 
FOR ALL 
USING (true) 
WITH CHECK (true);


-- 2. SITE CONFIG TABLE: Allow Admin Panel to update store info, banners & promo codes
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site config" ON public.site_config;
DROP POLICY IF EXISTS "Enable full access for site config" ON public.site_config;

CREATE POLICY "Enable full access for site config" 
ON public.site_config 
FOR ALL 
USING (true) 
WITH CHECK (true);


-- 3. ORDERS TABLE: Allow customer checkout and Admin Panel to update order statuses
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public can create and view orders" ON public.orders;
DROP POLICY IF EXISTS "Enable full access for orders" ON public.orders;

CREATE POLICY "Enable full access for orders" 
ON public.orders 
FOR ALL 
USING (true) 
WITH CHECK (true);


-- 4. ADMIN USERS TABLE: Allow Admin authentication check
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable full access for admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Enable read access for admin authentication" ON public.admin_users;
DROP POLICY IF EXISTS "Enable read for admin authentication" ON public.admin_users;

CREATE POLICY "Enable read for admin authentication" 
ON public.admin_users 
FOR SELECT 
USING (true);
