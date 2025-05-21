/* eslint-disable @typescript-eslint/no-unused-vars */
// animated poster modal (opened/closed on click)
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useRef } from 'react';
import { X } from 'lucide-react';

interface PosterModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PosterModal({
  src,
  isOpen,
  onClose,
}: PosterModalProps) {
  const overlayRef = useRef(null);
  const rotateZ = useMotionValue(0);
  const rotateZSpring = useSpring(rotateZ, { stiffness: 250, damping: 25 });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='overlay'
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className='fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4'
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className='hidden md:block cursor-pointer absolute top-6 right-6 text-white hover:text-gray-300 transition'
            aria-label='Close poster'
          >
            <X size={32} />
          </button>
          <motion.img
            key='poster'
            src={
              src ? `https://image.tmdb.org/t/p/w500${src}` : '/noposter.jpg'
            }
            alt='poster'
            className='max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl cursor-grab active:cursor-grabbing'
            drag
            dragConstraints={overlayRef}
            dragElastic={0.25}
            dragMomentum
            style={{ rotateZ: rotateZSpring }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onPointerDown={(e) => e.stopPropagation()}
            onDrag={(e, info) => {
              const ROTATE_FACTOR = 0.08;
              const angle =
                info.offset.x * ROTATE_FACTOR -
                info.offset.y * ROTATE_FACTOR * 0.5;
              rotateZ.set(angle);
            }}
            onDragEnd={(_e, _info) => {
              // eslint-disable-line @typescript-eslint/no-unused-vars
              rotateZ.set(0);
              onClose();
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
