import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement = HTMLElement>(options?: { delay?: number; y?: number; duration?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = gsap.fromTo(ref.current,
      {
        opacity: 0,
        y: options?.y ?? 80,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: options?.duration ?? 1,
        delay: options?.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return ref;
}
