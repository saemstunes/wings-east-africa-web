// components/ui/ShinyText.jsx
import React from 'react';
import './ShinyText.css';

const ShinyText = ({ 
  text, 
  disabled = false, 
  speed = 5, 
  className = '',
  shineColor = 'rgba(255, 255, 255, 0.8)',
  size = 'inherit',
  weight = 'inherit'
}) => {
  return (
    <span 
      className={`shiny-text-container ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        '--shine-speed': `${speed}s`,
        '--shine-color': shineColor,
        '--text-size': size,
        '--text-weight': weight,
      }}
    >
      <span className="shiny-text">{text}</span>
    </span>
  );
};

export default ShinyText;
