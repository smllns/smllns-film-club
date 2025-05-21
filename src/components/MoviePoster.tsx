// movie poster component for single movie page
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Magnet from './ui/magnetic-effect';

const MoviePoster = ({
  setIsModalOpen,
  posterRef,
  src,
  handleLoad,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  posterRef: React.RefObject<HTMLImageElement | null>;
  src: string;
  handleLoad: React.ReactEventHandler<HTMLImageElement>;
}) => {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleResize = () => setIsMdUp(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const Poster = (
    <button onClick={() => setIsModalOpen(true)} className='focus:outline-none'>
      <motion.img
        ref={posterRef}
        src={src ? `https://image.tmdb.org/t/p/w500${src}` : '/noposter.jpg'}
        alt='movie poster'
        width={500}
        height={750}
        className='min-[320px]:max-h-[200px] sm:max-h-[300px] md:max-h-[400px] w-auto rounded-xl shadow-lg object-cover cursor-pointer'
        onLoad={handleLoad}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </button>
  );

  return (
    <div className='w-30vw flex-shrink-0'>
      {isMdUp ? (
        <Magnet strength={0.3} ease='elastic.out(0.5, 0.1)'>
          {Poster}
        </Magnet>
      ) : (
        Poster
      )}
    </div>
  );
};

export default MoviePoster;
