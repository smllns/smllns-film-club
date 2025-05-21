// intro page
'use client';

import { useEffect, useState } from 'react';
import MoviePage from '@/components/IwatchedHero';
import { DragCards } from '@/components/ui/dragCards';
import RevealSection from '@/components/RevealSection';
import { SmoothScrollHero } from '@/components/ui/smoothScrollEnd';
import { useScrollBackground } from '@/hooks/useScrollBackground';
import Loader from '@/components/Loader';
import Parallex from '@/components/Parallex';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [contentDelayed, setContentDelayed] = useState(false);

  // delaying content for loading
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      const timer = setTimeout(() => {
        setContentDelayed(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hydrated]);

  const { getBackgroundColor } = useScrollBackground();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    if (animateOut) {
      setShowLoader(false);
    }
  };

  return (
    <div
      className={`text-white min-h-screen transition-colors duration-500 ${getBackgroundColor()} `}
    >
      {/* Loader */}
      {showLoader && (
        <Loader
          animateOut={animateOut}
          handleAnimationEnd={handleAnimationEnd}
        />
      )}

      {/* Content */}
      {hydrated && contentDelayed && (
        <>
          <Parallex />
          <MoviePage />
          <DragCards />
          <SmoothScrollHero />
          <RevealSection />
        </>
      )}
    </div>
  );
}
