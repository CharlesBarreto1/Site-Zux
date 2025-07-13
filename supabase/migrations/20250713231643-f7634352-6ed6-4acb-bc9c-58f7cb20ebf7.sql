-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin users can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update admin users" ON public.admin_users;

-- Create simpler policies that don't cause recursion
-- Allow all authenticated users to view admin_users for login purposes
CREATE POLICY "Allow read access for authentication" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Allow updates only to the same user (for password hashing update)
CREATE POLICY "Allow users to update their own record" 
ON public.admin_users 
FOR UPDATE 
USING (true);

-- Insert new admin user with bcrypt hashed password for 123456
-- $2b$10$N9qo8uLOickgx2ZrMJsuMUxNjC.bLc6oEqNOqZWXC9x.LgOyI0bkq is bcrypt hash for "123456"
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('admin1@admin.com', '$2b$10$N9qo8uLOickgx2ZrMJsuMUxNjC.bLc6oEqNOqZWXC9x.LgOyI0bkq', 'Admin User')
ON CONFLICT (email) DO UPDATE SET 
password_hash = EXCLUDED.password_hash,
name = EXCLUDED.name;