// hero section for lists page
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { HyperText } from './ui/hyper-text';
import { Blobs } from './ui/animatedBlob';

interface ListProps {
  listsRef: React.RefObject<HTMLDivElement | null>;
}

const ListsHero = ({ listsRef }: ListProps) => {
  function scrollToLists() {
    if (listsRef.current) {
      listsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div
      id='listBlob'
      className="h-screen w-screen  relative flex  before:absolute before:top-0 before:left-0 before:w-full before:h-full before:content-[''] before:opacity-[0.05] before:z-10 before:pointer-events-none  bg-[#2e3342]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 '
      >
        <HyperText
          startOnView={true}
          animateOnHover={true}
          className='text-center font-black uppercase'
        >
          Not just movies — moods
        </HyperText>
      </motion.div>
      <motion.button
        onClick={scrollToLists}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 3, delay: 1.5 }}
        className='absolute bottom-60 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-300 flex flex-col items-center'
        aria-label='Scroll down'
      >
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
        <svg
          className='w-8 h-8 mt-[-24px]'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </motion.button>

      {/* background  */}
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent shadow-[0px_0px_250px_250px_#8272ff]'></div>
      <div
        className='w-screen h-screen'
        style={{
          filter: 'blur(5px)',
        }}
      >
        <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
          <planeGeometry args={[0.026, 0.5]} />
          <Environment preset='studio' environmentIntensity={0.9} />
          <Blobs />
        </Canvas>
      </div>
    </div>
  );
};

export default ListsHero;
