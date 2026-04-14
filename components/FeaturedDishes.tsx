'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { RadarChart } from './RadarChart';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

interface DishType {
  id: string;
  name: string;
  image: string;
  tags: string[];
  labels: string[];
  description: string;
  flavors: Record<string, number>;
  highlightTags: string[];
}

const DISHES: DishType[] = [
  {
    id: 'tinutuan',
    name: 'Tinutuan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3xwQz8s2GMppp3mqKpRtaHunkoYGIWIp5GBG3pzitgfvZTHMenVu3IxrNFe2Uf0If9smUeSqWxZ_hy8q3pmhCE44_ySPfQlsV6RAHW6Y_xmNHcdVMUOLO6q2oqrInFMAW7FQm7WtiCRcIBvGrwgBSgy9rphKLDm1zyOCz-i9VYBv9nj9vudACJeBiVMkmWWKAK3XQrf8p0f7x-EO_RK-Vdkl-z7Qi4sUV25j_HBv6QQ5tR6yULPfqhyKKcTD89iK6UQ9UhHF6vHM',
    tags: ['berkuah', 'segar', 'rempah-kuat'],
    labels: ['VEGETARIAN', 'SARAPAN'],
    description: 'Bubur Manado yang kaya akan serat dari jagung, labu kuning, dan beragam sayuran hijau segar.',
    flavors: { Pedas: 2, Asam: 3, Gurih: 7, Manis: 4, Segar: 8 },
    highlightTags: ['Segar', 'Gurih']
  },
  {
    id: 'cakalang',
    name: 'Cakalang Fufu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNho3EX_R6NIw1j5Yzr3ggt5GgBbm0WfzaLeh0FeTqBGuCNwMkBzyDk_0iy2gqVsXJ_p-hV3TpcWlmdTynXpphL63rOyWIfPEsPcf2TdVWm5cO2clSxnWDlW4SFE8b_6ibYasX6KgVN2lKSwTONBX-DX2p2GEPVtcbZLuqAq3C4zmfl9Wd2YacOg6E32CZbi8-GbZy0gN1k2cFIp8tNJrnXMiDjes1CdVhsytDjZQa9PnaKgH_81oqMFSu6NZ5D2S7S-On8mWH0oo',
    tags: ['asap', 'fermentasi', 'rempah-kuat'],
    labels: ['DIASAP', 'PROTEIN'],
    description: 'Ikan cakalang yang diawetkan melalui proses pengasapan tradisional di atas jepitan bambu.',
    flavors: { Pedas: 4, Asam: 5, Gurih: 9, Manis: 1, Segar: 3 },
    highlightTags: ['Gurih', 'Asam']
  },
  {
    id: 'rica',
    name: 'Rica-Rica Ayam',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAp9KlYhesgqaiT4Ok1eCe56KFmc8pJ-jCU-Su7ET49-TULmIRq-NzX7MjlKXC-I3KU6KH41jF0tuVzBsHDL05m_bfAfhTT8qfQBvN7aa_Gj9FFnPxps27pLzj8xqdf8WiU3_cU-aalxjnvUXtC_Xw5Zz0T5639r_ZtmVngi6OBHtoKsBTkOprGSKNe9t5BKuig276bmO5KseIcHx4pnS8zG-RN_x-pduXhZS2mnbBHEeTzURN1fK9F6AoWUsp6IZA7C38Dr0XszY',
    tags: ['pedas', 'rempah-kuat'],
    labels: ['PEDAS', 'IKONIK'],
    description: 'Sensasi pedas membara dari cabai rawit yang berpadu dengan keharuman daun kemangi dan jeruk.',
    flavors: { Pedas: 10, Asam: 4, Gurih: 6, Manis: 1, Segar: 4 },
    highlightTags: ['Pedas', 'Gurih']
  },
  {
    id: 'woku',
    name: 'Woku Belanga',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMs7iF1tK9s3W_Nf8yW6_Xv3uHq9MZy7_nK3X_sH9D_k4n8Y_P2E0H6xJk9dJ1c_G7V6JcF0sVyL5Mh9dF5D_YF2J9O7I6O8_a3A1Yq9R_h6d1Yv5K9aJ6W9aJ6_b3nF2H_K1Yv5K9aJ6W9aJ6_b3nF2H',
    tags: ['berkuah', 'segar', 'rempah-kuat'],
    labels: ['BERKUAH', 'AROMATIK'],
    description: 'Hidangan berkuah kuning kental yang sarat dengan rempah daun aromatik khas Minahasa.',
    flavors: { Pedas: 6, Asam: 7, Gurih: 8, Manis: 2, Segar: 9 },
    highlightTags: ['Segar', 'Rempah']
  },
  {
    id: 'paniki',
    name: 'Paniki',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2e8wA3J_H3Z6X9F7O2J8r_O8B9X6W5Z7D3F6X_Z8O9J1X_O9U8D2J5m8sK_J6X9F7O2J8r_O8B9X6W5Z7D3F6X_Z8O9J1X_O9U8D2J5m8sK',
    tags: ['pedas', 'rempah-kuat'],
    labels: ['EKSOTIS', 'PEDAS'],
    description: 'Sajian eksotis daging kelelawar pemakan buah yang dimasak dalam kuah santan pedas.',
    flavors: { Pedas: 8, Asam: 2, Gurih: 9, Manis: 3, Segar: 1 },
    highlightTags: ['Gurih', 'Pedas']
  }
];

const FILTERS = [
  { id: 'all', label: 'SEMUA', icon: '◆' },
  { id: 'pedas', label: 'PEDAS', icon: '🌶' },
  { id: 'asap', label: 'ASAP', icon: '🔥' },
  { id: 'berkuah', label: 'BERKUAH', icon: '🍲' },
  { id: 'fermentasi', label: 'FERMENTASI', icon: '⚗' },
  { id: 'segar', label: 'SEGAR', icon: '🌿' },
  { id: 'rempah-kuat', label: 'REMPAH KUAT', icon: '✦' },
];

export function FeaturedDishes() {
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [filteredDishes, setFilteredDishes] = useState(DISHES);
  const [selectedDish, setSelectedDish] = useState<DishType | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedDish]);

  // Smooth filter transition with a slight delay for animation
  useEffect(() => {
    setFilteredDishes(
      activeFilter === 'all'
        ? DISHES
        : DISHES.filter(d => d.tags.includes(activeFilter))
    );
  }, [activeFilter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const headerVariants: import('motion/react').Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-surface-container-lowest px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="font-headline text-6xl italic text-primary-fixed mb-6">Arsip Rasa <span className="text-shimmer">Terpilih</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Pilihan kurasi hidangan otentik dari dapur Manado yang mendefinisikan keberanian rasa di ujung utara Indonesia.
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scroll('left')} className="p-4 bg-surface-container-high border border-white/5 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
              <ArrowLeft size={24} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scroll('right')} className="p-4 bg-surface-container-high border border-white/5 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300">
              <ArrowRight size={24} />
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Tabs with animated active indicator */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={headerVariants}
          className="relative mb-10 overflow-x-auto no-scrollbar pb-4"
        >
          <LayoutGroup>
            <div className="flex flex-nowrap gap-2 items-center min-w-max">
              {FILTERS.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative font-label font-medium text-[11px] tracking-[0.12em] uppercase px-5 py-2 border transition-colors duration-300 whitespace-nowrap flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'text-cream border-transparent'
                      : 'text-on-surface/50 border-outline-variant/30 hover:text-on-surface/80 hover:border-outline-variant/60'
                  }`}
                >
                  {/* Animated background pill */}
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="filter-active-bg"
                      className="absolute inset-0 bg-primary-container border border-primary-container"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filter.icon}</span>
                  <span className="relative z-10">{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </LayoutGroup>

          {/* Active filter count indicator */}
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 font-label text-[10px] tracking-widest uppercase text-on-surface-variant/40"
          >
            {filteredDishes.length} hidangan ditemukan
          </motion.div>
        </motion.div>

        {/* Cards with AnimatePresence for smooth filter transitions */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                layoutId={`card-${dish.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedDish(dish)}
                className="min-w-[400px] aspect-[3/4] bg-surface-container-low group cursor-pointer relative overflow-hidden snap-start cursor-interact"
              >
                <motion.div layoutId={`image-${dish.id}`} className="absolute inset-0">
                  <Image 
                    src={dish.image} 
                    alt={dish.name}
                    fill
                    className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
                </motion.div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex gap-2 mb-4">
                    {dish.labels.map((label, i) => (
                      <span key={i} className={`px-3 py-1 font-label text-[10px] tracking-tighter ${label === 'PEDAS' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-highest text-on-surface'}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <motion.h3 layoutId={`title-${dish.id}`} className="font-headline text-4xl italic text-cream mb-2">{dish.name}</motion.h3>
                  <p className="text-on-surface-variant font-body text-sm line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20">
                  <div className="w-[180px] h-[180px]">
                    <RadarChart flavors={dish.flavors} />
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <span className="font-headline italic text-base text-cream">{dish.name}</span>
                    <div className="flex gap-1">
                      {dish.highlightTags.map((tag, i) => (
                        <span key={i} className="bg-primary-container text-cream font-body text-[9px] px-1.5 py-0.5 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto cursor-pointer"
            />
            
            <motion.div
              layoutId={`card-${selectedDish.id}`}
              className="w-full max-w-5xl h-[80vh] md:h-full max-h-[800px] bg-surface-container flex flex-col md:flex-row overflow-hidden relative pointer-events-auto"
            >
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>

              <motion.div layoutId={`image-${selectedDish.id}`} className="w-full md:w-1/2 h-1/2 md:h-full relative">
                <Image 
                  src={selectedDish.image} 
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-container via-transparent to-transparent opacity-80" />
              </motion.div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto no-scrollbar relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex gap-2 mb-6">
                    {selectedDish.labels.map((label, i) => (
                      <span key={i} className={`px-4 py-1.5 font-label text-xs tracking-widest ${label === 'PEDAS' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-highest text-on-surface'}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                  
                  <motion.h3 layoutId={`title-${selectedDish.id}`} className="font-headline text-5xl md:text-7xl italic text-primary-fixed mb-6">
                    {selectedDish.name}
                  </motion.h3>
                  
                  <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-10">
                    {selectedDish.description} 
                    {" "}Masakan ini mewakili kekayaan historis persilangan budaya rempah di semenanjung utara Sulawesi, yang menggabungkan metode masak kuno dengan keberanian profil rasa yang menyala.
                  </p>

                  <div className="w-full h-[1px] bg-outline-variant/30 mb-8" />

                  <h4 className="font-label uppercase tracking-[0.2em] text-xs text-secondary mb-6">Anatomi Rasa</h4>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(selectedDish.flavors).map(([flavor, score]) => (
                      <div key={flavor} className="flex items-center gap-3">
                        <span className="font-label text-xs uppercase w-16 text-on-surface/60">{flavor}</span>
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-4 ${i < score ? (score >= 8 ? 'bg-[#C4522A]' : 'bg-[#E8A317]') : 'bg-white/10'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
