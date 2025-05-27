
import { useState, useRef } from 'react';
import { X, Upload, Camera } from 'lucide-react';

interface SimpleImageSelectorProps {
  image: string;
  onSelect: (imageData: string, metadata: any) => void;
  productName?: string;
  onClose: () => void;
}

const MAX_URL_LENGTH = 1800; // Safe URL length limit

const SimpleImageSelector = ({ image, onSelect, productName, onClose }: SimpleImageSelectorProps) => {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setSelectedPoint({ x, y });
  };

  const storeImageSafely = (dataUrl: string, metadata: any) => {
    try {
      // Clear any existing request data first
      sessionStorage.removeItem('requestImage');
      sessionStorage.removeItem('requestMetadata');
      
      // Store the image data
      sessionStorage.setItem('requestImage', dataUrl);
      sessionStorage.setItem('requestMetadata', JSON.stringify(metadata));
      
      console.log('Image stored successfully in sessionStorage');
      return true;
    } catch (error) {
      console.error('Failed to store image in sessionStorage:', error);
      // If sessionStorage fails, try with a compressed version
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          // Compress image to smaller size
          const maxWidth = 800;
          const maxHeight = 600;
          let { width, height } = img;
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          sessionStorage.setItem('requestImage', compressedDataUrl);
          sessionStorage.setItem('requestMetadata', JSON.stringify({
            ...metadata,
            compressed: true
          }));
        };
        
        img.src = dataUrl;
        return true;
      } catch (compressionError) {
        console.error('Failed to compress and store image:', compressionError);
        return false;
      }
    }
  };

  const handleConfirmSelection = () => {
    if (!selectedPoint) return;
    
    setIsProcessing(true);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx?.drawImage(img, 0, 0);
      
      if (ctx) {
        // Draw selection marker
        const markerX = (selectedPoint.x / 100) * canvas.width;
        const markerY = (selectedPoint.y / 100) * canvas.height;
        
        ctx.fillStyle = 'rgba(255, 165, 0, 0.7)';
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(markerX, markerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add text indicator
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PART', markerX, markerY + 5);
      }
      
      const dataUrl = canvas.toDataURL('image/png', 0.8);
      const metadata = {
        productName,
        selectedPoint,
        timestamp: new Date().toISOString(),
        source: window.location.pathname,
        selectionType: 'gallery'
      };
      
      // Try to store safely
      const stored = storeImageSafely(dataUrl, metadata);
      
      if (stored) {
        // Navigate to contact page
        window.location.href = '/contact';
      } else {
        // Fallback: call onSelect with the data (existing behavior)
        console.log('Falling back to direct data passing');
        onSelect(dataUrl, metadata);
      }
      
      setIsProcessing(false);
    };
    
    img.crossOrigin = 'anonymous';
    img.src = image;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsProcessing(true);
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      setIsProcessing(false);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const metadata = {
        productName: 'Custom Upload',
        isCustomUpload: true,
        filename: file.name,
        fileSize: file.size,
        timestamp: new Date().toISOString(),
        source: window.location.pathname,
        selectionType: 'upload'
      };
      
      // Try to store safely
      const stored = storeImageSafely(dataUrl, metadata);
      
      if (stored) {
        // Navigate to contact page
        window.location.href = '/contact';
      } else {
        // Fallback: call onSelect with the data
        console.log('Falling back to direct data passing for uploaded file');
        onSelect(dataUrl, metadata);
      }
      
      setIsProcessing(false);
    };
    
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      setIsProcessing(false);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setShowUploadOption(!showUploadOption)}
          className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors flex items-center gap-2"
          title="Upload your own image"
          disabled={isProcessing}
        >
          <Upload className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Upload</span>
        </button>
        <button
          onClick={onClose}
          className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          disabled={isProcessing}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {productName && (
        <div className="absolute top-4 left-4">
          <h3 className="text-white text-lg font-semibold">{productName}</h3>
        </div>
      )}

      <div className="h-[80vh] max-h-[80vh] w-[90vw] max-w-[1200px] relative">
        {showUploadOption ? (
          <div className="h-full flex flex-col items-center justify-center bg-gray-900/50 rounded-lg">
            <div className="text-center p-8">
              <Camera className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-4">Upload Your Own Image</h3>
              <p className="text-white/80 mb-6">Upload a photo of the part you need (max 5MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-wings-orange text-white px-6 py-3 rounded-lg hover:bg-wings-orange/80 transition-colors disabled:opacity-50"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Choose Image'}
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative">
              <img
                ref={imageRef}
                src={image}
                alt="Select part"
                className="max-h-full max-w-full object-contain cursor-crosshair"
                onClick={handleImageClick}
              />
              
              {selectedPoint && (
                <div
                  className="absolute w-10 h-10 border-4 border-orange-500 bg-orange-500/30 rounded-full flex items-center justify-center text-white font-bold text-xs transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${selectedPoint.x}%`,
                    top: `${selectedPoint.y}%`
                  }}
                >
                  PART
                </div>
              )}
            </div>
            
            {!selectedPoint && !isProcessing && (
              <div className="absolute bottom-20 bg-black/70 text-white p-4 rounded-lg max-w-md text-center">
                <p className="text-lg font-semibold mb-2">Select a Part</p>
                <p className="text-sm">Tap or click on the specific part you want to request</p>
              </div>
            )}
            
            {selectedPoint && !isProcessing && (
              <button
                onClick={handleConfirmSelection}
                className="absolute bottom-20 bg-wings-orange text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-wings-orange/80 transition-colors"
              >
                Request This Part
              </button>
            )}
            
            {isProcessing && (
              <div className="absolute bottom-20 bg-black/70 text-white p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-wings-orange"></div>
                  <span>Processing your request...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleImageSelector;
