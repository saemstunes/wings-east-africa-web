
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Create a session storage key
const ANIMATION_SHOWN_KEY = 'wings-animation-shown';

const AnimatedSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check if animation has already been shown in this session
    const animationShown = sessionStorage.getItem(ANIMATION_SHOWN_KEY);
    
    if (animationShown) {
      setShouldAnimate(false);
    } else {
      // Set the flag in session storage
      sessionStorage.setItem(ANIMATION_SHOWN_KEY, 'true');
      setShouldAnimate(true);
    }
  }, []);

  if (!shouldAnimate) {
    // Render without animation if already shown in this session
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: delay * 0.1,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
