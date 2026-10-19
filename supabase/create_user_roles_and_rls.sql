-- ============================================================================
-- DJN TECH - USER ROLES & BULLETPROOF ROW-LEVEL SECURITY (RLS)
-- Project: DJN Tech Gaming Store (rudqiwifokllmjpfcnbp.supabase.co)
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rudqiwifokllmjpfcnbp/sql
-- ============================================================================

-- 1. Create USERS table to track accounts and assign roles
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin', 'superadmin')),
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes for fast RLS policy execution
CREATE INDEX IF NOT EXISTS idx_users_email_lower ON public.users (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);

-- 2. Seed Initial Admin Accounts (Pre-authorized emails)
INSERT INTO public.users (email, role, full_name)
VALUES 
    ('djntechofficial@gmail.com', 'superadmin', 'DJN Tech Official'),
    ('adrashyadav343@gmail.com', 'superadmin', 'DJN Admin'),
    ('adarshyadav343@gmail.com', 'superadmin', 'Adarsh Admin')
ON CONFLICT (email) DO UPDATE 
SET role = 'superadmin', updated_at = NOW();

-- 3. Security Definer Helper Functions
-- Uses SECURITY DEFINER to bypass RLS when checking permissions (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')
    AND role IN ('admin', 'superadmin')
  );
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COALESCE(
    (SELECT role FROM public.users WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email') LIMIT 1),
    'customer'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_current_user_role() TO anon, authenticated;

-- 4. Automatic sync when any user logs in via Supabase / Google OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    LOWER(NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture'),
    'customer'
  )
  ON CONFLICT (email) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url),
    updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. RLS POLICIES FOR USERS TABLE
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
CREATE POLICY "Users can read own profile" 
ON public.users FOR SELECT 
TO authenticated 
USING (LOWER(email) = LOWER(auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Admins can view and manage all users" ON public.users;
CREATE POLICY "Admins can view and manage all users" 
ON public.users FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

-- 6. RLS POLICIES FOR PRODUCTS TABLE
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Enable full access for products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Public can view catalog
CREATE POLICY "Public can view products" 
ON public.products FOR SELECT 
USING (true);

-- Only verified Admins can insert, update, or delete products
CREATE POLICY "Admins can manage products" 
ON public.products FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

-- 7. RLS POLICIES FOR SITE CONFIG TABLE
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site config" ON public.site_config;
DROP POLICY IF EXISTS "Enable full access for site config" ON public.site_config;
DROP POLICY IF EXISTS "Admins can manage site config" ON public.site_config;

-- Public can read store config
CREATE POLICY "Public can view site config" 
ON public.site_config FOR SELECT 
USING (true);

-- Only verified Admins can update store config
CREATE POLICY "Admins can manage site config" 
ON public.site_config FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

-- 8. RLS POLICIES FOR ORDERS TABLE
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public can create and view orders" ON public.orders;
DROP POLICY IF EXISTS "Enable full access for orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Anyone can place an order
CREATE POLICY "Public can insert orders" 
ON public.orders FOR INSERT 
WITH CHECK (true);

-- Customers can only read orders that match their email
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
TO authenticated 
USING (LOWER(customer_email) = LOWER(auth.jwt() ->> 'email'));

-- Admins can view, update, and manage all orders
CREATE POLICY "Admins can manage orders" 
ON public.orders FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

-- 9. RLS POLICIES FOR TRADE-IN & REPAIR REQUESTS
ALTER TABLE public.trade_in_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repair_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit trade-in requests" ON public.trade_in_requests;
DROP POLICY IF EXISTS "Admins can manage trade-in requests" ON public.trade_in_requests;

CREATE POLICY "Public can submit trade-in requests" 
ON public.trade_in_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage trade-in requests" 
ON public.trade_in_requests FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public can submit repair requests" ON public.repair_requests;
DROP POLICY IF EXISTS "Admins can manage repair requests" ON public.repair_requests;

CREATE POLICY "Public can submit repair requests" 
ON public.repair_requests FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage repair requests" 
ON public.repair_requests FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());
