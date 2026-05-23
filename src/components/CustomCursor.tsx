'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Loose spring for the outer ring trailing effect
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 200 });

  // Stiff spring for the inner dot
  const dotX = useSpring(cursorX, { damping: 20, stiffness: 450 });
  const dotY = useSpring(cursorY, { damping: 20, stiffness: 450 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable') ||
        target.style.cursor === 'pointer';
      
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, hidden]);

  if (!mounted || hidden) return null;

  return (
    <>
      {/* Outer ring with loose spring lag */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[9999] pointer-events-none hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? 'rgba(127, 13, 242, 0.08)' : 'rgba(127, 13, 242, 0)',
          borderColor: hovered ? 'rgba(127, 13, 242, 0.8)' : 'rgba(127, 13, 242, 0.4)',
        }}
      />
      {/* Inner dot with stiff spring */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: hovered ? 0.3 : 1,
        }}
      />
    </>
  );
}
