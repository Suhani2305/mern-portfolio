import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Database, Server, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/lib/hooks';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const controls = useAnimation();
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Data Science", "MERN Stack", "Web Development"];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  const floatingIconVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  
  // Generate stars for the space theme hero
  const renderSpaceElements = () => {
    const elements = [];
    
    // Create planet
    elements.push(
      <motion.div 
        key="planet"
        className="planet absolute w-60 h-60 md:w-80 md:h-80 z-0"
        style={{ right: '5%', top: '15%' }}
        animate={{ 
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{ 
          rotate: { duration: 200, repeat: Infinity, ease: "linear" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    );
    
    // Create small moon
    elements.push(
      <motion.div 
        key="moon"
        className="moon absolute w-16 h-16 md:w-24 md:h-24 z-0"
        style={{ left: '10%', top: '30%' }}
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    );
    
    // Add orbiting element
    elements.push(
      <motion.div 
        key="orbit-element"
        className="orbit absolute z-10"
        style={{ left: '50%', top: '50%' }}
      >
        <motion.div 
          className="w-8 h-8 bg-purple-300 rounded-full shadow-lg shadow-purple-500/50"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    );
    
    // Add random stars
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 4 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      
      elements.push(
        <motion.div
          key={`star-${i}`}
          className="absolute bg-white rounded-full z-0"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity,
            delay: animationDelay,
          }}
        />
      );
    }
    
    return elements;
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="pt-32 pb-24 px-6 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Space-themed background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {renderSpaceElements()}
        
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 md:w-80 md:h-80 bg-purple-600/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 md:w-60 md:h-60 bg-indigo-500/30 rounded-full filter blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto z-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div className="md:w-1/2" variants={itemVariants}>
            <motion.h5 
              className="text-purple-400 font-medium mb-2 neon-text"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hello, I'm
            </motion.h5>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Suhani Rawat
            </motion.h1>
            
            <div className="h-12 mb-6">
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={textIndex}
                  className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  I specialize in {texts[textIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.p 
              className="text-gray-300 text-lg mb-8 max-w-2xl"
              variants={itemVariants}
            >
              I transform data into insights and ideas into functional web applications. 
              Passionate about solving complex problems with code.
            </motion.p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="gradient-button rounded-full text-white px-8 py-6"
                  asChild
                >
                  <a href="#contact">Get in Touch</a>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-purple-400 text-purple-300 hover:text-white hover:bg-purple-500/20 px-8 py-6"
                  asChild
                >
                  <a href="#projects">View My Work</a>
                </Button>
              </motion.div>
            </div>
            
            {/* Floating tech icons with glow effect */}
            <div className="flex space-x-8 mt-8">
              <motion.div
                variants={floatingIconVariants}
                animate="animate"
                className="glow-purple bg-purple-900/50 p-4 rounded-full border border-purple-500/50"
              >
                <Database className="h-7 w-7 text-purple-300" />
              </motion.div>
              
              <motion.div
                variants={floatingIconVariants}
                animate="animate"
                className="glow-purple bg-purple-900/50 p-4 rounded-full border border-purple-500/50 float"
                style={{ animationDelay: "0.5s" }}
              >
                <Code className="h-7 w-7 text-purple-300" />
              </motion.div>
              
              <motion.div
                variants={floatingIconVariants}
                animate="animate"
                className="glow-purple bg-purple-900/50 p-4 rounded-full border border-purple-500/50 float"
                style={{ animationDelay: "1s" }}
              >
                <Server className="h-7 w-7 text-purple-300" />
              </motion.div>
              
              <motion.div
                variants={floatingIconVariants}
                animate="animate"
                className="glow-purple bg-purple-900/50 p-4 rounded-full border border-purple-500/50 float"
                style={{ animationDelay: "1.5s" }}
              >
                <Star className="h-7 w-7 text-purple-300" />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center relative"
            variants={itemVariants}
          >
            {/* Cosmos portal effect */}
            <motion.div 
              className="absolute inset-0 rounded-full blur-2xl z-0"
              style={{
                background: 'radial-gradient(circle, rgba(157,78,221,0.5) 0%, rgba(86,11,173,0.4) 50%, rgba(10,4,60,0) 80%)',
              }}
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
              }}
              transition={{ 
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              }}
            />
            
            {/* Space astronaut or profile */}
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden z-10 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-container w-full h-full p-4 flex items-center justify-center">
                <motion.img 
                  src="/media/1731193450315.jpeg" 
                  alt="Suhani Rawat - Data Scientist & MERN Developer" 
                  className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border-4 border-purple-500/30 glow-purple"
                  style={{
                    boxShadow: '0 0 30px rgba(157, 78, 221, 0.5)',
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-24 flex justify-center"
          variants={itemVariants}
        >
          <motion.a 
            href="#skills" 
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="inline-block glow-purple"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="h-10 w-10 text-purple-400" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
