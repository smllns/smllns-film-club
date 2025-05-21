/* eslint-disable @typescript-eslint/no-explicit-any */
// movie cast tab
import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

const MovieCast = ({ movieInfo }: { movieInfo: any }) => {
  const cast = movieInfo?.credits?.cast;

  if (!cast || cast.length === 0) {
    return <div>No cast info is avaliable</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[320px]:gap-2 md:gap-4 py-4'>
      {cast.map((person: any) => (
        <div
          className='relative h-full rounded-xl  '
          key={`${person.name}+${person.character}`}
        >
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={20}
            inactiveZone={0.01}
            variant='default'
          />
          <div className=' bg-black/20 relative flex h-full flex-row justify-between items-center min-[320px]:gap-4 md:gap-6 overflow-hidden rounded-xl p-6 md:p-6 shadow-[0px_0px_27px_0px_#2D2D2D]'>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                  : '/blankProf.jpg'
              }
              alt={person.name}
              className='w-15 h-15 rounded-lg object-cover'
            />
            <div className='relative flex flex-1 flex-col justify-between gap-3'>
              <div className='space-y-3'>
                <h3 className='-tracking-4 pt-0.5  text-xl/[1.375rem] font-semibold text-balance md:text-2xl/[1.875rem] text-white'>
                  {person.name}
                </h3>
                <h2 className='text-sm/[1.125rem]  md:text-base/[1.375rem] text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold'>
                  as {person.character}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCast;
