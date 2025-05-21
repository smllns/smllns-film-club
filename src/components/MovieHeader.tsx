// movie header used in single movie page
'use client';
import React from 'react';
import { AnimatedTitle } from './AnimatedTitle';

const MovieHeader = ({
  headerRef,
  title,
  year,
  myMovieData,
  movieInfo,
}: {
  headerRef: React.RefObject<HTMLDivElement | null>;
  title: string | null;
  year: string | null;
  myMovieData: {
    rating: string;
    letterboxdUri: string;
  } | null;
  movieInfo: any;
}) => {
  return (
    <div ref={headerRef}>
      <AnimatedTitle text={title ? title : 'Movie title'} />

      <div className='flex sm:flex-row min-[320px]:flex-col  gap-1 justify-between w-full'>
        <p className='text-md md:text-xl lg:text-2xl font-normal  opacity-90'>
          {year}
        </p>
        <div className='flex flex-row min-[320px]:gap-2 sm:gap-4 '>
          <p className='text-md'>
            Me:
            <span className='text-md md:text-xl lg:text-2xl font-bold'>
              {myMovieData ? ` ${myMovieData.rating}/5` : ' not sure'}
            </span>
          </p>
          <p className='text-md min-[320px]:pb-2 md:mb-3'>
            TMDB:
            <span className='text-md md:text-xl lg:text-2xl font-bold'>
              {movieInfo.vote_average
                ? ` ${+(movieInfo.vote_average / 2).toFixed(2)}/5`
                : 'no one knows'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
