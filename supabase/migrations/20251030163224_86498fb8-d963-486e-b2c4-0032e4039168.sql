-- CRITICAL SECURITY FIXES: Phase 2 (Simplified - No auto-hashing trigger)

-- Drop the problematic trigger and function completely
DROP TRIGGER IF EXISTS hash_admin_password_trigger ON public.admin_users;
DROP FUNCTION IF EXISTS public.hash_admin_password();
DROP FUNCTION IF EXISTS public.hash_password(text);

-- Enable pgcrypto for the admin_sessions table and functions that need it
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop ALL existing RLS policies on leads table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.leads;
DROP POLICY IF EXISTS "Allow public read access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin read access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin update access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admin delete access to leads" ON public.leads;
DROP POLICY IF EXISTS "Admin full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;

-- Add admin-only access policies for leads
CREATE POLICY "Admin full access to leads" 
ON public.leads 
FOR ALL 
USING (public.is_admin_user());

-- Public can only insert leads (contact form submissions)
CREATE POLICY "Public can submit leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Drop ALL existing RLS policies on admin_users table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow public read access to admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can read admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow users to update their own record" ON public.admin_users;

-- Recreate admin_users policies with proper security
CREATE POLICY "Admins can read all admin users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Admins can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (public.is_admin_user());

-- Create helper function to set session token
CREATE OR REPLACE FUNCTION public.set_session_token(token TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM set_config('app.current_session_token', token, false);
END;
$$;

-- Create table for tracking login attempts (rate limiting)
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address INET,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  successful BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time ON public.login_attempts(email, attempted_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time ON public.login_attempts(ip_address, attempted_at);

-- Enable RLS on login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Only admins can read login attempts
DROP POLICY IF EXISTS "Admins can read login attempts" ON public.login_attempts;
CREATE POLICY "Admins can read login attempts" 
ON public.login_attempts 
FOR SELECT 
USING (public.is_admin_user());

-- Function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_login_rate_limit(
  check_email TEXT,
  check_ip INET
)
RETURNS TABLE(
  is_limited BOOLEAN,
  attempts_count INTEGER,
  lockout_until TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_attempts INTEGER;
  failed_attempts INTEGER;
  last_attempt_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Count attempts in last 15 minutes
  SELECT COUNT(*)
  INTO recent_attempts
  FROM public.login_attempts
  WHERE email = check_email
  AND attempted_at > now() - INTERVAL '15 minutes';
  
  -- Count failed attempts in last hour
  SELECT COUNT(*), MAX(attempted_at)
  INTO failed_attempts, last_attempt_time
  FROM public.login_attempts
  WHERE email = check_email
  AND successful = false
  AND attempted_at > now() - INTERVAL '1 hour';
  
  -- Rate limit: max 5 attempts per 15 minutes or 10 failed per hour
  IF recent_attempts >= 5 THEN
    RETURN QUERY SELECT true, recent_attempts, (now() + INTERVAL '15 minutes')::TIMESTAMP WITH TIME ZONE;
  ELSIF failed_attempts >= 10 THEN
    RETURN QUERY SELECT true, failed_attempts, (last_attempt_time + INTERVAL '1 hour')::TIMESTAMP WITH TIME ZONE;
  ELSE
    RETURN QUERY SELECT false, recent_attempts, NULL::TIMESTAMP WITH TIME ZONE;
  END IF;
END;
$$;

-- Function to log login attempt
CREATE OR REPLACE FUNCTION public.log_login_attempt(
  attempt_email TEXT,
  attempt_ip INET,
  was_successful BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.login_attempts (email, ip_address, successful)
  VALUES (attempt_email, attempt_ip, was_successful);
  
  -- Clean up old attempts (older than 24 hours)
  DELETE FROM public.login_attempts
  WHERE attempted_at < now() - INTERVAL '24 hours';
END;
$$;

-- Remove all MD5-only users (force them to reset passwords)
UPDATE public.admin_users 
SET active = false,
    password_hash = 'RESET_REQUIRED_MD5_DEPRECATED'
WHERE bcrypt_password_hash IS NULL 
AND password_hash IS NOT NULL 
AND password_hash NOT IN ('RESET_REQUIRED', 'RESET_REQUIRED_MD5_DEPRECATED');