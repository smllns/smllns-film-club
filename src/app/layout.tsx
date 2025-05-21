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
