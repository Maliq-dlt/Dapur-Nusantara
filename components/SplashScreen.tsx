'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[400px] h-[400px] rounded-full bg-primary-container/20 blur-[120px] pointer-events-none"
          />

          {/* Ornamental top line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute top-1/2 -translate-y-20 w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent origin-center"
          />

          {/* Logo text */}
          <motion.div
            initial={{ y: 30, opacity: 0, filter: 'blur(20px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-headline text-5xl md:text-7xl italic text-cream text-center"
          >
            <span className="text-shimmer">Dapur Nusantara</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
            className="mt-4 font-label text-[11px] uppercase tracking-[0.4em] text-on-surface-variant/50"
          >
            The Spiced Archive
          </motion.p>

          {/* Ornamental bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent origin-center"
          />

          {/* Loading ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-16 flex items-center gap-3"
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-secondary/60 text-xs"
            >
              ✦
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="text-secondary/60 text-xs"
            >
              ✦
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
              className="text-secondary/60 text-xs"
            >
              ✦
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
