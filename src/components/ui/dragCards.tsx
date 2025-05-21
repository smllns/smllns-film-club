//animation for fourth section on intro page
'use client';
import React, { RefObject, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const DragCards = () => {
  return (
    <section
      id='drag'
      className='relative grid min-h-screen w-full place-content-center overflow-hidden '
    >
      {/* background text  */}
      <h2 className='relative z-0 min-[320px]:text-2xl sm:text-5xl lg:text-7xl font-bold text-white '>
        i've rated over{' '}
        <span className='text-[#FF9A9A] font-black'> 2,000 </span> movies
      </h2>
      <Cards />
    </section>
  );
};

// draggable cards
const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className='absolute inset-0 z-10' ref={containerRef}>
      <Card
        containerRef={containerRef}
        src='poster1.jpeg'
        alt='Example image'
        rotate='6deg'
        top='20%'
        left='25%'
        className='w-36 md:w-56'
      />
      <Card
        containerRef={containerRef}
        src='poster7.jpeg'
        alt='Example image'
        rotate='12deg'
        top='45%'
        left='60%'
        className='w-24 md:w-48'
      />
      <Card
        containerRef={containerRef}
        src='poster3.jpeg'
        alt='Example image'
        rotate='-6deg'
        top='20%'
        left='40%'
        className='w-52 md:w-60'
      />
      <Card
        containerRef={containerRef}
        src='poster4.jpeg'
        alt='Example image'
        rotate='8deg'
        top='50%'
        left='40%'
        className='w-48 md:w-72'
      />
      <Card
        containerRef={containerRef}
        src='poster5.jpeg'
        alt='Example image'
        rotate='18deg'
        top='20%'
        left='65%'
        className='w-40 md:w-64'
      />
      <Card
        containerRef={containerRef}
        src='poster2.jpeg'
        alt='Example image'
        rotate='-3deg'
        top='35%'
        left='55%'
        className='w-24 md:w-48'
      />
    </div>
  );
};

interface CardProps {
  containerRef?: RefObject<HTMLElement | null>;
  src: string;
  alt?: string;
  top?: number | string;
  left?: number | string;
  rotate?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  containerRef,
  src,
  alt = '',
  top,
  left,
  rotate,
  className,
}) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll('.drag-elements');

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue('z-index')
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        'drag-elements absolute w-48 bg-[#272826] rounded-lg p-1 ',
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragMomentum={true}
      dragElastic={0.5}
    />
  );
};
