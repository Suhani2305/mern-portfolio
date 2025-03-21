import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AdminMessages from "@/components/AdminMessages";
import { useScrollToHash } from "@/lib/hooks";
import { Route, Switch } from "wouter";

function App() {
  // Enable smooth scrolling to anchor links
  useScrollToHash();
  
  // Create stars dynamically for our space theme
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDuration = 3 + Math.random() * 5;
      const animationDelay = Math.random() * 5;
      
      stars.push(
        <div 
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`
          }}
        />
      );
    }
    
    // Add a few shooting stars
    for (let i = 0; i < 3; i++) {
      const width = 50 + Math.random() * 100;
      const left = Math.random() * 70;
      const top = Math.random() * 70;
      const animationDelay = 1 + Math.random() * 10;
      
      stars.push(
        <div 
          key={`shooting-${i}`}
          className="shooting-star"
          style={{
            width: `${width}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${animationDelay}s`
          }}
        />
      );
    }
    
    return stars;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen transition-colors duration-300 relative overflow-hidden">
          {/* Starry background */}
          <div className="stars">
            {renderStars()}
          </div>
          
          <Switch>
            <Route path="/admin/messages">
              <AdminMessages />
            </Route>
            <Route>
              <>
                <Header />
                <main>
                  <HeroSection />
                  <SkillsSection />
                  <ProjectsSection />
                  <ContactSection />
                </main>
                <Footer />
                <ScrollToTop />
              </>
            </Route>
          </Switch>
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
