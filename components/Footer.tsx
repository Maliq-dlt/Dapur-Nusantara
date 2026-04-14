'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const footerLinks = [
  { label: 'Tentang Manado', href: '#' },
  { label: 'Arsip Resep', href: '#' },
  { label: 'Privasi', href: '#' },
  { label: 'Kontak', href: '#' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Twitter', href: '#' },
];

export function Footer() {
  const containerVariants: import('motion/react').Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: import('motion/react').Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="relative bg-[#0a0a0a] w-full border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary-container/5 blur-[120px] pointer-events-none" />

      {/* Big editorial text */}
      <div className="relative pt-24 pb-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 0.03, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[12vw] md:text-[10vw] font-headline italic text-white whitespace-nowrap text-center select-none leading-none pointer-events-none"
        >
          Dapur Nusantara
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-8 pb-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <motion.div variants={itemVariants} className="max-w-md">
            <div className="font-headline italic text-3xl text-orange-50 mb-6 text-shimmer inline-block">
              Dapur Nusantara
            </div>
            <p className="text-orange-50/40 text-sm leading-relaxed mb-8">
              Setiap hidangan adalah cerita. Setiap rempah adalah jejak sejarah. 
              Kami mengarsipkan kekayaan rasa Indonesia dalam satu wadah editorial kuliner.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={link.href}
                    className="text-orange-50/40 hover:text-secondary font-label text-xs uppercase tracking-widest transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 text-right">
            <p className="font-label uppercase tracking-widest text-xs text-orange-200/30 mb-2">Navigasi</p>
            {footerLinks.map((link) => (
              <motion.div key={link.label} whileHover={{ x: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link
                  href={link.href}
                  className="text-orange-50/40 hover:text-orange-50 transition-all duration-500 font-label uppercase tracking-widest text-xs group inline-flex items-center gap-2 justify-end"
                >
                  <span className="w-0 h-[1px] bg-secondary group-hover:w-4 transition-all duration-300" />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label uppercase tracking-widest text-[10px] text-orange-50/20">
          © 2024 Dapur Nusantara. The Spiced Archive.
        </p>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-green-500/80"
          />
          <p className="font-label uppercase tracking-widest text-[10px] text-orange-200/50">
            System Live: Celebes Region
          </p>
        </div>
      </div>
    </footer>
  );
}
