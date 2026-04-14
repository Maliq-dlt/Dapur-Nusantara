'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth mouse coordinates
  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Membesar jika cursor ada di tag <a>, <button>, atau elemen dengan class 'group' (seperti card)
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group') ||
        target.closest('.cursor-interact')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile (coarse pointer)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] flex items-center justify-center mix-blend-difference hidden md:flex"
      style={{
        x: cursorX,
        y: cursorY,
        backgroundColor: isHovering ? 'white' : 'transparent',
        border: isHovering ? 'none' : '2px solid white',
        scale: isHovering ? 2.5 : 1,
        transition: 'background-color 0.2s, border 0.2s, scale 0.2s'
      }}
    >
      {isHovering && (
        <span className="text-black text-[3px] font-bold tracking-widest uppercase opacity-100">
          Lihat
        </span>
      )}
    </motion.div>
  );
}
