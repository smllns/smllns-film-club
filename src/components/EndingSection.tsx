// third section on intro page
'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { BoxReveal } from './ui/box-reveal';
import { VelocityScroll } from './ui/scroll-based-velocity';

export function EndingSection() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      id='trains'
      ref={container}
      className='relative flex items-center justify-center h-screen overflow-hidden'
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className='relative z-10 py-10 text-white w-full h-full flex flex-col justify-between'>
        <div className='pt-10'>
          <BoxReveal boxColor={'#FF9A9A'} duration={1}>
            <p className='text-right text-2xl md:text-4xl min-[320px]:px-4 md:px-6 lg:px-8'>
              This isn’t just a website. It’s a mood. It’s a vibe. It’s cinema,
              in code.
            </p>
          </BoxReveal>
        </div>
        <VelocityScroll numRows={2} className='pb-10' defaultVelocity={1}>
          Choose stories. Choose style. Choose syntax that speaks. Choose films
          that changed you. Choose code that moves like cinema. Choose colors,
          frames, timing, rhythm. Choose React. Choose reusability. Choose bugs
          that ruin the plot. Choose fixing them like an editor cuts scenes.
          Choose meaning. Choose motion. Choose your own aesthetic in every
          file.
        </VelocityScroll>
      </div>
      <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
        {/* background video  */}
        <motion.div
          style={{ y }}
          className='relative w-full h-full object-cover bg-black z-[1]'
        >
          <video
            className='block w-full h-full object-cover brightness-70'
            autoPlay
            muted
            loop
            playsInline
          >
            <source src='/outro.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </div>
  );
}
