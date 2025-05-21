// reusable page wrapper with loader and navbar
'use client';
import Loader from '@/components/Loader';
import NavigationBar from '@/components/NavigationBar';
import React, { useEffect, useState } from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
  bg?: string;
};

const PageWrapper = ({ bg, children }: PageWrapperProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [contentDelayed, setContentDelayed] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setContentDelayed(true), 1000);
    return () => clearTimeout(delayTimer);
  }, []);

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
    <div className=' text-white z-100'>
      {showLoader && (
        <Loader
          animateOut={animateOut}
          handleAnimationEnd={handleAnimationEnd}
        />
      )}
      {contentDelayed && (
        <div className={`${bg} relative z-200`}>
          <NavigationBar />
          {children}
        </div>
      )}
    </div>
  );
};

export default PageWrapper;
