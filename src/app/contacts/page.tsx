// contacts page
'use client';
import PageWrapper from '@/components/PageWrapper';
import { BsLinkedin, BsInstagram, BsGithub, BsGlobe } from 'react-icons/bs';
import GooeyOverlay from '@/components/GooeyOverlay';

// links
const socialLinks = [
  { href: 'https://www.linkedin.com/in/smllns/', icon: <BsLinkedin /> },
  { href: 'https://www.instagram.com/smllns/', icon: <BsInstagram /> },
  { href: 'https://github.com/smllns', icon: <BsGithub /> },
  { href: 'https://smllns-portfolio.vercel.app/', icon: <BsGlobe /> },
];

const motionBlocks = [
  {
    key: 'letterboxd',
    label: 'follow me on',
    link: {
      href: 'https://letterboxd.com/smllns/',
      text: 'Letterboxd',
      className: 'min-[320px]:text-5xl md:text-8xl',
    },
  },
  {
    key: 'email',
    label: 'contact me at',
    link: {
      href: 'mailto:marysmoly@gmail.com',
      text: 'marysmoly@gmail.com',
      className: 'min-[320px]:text-2xl md:text-6xl',
    },
  },
];

const ContactsPage = () => {
  return (
    <PageWrapper>
      <GooeyOverlay socialLinks={socialLinks} motionBlocks={motionBlocks} />
    </PageWrapper>
  );
};

export default ContactsPage;
