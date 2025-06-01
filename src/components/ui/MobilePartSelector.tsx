
import { useState, useRef, useEffect } from 'react';
import { X, Upload, Camera, ZoomIn, ZoomOut, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobilePartSelectorProps {
  image: string;
  onSelect: (imageData: string, metadata: any) => void;
  productName?: string;
  onClose: () => void;
}

const MobilePartSelector = ({ image, onSelect, productName, onClose }: MobilePartSelectorProps) => {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTap, setLastTap] = useState(0);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle touch events for mobile interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    
    // Handle double tap to zoom
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      handleDoubleTap({ clientX: touch.clientX, clientY: touch.clientY });
    }
    setLastTap(now);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStart || !isZoomed) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    setImagePosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setTouchStart(null);
    }
  };

  const handleDoubleTap = (touch: { clientX: number; clientY: number }) => {
    if (!imageRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    if (isZoomed) {
      // Zoom out and select point
      setIsZoomed(false);
      setImageScale(1);
      setImagePosition({ x: 0, y: 0 });
      setSelectedPoint({ x, y });
    } else {
      // Zoom in
      setIsZoomed(true);
      setImageScale(2.5);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setSelectedPoint({ x, y });
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
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
      
      ctx?.drawImage(img, 0, 0);
      
      if (ctx) {
        const markerX = (selectedPoint.x / 100) * canvas.width;
        const markerY = (selectedPoint.y / 100) * canvas.height;
        
        // Enhanced mobile-friendly marker
        ctx.fillStyle = 'rgba(255, 165, 0, 0.8)';
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(markerX, markerY, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add checkmark for better visibility
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(markerX - 8, markerY);
        ctx.lineTo(markerX - 2, markerY + 6);
        ctx.lineTo(markerX + 8, markerY - 6);
        ctx.stroke();
      }
      
      const dataUrl = canvas.toDataURL('image/png', 0.8);
      const metadata = {
        productName,
        selectedPoint,
        timestamp: new Date().toISOString(),
        source: window.location.pathname,
        selectionType: 'mobile_enhanced',
        deviceInfo: {
          userAgent: navigator.userAgent.substring(0, 100),
          screenSize: `${window.screen.width}x${window.screen.height}`,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`
        }
      };
      
      try {
        sessionStorage.setItem('requestImage', dataUrl);
        sessionStorage.setItem('requestMetadata', JSON.stringify(metadata));
        window.location.href = '/contact';
      } catch (error) {
        console.error('Storage error:', error);
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
        selectionType: 'mobile_upload'
      };
      
      try {
        sessionStorage.setItem('requestImage', dataUrl);
        sessionStorage.setItem('requestMetadata', JSON.stringify(metadata));
        window.location.href = '/contact';
      } catch (error) {
        console.error('Storage error:', error);
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

  // Detect if user is on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
        <div className="flex-1">
          {productName && (
            <h3 className="text-white text-lg font-semibold truncate">{productName}</h3>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUploadOption(!showUploadOption)}
            className="text-white hover:bg-white/20"
          >
            <Upload className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {showUploadOption ? (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-gray-900/50">
            <Camera className="w-16 h-16 text-white mb-4" />
            <h3 className="text-white text-xl font-semibold mb-4 text-center">Upload Your Photo</h3>
            <p className="text-white/80 mb-6 text-center">Take or select a photo of the part you need</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isProcessing}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Choose/Take Photo'}
            </Button>
          </div>
        ) : (
          <div 
            ref={containerRef}
            className="h-full w-full relative overflow-hidden bg-black flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={imageRef}
              src={image}
              alt="Select part"
              className={`max-h-full max-w-full object-contain transition-transform duration-200 ${
                isMobile ? 'touch-none' : 'cursor-crosshair'
              }`}
              style={{
                transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
              }}
              onClick={!isMobile ? handleImageClick : undefined}
              draggable={false}
            />
            
            {selectedPoint && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${selectedPoint.x}%`,
                  top: `${selectedPoint.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/80 border-4 border-orange-600 flex items-center justify-center animate-pulse">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {!showUploadOption && (
        <div className="p-4 bg-black/80 backdrop-blur-sm">
          {!selectedPoint && !isProcessing && (
            <div className="text-center mb-4">
              <p className="text-white text-lg font-semibold mb-2">Select a Part</p>
              <p className="text-white/80 text-sm">
                {isMobile ? 'Double-tap to zoom, then tap' : 'Click'} on the specific part you need
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between gap-4">
            {isZoomed && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetZoom}
                className="text-white border-white/20 hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setImageScale(Math.max(1, imageScale - 0.5))}
                disabled={imageScale <= 1}
                className="text-white border-white/20 hover:bg-white/20"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setImageScale(Math.min(4, imageScale + 0.5))}
                disabled={imageScale >= 4}
                className="text-white border-white/20 hover:bg-white/20"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            
            {selectedPoint && !isProcessing && (
              <Button
                onClick={handleConfirmSelection}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-semibold"
              >
                Request This Part
              </Button>
            )}
            
            {isProcessing && (
              <div className="text-center text-white">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500"></div>
                  <span>Processing your request...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePartSelector;
