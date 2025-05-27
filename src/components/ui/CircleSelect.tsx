
import { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import { Square, X } from 'lucide-react';

interface CircleSelectProps {
  image: string;
  onSelect: (imageData: string, metadata: any) => void;
  productName?: string;
  onClose: () => void;
}

const CircleSelect = ({ image, onSelect, productName, onClose }: CircleSelectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<fabric.Image | null>(null);
  const canvasRefState = useRef<fabric.Canvas | null>(null);
  const imageUrlRef = useRef<string>(image); // Track the image URL

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const [circle, setCircle] = useState<fabric.Circle | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [confirmButtonPos, setConfirmButtonPos] = useState<{ left: number; top: number } | null>(null);
  const [processingImage, setProcessingImage] = useState<boolean>(false);

  // Debug logs to track component lifecycle
  console.log('CircleSelect rendering with image:', image);

  // Initialize the canvas only once
  useEffect(() => {
    console.log('Canvas initialization effect running');
    if (!canvasRef.current) {
      console.log('No canvas reference yet');
      return;
    }
    
    if (canvasRefState.current) {
      console.log('Canvas already initialized');
      return;
    }

    console.log('Creating new fabric canvas');
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: containerRef.current?.clientWidth || 800,
      height: containerRef.current?.clientHeight || 600,
      selection: false
    });

    canvasRefState.current = fabricCanvas;
    setCanvas(fabricCanvas);

    return () => {
      console.log('Disposing canvas');
      fabricCanvas.dispose();
      canvasRefState.current = null;
    };
  }, []);

  // Track image prop changes and store the latest value
  useEffect(() => {
    if (image !== imageUrlRef.current) {
      console.log('Image prop changed:', image);
      imageUrlRef.current = image;
      setImageLoaded(false);
      setImageError(null);
    }
  }, [image]);

  // Load image whenever the canvas is ready or image URL changes
  useEffect(() => {
    const fabricCanvas = canvasRefState.current;
    const imageUrl = imageUrlRef.current;
    
    console.log('Image loading effect running', { 
      hasCanvas: !!fabricCanvas, 
      imageUrl, 
      imageLoaded
    });
    
    if (!fabricCanvas || !imageUrl) {
      console.log('Missing canvas or image URL');
      return;
    }

    // If image is already loaded with the same URL, don't reload
    if (imageLoaded && imageRef.current) {
      console.log('Image already loaded');
      return;
    }

    console.log('Loading image:', imageUrl);
    setImageLoaded(false);
    setImageError(null);

    // Clear canvas - keep only the image we're about to load
    fabricCanvas.clear();
    if (imageRef.current) {
      console.log('Removing previous image');
      fabricCanvas.remove(imageRef.current);
      imageRef.current = null;
    }

    // Use try-catch for image loading
    try {
      // Add a timeout to ensure fabric.js has time to initialize properly
      const loadTimer = setTimeout(() => {
        fabric.Image.fromURL(
          imageUrl,
          (img) => {
            console.log('Image loaded successfully', img);
            
            if (!img) {
              console.error('Loaded image is null');
              setImageError('Failed to load image');
              return;
            }
            
            // Ensure we have valid dimensions
            if (!img.width || !img.height) {
              console.error('Image loaded with invalid dimensions', img);
              setImageError('Image has invalid dimensions');
              return;
            }
            
            const canvasWidth = fabricCanvas.getWidth();
            const canvasHeight = fabricCanvas.getHeight();
            
            console.log('Canvas dimensions:', { canvasWidth, canvasHeight });
            console.log('Image dimensions:', { width: img.width, height: img.height });
            
            const scale = Math.min(
              (canvasWidth * 0.9) / img.width, 
              (canvasHeight * 0.9) / img.height
            );

            console.log('Applied scale:', scale);

            img.scale(scale);
            img.set({
              left: (canvasWidth - img.width * scale) / 2,
              top: (canvasHeight - img.height * scale) / 2,
              selectable: false,
              evented: false,
              objectCaching: true
            });

            imageRef.current = img;
            
            // Clear any existing content first
            fabricCanvas.clear();
            fabricCanvas.add(img);
            fabricCanvas.renderAll();
            
            console.log('Image added to canvas');
            setImageLoaded(true);
          },
          { 
            crossOrigin: 'anonymous',
            objectCaching: true 
          }
        );
      }, 100);

      return () => clearTimeout(loadTimer);
    } catch (error) {
      console.error('Error in image loading process:', error);
      setImageError(`Error loading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [canvas, imageUrlRef.current]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resize handler running');
      const fabricCanvas = canvasRefState.current;
      if (!fabricCanvas || !containerRef.current || !imageRef.current) {
        console.log('Missing references for resize');
        return;
      }

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      console.log('Resizing canvas to:', { width, height });

      fabricCanvas.setWidth(width);
      fabricCanvas.setHeight(height);

      const img = imageRef.current;
      if (!img.width || !img.height) {
        console.log('Image has invalid dimensions for resize');
        return;
      }
      
      const scale = Math.min(
        (width * 0.9) / img.width, 
        (height * 0.9) / img.height
      );

      img.scale(scale);
      img.set({
        left: (width - img.width * scale) / 2,
        top: (height - img.height * scale) / 2
      });

      console.log('Repositioned image:', {
        left: (width - img.width * scale) / 2,
        top: (height - img.height * scale) / 2,
        scale
      });

      fabricCanvas.renderAll();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startSelecting = useCallback(() => {
    console.log('Start selecting called');
    const fabricCanvas = canvasRefState.current;
    if (!fabricCanvas || !imageLoaded) {
      console.log('Cannot start selecting - canvas or image not ready');
      return;
    }

    setIsSelecting(true);
    setStartPoint(null);
    setSelectedArea(null);
    setConfirmButtonPos(null);

    if (circle) {
      fabricCanvas.remove(circle);
      setCircle(null);
    }

    // Remove all objects except the image
    const objects = fabricCanvas.getObjects().filter(obj => obj !== imageRef.current);
    objects.forEach(obj => fabricCanvas.remove(obj));

    fabricCanvas.renderAll();
    console.log('Selection mode started');
  }, [circle, imageLoaded]);

  // Modified captureSelectedArea function to handle CORS issues
  const captureSelectedArea = useCallback(() => {
    console.log('Capture selected area called');
    setProcessingImage(true);
    
    const fabricCanvas = canvasRefState.current;
    if (!fabricCanvas || !selectedArea || !imageRef.current) {
      console.log('Missing data for capture', { hasCanvas: !!fabricCanvas, hasSelectedArea: !!selectedArea, hasImage: !!imageRef.current });
      setProcessingImage(false);
      return;
    }
    
    try {
      // Create a new canvas that only contains our circle/selection
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = selectedArea.width;
      tempCanvas.height = selectedArea.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (!tempCtx) {
        console.error('Could not get 2D context from temp canvas');
        setProcessingImage(false);
        return;
      }
      
      // Use the fabric canvas directly which already has the image loaded with proper CORS settings
      fabricCanvas.setActiveObject(imageRef.current);
      
      // Render only the selected area to our temporary canvas
      const dataUrl = fabricCanvas.toDataURL({
        format: 'png',
        left: selectedArea.left,
        top: selectedArea.top,
        width: selectedArea.width,
        height: selectedArea.height
      });
      
      console.log('Cropped image generated');

      // Save to sessionStorage
      sessionStorage.setItem('requestImage', dataUrl);

      const metadata = {
        productName,
        selectedArea,
        timestamp: new Date().toISOString(),
        source: window.location.pathname
      };
      sessionStorage.setItem('requestMetadata', JSON.stringify(metadata));

      // Call the onSelect prop with the cropped image and metadata
      console.log('Calling onSelect with cropped image and metadata');
      onSelect(dataUrl, metadata);
      setProcessingImage(false);
    } catch (error) {
      console.error('Error capturing selected area:', error);
      setProcessingImage(false);
      
      // Fallback method if the first attempt fails due to CORS
      try {
        // Try a different method - draw just the circle on a new canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = selectedArea.width;
        tempCanvas.height = selectedArea.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          // Draw a filled circle on the temp canvas
          tempCtx.beginPath();
          tempCtx.arc(
            selectedArea.width / 2, 
            selectedArea.height / 2, 
            Math.min(selectedArea.width, selectedArea.height) / 2,
            0, 
            Math.PI * 2
          );
          tempCtx.fillStyle = 'rgba(255, 165, 0, 0.3)';
          tempCtx.fill();
          tempCtx.strokeStyle = 'orange';
          tempCtx.lineWidth = 2;
          tempCtx.stroke();
          
          // Generate data URL
          const dataUrl = tempCanvas.toDataURL('image/png');
          
          const metadata = {
            productName,
            selectedArea,
            timestamp: new Date().toISOString(),
            source: window.location.pathname,
            originalImageUrl: image, // Store the original image URL
            isFallback: true // Flag that this is a fallback method
          };
          
          sessionStorage.setItem('requestImage', dataUrl);
          sessionStorage.setItem('requestMetadata', JSON.stringify(metadata));
          
          onSelect(dataUrl, metadata);
        }
      } catch (fallbackError) {
        console.error('Fallback method also failed:', fallbackError);
      }
    }
  }, [selectedArea, productName, onSelect, image]);

  // Set up selection interaction
  useEffect(() => {
    console.log('Selection interaction effect running', { isSelecting, imageLoaded });
    const fabricCanvas = canvasRefState.current;
    if (!fabricCanvas || !isSelecting || !imageLoaded) {
      return;
    }

    const text = new fabric.Text('Click and drag to select a circular area', {
      left: 20,
      top: 20,
      fill: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      fontSize: 16
    });

    fabricCanvas.defaultCursor = 'crosshair';
    fabricCanvas.hoverCursor = 'crosshair';
    fabricCanvas.add(text);
    fabricCanvas.renderAll();

    const handleMouseDown = (e: fabric.IEvent) => {
      // Only proceed if we're clicking on the canvas background, not on objects
      if (e.target && e.target !== imageRef.current) {
        console.log('Mouse down on object, ignoring');
        return;
      }
      
      const pointer = fabricCanvas.getPointer(e.e);
      console.log('Mouse down at', pointer);

      // Reset selection if user clicks outside existing area
      if (!isSelecting && selectedArea) {
        const center = {
          x: selectedArea.left + selectedArea.width / 2,
          y: selectedArea.top + selectedArea.height / 2
        };
        const radius = Math.max(selectedArea.width, selectedArea.height) / 2;
        const distance = Math.sqrt(
          Math.pow(pointer.x - center.x, 2) + Math.pow(pointer.y - center.y, 2)
        );
        
        if (distance > radius) {
          console.log('Click outside existing selection, resetting');
          setSelectedArea(null);
          setConfirmButtonPos(null);
          startSelecting();
          return;
        }
      }

      if (!isSelecting) return;

      setStartPoint({ x: pointer.x, y: pointer.y });

      const newCircle = new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 0,
        fill: 'rgba(255, 165, 0, 0.3)',
        stroke: 'orange',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false
      });

      setCircle(newCircle);
      fabricCanvas.add(newCircle);
      console.log('New circle created at', { x: pointer.x, y: pointer.y });
    };

    const handleMouseMove = (e: fabric.IEvent) => {
      if (!isSelecting || !startPoint || !circle) return;

      const pointer = fabricCanvas.getPointer(e.e);
      const distance = Math.sqrt(
        Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
      );

      circle.set({
        radius: distance
      });

      fabricCanvas.renderAll();
    };

    const handleMouseUp = (e: fabric.IEvent) => {
      if (!isSelecting || !startPoint || !circle) return;

      const pointer = fabricCanvas.getPointer(e.e);
      const distance = Math.sqrt(
        Math.pow(pointer.x - startPoint.x, 2) + Math.pow(pointer.y - startPoint.y, 2)
      );

      // Convert circle to rectangle for consistent API
      const radius = distance;
      const selectedRect = {
        left: startPoint.x - radius,
        top: startPoint.y - radius,
        width: radius * 2,
        height: radius * 2
      };

      setStartPoint(null);
      fabricCanvas.remove(circle);
      setCircle(null);

      if (radius > 5) {
        setSelectedArea(selectedRect);
        setIsSelecting(false);
        fabricCanvas.defaultCursor = 'default';
        fabricCanvas.hoverCursor = 'default';

        fabricCanvas.remove(text);
        
        // Create a new circle to show the selected area
        const selectionCircle = new fabric.Circle({
          left: startPoint.x,
          top: startPoint.y,
          radius: radius,
          fill: 'rgba(255, 165, 0, 0.3)',
          stroke: 'orange',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false
        });
        fabricCanvas.add(selectionCircle);
        fabricCanvas.bringToFront(selectionCircle);
        
        fabricCanvas.renderAll();

        setConfirmButtonPos({
          left: startPoint.x - 50,
          top: startPoint.y + radius + 10
        });
        
        console.log('Selection completed with radius', radius);
      }
    };

    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('mouse:move', handleMouseMove);
    fabricCanvas.on('mouse:up', handleMouseUp);

    return () => {
      console.log('Cleaning up selection interaction listeners');
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:move', handleMouseMove);
      fabricCanvas.off('mouse:up', handleMouseUp);
      if (fabricCanvas.getObjects().includes(text)) {
        fabricCanvas.remove(text);
      }
      fabricCanvas.renderAll();
    };
  }, [isSelecting, circle, startPoint, selectedArea, startSelecting, imageLoaded]);

  // Force re-render on component mount to ensure image is displayed
  useEffect(() => {
    const timer = setTimeout(() => {
      const fabricCanvas = canvasRefState.current;
      if (fabricCanvas && imageRef.current) {
        console.log('Forcing canvas re-render');
        fabricCanvas.renderAll();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" role="dialog" aria-modal="true">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={startSelecting}
          className={`text-white p-2 rounded-full ${isSelecting ? 'bg-wings-orange' : 'bg-black/30'} hover:bg-black/50 transition-colors flex items-center gap-2`}
          title="Draw circle to select part"
          disabled={!imageLoaded || processingImage}
        >
          <Square className="w-5 h-5" />
          <span className="text-sm">Select Part</span>
        </button>
        <button
          onClick={onClose}
          className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          aria-label="Close image selector"
          disabled={processingImage}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {productName && (
        <div className="absolute top-4 left-4">
          <h3 className="text-white text-lg font-semibold">{productName}</h3>
        </div>
      )}

      <div ref={containerRef} className="h-[80vh] max-h-[80vh] w-[90vw] max-w-[1200px] relative">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Display different states */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="text-white">Loading image...</div>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="text-white bg-red-500/80 p-4 rounded-lg">
              <p>Error loading image: {imageError}</p>
              <button 
                onClick={() => {
                  setImageLoaded(false);
                  setImageError(null);
                  // Force reload image
                  const currentImage = imageUrlRef.current;
                  imageUrlRef.current = '';
                  setTimeout(() => {
                    imageUrlRef.current = currentImage;
                  }, 100);
                }}
                className="mt-2 bg-white text-red-500 px-4 py-2 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {processingImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-wings-orange mb-4"></div>
              <p className="text-white">Processing image...</p>
            </div>
          </div>
        )}
        
        {confirmButtonPos && !processingImage && (
          <button
            onClick={(e) => {
              e.preventDefault();
              captureSelectedArea();
            }}
            style={{
              position: 'absolute',
              left: `${confirmButtonPos.left}px`,
              top: `${confirmButtonPos.top}px`,
              backgroundColor: '#0066cc',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '16px',
              zIndex: 50
            }}
            className="hover:bg-blue-700 transition-colors"
            disabled={processingImage}
          >
            Request
          </button>
        )}

        {!isSelecting && !selectedArea && imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center p-6 rounded-lg max-w-md">
              <h3 className="text-xl font-semibold mb-4">Request Quote for Part</h3>
              <p className="mb-4">Click the "Select Part" button to draw a circle around the specific part you want to request a quote for.</p>
              <button
                onClick={startSelecting}
                className="bg-wings-orange text-white px-4 py-2 rounded-lg hover:bg-wings-orange/80 transition-colors flex items-center gap-2 mx-auto"
                disabled={processingImage}
              >
                <Square className="w-5 h-5" />
                Start Selecting
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Debug information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-2 text-xs max-w-xs overflow-auto">
          <div>Image loaded: {imageLoaded ? 'Yes' : 'No'}</div>
          <div>Is selecting: {isSelecting ? 'Yes' : 'No'}</div>
          <div>Has selection: {selectedArea ? 'Yes' : 'No'}</div>
          <div>Processing: {processingImage ? 'Yes' : 'No'}</div>
          <div>Image URL: {image.substring(0, 20)}...</div>
        </div>
      )}
    </div>
  );
};

export default CircleSelect;
