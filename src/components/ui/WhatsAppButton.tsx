
import { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppButton = ({ phoneNumber, message = "Hello Wings! I'm interested in your services.", className = '' }: WhatsAppButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-16 sm:bottom-4 right-4 sm:right-6 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{ width: '50px', height: '50px', padding: '1px' }}
      aria-label="Chat on WhatsApp"
    >
      <img 
        src="https://i.imgur.com/Ax2TeLJ.png" 
        alt="WhatsApp" 
        className="w-full h-full object-contain scale-125 transition-transform duration-200 hover:scale-135"
      />
      
      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs animate-pulse-slow">
        1
      </span>
    </button>
  );
};

export default WhatsAppButton;
