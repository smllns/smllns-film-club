// adapted simplified text animation
import { motion } from 'framer-motion';
const rollIn = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
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
        duration: 0.65,
        ease: [0.65, 0, 0.75, 1],
      },
    },
  },
};

type AnimatedTitleProps = {
  text?: string;
};

export const AnimatedTitle = ({ text = 'Movie title' }: AnimatedTitleProps) => {
  return (
    <motion.h1
      className='min-[320px]:text-xl min-[350px]:text-2xl md:text-3xl lg:text-4xl font-black min-[320px]:mb-1 md:mb-2 flex flex-wrap'
      variants={rollIn.container}
      initial='hidden'
      animate='visible'
    >
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className='inline-block mr-[0.25em]'>
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={rollIn.child}
              className='inline-block'
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};
