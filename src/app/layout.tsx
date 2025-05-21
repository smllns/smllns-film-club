import type { Metadata } from 'next';

import { Recursive } from 'next/font/google';
import './globals.css';
import NeonCursor from '@/components/NeonCursor';

const recursive = Recursive({
  variable: '--font-recursive',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Smllns Film Club',
  description:
    'Smllns Film Club — where code meets creativity and passion for movies. Explore a unique movie collection with a visually engaging experience.',
  openGraph: {
    title: 'Smllns Film Club',
    description:
      'A personal movie archive with animations, TMDb API and love for cinema.',
    url: 'https://smllns-film-club.vercel.app/',
    siteName: 'Smllns Film Club',
    images: [
      {
        url: '/preview.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smllns Film Club',
    description:
      'A personal movie archive with animations, TMDb API and love for cinema.',
    images: ['/preview.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${recursive.variable}  antialiased`}>
        {children}
        <div className='min-[320px]:hidden sm:block'>
          <NeonCursor />
        </div>
      </body>
    </html>
  );
}
