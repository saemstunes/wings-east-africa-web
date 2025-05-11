
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
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        <path d="M18 14.5c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4s.2-1 .6-1.4c.4-.4.9-.6 1.4-.6.5 0 1 .2 1.4.6.4.4.6.9.6 1.4s-.2 1-.6 1.4c-.4.4-.9.6-1.4.6zm-3.5 0c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4s.2-1 .6-1.4c.4-.4.9-.6 1.4-.6.5 0 1 .2 1.4.6.4.4.6.9.6 1.4s-.2 1-.6 1.4c-.4.4-.9.6-1.4.6zm-3.5 0c-.5 0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4s.2-1 .6-1.4c.4-.4.9-.6 1.4-.6.5 0 1 .2 1.4.6.4.4.6.9.6 1.4s-.2 1-.6 1.4c-.4.4-.9.6-1.4.6z" fill="currentColor"></path>
      </svg>
      
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse-slow">
        1
      </span>
    </button>
  );
};

export default WhatsAppButton;
