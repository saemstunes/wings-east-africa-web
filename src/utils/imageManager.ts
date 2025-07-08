
import { supabase } from '@/integrations/supabase/client';

export interface ImageConfig {
  useLocalImages: boolean;
  bucketName: string;
}

// Configuration - toggle this to switch between local and Supabase images
export const imageConfig: ImageConfig = {
  useLocalImages: true, // Set to false to use Supabase storage
  bucketName: 'product_catalog'
};

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder.svg';
  
  // Handle absolute URLs (external images)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Clean the path - remove leading slash and product_catalog prefix if present
  let cleanPath = path.replace(/^\/+/, ''); // Remove leading slashes
  if (cleanPath.startsWith('product_catalog/')) {
    cleanPath = cleanPath.replace('product_catalog/', '');
  }
  
  if (imageConfig.useLocalImages) {
    // Use local images from public folder
    return `/product_catalog/${cleanPath}`;
  } else {
    // Use Supabase storage
    const { data } = supabase.storage
      .from(imageConfig.bucketName)
      .getPublicUrl(cleanPath);
    return data.publicUrl;
  }
};

export const uploadImageToSupabase = async (file: File, fileName: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(imageConfig.bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    return data.path;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const syncLocalImagesToSupabase = async (): Promise<{ success: number; failed: string[] }> => {
  const results = { success: 0, failed: [] as string[] };
  
  // List of all product images that should be uploaded
  const imageFiles = [
    'Lister Petter Portable Diesel Generator.jpg',
    'Lister Petter Portable Diesel Generator 2.jpg',
    'Perkins 10kVA Diesel Generator.jpg',
    'Perkins-10kVA-Diesel-Generator-2.jpg',
    'Perkins 15kVA Diesel Generator.jpg',
    'Perkins 30kVA Heavy Duty Generator.jpg',
    'Perkins 100kVA Industrial Generator.jpg',
    'Perkins 100kVA Industrial Generator 2.jpeg',
    'Perkins 250kVA Heavy Industrial Generator.jpg',
    'Perkins 250kVA Heavy Industrial Generator 2.jpg',
    'Perkins 250kVA Heavy Industrial Generator 3.jpg',
    'Lister Petter TR2 Engine 3.jpg',
    'Lister Petter LPW Series Engine.jpg',
    'Lister Petter LPW Engines 02.jpg',
    'Lister Petter LPW3 Engine.jpg',
    'Starting Battery.jpg',
    'Starting Battery 2.jpg',
    'Digital Auto-Start Panel.jpg',
    'Deep Sea Electronics Control Panel.jpg',
    'Deep Sea Electronics Control Panel 2.jpg',
    'ATS (Automatic Transfer Switch).jpg',
    'ATS (Automatic Transfer Switch) 2.jpg',
    'Steel Skid Frames.jpg',
    'Vibration Isolators.jpg',
    'Trailer Mounted System.jpg',
    'Emergency-Stop-System.jpg',
    'Emergency Stop System 2.jpg',
    'Industrial Silencer.jpg',
    'Industrial Silencer 2.jpg',
    'Industrial Silencer.png',
    'Flexible-Exhaust-Connections.jpg',
    'Flexible Exhaust Connections 2.jpg',
    'Large Capacity Fuel Tank 2.png',
    'Spin-on Oil Filter.jpg',
    'Spin-on Oil Filter 2.jpg',
    'Spin-on-Oil-Filter-4.jpg',
    'Fuel Filter Lister Petter.png'
  ];

  for (const fileName of imageFiles) {
    try {
      // Try to fetch the local image
      const response = await fetch(`/product_catalog/${fileName}`);
      if (response.ok) {
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });
        
        const uploadResult = await uploadImageToSupabase(file, fileName);
        if (uploadResult) {
          results.success++;
          console.log(`✅ Uploaded: ${fileName}`);
        } else {
          results.failed.push(fileName);
          console.error(`❌ Failed to upload: ${fileName}`);
        }
      } else {
        results.failed.push(fileName);
        console.error(`❌ Could not fetch local image: ${fileName}`);
      }
    } catch (error) {
      results.failed.push(fileName);
      console.error(`❌ Error processing ${fileName}:`, error);
    }
  }

  return results;
};

export const toggleImageSource = () => {
  imageConfig.useLocalImages = !imageConfig.useLocalImages;
  console.log(`Image source switched to: ${imageConfig.useLocalImages ? 'Local' : 'Supabase'}`);
  // Force page refresh to apply changes
  window.location.reload();
};
