// reusable styled grid
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  className?: string;
  posterUrl?: string;
  rating?: string;
  year: number;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid max-w-7xl mx-auto w-full min-[320px]:auto-rows-[16rem] md:auto-rows-[22rem] lg:auto-rows-[30rem] xl:auto-rows-[35rem]  grid-cols-2 md:grid-cols-3 min-[320px]:gap-4 lg:gap-6 xl:gap-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// reusable styled card
const BentoCard = ({
  title,
  className,
  posterUrl,
  rating,
  year,
  ...props
}: BentoCardProps) => (
  <div
    key={title}
    className={cn(
      'group relative flex flex-col justify-end overflow-hidden rounded-xl ',
      'transform-gpu  border border-neutral-900  [box-shadow:0_-20px_80px_-20px_#ffffff65_inset]',
      className
    )}
    style={{
      backgroundImage: `url(${posterUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    {...props}
  >
    <Link
      href={`/movies/${slugify(title)}?title=${encodeURIComponent(
        title
      )}&year=${year}`}
    >
      <div className='absolute inset-0 bg-black/30 z-0' />

      <div className='pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 transition-all duration-300 group-hover:-translate-y-10 bg-black/30 group-hover:bg-transparent'>
        <h3 className='text-xl font-semibold text-neutral-200'>{title}</h3>
        <p className='max-w-lg text-neutral-300'>{year}</p>
        <p className='max-w-lg text-neutral-300'>my rating: {rating}/5</p>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute bottom-0  flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
        )}
      >
        <div className='flex flex-row gap-2 justify-center items-center'>
          <p>Discover more</p>
          <FiArrowUpRight className='h-4 w-4 rtl:rotate-180' />
        </div>
      </div>
      <div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300  group-hover:bg-neutral-800/10' />
    </Link>
  </div>
);

export { BentoCard, BentoGrid };
