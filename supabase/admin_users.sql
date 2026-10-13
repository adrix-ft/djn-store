-- ============================================================================
-- DJN TECH - ADMIN AUTHENTICATION TABLE & CREDENTIALS
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rudqiwifokllmjpfcnbp/sql
-- ============================================================================

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'superadmin',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow client app to read for credential verification
DROP POLICY IF EXISTS "Enable read access for admin authentication" ON public.admin_users;
CREATE POLICY "Enable read access for admin authentication" 
ON public.admin_users FOR SELECT 
USING (true);

-- Allow client app to update last_login and credentials
DROP POLICY IF EXISTS "Enable full access for admin users" ON public.admin_users;
CREATE POLICY "Enable full access for admin users" 
ON public.admin_users FOR ALL 
USING (true);

-- 4. Insert Default Admin Credentials
-- Username: admin
-- Password: DJNtech@2026
-- SHA-256 Hash of 'DJNtech@2026': d9fe582e7a47be0fdef8679f2a732521296a8aa2b266d07b78e6f0d469efd131
INSERT INTO public.admin_users (username, password_hash, role)
VALUES ('admin', 'd9fe582e7a47be0fdef8679f2a732521296a8aa2b266d07b78e6f0d469efd131', 'superadmin')
ON CONFLICT (username) DO UPDATE 
SET password_hash = EXCLUDED.password_hash,
    updated_at = NOW();
