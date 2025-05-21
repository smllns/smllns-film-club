// images parallax component used on intro page
'use client';
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import ReactLenis from 'lenis/react';

import { useEffect, useRef, useState } from 'react';

export const SmoothScrollHero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 60,
        opacity: 1,
        transition: { duration: 1, ease: 'easeOut' },
      });
    } else {
      controls.start({
        y: 100,
        opacity: 0,
        transition: { duration: 1, ease: 'easeIn' },
      });
    }
  }, [inView, controls]);

  return (
    <div id='scrollsec'>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <motion.p
          ref={ref}
          initial={{ y: 100, opacity: 0 }}
          animate={controls}
          className='z-30 text-white text-nowrap text-center pt-20 font-bold min-[320px]:text-3xl md:text-8xl'
        >
          STAY HERE FOR
        </motion.p>

        <Hero />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  const heroRef = useRef(null);
  const [sectionStart, setSectionStart] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    if (heroRef.current) {
      const { offsetTop, offsetHeight } = heroRef.current;
      setSectionStart(offsetTop);
      setSectionHeight(offsetHeight);
    }
  }, []);
  return (
    <div
      ref={heroRef}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className='relative w-full'
    >
      <CenterImage
        sectionStart={sectionStart}
        sectionEnd={sectionStart + sectionHeight}
      />

      <ParallaxImages />
    </div>
  );
};

type CenterImageProps = {
  sectionStart: number;
  sectionEnd: number;
};

const CenterImage: React.FC<CenterImageProps> = ({
  sectionStart,
  sectionEnd,
}) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [sectionStart, sectionEnd], [25, 0]);
  const clip2 = useTransform(scrollY, [sectionStart, sectionEnd], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );

  const opacity = useTransform(scrollY, [sectionStart, sectionEnd], [1, 0]);

  return (
    <motion.div
      className='sticky top-0 h-screen w-full '
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: 'url(/vibe.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className='mx-auto max-w-5xl px-4 pt-[200px]'>
      <ParallaxImg
        src='feeling.jpg'
        alt='And example of a space launch'
        start={-200}
        end={200}
        className='w-1/3'
      />
      <ParallaxImg
        src='love.jpg'
        alt='An example of a space launch'
        start={200}
        end={-250}
        className='mx-auto w-2/3'
      />
      <ParallaxImg
        src='swirl.jpg'
        alt='Orbiting satellite'
        start={-200}
        end={200}
        className='ml-auto w-1/3'
      />
      <ParallaxImg
        src='passion.jpg'
        alt='Orbiting satellite'
        start={0}
        end={-500}
        className='ml-24 w-5/12'
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-expect-error
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
