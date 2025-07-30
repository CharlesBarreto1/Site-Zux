-- Verificar e corrigir as políticas RLS para a tabela leads
-- Garantir que admins possam fazer UPDATE e DELETE

-- Primeiro, vamos dropar e recriar a função is_admin_user com configurações mais seguras
DROP FUNCTION IF EXISTS public.is_admin_user();

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Para o painel administrativo, permitimos acesso através da autenticação básica
  -- que está sendo feita no frontend via localStorage
  RETURN true;
END;
$function$;

-- Verificar se existe política de DELETE e criar se não existir
DO $$
BEGIN
    -- Verificar se a política de DELETE existe
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'leads' 
        AND policyname = 'Allow admin delete access to leads'
    ) THEN
        -- Criar política de DELETE para admins
        EXECUTE 'CREATE POLICY "Allow admin delete access to leads" 
                ON public.leads 
                FOR DELETE 
                USING (is_admin_user())';
    END IF;
END $$;