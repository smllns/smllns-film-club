// reusable hero section for list page
'use client';
import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { SparklesText } from './ui/sparkles-text';
import { BackButton } from './BackButton';

interface ListProps {
  mainRef: React.RefObject<HTMLDivElement | null>;
  title: string;
  description: string;
  video: string;
  brightness: string;
}

const ListHero = ({
  mainRef,
  title,
  description,
  video,
  brightness,
}: ListProps) => {
  function scrollToMain() {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  return (
    <div className='relative min-h-screen  overflow-hidden'>
      <motion.div
        style={{ y }}
        className='relative  min-h-screen flex items-center justify-center'
      >
        <BackButton top='top-28' />
        {/* video background */}
        <video
          muted
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 ${brightness}`}
          autoPlay
          loop
          playsInline
          preload='auto'
        >
          <source src={video} type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* main content */}

        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
          className='text-center flex flex-col items-center justify-center '
        >
          <SparklesText className=' min-[320px]:text-5xl md:text-6xl'>
            {title}
          </SparklesText>
          <p className='px-4 text-white z-10 min-[320px]:text-lg md:text-xl'>
            {description}
          </p>
        </motion.div>
        <motion.button
          onClick={scrollToMain}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 1 }}
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
      </motion.div>
    </div>
  );
};

export default ListHero;
