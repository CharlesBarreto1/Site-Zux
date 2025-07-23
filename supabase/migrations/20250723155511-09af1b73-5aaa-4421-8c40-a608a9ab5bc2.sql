-- Create new admin user with simple credentials
-- Password: admin123 (bcrypt hash below)
INSERT INTO public.admin_users (email, password_hash, name, active) 
VALUES ('admin@zux.com.br', '$2b$10$Eq2r0n3lHtOxzG7Zx8ZKZ.Y5QYJfcQKo3z2QZRvVCJjFhQ8wZcSjK', 'Administrador', true)
ON CONFLICT (email) DO UPDATE SET 
password_hash = EXCLUDED.password_hash,
name = EXCLUDED.name,
active = EXCLUDED.active;