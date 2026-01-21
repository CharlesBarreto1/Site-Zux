-- Add admin write policies for content tables that are missing them

-- site_content: Add admin full access policy
CREATE POLICY "Admins have full access to site_content"
ON public.site_content FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- banners: Add admin full access policy
CREATE POLICY "Admins have full access to banners"
ON public.banners FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- internet_plans: Add admin full access policy
CREATE POLICY "Admins have full access to internet_plans"
ON public.internet_plans FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- mobile_plans: Add admin full access policy
CREATE POLICY "Admins have full access to mobile_plans"
ON public.mobile_plans FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- testimonials: Add admin full access policy
CREATE POLICY "Admins have full access to testimonials"
ON public.testimonials FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- cities: Add admin full access policy
CREATE POLICY "Admins have full access to cities"
ON public.cities FOR ALL
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());