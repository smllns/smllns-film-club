//smooth scroll hook
'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';

export const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};
