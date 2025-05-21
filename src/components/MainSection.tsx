// second section on intro page
'use client';
import MouseImageTrail from './ui/mouseImageTrail';
import { TextReveal } from './ui/text-reveal';

export function MainSection({
  mainRef,
}: {
  mainRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        '/trail1.jpeg',
        '/trail2.jpeg',
        '/trail3.jpeg',
        '/trail4.jpeg',
        '/trail5.jpeg',
        '/trail6.jpeg',
        '/trail7.jpeg',
        '/trail8.jpeg',
        '/trail9.jpeg',
        '/trail10.jpeg',
        '/trail11.jpeg',
        '/trail12.jpeg',
        '/trail13.jpeg',
        '/trail14.jpeg',
        '/trail15.jpeg',
        '/trail16.jpeg',
      ]}
    >
      <div
        ref={mainRef}
        className='flex justify-center min-h-[200vh] items-center bg-[#FF9A9A]'
      >
        <div className='flex flex-col'>
          <TextReveal className='text-black z-100'>
            I love movies. I love to code. So I mixed both — and boom, this
            project was born. Sit back. Scroll down. Enjoy the ride.
          </TextReveal>
          <p className='min-[320px]:hidden absolute bottom-50 left-1/2 sm:block text-xl md:text-2xl font-light text-center max-w-[60vw] leading-none text-black z-100 '>
            (move your cursor around for fun)
          </p>
          <p className='min-[320px]:block sm:hidden absolute bottom-50 right-5 text-xl md:text-2xl font-light text-center max-w-[60vw] leading-none text-black z-100 '>
            (tap the screen for fun)
          </p>
        </div>
      </div>
    </MouseImageTrail>
  );
}
