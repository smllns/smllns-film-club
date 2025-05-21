// card component for lists
'use client';
import Image from 'next/image';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import EncryptButton from './encryptBtn';
import { useRouter } from 'next/navigation';

interface CardProps {
  i: number;
  title: string;
  description: string;
  shortDescription: string;
  src: string;
  slug: string;
  color: string;
  shadow: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export default function Card({
  i,
  title,
  description,
  shortDescription,
  src,
  slug,
  color,
  shadow,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });
  const router = useRouter();
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const content = (
    <>
      <Image fill src={`/${src}`} alt='image' className='object-cover' />
    </>
  );

  return (
    <div
      ref={container}
      className={`h-screen flex items-center justify-center sticky top-10 max-w-[1280px] mx-auto`}
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative  h-[70%] w-full rounded-3xl p-10 ${shadow}  `}
      >
        <h2 className='text-center m-0 text-3xl font-black '>{title}</h2>
        <div
          className={`flex min-[320px]:flex-col md:flex-row h-full min-[320px]:mt-4 md:mt-10 gap-4 justify-center items-center`}
        >
          <div
            className={`w-full flex flex-col justify-around min-[320px]:hidden md:flex gap-4  md:w-2/5 relative h-full`}
          >
            <p className='text-lg'>{description}</p>
            <div className='w-full flex justify-center'>
              <div className='w-fit'>
                <EncryptButton
                  onClick={() => router.push(`/lists/${slug}`)}
                  texting='explore'
                  icon='arrow'
                />
              </div>
            </div>
          </div>
          <div
            className={`w-full text-center min-[320px]:block md:hidden  md:w-2/5 relative h-fit`}
          >
            <p className='text-lg'>{shortDescription}</p>
          </div>

          <div
            className={`relative min-[320px]:w-full md:w-3/5 h-full rounded-xl overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image
                fill
                src={`/${src}`}
                alt='image'
                className='object-cover md:cursor-pointer'
                onClick={() => {
                  if (isDesktop) {
                    router.push(`/lists/${slug}`);
                  }
                }}
              />
            </motion.div>
          </div>
        </div>
        <div className='md:hidden min-[320px]:flex justify-center w-full mt-4'>
          <div className='w-fit'>
            <EncryptButton
              onClick={() => router.push(`/lists/${slug}`)}
              texting='explore'
              icon='arrow'
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
