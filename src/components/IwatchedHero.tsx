// section used on intro page
'use client';
import { NumberTicker } from './ui/number-ticker';
import AnimatedVideo from './ui/animatedVideo';
import { Safari } from './ui/safariMarkup';
import { Iphone15Pro } from './ui/iphoneMarkup';
import TextAnimate from './ui/text-animate';
import { PointerHighlight } from './ui/pointer-highlight';

export default function MoviePage() {
  return (
    <div
      id='watched'
      className='relative flex flex-col items-center justify-around gap-8 text-center z-20  text-white min-h-[100vh] py-16 overflow-x-hidden'
    >
      <div className='text-3xl sm:text-5xl font-bold z-20 '>
        <div id='watchedText' className='z-10  '>
          <TextAnimate
            text="I've watched over"
            type='popIn'
            className='text-white font-bold py-0 '
            highlightWord={'watched'}
            highlightWrapper={(children) => (
              <PointerHighlight
                rectangleClassName='bg-[#ff9a9a95] border-[#ff9a9a95] leading-loose rounded-lg'
                pointerClassName='text-[#FF9A9A] h-5 w-5'
                containerClassName='inline-block ml-1'
              >
                {children}
              </PointerHighlight>
            )}
          />
        </div>
        <br />
        <NumberTicker
          value={2000}
          className='text-5xl sm:text-7xl text-[#FF9A9A] font-black py-0'
        />
        <br />
        <p className='opacity-0'>movies</p>

        <TextAnimate
          text='movies'
          type='popIn'
          className='text-white font-bold py-0 '
        />
      </div>

      <AnimatedVideo
        direction='right'
        className=' max-w-[70%]  mx-auto z-10 px-2'
      >
        <Safari
          url='moonrise.kingdom'
          className='size-full min-[320px]:hidden sm:block shadow-xl shadow-[#00000054] rounded-lg'
          imageSrc='kiss.gif'
        />
      </AnimatedVideo>
      <AnimatedVideo
        direction='right'
        className='min-[320px]:block sm:hidden max-w-[70%]  mx-auto z-10 px-2'
      >
        <Iphone15Pro className='size-full ' src='kiss.gif' />
      </AnimatedVideo>
    </div>
  );
}
