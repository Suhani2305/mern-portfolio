import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, Calendar, Code, 
  CheckCircle2, Award, Users, ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: 'data-science' | 'mern-stack';
  demoLink: string;
  githubLink: string;
  tags: string[];
  fullDescription?: string;
  features?: string[];
  yearCompleted?: string;
  teamSize?: number;
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Get full project data, using defaults for missing fields
  const getFullProjectData = (project: Project): Project => {
    return {
      ...project,
      fullDescription: project.fullDescription || 
        "This project was created to solve real-world problems using cutting-edge technologies. It features a robust architecture, clean code practices, and an intuitive user interface designed with user experience in mind.",
      features: project.features || [
        "Responsive design for seamless experience across all devices",
        "Advanced data visualization with interactive charts",
        "Real-time updates and notifications",
        "Secure authentication and authorization system",
        "Comprehensive API documentation"
      ],
      yearCompleted: project.yearCompleted || "2024",
      teamSize: project.teamSize || 3
    };
  };

  // Space particles for background
  const renderSpaceElements = () => {
    const elements = [];
    
    // Add floating particles
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      elements.push(
        <motion.div
          key={`particle-${i}`}
          className="absolute bg-purple-400 rounded-full opacity-20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      );
    }
    
    return elements;
  };

  if (!project) return null;

  const fullProject = getFullProjectData(project);
  const images = fullProject.images || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div 
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto space-container border border-purple-500/30 rounded-xl shadow-2xl"
            variants={modalVariants}
          >
            {/* Background space elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {renderSpaceElements()}
            </div>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-purple-900/40 hover:bg-purple-700/60 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Images Carousel */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden group">
              {images.length > 0 && (
                <img 
                  src={images[currentImageIndex]}
                  alt={fullProject.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent"></div>
              {/* Carousel Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="h-6 w-6 rotate-180" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full text-white border ${
                    fullProject.category === 'data-science' 
                      ? 'bg-purple-800/60 border-purple-500/50' 
                      : 'bg-indigo-800/60 border-indigo-500/50'
                  }`}>
                    {fullProject.category === 'data-science' ? 'Data Science' : 'MERN Stack'}
                  </span>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{fullProject.yearCompleted}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Team of {fullProject.teamSize}</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{fullProject.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 relative z-10">
              {/* Project tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {fullProject.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge 
                      className="bg-purple-900/40 border border-purple-500/30 text-purple-300 hover:bg-purple-800/60 px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Project Overview</h3>
                <p className="text-gray-300 mb-4">
                  {fullProject.description}
                </p>
                <p className="text-gray-300">
                  {fullProject.fullDescription}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {fullProject.features && fullProject.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Technologies used */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {fullProject.tags.map((tech, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-2 text-gray-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                    >
                      <Code className="w-4 h-4 text-purple-400" />
                      <span>{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
              >
                <Button 
                  className="group bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center space-x-2"
                  onClick={() => window.open(fullProject.demoLink, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>View Live Demo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-900/40 hover:text-purple-200 flex items-center justify-center space-x-2"
                  onClick={() => window.open(fullProject.githubLink, '_blank')}
                >
                  <Github className="w-5 h-5" />
                  <span>View Source Code</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;