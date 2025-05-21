// hook for delaying content
'use client';
import { useEffect, useState } from 'react';

export function useDelayedContent(delay = 500) {
  const [hydrated, setHydrated] = useState(false);
  const [contentDelayed, setContentDelayed] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      const timer = setTimeout(() => {
        setContentDelayed(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [hydrated, delay]);

  return contentDelayed;
}
