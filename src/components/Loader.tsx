//loader reusable component
import React from 'react';
import { Ripple } from './ui/ripple';
import { RandomizedTextEffect } from './ui/text-randomized';

interface LoaderProps {
  animateOut: boolean;
  handleAnimationEnd: () => void;
}

const Loader: React.FC<LoaderProps> = ({ animateOut, handleAnimationEnd }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-[9999] flex items-center justify-center bg-[#9198e5] text-white font-bold text-2xl 
            
            ${
              animateOut
                ? 'pt-page-moveToTopEasing'
                : 'pt-page-moveFromBottomEasing'
            }`}
      onAnimationEnd={handleAnimationEnd}
    >
      <RandomizedTextEffect text='loading...' />
      <Ripple />
    </div>
  );
};

export default Loader;
