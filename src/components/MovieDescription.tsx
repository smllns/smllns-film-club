// styled accordion for single movie page
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const MovieDescription = ({
  setOpen,
  open,
  collapsedHeight,
  overviewRef,
  description,
  showGradient,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapsedHeight: number;
  overviewRef: React.RefObject<HTMLParagraphElement | null>;
  description: string;
  showGradient: boolean;
}) => {
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className='relative cursor-pointer text-md sm:text-lg md:text-xl opacity-70'
    >
      <motion.div
        animate={{
          maxHeight: open ? 1000 : collapsedHeight || 100,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={cn('relative overflow-hidden')}
      >
        <p ref={overviewRef} className='leading-relaxed'>
          {description
            ? description
            : "Oops i couldn't find any descriptions of this movie on TMDB"}
        </p>

        <AnimatePresence>
          {!open && showGradient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-neutral-800 via-neutral-800/60 to-transparent'
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MovieDescription;
