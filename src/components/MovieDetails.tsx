// movie details tab
'use client';
import React from 'react';

const MovieDetails = ({ movieInfo }: { movieInfo: any }) => {
  const {
    media_type,
    genres,
    runtime,
    budget,
    revenue,
    original_language,
    production_companies,
    production_countries,
    status,
    release_date,
  } = movieInfo;
  const formatDate = (dateString: string) => {
    if (!dateString) return '—';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className='grid gap-6 rounded-xl bg-black/20 p-6 text-white shadow-lg md:grid-cols-2 lg:grid-cols-3 mt-4'>
      <Detail label='Media Type' value={media_type} />
      <Detail
        label='Genres'
        value={genres?.map((g: any) => g.name).join(', ')}
      />
      <Detail label='Runtime' value={runtime ? `${runtime} min` : '—'} />
      <Detail
        label='Budget'
        value={budget ? `$${budget.toLocaleString()}` : '—'}
      />
      <Detail
        label='Revenue'
        value={revenue ? `$${revenue.toLocaleString()}` : '—'}
      />
      <Detail
        label='Original Language'
        value={original_language?.toUpperCase()}
      />
      <Detail
        label='Production Companies'
        value={production_companies?.map((c: any) => c.name).join(', ') || '—'}
      />
      <Detail
        label='Production Countries'
        value={production_countries?.map((c: any) => c.name).join(', ') || '—'}
      />
      <Detail label='Status' value={status} />
      <Detail label='Release Date' value={formatDate(release_date)} />
    </div>
  );
};

// detail helper component
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className='text-sm/[1.125rem]  md:text-base/[1.375rem] text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold'>
      {label}
    </p>
    <p className='-tracking-4 pt-0.5  text-xl/[1.375rem] font-semibold text-balance md:text-2xl/[1.875rem] text-white'>
      {value || '—'}
    </p>
  </div>
);

export default MovieDetails;
