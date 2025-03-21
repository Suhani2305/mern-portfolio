import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '0px' }: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
}

export function useScrollToHash() {
  useEffect(() => {
    // Smooth scroll to anchor links
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        // Update URL without triggering page reload
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
