
interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
}

export const compressImage = async (
  file: File, 
  options: CompressionOptions = {}
): Promise<File> => {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.8,
    format = 'jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File(
                [blob], 
                `compressed_${file.name.split('.')[0]}.${format}`, 
                { 
                  type: `image/${format}`,
                  lastModified: Date.now()
                }
              );
              
              console.log(`Image compressed: ${file.size} -> ${blob.size} bytes`);
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          `image/${format}`,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Please select a valid image file (JPEG, PNG, or WebP)' 
    };
  }

  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'Image size must be less than 10MB' 
    };
  }

  return { valid: true };
};
