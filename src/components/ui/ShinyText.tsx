// components/ui/ShinyText.jsx
import React, { useState, useEffect } from 'react';
import './ShinyText.css';

const ShinyText = ({ 
  text, 
  disabled = false, 
  speed = 5, 
  className = '',
  shineColor = 'rgba(255, 255, 255, 0.8)',
  stopOnHover = true,  // Renamed for clarity
  size = 'inherit',
  weight = 'inherit'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Effect is shown by default, hidden when hovered if stopOnHover is true
  const shouldShine = !disabled && 
                     !reducedMotion && 
                     (!stopOnHover || !isHovered);
  
  return (
    <span 
      className={`shiny-text-container ${className}`}
      style={
        {
          '--shine-speed': `${speed}s`,
          '--shine-color': shineColor,
          '--text-size': size,
          '--text-weight': weight,
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-disabled={disabled}
    >
      <span className="static-text">{text}</span>
      {shouldShine && (
        <span 
          className="shiny-overlay" 
          aria-hidden="true"
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default ShinyText;
