import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BarChart3, Code, HelpCircle, Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIntersectionObserver } from '@/lib/hooks';

type Skill = {
  name: string;
  percentage: number;
};

const dataSkills: { name: SkillKey; percentage: number }[] = [
  { name: 'NumPy', percentage: 95 },
  { name: 'Pandas', percentage: 90 },
  { name: 'Matplotlib', percentage: 85 },
  { name: 'Seaborn', percentage: 80 },
  { name: 'SciPy', percentage: 75 },
  { name: 'SQL', percentage: 90 },
  { name: 'Excel', percentage: 95 },
  { name: 'Power BI', percentage: 90 },
];

const mernSkills: { name: SkillKey; percentage: number }[] = [
  { name: 'MongoDB', percentage: 85 },
  { name: 'Express.js', percentage: 90 },
  { name: 'React.js', percentage: 95 },
  { name: 'Node.js', percentage: 90 },
  { name: 'Redux', percentage: 85 },
  { name: 'TailwindCSS', percentage: 95 },
  { name: 'TypeScript', percentage: 80 },
  { name: 'JavaScript', percentage: 95 },
];

type SkillKey = 'NumPy' | 'Pandas' | 'Matplotlib' | 'Seaborn' | 'SciPy' | 'SQL' | 'Excel' | 
  'MongoDB' | 'Express.js' | 'React.js' | 'Node.js' | 'Redux' | 'TailwindCSS' | 'TypeScript' | 'JavaScript' | 'Power BI';

const skillDescriptions: Record<SkillKey, string> = {
  'NumPy': 'A library for the Python programming language, adding support for large, multi-dimensional arrays and matrices.',
  'Pandas': 'A software library for data manipulation and analysis, offering data structures and operations for manipulating numerical tables.',
  'Matplotlib': 'A plotting library for Python and its numerical mathematics extension NumPy.',
  'Seaborn': 'A data visualization library based on matplotlib that provides a high-level interface for drawing attractive graphs.',
  'SciPy': 'A Python library used for scientific and technical computing.',
  'SQL': 'Structured Query Language for managing and manipulating relational databases.',
  'Excel': 'Spreadsheet software with powerful data analysis capabilities.',
  'MongoDB': 'A cross-platform document-oriented NoSQL database program.',
  'Express.js': 'A back end web application framework for Node.js for building APIs and web applications.',
  'React.js': 'A JavaScript library for building user interfaces, particularly single-page applications.',
  'Node.js': 'A JavaScript runtime environment that executes JavaScript code outside a web browser.',
  'Redux': 'A predictable state container for JavaScript apps, often used with React.',
  'TailwindCSS': 'A utility-first CSS framework for rapidly building custom designs.',
  'TypeScript': 'A strict syntactical superset of JavaScript that adds static typing to the language.',
  'JavaScript': 'A programming language that conforms to the ECMAScript specification.',
  'Power BI': 'A data visualization tool that allows users to create interactive dashboards and reports from their data.',
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const controls = useAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<SkillKey | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  // Generate some floating particles for background effect
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 6 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      particles.push(
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
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
          }}
        />
      );
    }
    return particles;
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #13002A 0%, #1a003c 100%)' }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {renderParticles()}
      </div>
      
      {/* Glowing orb in background */}
      <motion.div 
        className="absolute opacity-20 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(157,78,221,0.6) 0%, rgba(86,11,173,0.2) 70%, rgba(10,4,60,0) 100%)',
          width: '40vw',
          height: '40vw',
          top: '10%',
          right: '5%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="container mx-auto relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div 
            className="inline-block mb-4"
            animate={{
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-12 w-12 text-purple-400 mb-4" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white neon-text">My Skills</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I've developed expertise in both data science and web development, allowing me to build end-to-end solutions.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Data Science Skills */}
          <motion.div variants={itemVariants}>
            <Card className="space-container border-purple-500/20 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-purple-900/50 flex items-center justify-center mr-4 glow-purple border border-purple-500/30">
                    <BarChart3 className="h-7 w-7 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Data Science</h3>
                </div>
                
                <div className="space-y-6">
                  {dataSkills.map((skill, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div 
                            className="skill-item cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                            whileHover={{ scale: 1.02 }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <span className="font-medium text-white">{skill.name}</span>
                                <HelpCircle className="h-3.5 w-3.5 ml-1 text-purple-400" />
                              </div>
                              <span className="text-sm font-medium text-purple-300">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-purple-900/30 rounded-full h-3 overflow-hidden">
                              <motion.div 
                                className="skill-progress h-3" 
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.percentage}%` }}
                                transition={{ duration: 1.2, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                              />
                            </div>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent className="space-container p-3 max-w-xs shadow-lg rounded-lg border border-purple-500/30">
                          <p className="text-sm text-gray-200">{skillDescriptions[skill.name]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* MERN Stack Skills */}
          <motion.div variants={itemVariants}>
            <Card className="space-container border-purple-500/20 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-purple-900/50 flex items-center justify-center mr-4 glow-purple border border-purple-500/30">
                    <Code className="h-7 w-7 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">MERN Stack</h3>
                </div>
                
                <div className="space-y-6">
                  {mernSkills.map((skill, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div 
                            className="skill-item cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                            whileHover={{ scale: 1.02 }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <span className="font-medium text-white">{skill.name}</span>
                                <HelpCircle className="h-3.5 w-3.5 ml-1 text-purple-400" />
                              </div>
                              <span className="text-sm font-medium text-purple-300">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-purple-900/30 rounded-full h-3 overflow-hidden">
                              <motion.div 
                                className="skill-progress h-3" 
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.percentage}%` }}
                                transition={{ duration: 1.2, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                              />
                            </div>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent className="space-container p-3 max-w-xs shadow-lg rounded-lg border border-purple-500/30">
                          <p className="text-sm text-gray-200">{skillDescriptions[skill.name]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Floating stars */}
        <motion.div 
          className="absolute -bottom-10 left-1/4"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star className="h-12 w-12 text-purple-400/20" />
        </motion.div>
        
        <motion.div 
          className="absolute top-20 right-1/4"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star className="h-8 w-8 text-purple-400/20" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
