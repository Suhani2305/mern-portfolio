import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Star } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="py-8 px-6 relative overflow-hidden border-t border-purple-500/20"
      style={{ background: 'linear-gradient(180deg, #0a0015 0%, #080010 100%)' }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 2 + 1;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const opacity = Math.random() * 0.5 + 0.1;
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity,
              }}
              animate={{
                opacity: [opacity, opacity * 2, opacity],
              }}
              transition={{
                duration: 1 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>
      
      {/* Shooting star */}
      <motion.div
        className="absolute w-[150px] h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent"
        style={{
          top: '30%',
          left: '-10%',
          transform: 'rotate(-30deg)',
        }}
        animate={{
          left: ['0%', '110%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeOut",
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mr-2"
            >
              <Rocket className="h-5 w-5 text-purple-400" />
            </motion.div>
            <p className="text-gray-400">
              &copy; {currentYear} <span className="text-white">Suhani Rawat</span>. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6 relative">
            <motion.div 
              className="absolute -top-8 right-0 rotate-12 opacity-20"
              animate={{
                rotate: [12, 24, 12],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star className="h-6 w-6 text-purple-300" />
            </motion.div>
            
            {/* <a 
              href="#" 
              className="text-gray-400 hover:text-purple-300 transition-colors relative group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#skills" 
              className="text-gray-400 hover:text-purple-300 transition-colors relative group"
            >
              <span>Skills</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a> */}
            {/* <a 
              href="#projects" 
              className="text-gray-400 hover:text-purple-300 transition-colors relative group"
            >
              <span>Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="text-gray-400 hover:text-purple-300 transition-colors relative group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
