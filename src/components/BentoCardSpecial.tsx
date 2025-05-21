// styled card with poster loading logic
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';
import { FiArrowUpRight } from 'react-icons/fi';

type BentoFeature = {
  title: string;
  description: string;
  rating?: string;
  poster?: string | null;
};

export const BentoCardSpecial = ({
  title,
  description,
  rating,
  poster: initialPoster,
}: BentoFeature) => {
  const [poster, setPoster] = useState(initialPoster);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // checking if the card is visible
  useEffect(() => {
    if (!cardRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(cardRef.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    // rerendering poster on new film
    setPoster(initialPoster);
  }, [title, initialPoster]);

  useEffect(() => {
    if (!inView || poster) return;

    const getPoster = async () => {
      try {
        const res = await fetch(
          `/api/getPoster?title=${encodeURIComponent(
            title
          )}&year=${description}`
        );
        if (!res.ok) throw new Error('Ошибка загрузки постера');
        const data = await res.json();
        setPoster(data.poster ?? '/noposter.jpg');
      } catch {
        setPoster('/noposter.jpg');
      }
    };

    getPoster();
  }, [inView, poster, title, description]);

  return (
    <div
      ref={cardRef}
      className='group relative flex flex-col justify-end overflow-hidden rounded-xl transform-gpu  border border-neutral-900  [box-shadow:0_-20px_80px_-20px_#ffffff65_inset]'
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Link
        href={`/movies/${slugify(title)}?title=${encodeURIComponent(
          title
        )}&year=${description}`}
      >
        <div className='absolute inset-0 bg-black/30 z-0' />

        <div className='pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 transition-all duration-300 group-hover:-translate-y-10 bg-black/30 group-hover:bg-transparent'>
          <h3 className='text-xl font-semibold text-neutral-200'>{title}</h3>
          <p className='max-w-lg text-neutral-300'>{description}</p>
          <p className='max-w-lg text-neutral-300'>my rating: {rating}/5</p>
        </div>

        <div
          className={
            'pointer-events-none absolute bottom-0  flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
          }
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
};
