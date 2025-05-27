
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/use-theme';

interface SplashScreenProps {
  duration?: number;
}

const SplashScreen = ({ duration = 2500 }: SplashScreenProps) => {
  const [show, setShow] = useState(true);
  const { theme } = useTheme();
  
  // Check if this is the first visit in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedWings');
    
    if (!hasVisited) {
      // Set the flag that user has visited
      sessionStorage.setItem('hasVisitedWings', 'true');
      
      // Hide splash screen after duration
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      // If already visited in this session, don't show splash
      setShow(false);
    }
  }, [duration]);
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-wings-dark"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="w-40 h-40 mb-6"
            >
              {theme === 'dark' ? (
                <img 
                  src="/logo-light.png" 
                  alt="Wings Engineering Services Limited" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.imgur.com/zCRXN6K.png";
                  }}
                />
              ) : (
                <img 
                  src="https://i.imgur.com/zCRXN6K.png" 
                  alt="Wings Engineering Services Limited" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.imgur.com/zCRXN6K.png";
                  }}
                />
              )}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-wings-navy dark:text-white text-center"
            >
              Wings Engineering Service Limited
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1 bg-wings-orange mt-4 rounded"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-4 text-gray-600 dark:text-gray-300 text-center"
            >
              Engineering Excellence Across East Africa
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
