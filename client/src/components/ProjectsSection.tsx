import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Rocket, Star, Filter, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIntersectionObserver } from '@/lib/hooks';
import { Badge } from '@/components/ui/badge';
import ProjectModal from '@/components/ProjectModal';

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

const projects: Project[] = [
  {
    id: 1,
    title: "SecureFile",
    description: "A highly secure and user-friendly file management system designed for privacy, accessibility, and seamless collaboration. Built using TypeScript, React, and Express.",
    images: [
      "/media/SecureFile/Screenshot 2025-03-26 141514.png"
    ],
    category: "mern-stack",
    demoLink: "https://github.com/Suhani2305/SecureFile",
    githubLink: "https://github.com/Suhani2305/SecureFile",
    tags: ["TypeScript", "React", "Express"],
    fullDescription: "SecureFile is a highly secure and user-friendly file management system designed for privacy, accessibility, and seamless collaboration. Built using TypeScript, React, and Express.",
    features: [
      "Secure file upload and storage",
      "File encryption at rest",
      "File organization with folders",
      "File sharing capabilities",
      "Trash management (soft delete)",
      "File restoration from trash",
      "Permanent file deletion",
      "File size tracking",
      "File type detection"
    ],
    yearCompleted: "2025",
    teamSize: 2
  },
  {
    id: 2,
    title: "EchoRead",
    description: "A modern reading platform with features like user authentication, and AI-powered recommendations.",
    images: [
      "/media/echoRead/Screenshot 2025-05-31 130311.png",
      "/media/echoRead/Screenshot 2025-05-31 130327.png",
      "/media/echoRead/Screenshot 2025-05-31 130348.png",
      "/media/echoRead/Screenshot 2025-05-31 130403.png",
      "/media/echoRead/Screenshot 2025-05-31 130451.png"
    ],
    category: "mern-stack",
    demoLink: "https://github.com/Suhani2305/EchoRead",
    githubLink: "https://github.com/Suhani2305/EchoRead",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    fullDescription: "EchoRead is a comprehensive reading dashboard designed to enhance the reading experience and track reading progress. This modern web application helps readers manage their reading journey, track progress, and gain insights into their reading habits.",
    features: [
      "Reading Progress Tracking",
      "Learning Path Management",
      "AI-powered recommendations",
      "Vocabulary Enhancement",
      "Social features",
      "Reading Analytics",
      "Book Management"
    ],
    yearCompleted: "2025",
    teamSize: 1
  },
  {
    id: 3,
    title: "AirIndexAnalysis",
    description: "A project focused on analyzing air quality indices.",
    images: [
      "/media/AirIndex/AirIndex1.png",
      "/media/AirIndex/AirIndex2.png"
    ],
    category: "data-science",
    demoLink: "https://github.com/Suhani2305/AirIndexAnalysis",
    githubLink: "https://github.com/Suhani2305/AirIndexAnalysis",
    tags: ["Python", "Data Analysis", "Visualization"],
    fullDescription: "A comprehensive air quality analysis dashboard leveraging machine learning and advanced statistical analysis to monitor, predict, and analyze air quality patterns. This system helps authorities and researchers make data-driven decisions to improve air quality and public health.",
    features: [
      "Real-time Air Quality Monitoring",
      "Predictive Analysis & Forecasting",
      "Health Impact Assessment",
      "Environmental Pattern Analysis",
      "Data-Driven Decision Support",
      "Advanced analytics",
      "AI-powered recommendations",
      "🤖 ML Predictions"
    ],
    yearCompleted: "2025",
    teamSize: 1
  },
  {
    id: 4,
    title: "Plate2Share",
    description: "A project connecting NGOs with hotels and restaurants to manage and share excess food, reducing waste.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80"
    ],
    category: "mern-stack",
    demoLink: "https://github.com/Suhani2305/Plate2Share",
    githubLink: "https://github.com/Suhani2305/Plate2Share",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    fullDescription: "Plate2Share is a project connecting NGOs with hotels and restaurants to manage and share excess food, reducing waste.",
    features: [
      "User authentication",
      "Cloud sync",
      "Mobile app version",
      "Social features",
      "Advanced analytics",
      "AI-powered recommendations",
      "Custom themes"
    ],
    yearCompleted: "2025",
    teamSize: 1
  },
  {
    id: 5,
    title: "AIBasedTrafficManagement",
    description: "A state-of-the-art traffic management solution leveraging computer vision and machine learning to analyze traffic patterns, detect vehicles, and provide real-time insights.",
    images: [
      "/media/AIBasedTrafficManagement/Screenshot 2025-05-31 131536.png",
      "/media/AIBasedTrafficManagement/Screenshot 2025-05-31 131547.png",
      "/media/AIBasedTrafficManagement/Screenshot 2025-05-31 131605.png"
    ],
    category: "data-science",
    demoLink: "https://github.com/Suhani2305/AIBasedTrafficManagement",
    githubLink: "https://github.com/Suhani2305/AIBasedTrafficManagement",
    tags: ["Python", "OpenCV", "Streamlit", "NumPy", "Pandas", "Scikit-learn", "Plotly"],
    fullDescription: "AIBasedTrafficManagement is a state-of-the-art traffic management solution leveraging computer vision and machine learning to analyze traffic patterns, detect vehicles, and provide real-time insights. This system helps traffic authorities make data-driven decisions to improve traffic flow and reduce congestion.",
    features: [
      "Real-time vehicle detection",
      "Vehicle classification",
      "Movement tracking",
      "Density analysis",
      "Real-time monitoring",
      "Pattern analysis",
      "Peak hour identification",
      "Incident tracking",
      "Signal optimization",
      "Density monitoring",
      "Incident management",
      "Analytics dashboard",
      "Traffic forecasting",
      "Peak hour predictions",
      "Trend analysis"
    ],
    yearCompleted: "2025",
    teamSize: 1
  }
];

type FilterCategory = 'all' | 'data-science' | 'mern-stack';

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Apply filters and search
    let result = projects;
    
    // Filter by category if not 'all'
    if (activeFilter !== 'all') {
      result = result.filter(project => project.category === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        project => 
          project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(result);
  }, [activeFilter, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  // Background space elements
  const renderSpaceElements = () => {
    const elements = [];
    
    // Add planet/moon decorations
    elements.push(
      <motion.div
        key="space-planet-1"
        className="absolute w-40 h-40 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(157,78,221,0.6) 0%, rgba(86,11,173,0.3) 70%, rgba(10,4,60,0) 100%)',
          bottom: '15%',
          right: '10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
    
    elements.push(
      <motion.div
        key="space-planet-2"
        className="absolute w-64 h-64 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(157,78,221,0.7) 0%, rgba(86,11,173,0.4) 50%, rgba(10,4,60,0) 100%)',
          top: '10%',
          left: '5%',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
    
    // Add floating particles
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 4 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      elements.push(
        <motion.div
          key={`particle-${i}`}
          className="absolute bg-purple-500 rounded-full opacity-20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      );
    }
    
    return elements;
  };

  // Handle search input visibility
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery('');
    }
  };

  // Function to handle image navigation
  const handleImageNavigation = (projectId: number, direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      const project = projects.find(p => p.id === projectId);
      if (!project) return prev;
      
      const currentIndex = prev[projectId] || 0;
      const totalImages = project.images.length;
      
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }
      
      return { ...prev, [projectId]: newIndex };
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a003c 0%, #13002A 100%)' }}
    >
      {/* Space themed background */}
      <div className="absolute inset-0 overflow-hidden">
        {renderSpaceElements()}
      </div>
      
      <motion.div 
        className="container mx-auto relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-block mb-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Rocket className="h-12 w-12 text-purple-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white neon-text">My Projects</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that demonstrate my skills in data science and web development.
          </p>
        </motion.div>
        
        {/* Filters and Search */}
        <motion.div 
          className="mb-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          variants={itemVariants}
        >
          <div className="flex space-x-2">
            <Button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-900/40 text-gray-300 hover:bg-purple-800/60'
              } transition-all`}
              variant="ghost"
            >
              All Projects
            </Button>
            <Button 
              onClick={() => setActiveFilter('data-science')}
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'data-science' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-900/40 text-gray-300 hover:bg-purple-800/60'
              } transition-all`}
              variant="ghost"
            >
              Data Science
            </Button>
            <Button 
              onClick={() => setActiveFilter('mern-stack')}
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'mern-stack' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-900/40 text-gray-300 hover:bg-purple-800/60'
              } transition-all`}
              variant="ghost"
            >
              MERN Stack
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-purple-900/40 border-purple-500/30 text-white placeholder:text-gray-400 w-full md:w-64"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <Button 
              onClick={toggleSearch}
              className="bg-purple-900/40 hover:bg-purple-800/60 p-2 rounded-full"
              size="icon"
              variant="ghost"
            >
              <Search className="h-5 w-5 text-gray-300" />
            </Button>
            <Button 
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="bg-purple-900/40 hover:bg-purple-800/60 p-2 rounded-full"
              size="icon"
              variant="ghost"
              title="Reset filters"
            >
              <Filter className="h-5 w-5 text-gray-300" />
            </Button>
          </div>
        </motion.div>

        {/* Project count display */}
        {(activeFilter !== 'all' || searchQuery !== '') && (
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-300">
              Showing {filteredProjects.length} of {projects.length} projects
              {activeFilter !== 'all' && ` in ${activeFilter === 'data-science' ? 'Data Science' : 'MERN Stack'}`}
              {searchQuery !== '' && ` matching "${searchQuery}"`}
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={`${activeFilter}-${searchQuery}`}
            >
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id} 
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="space-container overflow-hidden shadow-lg hover:-translate-y-2 group border border-purple-500/20 transition-all duration-300 h-[500px] flex flex-col">
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={project.images[currentImageIndex[project.id] || 0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
                      
                      {/* Image Navigation Buttons */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageNavigation(project.id, 'prev');
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageNavigation(project.id, 'next');
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                          
                          {/* Image Counter */}
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            {currentImageIndex[project.id] + 1 || 1} / {project.images.length}
                          </div>
                        </>
                      )}
                      
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full text-white border ${
                          project.category === 'data-science' 
                            ? 'bg-purple-800/60 border-purple-500/50' 
                            : 'bg-indigo-800/60 border-indigo-500/50'
                        }`}>
                          {project.category === 'data-science' ? 'Data Science' : 'MERN Stack'}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-3 min-h-[72px]">
                        {project.description}
                      </p>
                      
                      {/* Project tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            className="bg-purple-900/40 text-purple-300 hover:bg-purple-800/60"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4 mt-auto">
                        <a 
                          href={project.demoLink} 
                          className="text-purple-300 hover:text-purple-100 font-medium transition-colors flex items-center glow-purple"
                        >
                          <ExternalLink className="h-5 w-5 mr-1" />
                          Live Demo
                        </a>
                        <a 
                          href={project.githubLink} 
                          className="text-gray-300 hover:text-white font-medium transition-colors flex items-center"
                        >
                          <Github className="h-5 w-5 mr-1" />
                          GitHub
                        </a>
                        <button 
                          onClick={() => {
                            setSelectedProject(project);
                            setIsModalOpen(true);
                          }}
                          className="ml-auto text-gray-300 hover:text-white font-medium transition-colors flex items-center group"
                        >
                          <Eye className="h-5 w-5 mr-1 group-hover:text-purple-300" />
                          <span className="group-hover:text-purple-300">Details</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16 space-container p-8 border border-purple-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-300 text-xl mb-4">No projects found matching your criteria</p>
              <Button 
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Decorative stars */}
        <motion.div
          className="absolute bottom-10 right-10"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 100, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Star className="h-16 w-16 text-purple-500/10" />
        </motion.div>
        
        <motion.div
          className="absolute top-40 left-10"
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 80, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Star className="h-12 w-12 text-purple-500/10" />
        </motion.div>
      </motion.div>
      
      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          // Small delay before removing selected project data
          setTimeout(() => setSelectedProject(null), 300);
        }} 
      />
    </section>
  );
};

export default ProjectsSection;
