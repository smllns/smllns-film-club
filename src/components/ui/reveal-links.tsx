// animated reusable links  component
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DURATION = 0.25;
const STAGGER = 0.025;

type FlipLinkTypes = {
  children: string;
  href: string;
  className: string;
};

export const FlipLink = ({ children, href, className }: FlipLinkTypes) => {
  return (
    <motion.a
      initial='initial'
      whileHover='hovered'
      href={href}
      className={cn(
        'relative block overflow-hidden whitespace-nowrap  font-black uppercase   ',
        className
      )}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: '-100%',
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className={cn('inline-block', className)}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className={cn('absolute inset-0', className)}>
        {children.split('').map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: '100%',
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className='inline-block'
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
