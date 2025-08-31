-- Fix database functions security and add proper admin user management

-- Update existing functions to use SECURITY DEFINER and proper search_path
DROP FUNCTION IF EXISTS public.is_admin();
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE user_id = auth.uid()
    AND (locked_until IS NULL OR locked_until < now())
  );
$$;

-- Update track_admin_login function
DROP FUNCTION IF EXISTS public.track_admin_login();
CREATE OR REPLACE FUNCTION public.track_admin_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.admin_users 
  SET 
    last_login_at = now(),
    login_attempts = 0,
    locked_until = NULL,
    updated_at = now()
  WHERE user_id = NEW.id;
  
  -- Log admin login for security
  INSERT INTO public.notifications (type, title, message, related_id)
  VALUES (
    'admin_login',
    'Admin Dashboard Access',
    'Admin user logged in at ' || now()::text,
    'admin_login_' || NEW.id::text
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for admin logins
DROP TRIGGER IF EXISTS on_auth_admin_login ON auth.users;
CREATE TRIGGER on_auth_admin_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at AND NEW.last_sign_in_at IS NOT NULL)
  EXECUTE FUNCTION public.track_admin_login();

-- Clean up duplicate contact submission policies
DROP POLICY IF EXISTS "Allow anon insert for contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow inserts for anon users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow inserts for authenticated users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;

-- Create single, secure contact submission policy
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Restrict contact reading to authenticated users only
DROP POLICY IF EXISTS "Allow reading contact submissions" ON public.contact_submissions;
CREATE POLICY "Admin users can read contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Add rate limiting table for login attempts
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address inet NOT NULL,
  user_email text,
  attempt_time timestamp with time zone DEFAULT now(),
  success boolean DEFAULT false,
  user_agent text
);

-- Enable RLS on login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for login attempts (admin only)
CREATE POLICY "Admin can view login attempts"
ON public.login_attempts
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add function to check rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(user_email_input text, ip_input inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  recent_attempts integer;
BEGIN
  -- Count failed attempts in the last 15 minutes
  SELECT COUNT(*)
  INTO recent_attempts
  FROM public.login_attempts
  WHERE (user_email = user_email_input OR ip_address = ip_input)
    AND success = false
    AND attempt_time > (now() - interval '15 minutes');
  
  -- Allow if less than 5 attempts
  RETURN recent_attempts < 5;
END;
$$;

-- Add function to log login attempts
CREATE OR REPLACE FUNCTION public.log_login_attempt(
  user_email_input text, 
  ip_input inet, 
  success_input boolean,
  user_agent_input text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.login_attempts (user_email, ip_address, success, user_agent)
  VALUES (user_email_input, ip_input, success_input, user_agent_input);
END;
$$;