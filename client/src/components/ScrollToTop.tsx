import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 500px
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 group"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ 
            y: -5,
            boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.5)'
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
          
          <motion.span 
            className="absolute inset-0 rounded-full bg-purple-400 opacity-30"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: 'loop',
              repeatDelay: 1 
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;