
import { useState } from 'react';
import { X } from 'lucide-react';

interface PartRequestPreviewProps {
  imageData: string;
  metadata: any;
  onClear: () => void;
}

const PartRequestPreview = ({ imageData, metadata, onClear }: PartRequestPreviewProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-wings-navy dark:text-white text-sm sm:text-base truncate pr-2">
          Part Request
        </h3>
        <button 
          onClick={() => {
            setIsVisible(false);
            onClear();
          }}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 flex-shrink-0"
          aria-label="Remove part request"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:w-1/3">
          <div className="relative rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
            <img 
              src={imageData} 
              alt="Selected part" 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="w-full sm:w-2/3">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 break-words">
            You have selected a part from: 
            <span className="font-medium text-wings-navy dark:text-white ml-1">
              {metadata.productName || "Unknown product"}
            </span>
          </p>
          
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            This information will be included with your contact request. Please provide additional details about what you need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartRequestPreview;
