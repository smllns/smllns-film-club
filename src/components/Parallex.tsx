// helper component for parallax scroll
'use client';
import { useRef } from 'react';
import { IntroSection } from './IntroSection';
import { MainSection } from './MainSection';
import { EndingSection } from './EndingSection';
import { useLenisScroll } from '@/hooks/useLenisScroll';

export default function Parallex() {
  const mainRef = useRef<HTMLDivElement | null>(null);

  useLenisScroll();

  return (
    <main>
      <IntroSection mainRef={mainRef} />
      <MainSection mainRef={mainRef} />
      <EndingSection />
    </main>
  );
}
