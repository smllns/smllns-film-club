// hook for checking if section is in view
'use client';
import { useEffect } from 'react';

export function useSectionInView(callback: () => void) {
  useEffect(() => {
    const target = document.getElementById('random');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) {
          callback();
        }
      },
      {
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [callback]);
}
