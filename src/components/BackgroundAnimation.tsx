// adapted from a CodePen concept: https://codepen.io/petebarr/pen/zYxPgKg
'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BackgroundAnimationProps {
  backgroundColor?: string;
  circleColor?: string;
  mainRef: React.RefObject<HTMLDivElement | null>;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  backgroundColor = '#A5B229',
  circleColor = '#8dc0af',
  mainRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const masterTimeline = useRef<gsap.core.Timeline | null>(null);
  function scrollToMain() {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  //rerender on width change logic
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const screenHeight = window.screen.height;
    const updateWidth = () =>
      setViewport((prev) => ({
        width: window.innerWidth,
        height: prev.height || screenHeight,
      }));

    updateWidth();
    const onResize = () => {
      if (window.innerWidth !== viewport.width) updateWidth();
    };

    const onOrientation = () =>
      setViewport({
        width: window.innerWidth,
        height: window.screen.height,
      });

    window.addEventListener('resize', onResize);
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', onOrientation);

    return () => {
      window.removeEventListener('resize', onResize);
      window
        .matchMedia('(orientation: portrait)')
        .removeEventListener('change', onOrientation);
    };
  }, [viewport.width]);

  //animation
  useLayoutEffect(() => {
    if (!containerRef.current || !svgRef.current || !viewport.width) return;

    const circles = svgRef.current.querySelectorAll('.circles circle');
    const text = document.getElementById('texting');
    const nextsec = document.getElementById('nextsec');

    const tl = gsap.timeline();
    tl.fromTo(
      circles,
      { y: viewport.height * 2 },
      {
        y: 0,
        ease: 'expo',
        duration: 4,
        stagger: { each: -0.15 },
      }
    )
      .fromTo(
        text,
        { y: -viewport.height * 2, scale: 0.1 },
        {
          y: 0,
          scale: 1,
          ease: 'expo',
          duration: 3,
        },
        1.5
      )
      .fromTo(
        nextsec,
        { opacity: 0 },
        {
          opacity: 0.6,
          ease: 'expo',
          duration: 3,
        },
        3
      )
      .to(
        circles,
        {
          scale: 0.85,
          ease: 'back(4)',
          duration: 0.47,
          stagger: { each: -0.06, repeat: -1, yoyo: true },
          transformOrigin: 'center center',
        },
        0.5
      );

    masterTimeline.current?.kill();
    masterTimeline.current = tl;
  }, [viewport]);

  if (!viewport.width) return null;

  return (
    <div ref={containerRef} className='w-screen h-screen overflow-hidden'>
      <div
        id='texting'
        className='absolute  w-full flex text-center mx-auto px-4 justify-center items-center z-10 uppercase text-white text-4xl md:text-5xl lg:text-6xl font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      >
        my full film collection
      </div>
      <div
        id='nextsec'
        className='absolute  w-full flex text-center mx-auto px-4 justify-center items-center z-10 uppercase text-white text-4xl md:text-5xl lg:text-6xl font-black top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
      >
        <button
          onClick={scrollToMain}
          className='text-white animate-bounce cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center text-center'
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
        </button>
      </div>

      <svg
        ref={svgRef}
        className='absolute inset-0 w-full h-full'
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${viewport.width} ${viewport.height}`}
        preserveAspectRatio='xMidYMid slice'
      >
        <g fill='none' fillRule='evenodd'>
          <rect
            width={viewport.width}
            height={viewport.height}
            fill={backgroundColor}
          />
          <g className='circles' transform='translate(0 0)'>
            {[1, 0.85, 0.72, 0.61, 0.52, 0.44, 0.38, 0.32].map((scale, i) => {
              const isMobile = viewport.width < 640;
              const baseRadius = isMobile
                ? viewport.width / 1.5
                : viewport.width / 3;

              return (
                <circle
                  key={i}
                  cx={viewport.width / 2}
                  cy={viewport.height / 2}
                  r={baseRadius * scale}
                  fill={circleColor}
                  style={{ mixBlendMode: 'multiply' }}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BackgroundAnimation;
