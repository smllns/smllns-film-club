// single movie page
'use client';
import Loader from '@/components/Loader';
import { useCollapsedHeight } from '@/hooks/useCollapsedHeight';
import { useDelayedContent } from '@/hooks/useDelayedContent';
import { useLoader } from '@/hooks/useLoader';
import { useMovieInfo } from '@/hooks/useMovieInfo';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import PosterModal from '@/components/PosterModal';
import Backdrop from '@/components/Backdrop';
import MoviePoster from '@/components/MoviePoster';
import MovieDescription from '@/components/MovieDescription';
import { findMovieInCsv } from '@/lib/findMovieInCsv';
import MovieHeader from '@/components/MovieHeader';
import MovieCast from '@/components/MovieCast';
import { DirectionAwareTabs } from '@/components/ui/direction-aware-tabs';
import MovieCrew from '@/components/MovieCrew';
import MovieDetails from '@/components/MovieDetails';
import { MdArrowOutward } from 'react-icons/md';

export default function MoviePage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const year = searchParams.get('year');
  // @ts-expect-error: don't want to change function
  const { movieInfo, loading, error } = useMovieInfo(title, year); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { showLoader, animateOut, handleAnimationEnd } = useLoader();
  const contentDelayed = useDelayedContent();
  const { collapsedHeight, posterRef, headerRef, measureHeights } =
    useCollapsedHeight();
  const [myMovieData, setMyMovieData] = useState<{
    rating: string;
    letterboxdUri: string;
  } | null>(null);

  useEffect(() => {
    if (title && year) {
      findMovieInCsv(title, year).then(setMyMovieData);
    }
  }, [title, year]);

  const [open, setOpen] = useState(false);
  const overviewRef = useRef<HTMLParagraphElement>(null);
  const [showGradient, setShowGradient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = () => {
    measureHeights();
  };

  useEffect(() => {
    if (!open && overviewRef.current && movieInfo) {
      const textHeight = overviewRef.current.scrollHeight;
      setShowGradient(textHeight > collapsedHeight);
    } else {
      setShowGradient(false);
    }
  }, [collapsedHeight, open, movieInfo]);

  if (showLoader || !movieInfo) {
    return (
      <Loader animateOut={animateOut} handleAnimationEnd={handleAnimationEnd} />
    );
  }

  const tabs = [
    {
      id: 0,
      label: 'Cast',
      content: <MovieCast movieInfo={movieInfo} />,
    },
    {
      id: 1,
      label: 'Crew',
      content: <MovieCrew movieInfo={movieInfo} />,
    },

    {
      id: 2,
      label: 'Details',
      content: <MovieDetails movieInfo={movieInfo} />,
    },
  ];

  const handleClick = () => {
    if (myMovieData?.letterboxdUri) {
      window.open(myMovieData.letterboxdUri, '_blank');
    }
  };

  return (
    <>
      {contentDelayed && (
        <div className='min-h-screen h-fit bg-neutral-800 text-white overflow-hidden'>
          <Backdrop src={movieInfo.backdrop_path} />
          {/* Info Section */}
          <div className='flex flex-row min-[320px]:gap-2 sm:gap-8 sm:px-8 min-[320px]:px-2 max-w-[1280px] mx-auto'>
            <MoviePoster
              setIsModalOpen={setIsModalOpen}
              posterRef={posterRef}
              src={movieInfo.poster_path}
              handleLoad={handleLoad}
            />

            <PosterModal
              src={movieInfo.poster_path}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            {/* Text Content */}
            <div className='flex flex-col text-white flex-1'>
              {/* Header: Title + Year */}
              <MovieHeader
                headerRef={headerRef}
                title={title}
                year={year}
                myMovieData={myMovieData}
                movieInfo={movieInfo}
              />

              {/* Accordion */}
              <MovieDescription
                setOpen={setOpen}
                description={movieInfo.overview}
                open={open}
                collapsedHeight={collapsedHeight}
                overviewRef={overviewRef}
                showGradient={showGradient}
              />
            </div>
          </div>
          <div className='w-full min-[320px]:px-2 sm:px-8 mx-auto max-w-[1280px]  min-[320px]:pt-4 sm:pt-6'>
            <DirectionAwareTabs tabs={tabs} />
          </div>

          {/* letterboxd link  */}
          <div className='w-full min-[320px]:px-2 sm:px-8 mx-auto max-w-[1280px]  min-[320px]:pt-4 sm:pt-6 pb-8'>
            <button
              onClick={handleClick}
              className={`hidden md:block relative z-30 mx-auto   group  w-auto cursor-pointer overflow-hidden rounded-xl  bg-purple-400  p-2 px-6 text-center font-bold uppercase text-xl`}
            >
              <div className='flex  justify-center items-center gap-2 '>
                <div className='h-2 w-2 rounded-xl bg-white transition-all duration-300 group-hover:scale-[100.8]'></div>
                <span className='inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
                  Check out this movie on Letterboxd
                </span>
              </div>
              <div className='absolute  top-2 z-10 flex justify-center items-center gap-2  translate-x-12  text-black opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100'>
                <MdArrowOutward />
                <span>Check out this movie on Letterboxd</span>
              </div>
            </button>
            <button
              onClick={handleClick}
              className={`min-[320px]:block md:hidden z-30 mx-auto group  w-auto cursor-pointer overflow-hidden rounded-xl  bg-purple-400  p-2 px-6 text-center font-bold uppercase sm:text-lg min-[320px]:text-xs`}
            >
              <div className='flex items-center gap-2'>
                <span className='flex flex-row items-center justify-center gap-2 transition-all duration-300 '>
                  <MdArrowOutward />
                  Check out this movie on Letterboxd
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
