// navbar
'use client';
import React, { useState } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './ui/resizable-navbar';
import { useRouter } from 'next/navigation';
import EncryptButton from './ui/encryptBtn';

const NavigationBar = () => {
  //links
  const navItems = [
    {
      name: 'MAIN',
      link: '/moviesMain',
    },
    {
      name: 'LIBRARY',
      link: '/library',
    },
    {
      name: 'LISTS',
      link: '/lists',
    },
    {
      name: 'CONTACTS',
      link: '/contacts',
    },
  ];
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className='flex items-center gap-4'>
          <EncryptButton
            onClick={() => {
              router.push('/');
            }}
            texting='back to intro'
            icon='unlock'
          />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className='relative text-neutral-100  bg-neutral-700/80 transition-all duration-300 px-10 py-2 rounded-full'
            >
              <span className='block'>{item.name}</span>
            </a>
          ))}
          <div className='flex w-full items-center flex-col gap-4'>
            <EncryptButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push('/');
              }}
              texting='back to intro'
              icon='unlock'
            />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NavigationBar;
