'use client';

import { Flame, Leaf, NutOff, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const SPICES = [
  {
    id: '01',
    name: 'Cabai Rawit',
    icon: Flame,
    color: 'text-secondary',
    hoverColor: 'group-hover:text-on-primary-container',
    bgHover: 'hover:bg-primary-container',
    desc: 'PROFIL: TAJAM & PEDAS. DIGUNAKAN HAMPIR DI SETIAP MASAKAN MANADO UNTUK MEMBERIKAN SENGATAN RASA YANG KHAS.',
    fullDesc: 'Profil: Tajam & Pedas. Digunakan hampir di setiap masakan Manado untuk memberikan sengatan rasa yang khas.'
  },
  {
    id: '02',
    name: 'Kemangi',
    icon: Leaf,
    color: 'text-secondary',
    hoverColor: 'group-hover:text-on-secondary-fixed',
    bgHover: 'hover:bg-secondary',
    desc: 'PROFIL: SEGAR & MINTY. MENAMBAHKAN DIMENSI AROMA SEGAR DI AKHIR PROSES MEMASAK RICA-RICA.',
    fullDesc: 'Profil: Segar & Harum. Kunci utama masakan Woku Belanga, memberikan aroma sitrus yang mendalam.'
  },
  {
    id: '03',
    name: 'Kunyit',
    icon: Sparkles,
    color: 'text-secondary',
    hoverColor: 'group-hover:text-on-tertiary-container',
    bgHover: 'hover:bg-tertiary-container',
    desc: 'PROFIL: BUMI & WARNA. PEWARNA ALAMI DAN PEMBERI RASA HANGAT PADA MASAKAN SEPERTI TINUTUAN.',
    fullDesc: 'Profil: Bumi & Warna. Pewarna alami dan pemberi rasa hangat pada masakan seperti Tinutuan.'
  },
  {
    id: '04',
    name: 'Cengkeh',
    icon: NutOff,
    color: 'text-secondary',
    hoverColor: 'group-hover:text-on-secondary-fixed',
    bgHover: 'hover:bg-outline',
    desc: 'PROFIL: MANIS & HANGAT. REMPAH KLASIK DARI MALUKU YANG MEMBERIKAN KEDALAMAN RASA PADA HIDANGAN BERKUAH.',
    fullDesc: 'Profil: Manis & Hangat. Rempah klasik dari Maluku yang memberikan kedalaman rasa pada hidangan berkuah.'
  }
];

const LIST_ITEMS = [
  { id: '01', name: 'Cabai Rawit', desc: 'Profil: Tajam & Pedas. Digunakan hampir di setiap masakan Manado untuk memberikan sengatan rasa yang khas.' },
  { id: '02', name: 'Daun Gowa (Woku)', desc: 'Profil: Segar & Harum. Kunci utama masakan Woku Belanga, memberikan aroma sitrus yang mendalam.' },
  { id: '03', name: 'Cengkeh & Pala', desc: 'Profil: Manis & Hangat. Rempah klasik dari Maluku yang memberikan kedalaman rasa pada hidangan berkuah.' },
  { id: '04', name: 'Kunyit', desc: 'Profil: Bumi & Warna. Pewarna alami dan pemberi rasa hangat pada masakan seperti Tinutuan.' },
  { id: '05', name: 'Kemangi', desc: 'Profil: Segar & Minty. Menambahkan dimensi aroma segar di akhir proses memasak Rica-Rica.' },
];

export function SpiceSection() {
  const cardsContainer: import('motion/react').Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariant: import('motion/react').Variants = {
    hidden: { y: 60, opacity: 0, rotate: -8, scale: 0.85 },
    show: { y: 0, opacity: 1, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  const listContainer: import('motion/react').Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const listItemVariant: import('motion/react').Variants = {
    hidden: { x: -30, opacity: 0, filter: 'blur(4px)' },
    show: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-surface overflow-hidden relative">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="relative order-2 lg:order-1">
          <motion.div 
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative grid grid-cols-2 gap-4"
          >
            {SPICES.map((spice, idx) => {
              const Icon = spice.icon;
              return (
                <motion.div 
                  variants={cardVariant}
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                  key={spice.id} 
                  className={`bg-surface-container-low p-10 flex flex-col items-center group transition-colors duration-500 ${spice.bgHover} ${idx === 1 || idx === 3 ? 'mt-12' : idx === 2 ? '-mt-6' : ''} relative overflow-hidden`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-transparent via-white/[0.02] to-transparent" />
                  
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: idx * 0.5 }}
                  >
                    <Icon className={`w-12 h-12 mb-6 transition-colors duration-300 ${spice.color} ${spice.hoverColor}`} />
                  </motion.div>
                  <h4 className={`font-label font-bold tracking-widest text-sm uppercase transition-colors duration-300 ${spice.hoverColor.replace('group-hover:', '')}`}>
                    {spice.name}
                  </h4>
                  <p className={`text-[10px] mt-2 font-label text-on-surface-variant text-center transition-colors duration-300 ${spice.hoverColor.replace('group-hover:', '')}/70`}>
                    {spice.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-label text-secondary tracking-[0.3em] uppercase text-xs mb-4"
          >
            Anatomi Rasa
          </motion.p>
          <motion.h2 
            initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-6xl italic text-on-surface mb-8"
          >
            Peta Rempah <span className="text-shimmer">Nusantara</span>
          </motion.h2>
          
          <motion.div 
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {LIST_ITEMS.map((item) => (
              <motion.div 
                variants={listItemVariant} 
                key={item.id} 
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 group-hover:border-primary-container/50 transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <span className="font-label text-[11px] tracking-widest text-secondary/40 group-hover:text-secondary transition-colors">{item.id}</span>
                    <span className="font-label text-xl group-hover:text-primary transition-colors duration-300">{item.name}</span>
                  </div>
                  <motion.div
                    className="text-on-surface-variant/30 group-hover:text-primary transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-on-surface-variant text-sm max-h-0 group-hover:max-h-24 group-hover:mt-4 overflow-hidden transition-all duration-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
