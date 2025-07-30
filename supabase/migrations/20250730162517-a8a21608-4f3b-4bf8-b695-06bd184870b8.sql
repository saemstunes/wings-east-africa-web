-- Phase 1: Critical Authentication Overhaul
-- Remove the insecure admin_credentials table and create a proper admin_users system

-- Drop the insecure admin_credentials table
DROP TABLE IF EXISTS public.admin_credentials;

-- Create a secure admin_users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_secret TEXT,
  backup_codes TEXT[],
  last_login_at TIMESTAMP WITH TIME ZONE,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_users
CREATE POLICY "Admin users can view their own record" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admin users can update their own record" 
ON public.admin_users 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Only allow system to insert admin users (not through API)
CREATE POLICY "System can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (false);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE user_id = auth.uid()
    AND locked_until IS NULL OR locked_until < now()
  );
$$;

-- Create function to handle admin login tracking
CREATE OR REPLACE FUNCTION public.track_admin_login()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

-- Create trigger for admin login tracking
CREATE TRIGGER on_admin_auth_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.track_admin_login();

-- Update existing policies to use the new is_admin function
-- Fix request_tracking policies
DROP POLICY IF EXISTS "Allow admin access to request tracking" ON public.request_tracking;
CREATE POLICY "Admin users can access request tracking" 
ON public.request_tracking 
FOR ALL 
USING (public.is_admin());

-- Fix request_status_history policies  
DROP POLICY IF EXISTS "Allow admin access to status history" ON public.request_status_history;
CREATE POLICY "Admin users can access status history" 
ON public.request_status_history 
FOR ALL 
USING (public.is_admin());

-- Update functions to use SECURITY DEFINER and proper search_path
CREATE OR REPLACE FUNCTION public.create_notification_on_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.notifications (type, title, message, related_id)
  VALUES (
    CASE 
      WHEN NEW.request_type = 'part_request' THEN 'part_request'
      ELSE 'contact_form'
    END,
    CASE 
      WHEN NEW.request_type = 'part_request' THEN 'New Part Request'
      ELSE 'New Contact Form Submission'
    END,
    'From: ' || NEW.name || ' (' || NEW.email || ') - Subject: ' || NEW.subject,
    NEW.id::TEXT
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_request_tracking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.request_tracking (
    contact_submission_id,
    status,
    priority,
    follow_up_date
  ) VALUES (
    NEW.id,
    'submitted',
    CASE 
      WHEN NEW.request_type = 'part_request' THEN 'high'
      ELSE 'normal'
    END,
    CURRENT_DATE + INTERVAL '3 days'
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.request_status_history (
      request_tracking_id,
      old_status,
      new_status,
      changed_by,
      notes
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      'system',
      'Status updated automatically'
    );
  END IF;
  
  NEW.status_updated_at = now();
  NEW.updated_at = now();
  
  RETURN NEW;
END;
$function$;