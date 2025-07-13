-- Create admin_users table for administrative access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users (only admins can manage admins)
CREATE POLICY "Admin users can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND active = true
  )
);

CREATE POLICY "Admin users can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND active = true
  )
);

-- Add cities table for the signup form
CREATE TABLE public.cities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for cities
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to cities" 
ON public.cities 
FOR SELECT 
USING (active = true);

-- Update leads table to include new fields
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS cpf TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS birth_date DATE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS second_phone TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS street_name TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS address_number TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS reference_point TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS selected_city TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS invoice_due_day INTEGER;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS preferred_installation_period TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS observations TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS lgpd_consent BOOLEAN DEFAULT false;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'contact';

-- Add trigger for admin_users timestamps
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial admin user (password will be hashed in the application)
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('charles@camponet.com.br', '$2b$10$placeholder', 'Charles');

-- Insert some sample cities
INSERT INTO public.cities (name, state) VALUES 
('Londrina', 'PR'),
('Maringá', 'PR'),
('Apucarana', 'PR'),
('Arapongas', 'PR'),
('Cambé', 'PR'),
('Rolândia', 'PR'),
('Ibiporã', 'PR'),
('Cornélio Procópio', 'PR');