// library page
'use client';
import { useEffect, useRef, useState } from 'react';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import FullLibrary from '@/components/FullLibrary';
import PageWrapper from '@/components/PageWrapper';
import { useLenisScroll } from '@/hooks/useLenisScroll';

const LibraryPage = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useLenisScroll();

  //updating window width for rerendering of background animation
  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return (
    <PageWrapper>
      <div className='w-screen h-screen  relative'>
        <BackgroundAnimation mainRef={mainRef} key={windowWidth} />
        <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#171616]' />
      </div>
      <FullLibrary mainRef={mainRef} />
    </PageWrapper>
  );
};

export default LibraryPage;
