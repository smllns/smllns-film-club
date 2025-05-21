// card for showing errors in hero search component
'use client';
import { AnimatedList } from './ui/animated-list';
type NotificationCardProps = {
  title: string;
  description: string;
};

export const NotificationCard = ({
  title,
  description,
}: NotificationCardProps) => (
  <div className='w-full max-w-2xl px-4 absolute bottom-[-23vh] left-1/2 transform -translate-x-1/2'>
    <AnimatedList>
      <figure
        className='relative mx-auto min-h-fit w-full max-w-[800px] cursor-pointer overflow-hidden rounded-2xl p-4
                  transition-all duration-200 ease-in-out hover:scale-[103%] hover:bg-black/5
                  transform-gpu bg-transparent backdrop-blur-md 
                  [border:1px_solid_rgba(255,255,255,.1)] 
                  [box-shadow:0_-20px_80px_-20px_#e75e5e79_inset]'
      >
        <div className='flex flex-col overflow-hidden'>
          <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium text-white'>
            <span className='text-md sm:text-lg'>{title}</span>
          </figcaption>
          <p className='text-md font-normal text-white/60'>{description}</p>
        </div>
      </figure>
    </AnimatedList>
  </div>
);
