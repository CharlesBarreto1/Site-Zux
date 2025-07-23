-- Update admin user with plain text password for testing
UPDATE public.admin_users 
SET password_hash = 'admin123' 
WHERE email = 'admin@zux.com.br';