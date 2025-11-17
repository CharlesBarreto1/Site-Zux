-- Corrigir is_admin_user() para validar tokens de sessão corretamente
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  session_token TEXT;
  valid_session BOOLEAN;
BEGIN
  -- Obter o token da configuração de sessão
  session_token := current_setting('app.current_session_token', true);
  
  -- Se não houver token, acesso negado
  IF session_token IS NULL OR session_token = '' THEN
    RETURN false;
  END IF;
  
  -- Verificar se existe uma sessão válida e não expirada
  SELECT EXISTS(
    SELECT 1 
    FROM public.admin_sessions
    WHERE token = session_token
    AND expires_at > now()
  ) INTO valid_session;
  
  RETURN valid_session;
END;
$$;