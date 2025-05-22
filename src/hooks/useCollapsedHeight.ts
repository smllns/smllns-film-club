// height measuring hook for movie page
'use client';
import { useEffect, useRef, useState } from 'react';
export function useCollapsedHeight() {
  const posterRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [collapsedHeight, setCollapsedHeight] = useState(0);

  const measureHeights = () => {
    const posterH = posterRef.current?.offsetHeight || 0;
    const headerH = headerRef.current?.offsetHeight || 0;
    setCollapsedHeight(Math.max(posterH - headerH, 0));
  };

  useEffect(() => {
    window.addEventListener('resize', measureHeights);
    return () => window.removeEventListener('resize', measureHeights);
  }, []);

  return { collapsedHeight, posterRef, headerRef, measureHeights };
}
