'use client';

import { Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax layers - different speeds for depth
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const marqueeY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const textVariant: import('motion/react').Variants = {
    hidden: { y: 50, opacity: 0, filter: 'blur(10px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center editorial-gradient overflow-hidden px-6 pt-20">
      {/* Ambient glow */}
      <motion.div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-container/10 blur-[150px] pointer-events-none"
        style={{ y: starY }}
      />
      
      {/* Floating Elements Background — parallax layer (slow) */}
      <motion.div className="absolute inset-0 pointer-events-none opacity-20" style={{ y: bgTextY }}>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-9xl font-headline italic text-primary-fixed-dim select-none blur-sm"
        >
          Woku
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 text-9xl font-headline italic text-primary-fixed-dim select-none blur-sm"
        >
          Rica
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-1/4"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ y: starY }}
        >
          <Star className="w-[120px] h-[120px] text-secondary opacity-30" fill="currentColor" />
        </motion.div>
      </motion.div>

      {/* Main content — parallax layer (medium) */}
      <motion.div 
        className="z-10 text-center max-w-5xl"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
        style={{ y: contentY, opacity: sectionOpacity }}
      >
        <motion.p variants={textVariant} className="font-label text-secondary tracking-[0.3em] uppercase text-sm mb-6">
          Manado, Sulawesi Utara
        </motion.p>
        <motion.h1 variants={textVariant} className="font-headline text-7xl md:text-9xl text-on-primary-container leading-tight">
          Rasa dari <br />
          <span className="italic text-primary font-light underline decoration-primary/30 decoration-1 underline-offset-8 text-shimmer">
            Ujung Utara
          </span>{' '}
          Sulawesi
        </motion.h1>
        <motion.p variants={textVariant} className="mt-12 max-w-xl mx-auto text-lg text-on-surface-variant leading-relaxed">
          Menjelajahi arsip kuliner yang terbakar oleh api cengkeh, pedas cabai rawit, dan kesegaran daun woku. Selamat datang di simfoni rempah Nusantara.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          variants={textVariant}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/50">Gulir ke bawah</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-secondary/80 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Marquee — parallax layer (fixed/slow) */}
      <motion.div 
        className="absolute bottom-0 w-full py-8 bg-surface-container-lowest/50 backdrop-blur-md overflow-hidden border-t border-white/5 flex"
        style={{ y: marqueeY }}
      >
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-8 font-headline text-4xl italic text-on-surface/40 w-max pr-8"
        >
          <span>Tinutuan</span><span className="text-secondary/40">✦</span>
          <span>Cakalang Fufu</span><span className="text-secondary/40">✦</span>
          <span>Rica-Rica Ayam</span><span className="text-secondary/40">✦</span>
          <span>Woku Belanga</span><span className="text-secondary/40">✦</span>
          <span>Paniki</span><span className="text-secondary/40">✦</span>
          <span>Pisang Goroho</span><span className="text-secondary/40">✦</span>
          <span>Tinutuan</span><span className="text-secondary/40">✦</span>
          <span>Cakalang Fufu</span><span className="text-secondary/40">✦</span>
          <span>Rica-Rica Ayam</span><span className="text-secondary/40">✦</span>
          <span>Woku Belanga</span><span className="text-secondary/40">✦</span>
          <span>Paniki</span><span className="text-secondary/40">✦</span>
          <span>Pisang Goroho</span><span className="text-secondary/40">✦</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
