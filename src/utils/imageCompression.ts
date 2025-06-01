
export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeKB?: number;
  outputFormat?: 'jpeg' | 'png' | 'webp';
}

export const compressImage = (
  file: File,
  options: CompressionOptions = {}
): Promise<{ compressedFile: File; dataUrl: string; compressionRatio: number }> => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 1200,
      maxHeight = 1200,
      quality = 0.8,
      maxSizeKB = 500,
      outputFormat = 'jpeg'
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
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

      // Convert to blob with compression
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }

          // Check if further compression is needed
          const sizeKB = blob.size / 1024;
          let finalQuality = quality;

          if (sizeKB > maxSizeKB && outputFormat === 'jpeg') {
            // Reduce quality further if size is still too large
            finalQuality = Math.max(0.1, quality * (maxSizeKB / sizeKB));
            
            canvas.toBlob(
              (compressedBlob) => {
                if (!compressedBlob) {
                  reject(new Error('Failed to compress image further'));
                  return;
                }

                const compressedFile = new File([compressedBlob], file.name, {
                  type: `image/${outputFormat}`,
                  lastModified: Date.now(),
                });

                const reader = new FileReader();
                reader.onload = () => {
                  const compressionRatio = file.size / compressedFile.size;
                  resolve({
                    compressedFile,
                    dataUrl: reader.result as string,
                    compressionRatio
                  });
                };
                reader.readAsDataURL(compressedFile);
              },
              `image/${outputFormat}`,
              finalQuality
            );
          } else {
            const compressedFile = new File([blob], file.name, {
              type: `image/${outputFormat}`,
              lastModified: Date.now(),
            });

            const reader = new FileReader();
            reader.onload = () => {
              const compressionRatio = file.size / compressedFile.size;
              resolve({
                compressedFile,
                dataUrl: reader.result as string,
                compressionRatio
              });
            };
            reader.readAsDataURL(compressedFile);
          }
        },
        `image/${outputFormat}`,
        finalQuality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Create object URL for the image
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    // Clean up object URL after use
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      img.onload(); // Call the original onload
    };
  });
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for dimension calculation'));
    };

    img.src = objectUrl;
  });
};

export const convertToWebP = (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert to WebP'));
            return;
          }

          const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
            type: 'image/webp',
            lastModified: Date.now(),
          });

          resolve(webpFile);
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image for WebP conversion'));

    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      img.onload(); // Call the original onload
    };
  });
};
