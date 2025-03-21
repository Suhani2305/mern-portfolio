import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Rocket, Star, Filter, Search, Eye } from 'lucide-react';
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
  image: string;
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
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets, built with Python, Pandas, and Plotly.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "data-science",
    demoLink: "#",
    githubLink: "#",
    tags: ["Python", "Pandas", "Plotly", "Data Analysis"],
    fullDescription: "A comprehensive data visualization dashboard that allows users to explore and gain insights from complex datasets. This project makes data analysis accessible to non-technical users through interactive charts, filters, and exportable reports.",
    features: [
      "Interactive charts and graphs that update in real-time",
      "Data filtering capabilities for custom views",
      "Exportable reports in PDF and CSV formats",
      "Custom visualization templates for different data types",
      "Responsive design for desktop and tablet use"
    ],
    yearCompleted: "2023",
    teamSize: 2
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce website with integrated payment systems and admin dashboard.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    category: "mern-stack",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: 3,
    title: "Predictive Analysis Tool",
    description: "Machine learning model that predicts market trends based on historical data analysis.",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "data-science",
    demoLink: "#",
    githubLink: "#",
    tags: ["Python", "Scikit-learn", "TensorFlow", "Machine Learning"]
  },
  {
    id: 4,
    title: "Social Network App",
    description: "Full-stack social media application with real-time messaging and profile customization.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    category: "mern-stack",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "Socket.io", "Redux", "Node.js"]
  },
  {
    id: 5,
    title: "Stock Market Analyzer",
    description: "Analyzes stock market data with statistical models to provide investment insights.",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "data-science",
    demoLink: "#",
    githubLink: "#",
    tags: ["Python", "Pandas", "NumPy", "Data Visualization"]
  },
  {
    id: 6,
    title: "Task Management App",
    description: "Productivity application with kanban boards, deadline tracking, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1300&q=80",
    category: "mern-stack",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"]
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
                  <Card className="space-container overflow-hidden shadow-lg hover:-translate-y-2 group border border-purple-500/20 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
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
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-4">
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
                      
                      <div className="flex space-x-4">
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
