-- Phase 1: Critical Security Fixes (Corrected)

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

-- Make password_hash nullable to allow bcrypt-only authentication
ALTER TABLE public.admin_users ALTER COLUMN password_hash DROP NOT NULL;

-- Mark users with MD5 hashes for password reset (clear MD5 hashes)
UPDATE public.admin_users 
SET password_hash = 'RESET_REQUIRED'
WHERE bcrypt_password_hash IS NULL AND password_hash IS NOT NULL;

-- Add audit logging for admin sessions
CREATE OR REPLACE FUNCTION public.log_admin_session_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.admin_audit_log (
      admin_user_id,
      action,
      table_name,
      record_id,
      new_values,
      ip_address
    ) VALUES (
      NEW.admin_user_id,
      'SESSION_CREATED',
      'admin_sessions',
      NEW.id,
      jsonb_build_object(
        'expires_at', NEW.expires_at,
        'ip_address', NEW.ip_address
      ),
      NEW.ip_address
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.admin_audit_log (
      admin_user_id,
      action,
      table_name,
      record_id,
      old_values
    ) VALUES (
      OLD.admin_user_id,
      'SESSION_DELETED',
      'admin_sessions',
      OLD.id,
      jsonb_build_object(
        'expired_at', OLD.expires_at,
        'last_accessed', OLD.last_accessed_at
      )
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for session audit logging
CREATE TRIGGER admin_session_audit_trigger
AFTER INSERT OR DELETE ON public.admin_sessions
FOR EACH ROW
EXECUTE FUNCTION public.log_admin_session_activity();