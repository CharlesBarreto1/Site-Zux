-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Phase 1: Critical Security Fixes

-- Create admin sessions table for secure server-side session management
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- Enable RLS on admin sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create index for performance
CREATE INDEX idx_admin_sessions_token ON public.admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires ON public.admin_sessions(expires_at);

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.admin_sessions 
  WHERE expires_at <= now();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Update is_admin_user function to validate sessions properly
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  session_token TEXT;
  admin_exists BOOLEAN := FALSE;
BEGIN
  -- Get session token from setting
  session_token := current_setting('app.current_session_token', true);
  
  -- If no session token, return false
  IF session_token IS NULL OR session_token = '' THEN
    RETURN FALSE;
  END IF;
  
  -- Check if session exists, is valid, and belongs to active admin
  SELECT EXISTS(
    SELECT 1 
    FROM public.admin_sessions s
    JOIN public.admin_users u ON u.id = s.admin_user_id
    WHERE s.session_token = session_token
    AND s.expires_at > now()
    AND u.active = true
  ) INTO admin_exists;
  
  -- Update last accessed time if session is valid
  IF admin_exists THEN
    UPDATE public.admin_sessions 
    SET last_accessed_at = now()
    WHERE session_token = session_token;
  END IF;
  
  RETURN admin_exists;
END;
$$;

-- RLS policy for admin sessions (only accessible by admins with valid sessions)
CREATE POLICY "Admins can manage their own sessions" 
ON public.admin_sessions 
FOR ALL 
USING (admin_user_id = (
  SELECT admin_user_id 
  FROM public.admin_sessions 
  WHERE session_token = current_setting('app.current_session_token', true)
  AND expires_at > now()
));

-- Make password_hash nullable to allow bcrypt-only authentication
ALTER TABLE public.admin_users ALTER COLUMN password_hash DROP NOT NULL;

-- Mark users with MD5 hashes for password reset (clear MD5 hashes)
UPDATE public.admin_users 
SET password_hash = 'RESET_REQUIRED'
WHERE bcrypt_password_hash IS NULL AND password_hash IS NOT NULL;