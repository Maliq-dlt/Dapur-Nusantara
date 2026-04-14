'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, AnimatePresence } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[60]">
      <motion.div 
        className="h-full bg-gradient-to-r from-primary-container via-secondary to-primary origin-left"
        style={{ scaleX: scrollYProgress }} 
      />
    </div>
  );
}

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-7 right-7 z-[100] group"
        >
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-[#131313] text-[#F5F0E8] text-[11px] font-medium font-body whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
            Kembali ke Atas
          </div>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-[48px] h-[56px] bg-[#C4522A] hover:bg-[#E8A317] rounded-sm flex items-center justify-center shadow-[0_4px_20px_rgba(196,82,42,0.35)] transition-colors duration-300"
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
