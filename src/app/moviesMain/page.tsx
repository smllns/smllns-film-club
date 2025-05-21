// app main page
'use client';
import HeroSearch from '@/components/HeroSearch';
import NextSteps from '@/components/NextSteps';
import PageWrapper from '@/components/PageWrapper';
import RandomOfTheDay from '@/components/RandomOfTheDay';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { useScrollBackground } from '@/hooks/useScrollBackground';

export default function MoviesPage() {
  const { getBackgroundColor } = useScrollBackground();
  useLenisScroll();

  return (
    <div
      className={`transition-colors duration-500 bg-[#4e879d]  ${getBackgroundColor()}`}
    >
      <PageWrapper>
        <HeroSearch />
        <RandomOfTheDay />
        <NextSteps />
      </PageWrapper>
    </div>
  );
}
