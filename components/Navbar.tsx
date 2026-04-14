'use client';

import { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#', active: true },
    { label: 'Menu', href: '#' },
    { label: 'Cerita', href: '#' },
    { label: 'Nusantara', href: '#' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 rounded-full px-6 py-3 w-fit border shadow-2xl transition-all duration-700 ${
          scrolled
            ? 'bg-neutral-950/90 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-neutral-900/50 backdrop-blur-xl border-white/5'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-headline italic text-orange-50 tracking-tight"
        >
          Dapur Nusantara
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative text-sm transition-all duration-300 hover:scale-105 ${
                link.active
                  ? 'text-orange-400 font-bold'
                  : 'text-orange-50/70 hover:text-orange-50'
              }`}
            >
              {link.label}
              {link.active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-400"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 ml-4">
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-orange-200/70 hover:text-orange-200 transition-colors"
          >
            <Search size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="text-orange-200/70 hover:text-orange-200 transition-colors"
          >
            <Bookmark size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-orange-200/70 hover:text-orange-200 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-4 right-4 z-40 bg-neutral-950/95 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-headline italic transition-colors ${
                    link.active ? 'text-orange-400' : 'text-orange-50/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
