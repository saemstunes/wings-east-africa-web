
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FloatingInquiryTabProps {
  className?: string;
  delay?: number;
}

const FloatingInquiryTab = ({ className = '', delay = 1000 }: FloatingInquiryTabProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-wings-orange text-white py-3 px-4 shadow-lg z-40 transition-all duration-500 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}
    >
      <div className="flex items-center">
  <Phone className="h-5 w-5 mr-2" />
  <span className="font-medium text-sm sm:text-base">
    {t('makeInquiry')}{" "}
    <a
      href="tel:+254716052776"
      className="hover:text-white hover:bg-wings-orange/10 px-1 rounded transition-colors"
    >
      0716 052 776
    </a>
  </span>
</div>

      <Link 
        to="/about" 
        className="ml-0 sm:ml-4 bg-white text-wings-navy hover:bg-gray-100 px-3 sm:px-4 py-1.5 rounded-md transition-colors font-medium text-sm whitespace-nowrap"
      >
        {t('getInTouch')}
      </Link>
    </div>
  );
};

export default FloatingInquiryTab;
