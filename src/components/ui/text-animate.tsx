// reusable text animation with lots of variations
'use client';

import React, { FC, JSX, useEffect, useRef } from 'react';
import { HTMLMotionProps, motion, useAnimation, useInView } from 'motion/react';

type AnimationType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'popIn'
  | 'shiftInUp'
  | 'rollIn'
  | 'whipIn'
  | 'whipInUp'
  | 'calmInUp';

interface Props extends HTMLMotionProps<'div'> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  onComplete?: () => void;
  highlightWord?: string;
  highlightWrapper?: (children: React.ReactNode) => JSX.Element;
}

const animationVariants = {
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.3 },
      }),
    },
    child: {
      visible: {
        opacity: 1,
        y: [0, -10, 0],
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: { opacity: 0, y: 10 },
    },
  },
  fadeInUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    },
    child: {
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      hidden: { opacity: 0, y: 20 },
    },
  },
  popIn: {
    container: {
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 },
      },
    },
    child: {
      visible: {
        opacity: 1,
        scale: 1.1,
        transition: { type: 'spring', damping: 15, stiffness: 400 },
      },
      hidden: { opacity: 0, scale: 0 },
    },
  },
  calmInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: '200%',
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.125, 0.92, 0.69, 0.975],
          duration: 0.75,
        },
      },
    },
  },
  shiftInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: '100%', // Starting from below but not too far to ensure a dramatic but manageable shift.
        transition: {
          ease: [0.75, 0, 0.25, 1], // Starting quickly
          duration: 0.6, // Shortened duration for a more dramatic start
        },
      },
      visible: {
        y: 0,
        transition: {
          duration: 0.8, // Slightly longer to accommodate the slow middle and swift end
          ease: [0.22, 1, 0.36, 1], // This easing function starts quickly (dramatic shift), slows down (slow middle), and ends quickly (clean swift end)
        },
      },
    },
  },

  whipInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: '200%',
        transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.45 },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.5, -0.15, 0.25, 1.05],
          duration: 0.75,
        },
      },
    },
  },
  rollIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.8,
          ease: [0.65, 0, 0.75, 1],
        },
      },
    },
  },
  whipIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.35em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.45,

          ease: [0.85, 0.1, 0.9, 1.2],
        },
      },
    },
  },
};

const TextAnimate: FC<Props> = ({
  text,
  type = 'whipInUp',
  onComplete,
  highlightWord,
  highlightWrapper,
  ...props
}: Props) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const { container, child } = animationVariants[type];

  const ctrls = useAnimation();

  useEffect(() => {
    if (isInView) {
      ctrls.start('visible');
    }
    if (!isInView) {
      ctrls.start('hidden');
    }
  }, [ctrls, isInView]);

  if (type === 'rollIn' || type === 'whipIn') {
    return (
      <h2 className='mt-10 text-3xl font-black text-white py-5 pb-8 px-8 md:text-5xl'>
        {text.split(' ').map((word, index) => {
          return (
            <motion.span
              ref={ref}
              className='inline-block mr-[0.25em] whitespace-nowrap'
              aria-hidden='true'
              key={index}
              initial='hidden'
              animate='visible'
              variants={container}
              transition={{
                delayChildren: index * 0.13,
                staggerChildren: 0.025,
              }}
            >
              {word.split('').map((character, index) => {
                return (
                  <motion.span
                    aria-hidden='true'
                    key={index}
                    variants={child}
                    className='inline-block -mr-[0.01em]'
                  >
                    {character}
                  </motion.span>
                );
              })}
            </motion.span>
          );
        })}
      </h2>
    );
  }

  return (
    <motion.h2
      style={{
        display: 'inline-block',
        whiteSpace: 'normal',
      }}
      role='heading'
      variants={container}
      initial='hidden'
      animate='visible'
      onAnimationComplete={onComplete}
      className='mt-10 text-4xl font-black text-white py-5 pb-8 px-8 md:text-5xl '
      {...props}
    >
      {text.split(' ').map((word, wordIndex) => {
        const isHighlight = highlightWord && word === highlightWord;

        const processedWord = word.split('').map((letter, letterIndex) => (
          <motion.span key={letterIndex} variants={child}>
            {letter}
          </motion.span>
        ));

        const wrappedContent =
          isHighlight && highlightWrapper
            ? highlightWrapper(
                <motion.span
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: 'inline-block' }}
                >
                  {processedWord}
                </motion.span>
              )
            : processedWord;

        return (
          <span
            key={wordIndex}
            className='inline-block mr-[0.25em] whitespace-nowrap'
          >
            {wrappedContent}
          </span>
        );
      })}
    </motion.h2>
  );
};

export default TextAnimate;
