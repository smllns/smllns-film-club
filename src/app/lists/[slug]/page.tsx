// page for displaying a single list
'use client';
import ListHero from '@/components/ListHero';
import ListMain from '@/components/ListMain';
import PageWrapper from '@/components/PageWrapper';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { movieLists } from '@/lib/movieLists';
import { notFound, useParams } from 'next/navigation';
import { useRef } from 'react';

export default function MovieListPage() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  useLenisScroll();
  const params = useParams();
  const slug = params.slug as string;
  const list = movieLists.find((item) => item.slug === slug);

  if (!list) return notFound();

  return (
    <PageWrapper>
      <ListHero
        mainRef={mainRef}
        title={list.title}
        description={list.description}
        video={list.video}
        brightness={list.brightness}
      />

      <ListMain mainRef={mainRef} films={list.films} />
    </PageWrapper>
  );
}
