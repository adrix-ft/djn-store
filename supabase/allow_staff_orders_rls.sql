-- ============================================================================
-- FIX: ALLOW STAFF TO VIEW & MANAGE ORDERS IN SUPABASE ROW-LEVEL SECURITY (RLS)
-- Project: DJN Tech Gaming Store (rudqiwifokllmjpfcnbp.supabase.co)
-- 
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rudqiwifokllmjpfcnbp/sql
-- ============================================================================

-- 1. Helper function: Returns true if authenticated user is Staff, Admin, or Superadmin
CREATE OR REPLACE FUNCTION public.can_manage_orders()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE LOWER(email) = LOWER(auth.jwt() ->> 'email')
    AND role IN ('staff', 'admin', 'superadmin')
  );
$$;

GRANT EXECUTE ON FUNCTION public.can_manage_orders() TO anon, authenticated;

-- 2. Update orders table RLS policy: allow staff to view, update status, and manage orders
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Admins and staff can manage orders" ON public.orders;

CREATE POLICY "Admins and staff can manage orders" 
ON public.orders FOR ALL 
TO authenticated 
USING (public.can_manage_orders()) 
WITH CHECK (public.can_manage_orders());

-- 3. Allow staff to view and manage customer trade-in requests
DROP POLICY IF EXISTS "Admins can manage trade-in requests" ON public.trade_in_requests;
DROP POLICY IF EXISTS "Admins and staff can manage trade-in requests" ON public.trade_in_requests;

CREATE POLICY "Admins and staff can manage trade-in requests" 
ON public.trade_in_requests FOR ALL 
TO authenticated 
USING (public.can_manage_orders()) 
WITH CHECK (public.can_manage_orders());

-- 4. Allow staff to view and manage customer repair requests
DROP POLICY IF EXISTS "Admins can manage repair requests" ON public.repair_requests;
DROP POLICY IF EXISTS "Admins and staff can manage repair requests" ON public.repair_requests;

CREATE POLICY "Admins and staff can manage repair requests" 
ON public.repair_requests FOR ALL 
TO authenticated 
USING (public.can_manage_orders()) 
WITH CHECK (public.can_manage_orders());
