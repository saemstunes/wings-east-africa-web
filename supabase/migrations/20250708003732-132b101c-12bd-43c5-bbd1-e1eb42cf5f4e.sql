
-- Create the product_catalog storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product_catalog', 'product_catalog', true);

-- Create policy to allow public access to images
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'product_catalog');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'product_catalog' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update images
CREATE POLICY "Authenticated users can update images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'product_catalog' AND auth.role() = 'authenticated');
