//loader hook
'use client';
import { useEffect, useState } from 'react';

export function useLoader() {
  const [showLoader, setShowLoader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    if (animateOut) {
      setShowLoader(false);
    }
  };

  return { showLoader, animateOut, handleAnimationEnd };
}
