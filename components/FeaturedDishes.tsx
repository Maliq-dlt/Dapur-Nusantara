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
  ingredients: string[];
  steps: string[];
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
    highlightTags: ['Segar', 'Gurih'],
    ingredients: ['Beras putih 200g', 'Jagung manis pipil 2 buah', 'Labu kuning kupas 200g', 'Daun bayam & kangkung', 'Daun kemangi 2 tangkai', 'Batang serai memarkan', 'Garam & merica secukupnya'],
    steps: ['Rebus beras bersama serai hingga teksturnya menjadi bubur setengah matang.', 'Masukkan potongan labu kuning dan jagung pipil, aduk terus agar bagian bawah tidak gosong.', 'Setelah sayuran keras matang, masukkan sayuran hijau (bayam, kangkung).', 'Bumbui dengan garam dan merica, lalu masukkan daun kemangi menjelang diangkat.', 'Sajikan selagi panas berdampingan dengan rica roa dan dabu-dabu.']
  },
  {
    id: 'cakalang',
    name: 'Cakalang Fufu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNho3EX_R6NIw1j5Yzr3ggt5GgBbm0WfzaLeh0FeTqBGuCNwMkBzyDk_0iy2gqVsXJ_p-hV3TpcWlmdTynXpphL63rOyWIfPEsPcf2TdVWm5cO2clSxnWDlW4SFE8b_6ibYasX6KgVN2lKSwTONBX-DX2p2GEPVtcbZLuqAq3C4zmfl9Wd2YacOg6E32CZbi8-GbZy0gN1k2cFIp8tNJrnXMiDjes1CdVhsytDjZQa9PnaKgH_81oqMFSu6NZ5D2S7S-On8mWH0oo',
    tags: ['asap', 'fermentasi', 'rempah-kuat'],
    labels: ['DIASAP', 'PROTEIN'],
    description: 'Ikan cakalang yang diawetkan melalui proses pengasapan tradisional di atas jepitan bambu.',
    flavors: { Pedas: 4, Asam: 5, Gurih: 9, Manis: 1, Segar: 3 },
    highlightTags: ['Gurih', 'Asam'],
    ingredients: ['Ikan Cakalang segar ukuran sedang', 'Garam kasar secukupnya', 'Bambu belah untuk menjepit', 'Sabut kelapa kering (untuk pengasapan)'],
    steps: ['Bersihkan perut ikan cakalang lalu belah memanjang membentuk pola kupu-kupu.', 'Lumuri dengan garam kasar secara merata.', 'Jepit menggunakan bilah bambu agar daging tetap merentang sempurna saat dipanaskan.', 'Lakukan pengasapan perlahan dengan panas sabut kelapa yang membara, jauhkan dari lidah api langsung.', 'Tunggu sekitar 3-4 jam hingga daging ikan keras, memerah gelap, dan harum asap mengunci rasa.']
  },
  {
    id: 'rica',
    name: 'Rica-Rica Ayam',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAp9KlYhesgqaiT4Ok1eCe56KFmc8pJ-jCU-Su7ET49-TULmIRq-NzX7MjlKXC-I3KU6KH41jF0tuVzBsHDL05m_bfAfhTT8qfQBvN7aa_Gj9FFnPxps27pLzj8xqdf8WiU3_cU-aalxjnvUXtC_Xw5Zz0T5639r_ZtmVngi6OBHtoKsBTkOprGSKNe9t5BKuig276bmO5KseIcHx4pnS8zG-RN_x-pduXhZS2mnbBHEeTzURN1fK9F6AoWUsp6IZA7C38Dr0XszY',
    tags: ['pedas', 'rempah-kuat'],
    labels: ['PEDAS', 'IKONIK'],
    description: 'Sensasi pedas membara dari cabai rawit yang berpadu dengan keharuman daun kemangi dan jeruk.',
    flavors: { Pedas: 10, Asam: 4, Gurih: 6, Manis: 1, Segar: 4 },
    highlightTags: ['Pedas', 'Gurih'],
    ingredients: ['Ayam kampung potong 12 bagian', 'Cabai rawit merah 100g (sesuai selera)', 'Cabai merah keriting 50g', 'Bawang merah 12 butir & Bawang putih 5 siung', 'Daun jeruk 5 lembar', 'Daun kemangi segar 2 ikat', 'Jahe 3cm & Serai 2 batang'],
    steps: ['Tumbuk kasar semua cabai, bawang merah, dan bawang putih.', 'Panaskan minyak, tumis bumbu tumbuk kasar hingga aroma tajam cabai memudar.', 'Masukkan jahe, serai memar, dan robekan daun jeruk. Aduk hingga wangi menguar.', 'Masukkan ayam potong, aduk hingga berlapis bumbu menutupi seluruh permukaannya.', 'Tambahkan sedikit air, masak hingga bumbu menyusut merah pekat, lalu tuang kemangi sebelum diangkat agar segar.']
  },
  {
    id: 'woku',
    name: 'Woku Belanga',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMs7iF1tK9s3W_Nf8yW6_Xv3uHq9MZy7_nK3X_sH9D_k4n8Y_P2E0H6xJk9dJ1c_G7V6JcF0sVyL5Mh9dF5D_YF2J9O7I6O8_a3A1Yq9R_h6d1Yv5K9aJ6W9aJ6_b3nF2H_K1Yv5K9aJ6W9aJ6_b3nF2H',
    tags: ['berkuah', 'segar', 'rempah-kuat'],
    labels: ['BERKUAH', 'AROMATIK'],
    description: 'Hidangan berkuah kuning kental yang sarat dengan rempah daun aromatik khas Minahasa.',
    flavors: { Pedas: 6, Asam: 7, Gurih: 8, Manis: 2, Segar: 9 },
    highlightTags: ['Segar', 'Rempah'],
    ingredients: ['Ikan kerapu segar bertulang besar', 'Daun pkamun (pandan) besar', 'Daun jeruk & Daun kunyit iris tipis', 'Kemangi cincang 2 ikat besar', 'Bumbu halus: kunyit, jahe, kemiri, cabai rawit'],
    steps: ['Sangrai halus kunyit dan kemiri bersama jahe segar.', 'Tumis bumbu halus bersama daun pandan, kunyit dan serai hingga bumbu kuning mendarat wangi.', 'Tuangkan sedikit air mendidih, masukkan irisan tomat dan belimbing wuluh untuk asam segar.', 'Letakkan ikan dengan hati-hati. Siram kuahnya secara konstan.', 'Lima menit sebelum diangkat, taburkan lautan daun kemangi ke atas kuah woku. Tutup panci 30 detik untuk mengunci uapnya.']
  },
  {
    id: 'paniki',
    name: 'Paniki',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2e8wA3J_H3Z6X9F7O2J8r_O8B9X6W5Z7D3F6X_Z8O9J1X_O9U8D2J5m8sK_J6X9F7O2J8r_O8B9X6W5Z7D3F6X_Z8O9J1X_O9U8D2J5m8sK',
    tags: ['pedas', 'rempah-kuat'],
    labels: ['EKSOTIS', 'PEDAS'],
    description: 'Sajian eksotis daging kelelawar pemakan buah yang dimasak dalam kuah santan pedas.',
    flavors: { Pedas: 8, Asam: 2, Gurih: 9, Manis: 3, Segar: 1 },
    highlightTags: ['Gurih', 'Pedas'],
    ingredients: ['Daging kelelawar hutan (bersihkan, bakar bulunya)', 'Santan kelapa pekat 500ml', 'Cabai rawit gunung porsi besar', 'Bawang merah dan bawang putih', 'Jahe, lengkuas (porsi ganda untuk meredakan bau)'],
    steps: ['Setelah bulu dibakar halus, daging direbus dengan jahe ekstra untuk meluruhkan wangi alam yang tajam.', 'Tumis cabai rawit ulek bersama ketumbar, lengkuas dan bumbu dasar khas.', 'Masukkan potongan daging yang selesai direbus. Aduk agar bumbu pedas masuk ke pori-pori.', 'Tambahkan santan kelapa kental.', 'Rebus dengan api super kecil (slow cook) hingga santan berminyak, membungkus setiap lapisan saraf daging dengan kekayaan gurih-pedas mutlak.']
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
              className="w-full max-w-6xl h-[90vh] bg-surface-container flex flex-col md:flex-row overflow-hidden relative pointer-events-auto rounded-xl shadow-2xl"
            >
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all cursor-interact backdrop-blur-md"
              >
                ✕
              </button>

              {/* Fixed Left Image Side */}
              <motion.div layoutId={`image-${selectedDish.id}`} className="w-full md:w-1/2 h-[40vh] md:h-full relative shrink-0">
                <Image 
                  src={selectedDish.image} 
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-container via-transparent to-transparent md:opacity-80 opacity-100" />
              </motion.div>

              {/* Scrollable Right Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-start overflow-y-auto overflow-x-hidden relative scroll-smooth custom-modal-scroll">
                
                {/* Header Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="pb-8 border-b border-outline-variant/30 shrink-0"
                >
                  <div className="flex gap-2 mb-6">
                    {selectedDish.labels.map((label, i) => (
                      <span key={i} className={`px-4 py-1.5 font-label text-xs tracking-widest ${label === 'PEDAS' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-highest text-on-surface'}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                  
                  <motion.h3 layoutId={`title-${selectedDish.id}`} className="font-headline text-5xl md:text-7xl italic text-primary-fixed mb-6 leading-normal pt-2">
                    {selectedDish.name}
                  </motion.h3>
                  
                  <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                    {selectedDish.description} 
                  </p>
                </motion.div>

                {/* Anatomi Rasa */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="py-10 border-b border-outline-variant/30 shrink-0"
                >
                  <h4 className="font-label uppercase tracking-[0.2em] text-xs text-secondary mb-8 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-secondary" /> Anatomi Rasa
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {Object.entries(selectedDish.flavors).map(([flavor, score], index) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        viewport={{ once: true }}
                        key={flavor} 
                        className="flex items-center justify-between"
                      >
                        <span className="font-label text-xs uppercase text-on-surface/60 tracking-wider p-1">{flavor}</span>
                        <div className="flex gap-1.5">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-4 ${i < score ? (score >= 8 ? 'bg-[#C4522A]' : 'bg-secondary') : 'bg-white/5'}`} 
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Komposisi Bumbu */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="py-10 border-b border-outline-variant/30 shrink-0"
                >
                  <h4 className="font-label uppercase tracking-[0.2em] text-xs text-primary-fixed mb-8 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-primary-fixed" /> Ensiklopedia Bumbu
                  </h4>
                  <ul className="space-y-4">
                    {selectedDish.ingredients.map((item, idx) => (
                      <motion.li 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * idx }}
                        key={idx} 
                        className="flex gap-4 font-body text-on-surface-variant/80 items-start"
                      >
                        <span className="text-secondary mt-0.5">✦</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Ritual Memasak */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="py-10 shrink-0 mb-10"
                >
                  <h4 className="font-label uppercase tracking-[0.2em] text-xs text-cream mb-8 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-cream" /> Ritual Memasak
                  </h4>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/30 before:to-transparent">
                    {selectedDish.steps.map((step, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{ duration: 0.6 }}
                        key={idx} 
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                      >
                        {/* Dot indicator */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-surface-container bg-surface-container-highest shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300">
                          <span className="w-2 h-2 bg-secondary rounded-full" />
                        </div>
                        {/* Content box */}
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-5 rounded-lg border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container-highest transition-colors">
                          <div className="font-label text-[10px] text-secondary mb-2 tracking-widest">LANGKAH {idx + 1}</div>
                          <p className="font-body text-sm text-on-surface-variant leading-relaxed">{step}</p>
                        </div>
                      </motion.div>
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
