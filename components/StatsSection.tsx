'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  desc: string;
}

const STATS: StatItem[] = [
  { value: 50, suffix: '+', label: 'Resep Otentik', desc: 'Dari dapur tradisional Minahasa' },
  { value: 15, suffix: '', label: 'Rempah Khas', desc: 'Cabai rawit, woku, kemangi, dan lainnya' },
  { value: 300, suffix: '+', label: 'Tahun Warisan', desc: 'Tradisi kuliner sejak abad ke-18' },
  { value: 6, suffix: '', label: 'Daerah Kuliner', desc: 'Lintas kepulauan Nusantara' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const containerVariants: import('motion/react').Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: import('motion/react').Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={ref} className="py-24 bg-surface-container-lowest relative overflow-hidden">
      {/* Background ornament */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-headline italic text-white select-none whitespace-nowrap">
          ✦
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center relative group"
            >
              <div className="font-headline text-5xl md:text-6xl italic text-primary-fixed mb-3">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-2">
                {stat.label}
              </div>
              <p className="text-on-surface-variant/50 text-[11px] leading-relaxed max-w-[200px] mx-auto">
                {stat.desc}
              </p>
              {/* Divider between items */}
              <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-outline-variant/20 group-last:hidden" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
