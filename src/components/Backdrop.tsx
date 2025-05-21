// backdrop image for single movie page
'use client';
import { motion } from 'framer-motion';
import { BackButton } from './BackButton';

const Backdrop = ({ src }: { src: string | null }) => (
  <div className='relative max-w-[1280px] mx-auto  h-[40vh] w-full overflow-hidden bg-neutral-800'>
    <BackButton top={'top-4'} />

    <div className='relative h-full w-full mx-auto'>
      <motion.img
        src={src ? `https://image.tmdb.org/t/p/w1280${src}` : '/nobackdrop.jpg'}
        alt='movie backdrop'
        className='absolute top-0 left-0 w-full h-full object-cover filter brightness-110'
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-800' />
      <div className='absolute hidden lg:block top-0 left-0 h-full w-1/12 bg-gradient-to-r from-neutral-800 to-transparent' />
      <div className='absolute hidden lg:block top-0 right-0 h-full w-1/12 bg-gradient-to-l from-neutral-800 to-transparent' />
    </div>
  </div>
);
export default Backdrop;
