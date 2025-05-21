// list content component
'use client';
import React, { useEffect, useState } from 'react';
import { BentoCard, BentoGrid } from './ui/bento-grid';
import { loadCsv } from '@/lib/loadCsv';
type Film = {
  title: string;
  year: number;
};
type EnrichedFilms = {
  title: string;
  year: number;
  rating?: string;
};
type FinalFilms = {
  title: string;
  year: number;
  rating?: string;
  posterUrl?: string;
};

interface ListMainProps {
  mainRef: React.RefObject<HTMLDivElement | null>;
  films: Film[];
}

const ListMain = ({ mainRef, films }: ListMainProps) => {
  const [enrichedFilms, setEnrichedFilms] = useState<EnrichedFilms[]>([]);
  const [finalFilms, setFinalFilms] = useState<FinalFilms[]>([]);

  // loading CSV file
  useEffect(() => {
    loadCsv()
      .then((csvData) => {
        const updatedFilms = films.map((film) => {
          const match = csvData.find(
            (entry) =>
              entry.Name?.toLowerCase() === film.title.toLowerCase() &&
              Number(entry.Year) === film.year
          );

          return {
            ...film,
            rating: match?.Rating || 'not sure',
          };
        });
        setEnrichedFilms(updatedFilms);
      })
      .catch(console.error);
  }, [films]);

  // getting film posters
  useEffect(() => {
    const fetchPosters = async () => {
      const updated = await Promise.all(
        enrichedFilms.map(async (film) => {
          try {
            const response = await fetch(
              `/api/getPoster?title=${encodeURIComponent(film.title)}&year=${
                film.year
              }`
            );
            if (!response.ok) throw new Error('Failed to fetch poster');
            const data = await response.json();
            const posterUrl = data.poster || '/noposter.jpg';
            return { ...film, posterUrl };
          } catch {
            return { ...film, posterUrl: '/noposter.jpg' };
          }
        })
      );
      setFinalFilms(updated);
    };

    if (enrichedFilms.length > 0) {
      fetchPosters();
    }
  }, [enrichedFilms]);

  return (
    <div
      ref={mainRef}
      className='relative min-h-screen overflow-hidden bg-[#181818]'
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <BentoGrid className='p-6'>
        {finalFilms.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
};

export default ListMain;
