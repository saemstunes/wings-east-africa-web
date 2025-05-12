
import { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppButton = ({ phoneNumber, message = "Hello! I'm interested in your services.", className = '' }: WhatsAppButtonProps) => {
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
      className={`fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{ width: '60px', height: '60px' }}
      aria-label="Chat on WhatsApp"
    >
      <img 
  src="https://toppng.com/uploads/preview/whatsapp-png-11545153908plo4ogbgqn.png" 
  alt="WhatsApp" 
  className="w-8 h-8 object-contain transition-transform duration-200 hover:scale-110"
        />
      
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse-slow">
        1
      </span>
    </button>
  );
};

export default WhatsAppButton;
