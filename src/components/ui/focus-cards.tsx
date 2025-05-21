//reusable card component
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Ripple } from './ripple';
import Link from 'next/link';

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <Link href={card.link}>
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          'rounded-xl relative  overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out border border-white/20',
          hovered !== null && hovered !== index && 'blur-sm scale-[0.98]',
          `${card.colors}`,
          `[box-shadow:0_-20px_80px_-20px_#000000] backdrop-blur-md`
        )}
      >
        <Ripple mainCircleSize={20} cicrcleBg='bg-black/40' />
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <p className='text-white text-xl font-bold animate-pulse'>
            {card.text}
          </p>
        </div>
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            hovered === index ? 'md:opacity-100' : 'md:opacity-0',
            'flex items-end py-8 px-4'
          )}
        >
          {/* Белая подложка — видна только на md+ и при hovered */}
          <div className='absolute inset-0 bg-white/30 md:block hidden'></div>

          {/* Сам текст — всегда видим, но на md+ зависит от hovered */}
          <div className='relative z-10 text-xl text-neutral-800 md:text-2xl font-bold bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-200'>
            {card.title}
          </div>
        </div>
      </div>
    </Link>
  )
);

Card.displayName = 'Card';

type Card = {
  title: string;
  colors: string;
  text: string;
  link: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto min-[320px]:px-4 md:px-8 w-full'>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
