import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/ui/theme-provider';
import { Moon, Sun, Menu, X, Rocket, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick, active }) => {
  return (
    <a 
      href={href} 
      className={`relative overflow-hidden group ${
        active 
          ? 'text-purple-400' 
          : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400'
      } transition-colors`}
      onClick={onClick}
    >
      <span className="relative z-10">{label}</span>
      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 transform ${
        active ? 'translate-x-0' : 'translate-x-[-100%] group-hover:translate-x-0'
      } transition-transform duration-300`}></span>
    </a>
  );
};

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Determine active section based on scroll position
      const sections = ['home', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsThemeChanging(true);
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      setTimeout(() => {
        setIsThemeChanging(false);
      }, 500);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {theme === 'dark' && (
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => {
              const size = Math.random() * 2 + 1;
              const top = Math.random() * 100;
              const left = Math.random() * 100;
              const delay = Math.random() * 3;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    opacity: 0.5,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay,
                    repeat: Infinity,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
      
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <motion.a 
          href="#" 
          className="text-xl font-bold flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {theme === 'dark' ? (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="h-6 w-6 mr-2 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Suhani&nbsp;Rawat
              </span>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Suhani&nbsp;Rawat
              </span>
            </motion.div>
          )}
        </motion.a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="#home" label="Home" active={activeSection === 'home'} />
          <NavLink href="#skills" label="Skills" active={activeSection === 'skills'} />
          <NavLink href="#projects" label="Projects" active={activeSection === 'projects'} />
          <NavLink href="#contact" label="Contact" active={activeSection === 'contact'} />
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <motion.button 
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                theme === 'dark' 
                  ? 'bg-indigo-900 border border-purple-500/50' 
                  : 'bg-blue-100 border border-blue-300'
              }`}
              aria-label="Toggle theme"
              disabled={isThemeChanging}
            >
              <motion.div 
                className={`absolute top-1 w-5 h-5 rounded-full transition-transform flex items-center justify-center ${
                  theme === 'dark' ? 'left-7 bg-purple-400' : 'left-1 bg-amber-400'
                }`}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full flex items-center justify-center"
                  >
                    {theme === 'dark' ? (
                      <Stars className="h-3 w-3 text-indigo-900" />
                    ) : (
                      <Sun className="h-3 w-3 text-amber-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.button>
          </motion.div>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full bg-purple-900/10 dark:bg-white/5 hover:bg-purple-900/20 dark:hover:bg-white/10"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                ) : (
                  <Menu className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-6">
              <NavLink 
                href="#home" 
                label="Home"
                onClick={closeMobileMenu}
                active={activeSection === 'home'}
              />
              <NavLink 
                href="#skills" 
                label="Skills"
                onClick={closeMobileMenu}
                active={activeSection === 'skills'}
              />
              <NavLink 
                href="#projects" 
                label="Projects"
                onClick={closeMobileMenu}
                active={activeSection === 'projects'}
              />
              <NavLink 
                href="#contact" 
                label="Contact"
                onClick={closeMobileMenu}
                active={activeSection === 'contact'}
              />
            </div>
            
            {theme === 'dark' && (
              <div className="absolute bottom-0 right-0 w-full h-20 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                  style={{ width: '150px', bottom: '30%', right: '-50px', transform: 'rotate(-30deg)' }}
                  animate={{
                    right: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
