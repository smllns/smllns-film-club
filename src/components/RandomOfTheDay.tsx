// component for showing a random movie from my collection
'use client';
import React, { useEffect, useState } from 'react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import { HyperText } from './ui/hyper-text';
import { loadCsv } from '@/lib/loadCsv';
import EncryptButton from './ui/encryptBtn';
import AnimatedVideo from './ui/animatedVideo';
import { slugify } from '@/lib/slugify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatedTitle } from './AnimatedTitle';

type Movie = Record<string, string>;

const RandomOfTheDay = () => {
  const [randomMovie, setRandomMovie] = useState<Movie>({});
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const router = useRouter();

  //loading my CSV data
  useEffect(() => {
    loadCsv()
      .then((data) => {
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomMovie(data[randomIndex]);
        }
      })
      .catch(console.error);
  }, []);

  //fetching poster for a movie
  useEffect(() => {
    if (randomMovie.Name) {
      fetch(
        `/api/getPoster?title=${encodeURIComponent(randomMovie.Name)}&year=${
          randomMovie.Year
        }`
      )
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch poster');
          return res.json();
        })
        .then((data) => {
          setPosterUrl(data.poster || '/noposter.jpg');
        })
        .catch(() => {
          setPosterUrl('/noposter.jpg');
        });
    }
  }, [randomMovie]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // styled card data
  const cardContent = (
    <CardBody className='relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black/40 border-white/[0.2] w-fit h-auto rounded-xl p-6 border'>
      <CardItem
        as='div'
        translateZ='50'
        className='text-3xl font-black text-white w-full max-w-xl'
      >
        {randomMovie?.Name || 'thinking'}
      </CardItem>
      <CardItem
        as='div'
        translateZ='60'
        className='flex justify-start text-md w-full max-w-sm mt-2 text-neutral-300'
      >
        <p>filmed in {randomMovie?.Year || 'counting'}</p>
      </CardItem>
      {isSmallScreen ? (
        <CardItem
          as='div'
          translateZ='100'
          rotateX={20}
          rotateZ={-10}
          className=' mt-4 max-w-lg'
        >
          <img
            src={posterUrl ? posterUrl : 'noposter.jpg'}
            height='1000'
            width='1000'
            className='max-h-[450px] object-cover mx-auto   group-hover/card:shadow-xl rounded-xl'
            alt='thumbnail'
          />
        </CardItem>
      ) : (
        <Link
          href={`/movies/${slugify(
            randomMovie.Name
          )}?title=${encodeURIComponent(randomMovie.Name)}&year=${
            randomMovie?.Year
          }`}
        >
          <CardItem
            as='div'
            translateZ='100'
            rotateX={20}
            rotateZ={-10}
            className=' mt-4 max-w-lg'
          >
            <img
              src={posterUrl ? posterUrl : 'noposter.jpg'}
              height='1000'
              width='1000'
              className='max-h-[450px] object-cover mx-auto   group-hover/card:shadow-xl rounded-xl'
              alt='thumbnail'
            />
          </CardItem>
        </Link>
      )}

      <div className='flex justify-end items-center mt-2'>
        <CardItem
          as='div'
          translateZ={20}
          translateX={40}
          className='px-4 py-0'
        >
          <EncryptButton
            texting='more info'
            icon='arrow'
            onClick={() =>
              router.push(
                `/movies/${slugify(
                  randomMovie.Name
                )}?title=${encodeURIComponent(randomMovie.Name)}&year=${
                  randomMovie?.Year
                }`
              )
            }
          />
        </CardItem>
      </div>
    </CardBody>
  );

  return (
    <div id='random' className='min-h-screen  overflow-x-hidden'>
      <div className='min-h-screen max-w-[1280px] min-[1280px]:mx-auto   flex min-[320px]:flex-col md:flex-row  w-full min-[320px]:justify-center md:justify-around items-center'>
        <AnimatedVideo direction='left' className=' z-10 '>
          <div className='min-[320px]:flex md:hidden flex-col gap-2 text-center px-4 md:pl-10 max-w-[600px]'>
            <HyperText startOnView={true} animateOnHover={true}>
              Here&apos;s a random film from my collection for you:
            </HyperText>
            <p className='tet-sm text-center text-white/50'>
              (don&apos;t forget to interact with it)
            </p>
          </div>
          <div className='min-[320px]:hidden md:flex flex-col gap-2  px-4 md:pl-10 max-w-[600px]'>
            <AnimatedTitle
              text={"Here's a random film from my collection for you:"}
            />

            <p className='tet-sm  text-white/50'>
              (don&apos;t forget to interact with it)
            </p>
          </div>
        </AnimatedVideo>
        <AnimatedVideo direction='right' className='  z-10 '>
          <CardContainer className='inter-var px-4  md:pr-10 min-[320px]:cursor-pointer md:cursor-default'>
            {isSmallScreen ? (
              <Link
                href={`/movies/${slugify(
                  randomMovie.Name
                )}?title=${encodeURIComponent(randomMovie.Name)}&year=${
                  randomMovie?.Year
                }`}
                passHref
              >
                {cardContent}
              </Link>
            ) : (
              cardContent
            )}
          </CardContainer>
        </AnimatedVideo>
      </div>
    </div>
  );
};

export default RandomOfTheDay;
