-- Fix rate limiting to use email-only limits (cannot be bypassed via IP spoofing)
CREATE OR REPLACE FUNCTION public.check_login_rate_limit(check_email text, check_ip inet)
 RETURNS TABLE(is_limited boolean, attempts_count integer, lockout_until timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
DECLARE
  email_attempts INTEGER;
  email_failed INTEGER;
  last_attempt_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Count all attempts by EMAIL ONLY (cannot be spoofed via IP header manipulation)
  SELECT COUNT(*)
  INTO email_attempts
  FROM public.login_attempts
  WHERE email = check_email
  AND attempted_at > now() - INTERVAL '15 minutes';
  
  -- Count failed attempts by email in last hour
  SELECT COUNT(*), MAX(attempted_at)
  INTO email_failed, last_attempt_time
  FROM public.login_attempts
  WHERE email = check_email
  AND successful = false
  AND attempted_at > now() - INTERVAL '1 hour';
  
  -- Strict email-based limits (cannot be bypassed via IP spoofing)
  -- Max 5 attempts per 15 minutes per email
  IF email_attempts >= 5 THEN
    RETURN QUERY SELECT true, email_attempts, 
      (now() + INTERVAL '15 minutes')::TIMESTAMP WITH TIME ZONE;
    RETURN;
  -- Max 10 failed attempts per hour per email
  ELSIF email_failed >= 10 THEN
    RETURN QUERY SELECT true, email_failed, 
      (last_attempt_time + INTERVAL '1 hour')::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;
  
  RETURN QUERY SELECT false, email_attempts, NULL::TIMESTAMP WITH TIME ZONE;
END;
$$;