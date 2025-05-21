// section on library page
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { loadCsv } from '@/lib/loadCsv';
import { BentoGrid } from './ui/bento-grid';
import { BentoCardSpecial } from './BentoCardSpecial';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import { BiCameraMovie } from 'react-icons/bi';

const PAGE_SIZE = 20;
const placeholders = [
  '1999',
  'breakfast 1985',
  'Knives Out',
  'casino',
  'Anora 2024',
  'dreamers',
];

type FilmRow = {
  Name: string;
  Year?: string;
  Rating?: string;
};

type BentoFeature = {
  title: string;
  description: string;
  rating?: string;
  poster?: string | null;
};

interface FullLibraryProps {
  mainRef: React.RefObject<HTMLDivElement | null>;
}

const FullLibrary = ({ mainRef }: FullLibraryProps) => {
  const [films, setFilms] = useState<FilmRow[]>([]);
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [foundMovies, setFoundMovies] = useState<FilmRow[] | null>(null);

  // logic for search input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const normalize = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, ' ');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();

    if (!query) {
      setFoundMovies(null);
      return;
    }
    setLoading(true);
    const parts = query.split(/\s+/);
    const last = parts[parts.length - 1];
    const isYear = /^\d{4}$/.test(last);
    const year = isYear ? last : null;
    const titlePart = isYear ? parts.slice(0, -1).join(' ') : parts.join(' ');
    const normTitle = normalize(titlePart);

    const matches = films.filter((film) => {
      const matchYear = year ? film.Year === year : true;
      const matchTitle = normTitle
        ? normalize(film.Name).includes(normTitle)
        : true;
      return matchTitle && matchYear;
    });

    setFoundMovies(matches);
    setLoading(false);
  };

  // CSV load
  useEffect(() => {
    loadCsv()
      .then((rawData) => {
        const parsed = rawData.map((item) => ({
          Name: item.Name || '',
          Year: item.Year || '',
          Rating: item.Rating || '',
        }));
        setFilms(parsed);
      })
      .catch(console.error);
  }, []);

  // IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '200px' }
    );

    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, []);

  const visibleFilms = films.slice(0, page * PAGE_SIZE);
  const visibleSearchFilms = foundMovies?.slice(0, page * PAGE_SIZE) ?? null;

  // formatting movies
  const finalFilms: BentoFeature[] = visibleFilms.map((film) => ({
    title: film.Name,
    description: film.Year ?? '',
    rating: film.Rating ?? '',
  }));
  let finalSearchFilms = visibleSearchFilms?.map((film) => ({
    title: film.Name,
    description: film.Year ?? '',
    rating: film.Rating ?? '',
  }));

  const handleClick = () => {
    setFoundMovies(null);
    setSearch('');
    setPage(1);
  };

  return (
    <div ref={mainRef} className='min-h-screen bg-[#171616]'>
      <div className='flex flex-col items-center justify-center w-full mx-auto px-4 min-[320px]:gap-4 md:gap-6 min-[320px]:py-10 md:py-16 lg:py-20'>
        <p className='uppercase text-white text-2xl sm:text-4xl lg:text-6xl font-black text-center'>
          Search by film or year
        </p>
        {/* search input  */}
        <PlaceholdersAndVanishInput
          loading={loading}
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        {/* button to show all movies if search was activated */}
        {finalSearchFilms && (
          <>
            <button
              onClick={handleClick}
              className={`hidden md:block relative z-30 mx-auto   group  w-auto cursor-pointer overflow-hidden rounded-xl  bg-purple-400  p-2 px-6 text-center font-bold uppercase text-xl`}
            >
              <div className='flex  justify-center items-center gap-2 '>
                <div className='h-2 w-2 rounded-xl bg-white transition-all duration-300 group-hover:scale-[100.8]'></div>
                <span className='inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
                  show all movies
                </span>
              </div>
              <div className='absolute  top-2 z-10 flex justify-center items-center gap-2  translate-x-12  text-black opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100'>
                <BiCameraMovie />

                <span>show all movies</span>
              </div>
            </button>
            <button
              onClick={handleClick}
              className={`min-[320px]:block md:hidden z-30 mx-auto group  w-auto cursor-pointer overflow-hidden rounded-xl  bg-purple-400  p-2 px-6 text-center font-bold uppercase sm:text-lg min-[320px]:text-xs`}
            >
              <div className='flex items-center gap-2'>
                <span className='flex flex-row items-center justify-center gap-2 transition-all duration-300 '>
                  <BiCameraMovie />
                  show all movies
                </span>
              </div>
            </button>
          </>
        )}
      </div>
      {/* displaying movies or error  */}
      {finalSearchFilms !== null &&
      finalSearchFilms !== undefined &&
      finalSearchFilms.length === 0 ? (
        <div className='flex items-center justify-center min-h-[50vh]'>
          <div className='text-white text-center text-xl font-normal'>
            <p className='bg-green-200/30 w-fit mx-auto p-4 rounded-xl'>
              Oops, I didn’t watch this one!
            </p>
          </div>
        </div>
      ) : (
        <BentoGrid className='p-6'>
          {(finalSearchFilms ?? finalFilms).map((feature, idx) => (
            <BentoCardSpecial key={idx} {...feature} />
          ))}
        </BentoGrid>
      )}
      <div ref={sentinelRef} className='h-1'></div>
    </div>
  );
};

export default FullLibrary;
