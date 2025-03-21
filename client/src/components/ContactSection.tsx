import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Linkedin, Github, Twitter, MessageSquare, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useIntersectionObserver } from '@/lib/hooks';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const [formSubmitStatus, setFormSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormSubmitStatus('idle');
    
    try {
      // Simulate network latency for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const res = await apiRequest('POST', '/api/contact', data);
      const result = await res.json();
      
      setFormSubmitStatus('success');
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form after delay to show success state
      setTimeout(() => {
        form.reset();
        setFormSubmitStatus('idle');
      }, 2000);
      
    } catch (error) {
      setFormSubmitStatus('error');
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // Render space background elements
  const renderSpaceElements = () => {
    const elements = [];
    
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
            y: [0, -80, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      );
    }
    
    // Add glowing orbs
    elements.push(
      <motion.div
        key="glow-orb-1"
        className="absolute rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(157,78,221,0.5) 0%, rgba(86,11,173,0.2) 70%, rgba(10,4,60,0) 100%)',
          width: '30vw',
          height: '30vw',
          top: '10%',
          left: '-5%',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
    
    elements.push(
      <motion.div
        key="glow-orb-2"
        className="absolute rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(157,78,221,0.5) 0%, rgba(86,11,173,0.2) 70%, rgba(10,4,60,0) 100%)',
          width: '40vw',
          height: '40vw',
          bottom: '0%',
          right: '-10%',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
    
    return elements;
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #13002A 0%, #0a0015 100%)' }}
    >
      {/* Space background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {renderSpaceElements()}
      </div>
      
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
            <MessageSquare className="h-12 w-12 text-purple-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white neon-text">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out if you have a project in mind.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <Card className="space-container border-purple-500/20 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Form</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-pink-300" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email"
                              {...field} 
                              className="bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-pink-300" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..." 
                              rows={5}
                              {...field} 
                              className="resize-none bg-purple-900/30 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            />
                          </FormControl>
                          <FormMessage className="text-pink-300" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className={`w-full text-white ${
                        formSubmitStatus === 'success' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : formSubmitStatus === 'error'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'gradient-button'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div 
                          className="flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                          Sending...
                        </motion.div>
                      ) : formSubmitStatus === 'success' ? (
                        <motion.div 
                          className="flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Message Sent!
                        </motion.div>
                      ) : formSubmitStatus === 'error' ? (
                        <motion.div 
                          className="flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Error - Try Again
                        </motion.div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="flex flex-col justify-between"
            variants={itemVariants}
          >
            <div className="mb-8 space-container border-purple-500/20 p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <ul className="space-y-8">
                <motion.li 
                  className="flex items-start" 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center mr-4 glow-purple">
                    <Mail className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-purple-300">Email</h4>
                    <a href="mailto:pushpendrarawat868@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    pushpendrarawat868@gmail.com
                    </a>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center mr-4 glow-purple">
                    <MapPin className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-purple-300">Location</h4>
                    <p className="text-gray-300">
                      Mathura, Uttar Pradesh, India
                    </p>
                  </div>
                </motion.li>
              </ul>
            </div>
            
            <div className="space-container border-purple-500/20 p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Connect With Me</h3>
              <div className="flex space-x-4">
                <motion.a 
                  href="https://www.linkedin.com/in/suhanirawat2305/" 
                  className="w-12 h-12 bg-purple-900/50 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-300 hover:text-white transition-colors glow-purple"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                
                <motion.a 
                  href="https://github.com/Suhani2305" 
                  className="w-12 h-12 bg-purple-900/50 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-300 hover:text-white transition-colors glow-purple"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-12 h-12 bg-purple-900/50 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-300 hover:text-white transition-colors glow-purple"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-12 h-12 bg-purple-900/50 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-300 hover:text-white transition-colors glow-purple"
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute right-10 bottom-40 z-0"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            >
              <Sparkles className="h-12 w-12 text-purple-500/10" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
