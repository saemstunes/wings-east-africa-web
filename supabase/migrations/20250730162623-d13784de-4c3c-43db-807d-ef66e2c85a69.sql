-- Fix the search path warning for the generate_quote_number function
CREATE OR REPLACE FUNCTION public.generate_quote_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
BEGIN
  RETURN 'QT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('public.quote_number_seq')::TEXT, 4, '0');
END;
$$;