import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight Intersection Observer hook.
 * Returns a ref to attach to the element, and a boolean `isVisible`
 * that flips to true once the element enters the viewport (fires only once).
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // fires only once
      }
    }, { threshold: 0.12, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
