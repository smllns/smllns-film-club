// component with links used in main page
import React from 'react';
import { VelocityScroll } from './ui/scroll-based-velocity';
import { FocusCards } from './ui/focus-cards';

//cards data
const cards = [
  {
    title: 'Library',
    colors: 'first-grad',
    text: 'EAT ME',
    link: '/library',
  },
  {
    title: 'Lists',
    colors: 'second-grad',
    text: 'DRINK ME',
    link: '/lists',
  },
  {
    title: 'Contacts',
    colors: 'third-grad',
    text: 'TRY ME',
    link: '/contacts',
  },
];

const NextSteps = () => {
  return (
    <div
      id='nextstep'
      className='relative min-h-screen  flex  w-full flex-col items-center justify-center gap-20 py-4 overflow-x-hidden'
    >
      <VelocityScroll
        numRows={2}
        defaultVelocity={6}
        className='min-[320px]:text-5xl '
      >
        CHOOSE YOUR NEXT MOVE
      </VelocityScroll>
      <FocusCards cards={cards} />
    </div>
  );
};

export default NextSteps;
