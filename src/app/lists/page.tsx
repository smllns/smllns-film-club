// lists page
'use client';
import PageWrapper from '@/components/PageWrapper';
import React, { useEffect, useRef, useState } from 'react';
import ListsHero from '@/components/ListsHero';
import { useScroll } from 'framer-motion';
import Card from '@/components/ui/card-stack';
import Link from 'next/link';
import { useLenisScroll } from '@/hooks/useLenisScroll';

//lists info
const sections = [
  {
    title: 'Unhinged Women Who Self Destruct',
    description:
      "A collection of films that revolve around women on the brink — spiraling, unraveling, burning everything down with glorious intensity. These characters are not here to be saved or redeemed. They're chaotic, raw, deeply human, and often terrifyingly honest. Their destruction isn’t always noble, but it’s always magnetic. Watch them break apart — and maybe find pieces of yourself in the aftermath.",
    shortDescription: 'Women who spiral, burn, and don’t look back.',
    src: 'nymph.jpg',
    color: '#2d2d2d',
    shadow:
      'shadow-[0px_50px_37px_0px_rgba(23,66,255,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]',
    slug: 'unhinged-women',
  },
  {
    title: 'Unusual animation',
    description:
      "These aren't your typical cartoons. This is animation that feels like a lucid dream — strange, poetic, sometimes unsettling. Whether it’s the textures, the narrative, or the way it makes your brain itch in the best way, each film here twists the boundaries of the animated form into something singular and unforgettable. You won't just watch them — you'll feel them under your skin.",
    shortDescription: 'Strange, dreamy, and deeply offbeat animation.',
    src: 'songs.jpg',
    color: '#252525',
    shadow:
      'shadow-[0px_50px_37px_0px_rgba(186,23,255,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]',
    slug: 'unusual-animation',
  },
  {
    title: 'Manic Pixie Dream Girling',
    description:
      'An ode to the whimsical, wide-eyed women who float into the lives of lost men, only to disappear like a fever dream. But look closer — behind the quirky smiles and chaotic charm, there’s often something aching, something quietly subversive. This list explores the trope, toys with it, and sometimes turns it on its head. It’s not just about them. It’s about how we see them. Or how we want to.',
    shortDescription: 'Charming chaos and the ache behind the trope.',
    src: 'ruby.jpg',
    color: '#181818',
    shadow:
      'shadow-[0px_50px_37px_0px_rgba(23,255,243,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]',
    slug: 'manic-pixie',
  },
  {
    title: 'Personal favourites',
    description:
      'A soft, secret corner of cinema I always return to. These are the films that feel like old friends or long-lost memories — the ones that comfort, haunt, or quietly shift the way you see the world. Some are loud, some whisper. But each one lives rent-free in my head and heart, and maybe they will in yours too.',
    shortDescription: 'Films that live quietly in my head forever.',
    src: 'dreamers.jpg',
    color: '#0e0e0e',
    shadow:
      'shadow-[0px_50px_37px_0px_rgba(235,100,255,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]',
    slug: 'favourites',
  },
];

const ListsPage = () => {
  const listsRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // checking for mobile for different link display
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: listsRef,
    offset: ['start start', 'end end'],
  });

  useLenisScroll();

  return (
    <div className={` bg-[#2e3342]`}>
      <PageWrapper>
        <ListsHero listsRef={listsRef} />
        <div ref={listsRef}>
          {sections.map((section, i) => {
            const targetScale = 1 - (sections.length - i) * 0.05;
            const card = (
              <Card
                key={`p_${i}`}
                i={i}
                {...section}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );

            return isMobile ? (
              <Link key={section.slug} href={`/lists/${section.slug}`}>
                {card}
              </Link>
            ) : (
              <Card
                key={`p_${i}`}
                i={i}
                {...section}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </PageWrapper>
    </div>
  );
};

export default ListsPage;
