
-- Update product catalog with image URLs from public/product_catalog folder
-- Primary images (without number suffix)
UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Lister Petter Portable Diesel Generator.jpg'
WHERE name = 'Lister Petter Portable Diesel Generator';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Perkins 10kVA Diesel Generator.jpg'
WHERE name = 'Perkins 10kVA Diesel Generator';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Perkins 15kVA Diesel Generator.jpg'
WHERE name = 'Perkins 15kVA Diesel Generator';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Perkins 30kVA Heavy Duty Generator.jpg'
WHERE name = 'Perkins 30kVA Heavy Duty Generator';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Perkins 100kVA Industrial Generator.jpg'
WHERE name = 'Perkins 100kVA Industrial Generator';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Perkins 250kVA Heavy Industrial Generator.jpg'
WHERE name = 'Perkins 250kVA Heavy Industrial Generator';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Lister Petter TR2 Engine 3.jpg'
WHERE name = 'Lister Petter TR2 Engine';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Lister Petter LPW Series Engine.jpg'
WHERE name = 'Lister Petter LPW Series Engine';

-- Update spare parts
UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Starting Battery.jpg'
WHERE name = 'Starting Battery';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Digital Auto-Start Panel.jpg'
WHERE name = 'Digital Auto-Start Panel';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Deep Sea Electronics Control Panel.jpg'
WHERE name = 'Deep Sea Electronics Control Panel';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/ATS (Automatic Transfer Switch).jpg'
WHERE name = 'ATS (Automatic Transfer Switch)';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Steel Skid Frames.jpg'
WHERE name = 'Steel Skid Base';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Vibration Isolators.jpg'
WHERE name = 'Vibration Isolators';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Trailer Mounted System.jpg'
WHERE name = 'Trailer Mounting System';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Emergency-Stop-System.jpg'
WHERE name = 'Emergency Stop System';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Industrial Silencer.jpg'
WHERE name = 'Industrial Silencer';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Flexible-Exhaust-Connections.jpg'
WHERE name = 'Flexible Exhaust Connections';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Large Capacity Fuel Tank 2.png'
WHERE name = 'Large Capacity Fuel Tank';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Spin-on Oil Filter.jpg'
WHERE name = 'Spin-on Oil Filter';

UPDATE public.product_catalog 
SET primary_image_url = '/product_catalog/Fuel Filter Lister Petter.png'
WHERE name = 'Fuel System Filter';

-- Update additional images for products that have multiple versions
UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Lister Petter Portable Diesel Generator.jpg', '/product_catalog/Lister Petter Portable Diesel Generator 2.jpg']
WHERE name = 'Lister Petter Portable Diesel Generator';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Perkins 10kVA Diesel Generator.jpg', '/product_catalog/Perkins-10kVA-Diesel-Generator-2.jpg']
WHERE name = 'Perkins 10kVA Diesel Generator';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Perkins 100kVA Industrial Generator.jpg', '/product_catalog/Perkins 100kVA Industrial Generator 2.jpeg']
WHERE name = 'Perkins 100kVA Industrial Generator';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Perkins 250kVA Heavy Industrial Generator.jpg', '/product_catalog/Perkins 250kVA Heavy Industrial Generator 2.jpg', '/product_catalog/Perkins 250kVA Heavy Industrial Generator 3.jpg']
WHERE name = 'Perkins 250kVA Heavy Industrial Generator';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Lister Petter LPW Series Engine.jpg', '/product_catalog/Lister Petter LPW Engines 02.jpg', '/product_catalog/Lister Petter LPW3 Engine.jpg']
WHERE name = 'Lister Petter LPW Series Engine';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Starting Battery.jpg', '/product_catalog/Starting Battery 2.jpg']
WHERE name = 'Starting Battery';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Deep Sea Electronics Control Panel.jpg', '/product_catalog/Deep Sea Electronics Control Panel 2.jpg']
WHERE name = 'Deep Sea Electronics Control Panel';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/ATS (Automatic Transfer Switch).jpg', '/product_catalog/ATS (Automatic Transfer Switch) 2.jpg']
WHERE name = 'ATS (Automatic Transfer Switch)';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Emergency-Stop-System.jpg', '/product_catalog/Emergency Stop System 2.jpg']
WHERE name = 'Emergency Stop System';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Industrial Silencer.jpg', '/product_catalog/Industrial Silencer 2.jpg', '/product_catalog/Industrial Silencer.png']
WHERE name = 'Industrial Silencer';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Flexible-Exhaust-Connections.jpg', '/product_catalog/Flexible Exhaust Connections 2.jpg']
WHERE name = 'Flexible Exhaust Connections';

UPDATE public.product_catalog 
SET additional_images = ARRAY['/product_catalog/Spin-on Oil Filter.jpg', '/product_catalog/Spin-on Oil Filter 2.jpg', '/product_catalog/Spin-on-Oil-Filter-4.jpg']
WHERE name = 'Spin-on Oil Filter';
