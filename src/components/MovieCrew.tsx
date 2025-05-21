// movie crew tab
'use client';
import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

const MovieCrew = ({ movieInfo }: { movieInfo: any }) => {
  const JOB_PRIORITY: Record<string, number> = {
    Director: 1,
    Writer: 2,
    Screenplay: 3,
    Producer: 4,
    'Executive Producer': 5,
    'Director of Photography': 6,
    Editor: 7,
  };

  const crew = [...(movieInfo?.credits?.crew || [])].sort((a, b) => {
    const priorityA = JOB_PRIORITY[a.job] ?? 100;
    const priorityB = JOB_PRIORITY[b.job] ?? 100;
    return priorityA - priorityB;
  });

  if (!crew || crew.length === 0) {
    return <div>No crew info is available</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[320px]:gap-2 md:gap-4 py-4'>
      {crew.map((person: any) => (
        <div
          className='relative h-full rounded-xl '
          key={`${person.name}+${person.job}`}
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
          <div className=' bg-black/20 relative flex h-full flex-row justify-between items-center gap-6 overflow-hidden rounded-xl p-6 md:p-6 shadow-[0px_0px_27px_0px_#2D2D2D]'>
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
                  as {person.job}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCrew;
