
-- Create a comprehensive products table
CREATE TABLE IF NOT EXISTS public.product_catalog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT,
  category TEXT NOT NULL CHECK (category IN ('generators', 'engines', 'parts', 'accessories')),
  subcategory TEXT,
  
  -- Power specifications
  power_kva NUMERIC,
  power_kw NUMERIC,
  
  -- Engine specifications
  engine_brand TEXT,
  engine_model TEXT,
  engine_type TEXT,
  cylinders INTEGER,
  cooling_type TEXT,
  starting_type TEXT,
  fuel_type TEXT,
  
  -- Electrical specifications
  voltage TEXT,
  frequency TEXT,
  rpm TEXT,
  phase_type TEXT,
  
  -- Physical specifications
  mounting_type TEXT,
  weight_kg NUMERIC,
  dimensions TEXT,
  
  -- Features and descriptions
  key_features TEXT[],
  short_description TEXT,
  full_description TEXT,
  applications TEXT[],
  
  -- Maintenance and service
  service_interval_hours INTEGER,
  maintenance_notes TEXT,
  
  -- Compatibility
  compatible_with TEXT[],
  
  -- Pricing and availability
  price NUMERIC,
  currency TEXT DEFAULT 'USD',
  stock_quantity INTEGER DEFAULT 0,
  
  -- Images and media
  primary_image_url TEXT,
  additional_images TEXT[],
  
  -- Meta information
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table for maintenance and repair services
CREATE TABLE IF NOT EXISTS public.service_catalog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('maintenance', 'repair', 'installation', 'commissioning', 'rental', 'consultation')),
  service_type TEXT NOT NULL,
  
  -- Service specifications
  description TEXT NOT NULL,
  duration_hours NUMERIC,
  frequency TEXT, -- 'one-time', 'recurring', 'on-demand'
  interval_hours INTEGER, -- for recurring services
  
  -- Compatibility
  applicable_products TEXT[], -- product categories or specific models
  equipment_brands TEXT[],
  
  -- Pricing
  base_price NUMERIC,
  price_type TEXT CHECK (price_type IN ('fixed', 'hourly', 'per_unit', 'quote_based')),
  currency TEXT DEFAULT 'USD',
  
  -- Service details
  requirements TEXT[],
  included_items TEXT[],
  tools_required TEXT[],
  parts_included BOOLEAN DEFAULT false,
  
  -- Scheduling
  advance_notice_days INTEGER DEFAULT 1,
  available_locations TEXT[],
  mobile_service BOOLEAN DEFAULT true,
  
  -- Meta information
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product-service relationships table
CREATE TABLE IF NOT EXISTS public.product_service_relations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.product_catalog(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.service_catalog(id) ON DELETE CASCADE,
  is_recommended BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, service_id)
);

-- Add RLS policies for product catalog
ALTER TABLE public.product_catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to product catalog" 
  ON public.product_catalog 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin full access to product catalog" 
  ON public.product_catalog 
  FOR ALL 
  USING (true);

-- Add RLS policies for service catalog
ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to service catalog" 
  ON public.service_catalog 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin full access to service catalog" 
  ON public.service_catalog 
  FOR ALL 
  USING (true);

-- Add RLS policies for product-service relations
ALTER TABLE public.product_service_relations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to product service relations" 
  ON public.product_service_relations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin full access to product service relations" 
  ON public.product_service_relations 
  FOR ALL 
  USING (true);

-- Insert generator products
INSERT INTO public.product_catalog (
  name, brand, model, category, subcategory, power_kva, power_kw, engine_brand, engine_model,
  cooling_type, starting_type, fuel_type, voltage, frequency, rpm, phase_type, mounting_type,
  key_features, short_description, full_description, applications, service_interval_hours
) VALUES 
(
  'Lister Petter Portable Diesel Generator', 'Lister Petter', 'LP-4.5-7.5', 'generators', 'portable',
  6.25, 5.0, 'Lister Petter', 'TR2', 'Air-cooled', 'Key start', 'Diesel', '240V', '50Hz', '1500', 'Single-phase', 'Portable',
  ARRAY['Super silent operation', 'Portable design', 'Air-cooled engine', 'Key start system'],
  'Portable diesel generator with super silent operation',
  'Compact and portable diesel generator featuring Lister Petter TR2 engine with super silent operation. Perfect for applications requiring reliable portable power.',
  ARRAY['Construction sites', 'Events', 'Emergency backup', 'Remote locations'],
  250
),
(
  'Perkins 10kVA Diesel Generator', 'Perkins', 'PK-10', 'generators', 'stationary',
  10, 10, 'Perkins', 'L51122U', 'Water-cooled', 'Battery start', 'Diesel', '240V', '50Hz', '1500', 'Single-phase', 'Trailer-mounted',
  ARRAY['Digital auto-start panel', 'Battery charging alternator', 'Steel skid base with vibration isolators', 'Emergency stop', '3-pole MCB'],
  'Medium power diesel generator with digital controls',
  'Reliable 10kVA diesel generator featuring Perkins L51122U engine with digital auto-start panel, battery charging alternator, and comprehensive safety features. Maximum ambient temperature rating of 50°C.',
  ARRAY['Construction sites', 'Events', 'Emergency backup', 'Small businesses'],
  500
),
(
  'Perkins 15kVA Diesel Generator', 'Perkins', 'PK-15', 'generators', 'stationary',
  15, 12, 'Perkins', 'Unknown', 'Water-cooled', 'Battery start', 'Diesel', '415V', '50Hz', '1500', 'Three-phase', 'Steel skid base',
  ARRAY['Digital auto-start panel', 'Main-line circuit breaker', 'Battery rack', 'Lifting points', 'Vibration isolators', 'Emergency stop', 'Silent operation'],
  'Commercial grade diesel generator with silent operation',
  'Professional 15kVA diesel generator with Perkins engine featuring digital controls, comprehensive safety systems, and silent operation. Available in both stationary and trailer-mounted configurations.',
  ARRAY['Commercial buildings', 'Offices', 'Small factories', 'Healthcare facilities'],
  500
),
(
  'Perkins 30kVA Heavy Duty Generator', 'Perkins', 'PK-30', 'generators', 'heavy-duty',
  30, 24, 'Perkins', '1103A-33G1', 'Water-cooled', 'Electric start', 'Diesel', '415V', '50Hz', '1500', 'Three-phase', 'Fixed installation',
  ARRAY['Ultra-quiet operation', 'Fuel-efficient design', 'Heavy-duty construction', 'Industrial grade components', '180L fuel capacity'],
  'Ultra-quiet, fuel-efficient heavy-duty generator',
  'Industrial-grade 30kVA diesel generator delivering exceptional performance with automatic backup reliability. Features Perkins 1103A-33G1 engine with 180L fuel capacity, designed for continuous operation in demanding environments.',
  ARRAY['Schools', 'Businesses', 'Hospitals', 'Industrial facilities', 'Data centers'],
  500
),
(
  'Perkins 100kVA Industrial Generator', 'Perkins', 'PK-100', 'generators', 'industrial',
  100, 80, 'Perkins', 'Unknown', 'Water-cooled', 'Electric start', 'Diesel', '415V', '50Hz', '1500-1800', 'Three-phase', 'Fixed installation',
  ARRAY['ATS (Automatic Transfer Switch)', 'Weatherproof and acoustic enclosure', 'Digital control panel (Deep Sea Electronics)', 'Main line breaker', 'Brushless alternators', '500-550L fuel tank'],
  'High-capacity industrial generator with advanced controls',
  'Professional 100kVA industrial diesel generator with prime power rating of 80kW and standby rating up to 88kW. Features automatic transfer switch, weatherproof acoustic enclosure, and Deep Sea Electronics control panel. Fuel tank capacity of 500-550 liters provides several hours of operation at full load.',
  ARRAY['Factories', 'Hospitals', 'Data centers', 'Commercial complexes', 'Critical infrastructure'],
  750
),
(
  'Perkins 250kVA Heavy Industrial Generator', 'Perkins', 'PK-250', 'generators', 'heavy-industrial',
  250, 200, 'Perkins', '1506 Series', 'Water-cooled', '12/24V DC electric start', 'Diesel', '115-400V', '50Hz', '1500', 'AC three-phase', 'Fixed installation',
  ARRAY['Heavy-duty steel base frame', 'Built-in fuel tank', 'FG Wilson FG100 control panel', 'Circuit breaker', 'Industrial silencer', 'Flexible exhaust connections'],
  'Heavy-duty industrial generator for critical applications',
  'Premium 250kVA industrial diesel generator with Perkins 1506 series engine. Prime rating of 230kVA/184kW and standby rating of 250kVA/200kW. Features FG Wilson FG100 control panel, heavy-duty construction, and comprehensive industrial-grade components.',
  ARRAY['Manufacturing plants', 'Large hospitals', 'Data centers', 'Mining operations', 'Marine applications'],
  1000
);

-- Insert engine products
INSERT INTO public.product_catalog (
  name, brand, model, category, subcategory, engine_type, cylinders, cooling_type, starting_type, fuel_type,
  key_features, short_description, full_description, applications, service_interval_hours, maintenance_notes
) VALUES 
(
  'Lister Petter TR2 Engine', 'Lister Petter', 'TR2', 'engines', 'air-cooled',
  'Air-cooled direct injection', 3, 'Air-cooled', 'Electric start (hand start option)', 'Diesel (biodiesel up to 20%)',
  ARRAY['Naturally aspirated', 'Self-bleeding fuel system with filter', 'Mechanical governor', 'Self-regulating plunger-type oil pump', 'Spin-on oil filter', 'Deep crankcase and cylinder cooling fins'],
  'Reliable air-cooled diesel engine for various applications',
  'Robust air-cooled direct injection diesel engine available in 1, 2, or 3 cylinder configurations. Features biodiesel compatibility up to 20% (ASTM D6751 and EN14214 compliant), self-bleeding fuel system, and can be left unmanned for long periods. Reaches efficient operating temperature swiftly with deep crankcase and cylinder cooling fins.',
  ARRAY['Generators', 'Water pumps', 'Agricultural equipment', 'Construction equipment', 'Marine applications'],
  250,
  '250-hour intervals between oil and filter changes (dependent on operating conditions). Self-regulating oil system with spin-on filter.'
),
(
  'Lister Petter LPW Series Engine', 'Lister Petter', 'LPW', 'engines', 'water-cooled',
  'Water-cooled diesel', 4, 'Water-cooled', 'Electric start', 'Diesel',
  ARRAY['Known for durability and reliability', 'Some models with turbocharging', 'Easy maintenance', 'Multiple cylinder configurations', 'Designed for unregulated emissions territories'],
  'Durable water-cooled diesel engine series',
  'Professional water-cooled diesel engine series available in 2, 3, and 4-cylinder models. Known for exceptional durability, reliability, and ease of maintenance. Some models feature turbocharging for enhanced performance. Designed specifically for unregulated emissions territories with service intervals up to 500 hours.',
  ARRAY['Generators', 'Industrial pumps', 'Construction equipment', 'Marine applications', 'Stationary power units'],
  500,
  'Service intervals up to 500 hours. Known for easy maintenance and long-term reliability.'
);

-- Insert spare parts and accessories
INSERT INTO public.product_catalog (
  name, brand, category, subcategory, short_description, full_description, compatible_with, applications
) VALUES 
-- Electrical parts
('Starting Battery', 'Universal', 'parts', 'electrical', 'Starting battery for generator sets', 'High-quality starting battery designed for reliable generator starting in all weather conditions.', ARRAY['All battery start generators'], ARRAY['Generator starting systems']),
('Battery Charging Alternator', 'Perkins', 'parts', 'electrical', 'Battery charging alternator system', 'Integrated battery charging alternator system for maintaining battery charge during generator operation.', ARRAY['Perkins generators'], ARRAY['Battery maintenance systems']),
('Digital Auto-Start Panel', 'Perkins', 'parts', 'electrical', 'Automatic start control panel', 'Advanced digital control panel providing automatic start/stop functionality with comprehensive monitoring.', ARRAY['Perkins generators'], ARRAY['Automatic generator control']),
('Deep Sea Electronics Control Panel', 'Deep Sea Electronics', 'parts', 'electrical', 'Advanced digital control system', 'Professional-grade digital control panel with advanced monitoring, protection, and control features.', ARRAY['Perkins 100kVA'], ARRAY['Industrial generator control']),
('ATS (Automatic Transfer Switch)', 'Universal', 'parts', 'electrical', 'Automatic power transfer system', 'Automatic transfer switch for seamless switching between mains and generator power supply.', ARRAY['Perkins 100kVA'], ARRAY['Power transfer automation']),

-- Mechanical parts
('Steel Skid Base', 'Universal', 'parts', 'mechanical', 'Mounting base with lifting points', 'Heavy-duty steel skid base with integrated lifting points and vibration isolation mounting.', ARRAY['Perkins generators'], ARRAY['Generator mounting']),
('Vibration Isolators', 'Universal', 'parts', 'mechanical', 'Engine/generator mount isolation', 'Professional vibration isolation mounts to reduce noise and vibration transmission.', ARRAY['Perkins generators'], ARRAY['Vibration control']),
('Trailer Mounting System', 'Universal', 'parts', 'mechanical', 'Mobile mounting solution', 'Complete trailer mounting system for portable generator applications with road-worthy compliance.', ARRAY['Portable generators'], ARRAY['Mobile power solutions']),

-- Safety equipment
('Emergency Stop System', 'Universal', 'parts', 'safety', 'Safety shutdown mechanism', 'Comprehensive emergency stop system with manual override and remote shutdown capabilities.', ARRAY['All generators'], ARRAY['Safety systems']),

-- Exhaust systems
('Industrial Silencer', 'Universal', 'parts', 'exhaust', 'Noise reduction system', 'Heavy-duty industrial silencer designed for maximum noise reduction in industrial applications.', ARRAY['Perkins 250kVA'], ARRAY['Noise control']),
('Flexible Exhaust Connections', 'Universal', 'parts', 'exhaust', 'Flexible exhaust coupling', 'Flexible exhaust connection system to accommodate thermal expansion and vibration.', ARRAY['Perkins 250kVA'], ARRAY['Exhaust systems']),

-- Fuel systems
('Large Capacity Fuel Tank', 'Universal', 'parts', 'fuel', 'Large capacity fuel storage', 'Professional fuel tank system with 500-550L capacity, including level monitoring and safety features.', ARRAY['Perkins 100kVA'], ARRAY['Fuel storage']),
('Spin-on Oil Filter', 'Lister Petter', 'parts', 'filtration', 'Oil filtration system', 'High-quality spin-on oil filter designed for Lister Petter TR2 engines with superior filtration.', ARRAY['Lister Petter TR2'], ARRAY['Engine maintenance']),
('Fuel System Filter', 'Lister Petter', 'parts', 'filtration', 'Fuel filtration component', 'Precision fuel filter for Lister Petter TR2 self-bleeding fuel system.', ARRAY['Lister Petter TR2'], ARRAY['Fuel system maintenance']);

-- Insert service offerings
INSERT INTO public.service_catalog (
  name, category, service_type, description, duration_hours, frequency, interval_hours,
  applicable_products, equipment_brands, base_price, price_type, requirements, included_items, mobile_service
) VALUES 
(
  'Routine Generator Maintenance', 'maintenance', 'preventive', 
  'Comprehensive routine maintenance including oil changes, filter replacements, battery checks, cooling system inspection, and performance testing.',
  4, 'recurring', 250,
  ARRAY['generators'], ARRAY['Perkins', 'Lister Petter', 'Cummins'],
  350, 'fixed',
  ARRAY['Access to generator', 'Power shutdown capability', 'Clear workspace'],
  ARRAY['Oil change', 'Filter replacements', 'Battery service', 'Cooling system check', 'Performance report'],
  true
),
(
  'Engine Overhaul Service', 'maintenance', 'major', 
  'Complete engine overhaul including cylinder inspection, piston replacement, valve service, fuel system overhaul, and comprehensive testing.',
  24, 'on-demand', null,
  ARRAY['engines', 'generators'], ARRAY['Perkins', 'Lister Petter'],
  2500, 'quote_based',
  ARRAY['Equipment removal capability', 'Workshop access or on-site preparation'],
  ARRAY['Complete disassembly', 'Parts inspection', 'Component replacement', 'Reassembly', 'Testing', 'Warranty'],
  false
),
(
  'Emergency Repair Service', 'repair', 'emergency', 
  '24/7 emergency repair service for critical generator and engine failures with rapid response time.',
  2, 'on-demand', null,
  ARRAY['generators', 'engines'], ARRAY['Perkins', 'Lister Petter', 'Cummins'],
  150, 'hourly',
  ARRAY['Emergency access', 'Safety clearance'],
  ARRAY['Diagnosis', 'Temporary repairs', 'Parts sourcing', 'Follow-up service'],
  true
),
(
  'Generator Installation & Commissioning', 'installation', 'setup', 
  'Professional generator installation including site preparation, mechanical installation, electrical connections, fuel system setup, and commissioning.',
  8, 'one-time', null,
  ARRAY['generators'], ARRAY['Perkins', 'Lister Petter', 'Cummins'],
  800, 'fixed',
  ARRAY['Prepared foundation', 'Electrical infrastructure', 'Fuel supply', 'Permits'],
  ARRAY['Mechanical installation', 'Electrical connections', 'Fuel system setup', 'Testing', 'Training', 'Documentation'],
  true
),
(
  'Equipment Rental Service', 'rental', 'temporary', 
  'Flexible generator rental from 5kVA to 500kVA with delivery, setup, maintenance, and technical support throughout rental period.',
  1, 'recurring', 168,
  ARRAY['generators'], ARRAY['Perkins', 'Lister Petter', 'Cummins'],
  200, 'per_unit',
  ARRAY['Site access', 'Fuel supply', 'Basic electrical infrastructure'],
  ARRAY['Equipment delivery', 'Installation', 'Fuel', 'Maintenance', 'Technical support', 'Collection'],
  true
),
(
  'Annual Service Contract', 'maintenance', 'contract', 
  'Comprehensive annual service contract including scheduled maintenance, priority emergency service, parts discount, and performance monitoring.',
  0, 'recurring', 2920,
  ARRAY['generators', 'engines'], ARRAY['Perkins', 'Lister Petter', 'Cummins'],
  1200, 'fixed',
  ARRAY['Service agreement', 'Equipment registration', 'Access arrangements'],
  ARRAY['Scheduled maintenance', 'Priority service', 'Parts discount', 'Performance reports', '24/7 support'],
  true
);
