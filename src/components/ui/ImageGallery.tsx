
import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleImageSelector from './SimpleImageSelector';

interface ImageGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  productName?: string;
}

// Add at the top of the file
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product_catalog/${encodeURIComponent(path)}`;
};

const ImageGallery = ({ images, initialIndex = 0, onClose, productName }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSelectMode, setImageSelectMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);
  
  const handleNext = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsZoomed(false);
    }
  };

  const handlePrevious = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsZoomed(false);
    }
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setPosition({ x, y });
  };

  const handlePartRequest = (imageData: string, metadata: any) => {
    setImageSelectMode(false);
    
    const encodedImage = encodeURIComponent(getImageUrl(imageData));
    const encodedMetadata = encodeURIComponent(JSON.stringify({
      ...metadata,
      originalImage: images[currentIndex],
      productName
    }));
    
    window.location.href = `/contact?requestImage=${encodedImage}&requestMetadata=${encodedMetadata}`;
  };

  const imageTransformStyle = isZoomed 
    ? { 
        transformOrigin: `${position.x}% ${position.y}%`,
        transform: 'scale(2.5)',
        transition: 'transform 0.1s ease-out'
      } 
    : {};

  if (imageSelectMode) {
    return (
      <SimpleImageSelector
        image={images[currentIndex]}
        onSelect={handlePartRequest}
        productName={productName}
        onClose={() => setImageSelectMode(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2 z-10">
        <button
          onClick={() => setImageSelectMode(true)}
          className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors flex items-center justify-center sm:justify-start gap-2 text-sm"
          title="Select and request part"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Request Part</span>
        </button>
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className={`text-white p-2 rounded-full ${isZoomed ? 'bg-wings-orange' : 'bg-black/30'} hover:bg-black/50 transition-colors`}
          title={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" /> : <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <button 
          onClick={onClose}
          className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      
      {productName && (
        <div className="absolute top-4 left-4 max-w-[50%] z-10">
          <h3 className="text-white text-sm sm:text-lg font-semibold truncate">{productName}</h3>
        </div>
      )}
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-1">
          {images.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => {
                setCurrentIndex(idx);
                setIsZoomed(false);
              }}
              className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative h-[80vh] max-h-[80vh] w-[90vw] max-w-[1200px]">
        <div
          ref={containerRef}
          className="h-full w-full overflow-hidden flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onClick={handleImageClick}
        >
          <AnimatePresence mode="wait">
            // With this:
            <motion.img
              key={currentIndex}
              src={getImageUrl(images[currentIndex])}
              alt={`Gallery image ${currentIndex + 1}`}
              className={`max-h-full max-w-full object-contain cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
              style={isZoomed ? imageTransformStyle : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              />
          </AnimatePresence>
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
