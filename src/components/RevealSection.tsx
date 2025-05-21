// final section on intro page
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EncryptButton from './ui/encryptBtn';
import { Ripple } from './ui/ripple';

const RevealSection = () => {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      router.push('/moviesMain');
    }, 700);
  };

  return (
    <div
      id='reveal'
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden min-h-screen reveal-grad transition-all duration-700 ${
        isLeaving ? 'pt-page-moveToTopEasing' : ''
      }`}
    >
      <Ripple />
      <EncryptButton
        onClick={handleClick}
        texting='REVEAL MY WORLD'
        icon='lock'
      />
    </div>
  );
};

export default RevealSection;
