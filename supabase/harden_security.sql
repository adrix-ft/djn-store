-- ============================================================================
-- DJN TECH - SECURITY HARDENING & ROW-LEVEL SECURITY (RLS) POLICIES
-- Project: DJN Tech Gaming Store (rudqiwifokllmjpfcnbp.supabase.co)
-- ============================================================================

-- 1. PRODUCTS TABLE: Public read-only; writes restricted
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable full access for products" ON public.products;
DROP POLICY IF EXISTS "Public can view products" ON public.products;

CREATE POLICY "Public can view products" 
ON public.products 
FOR SELECT 
USING (true);


-- 2. SITE CONFIG TABLE: Public read-only
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable full access for site config" ON public.site_config;
DROP POLICY IF EXISTS "Public can view site config" ON public.site_config;

CREATE POLICY "Public can view site config" 
ON public.site_config 
FOR SELECT 
USING (true);


-- 3. ORDERS TABLE: Public can only insert new orders; customer PII is protected
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can create and view orders" ON public.orders;
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;

CREATE POLICY "Public can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);


-- 4. ADMIN USERS TABLE: No public table access; queryable only by service_role or RPC
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable full access for admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Enable read access for admin authentication" ON public.admin_users;


-- 5. SECURE ADMIN AUTHENTICATION RPC (SECURITY DEFINER)
-- Allows checking credentials without exposing password hashes to the public
CREATE OR REPLACE FUNCTION public.verify_admin_login(p_username TEXT, p_hash TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user RECORD;
BEGIN
  SELECT id, username, role, password_hash INTO v_user
  FROM public.admin_users
  WHERE LOWER(username) = LOWER(TRIM(p_username));

  IF FOUND AND (v_user.password_hash = TRIM(p_hash)) THEN
    UPDATE public.admin_users SET last_login = NOW() WHERE id = v_user.id;
    RETURN jsonb_build_object(
      'success', true,
      'user', v_user.username,
      'role', v_user.role
    );
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_admin_login(TEXT, TEXT) TO anon, authenticated;
