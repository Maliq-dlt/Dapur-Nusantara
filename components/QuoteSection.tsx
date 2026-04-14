'use client';

import { motion } from 'motion/react';

const QUOTES = [
  {
    text: 'Masakan Manado bukan sekadar makanan — ia adalah nyanyian rempah yang telah bergema selama berabad-abad di pesisir Sulawesi Utara.',
    author: 'Tradisi Lisan Minahasa',
  },
];

export function QuoteSection() {
  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      {/* Large quotation mark background */}
      <div className="absolute top-8 left-8 md:left-16 text-[20vw] font-headline italic text-white/[0.02] select-none leading-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-8">
            <span className="text-secondary/50 text-sm tracking-[1em]">✦ ✦ ✦</span>
          </div>
          
          <blockquote className="font-headline text-3xl md:text-5xl italic text-cream leading-snug md:leading-tight">
            &ldquo;{QUOTES[0].text}&rdquo;
          </blockquote>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <p className="font-label text-[11px] uppercase tracking-[0.3em] text-on-surface-variant/40">
              {QUOTES[0].author}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
