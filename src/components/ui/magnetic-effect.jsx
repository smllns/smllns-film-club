// reusable 'magnet' effect
'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnet({
  children,
  strength = 1,
  ease = 'elastic.out(1, 0.3)',
  duration = 1,
}) {
  const magnetic = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, 'x', {
      duration,
      ease,
    });
    const yTo = gsap.quickTo(magnetic.current, 'y', {
      duration,
      ease,
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magnetic.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const node = magnetic.current;
    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, ease, duration]);

  return React.cloneElement(children, { ref: magnetic });
}
