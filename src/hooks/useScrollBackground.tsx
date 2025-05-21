// hook for changing background on scroll
'use client';
import { useEffect, useState } from 'react';

export function useScrollBackground() {
  const [activeSection, setActiveSection] = useState<
    | 'default'
    | 'watched'
    | 'drag'
    | 'scrollsec'
    | 'reveal'
    | 'random'
    | 'nextstep'
    | 'contact'
    | 'searching'
    | 'listBlob'
  >('default');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      const sections: {
        id: typeof activeSection;
        threshold: number;
      }[] = [
        { id: 'nextstep', threshold: 0.2 },
        { id: 'watched', threshold: 0.2 },
        { id: 'reveal', threshold: 0.05 },
        { id: 'scrollsec', threshold: 0.2 },
        { id: 'drag', threshold: 0.2 },
      ];

      for (const { id, threshold } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleHeight =
            Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const ratio = visibleHeight / rect.height;

          if (ratio >= threshold) {
            setActiveSection(id);
            return;
          }
        }
      }

      setActiveSection('default');
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  const getBackgroundColor = () => {
    switch (activeSection) {
      case 'reveal':
        return 'bg-[#9198e5]';

      case 'scrollsec':
        return 'bg-[#FF9A9A]';

      case 'drag':
        return 'bg-[#465e35]';

      case 'watched':
        return 'bg-[#272826]';

      case 'nextstep':
        return 'bg-[#eeaeca]';
      default:
        return 'bg-[#9198e5]]';
    }
  };

  return { getBackgroundColor };
}
