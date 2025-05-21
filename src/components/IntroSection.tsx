// first section on intro page
'use client';
import { useEffect, useRef, useState } from 'react';
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from 'framer-motion';
import TextAnimate from './ui/text-animate';
import { PointerHighlight } from './ui/pointer-highlight';

interface Props {
  mainRef: React.RefObject<HTMLDivElement | null>;
}

export function IntroSection({ mainRef }: Props) {
  const [showArrow, setShowArrow] = useState(false);
  const hasScrolled = useRef(false);
  const { scrollY } = useScroll();

  function scrollToMain() {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      if (value > 10) {
        hasScrolled.current = true;
      }
    });

    const timeout = setTimeout(() => {
      if (!hasScrolled.current) {
        scrollToMain();
      }
    }, 24000);

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);

  return (
    <div className='h-screen overflow-hidden'>
      <motion.div style={{ y }} className='relative h-full '>
        <div
          id='intro-text'
          className='z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'
        >
          <TextAnimate
            text='Hi, this is SMLLNS speaking.'
            type='popIn'
            onComplete={() => {
              setShowArrow(true);
            }}
            highlightWord={'SMLLNS'}
            highlightWrapper={(children) => (
              <PointerHighlight
                rectangleClassName='bg-[#ff9a9a95] border-[#ff9a9a95] leading-loose rounded-lg'
                pointerClassName='text-[#FF9A9A] h-5 w-5'
                containerClassName='inline-block ml-1'
              >
                {children}
              </PointerHighlight>
            )}
          />
        </div>

        <AnimatePresence>
          {showArrow && (
            <motion.button
              onClick={scrollToMain}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
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
          )}
        </AnimatePresence>

        {/* background video  */}
        <video
          className='block w-full h-full object-cover brightness-50'
          autoPlay
          muted
          loop
          playsInline
        >
          <source src='/introSm.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
}
