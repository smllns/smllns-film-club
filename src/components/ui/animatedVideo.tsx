// just reusable animation can be used on different components
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedVideo = ({
  children,
  direction,
  className,
  onVisible,
}: {
  children: React.ReactNode;
  direction: 'left' | 'right';
  className?: string;
  onVisible?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const variants = {
    hidden: {
      x: direction === 'right' ? 200 : -200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      onAnimationComplete={() => {
        if (onVisible && isInView) {
          onVisible();
        }
      }}
    >
      {children}
    </motion.div>
  );
};
export default AnimatedVideo;
