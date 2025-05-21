// reusable styled button
import { useRef, useState, useEffect } from 'react';
import { FiLock, FiUnlock, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { RiArrowGoBackFill } from 'react-icons/ri';

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = '!@#$%^&*():{};|,.<>/?';

type EncryptButtonProps = {
  onClick?: () => void;
  texting: string;
  icon: string;
};

const EncryptButton = ({ onClick, texting, icon }: EncryptButtonProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [text, setText] = useState(texting);

  useEffect(() => {
    setText(texting);
  }, [texting]);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = texting
        .split('')
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= texting.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(texting);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
      className='cursor-pointer group relative overflow-hidden rounded-xl border-[1px] border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300'
    >
      <div className='relative z-10 flex items-center gap-2 cursor-pointer'>
        {icon === 'lock' ? (
          <FiUnlock />
        ) : icon === 'unlock' ? (
          <RiArrowGoBackFill />
        ) : icon === 'arrow' ? (
          <FiArrowUpRight />
        ) : (
          <FiLock />
        )}
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 1,
          ease: 'linear',
        }}
        className='duration-300 cursor-pointer absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100'
      />
    </motion.button>
  );
};

export default EncryptButton;
