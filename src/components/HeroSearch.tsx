// main page hero section with search component
'use client';
import React, { useState } from 'react';
import { SparklesText } from './ui/sparkles-text';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import { motion } from 'framer-motion';
import { loadCsv } from '@/lib/loadCsv';
import { AnimatedList } from './ui/animated-list';
import FilmListItem from './FilmListItem';
import { useSectionInView } from '@/hooks/useSectionInView';
import ShaderGrad from './ui/shader-grad';
import { NotificationCard } from './NotificationCard';

type Item = {
  Date: string;
  Name: string;
  Year: string;
  Rating: string;
};

const placeholders = [
  'Fight Club 1999',
  'Nymphomaniac: Vol. I 2013',
  'Casino Royale 2006',
  'Split 2016',
  'Anora 2024',
  'The Dreamers 2003',
];

const HeroSearch = () => {
  //search logic
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [noYear, setNoYear] = useState(false);
  const [notifications, setNotifications] = useState<Item[]>([]);

  useSectionInView(() => {
    setNotifications([]);
    setLoading(false);
    setFound(false);
    setNoYear(false);
    setNotFound(false);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotifications([]);
    setNotFound(false);
    setNoYear(false);
    setFound(false);

    const data = await loadCsv();

    const normalize = (str: string) =>
      str.toLowerCase().trim().replace(/\s+/g, '');

    const searchWords = search.trim().split(/\s+/);
    const possibleYear = searchWords[searchWords.length - 1];
    const isYear = /^\d{4}$/.test(possibleYear);
    const year = isYear ? possibleYear : null;

    if (!year) {
      setNoYear(true);
      setLoading(false);
      return;
    }

    const titleWords = searchWords.slice(0, -1).join(' ');
    const normalizedSearch = normalize(titleWords);

    const found = data.filter((row) =>
      normalize(row.Name).includes(normalizedSearch)
    );

    if (found.length === 0) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const foundWithYear = found.find((item) => item.Year === year);

    if (foundWithYear) {
      setNotifications([
        {
          Date: foundWithYear.Date,
          Name: foundWithYear.Name,
          Year: foundWithYear.Year,
          Rating: foundWithYear.Rating,
        },
      ]);
    } else {
      setNotFound(true);
    }

    setLoading(false);
    setFound(true);
  };

  return (
    <div
      id='searching'
      className='min-h-screen   overflow-y-hidden relative flex items-start min-[320px]:pt-[16vh] sm:pt-[25vh] md:items-center md:pt-0 justify-center'
    >
      {/* background + overlay for seamless transition  */}
      <ShaderGrad
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#4e879d]' />

      {/* main content */}
      <div className='z-15 text-white flex flex-col items-center justify-center  transition-all duration-300 relative '>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 60 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
          className='text-center'
        >
          <SparklesText>Welcome to my film library</SparklesText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 60 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.5 }}
          className='flex flex-col gap-5 w-full justify-center text-center pt-6 px-2'
        >
          <h1 className='min-[320px]:text-3xl md:text-4xl font-bold'>
            Check out if I&apos;ve seen your fav movie
          </h1>
          {/* search  */}
          <PlaceholdersAndVanishInput
            loading={loading}
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </motion.div>

        {/* showing not found if i didn't watch a searched movie  */}
        {notFound && (
          <NotificationCard
            title="I didn't watch this one!"
            description='You can recommend it to me via contacts'
          />
        )}

        {/* asking user to provide a year in his search */}
        {noYear && (
          <NotificationCard
            title='Ooops which year do you mean?'
            description='Please write a year next to the name'
          />
        )}

        {/* showing found movie*/}
        {found && notifications.length > 0 && (
          <div className='w-full max-w-2xl mt-20 px-4 absolute bottom-[-23vh]  left-1/2 transform -translate-x-1/2 '>
            <AnimatedList>
              {notifications?.map((item, idx) => (
                <FilmListItem {...item} key={idx} />
              ))}
            </AnimatedList>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSearch;
