'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll } from 'motion/react';
import { Playfair_Display, Inter } from 'next/font/google';
import Image from 'next/image';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const inter = Inter({ subsets: ['latin'] });

export interface Dish {
  id: string;
  name: string;
  image: string;
  desc: string;
  tags: string[];
  ingredients: string[];
}

const DISHES: Dish[] = [
  {
    id: 'tinutuan',
    name: 'Tinutuan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3xwQz8s2GMppp3mqKpRtaHunkoYGIWIp5GBG3pzitgfvZTHMenVu3IxrNFe2Uf0If9smUeSqWxZ_hy8q3pmhCE44_ySPfQlsV6RAHW6Y_xmNHcdVMUOLO6q2oqrInFMAW7FQm7WtiCRcIBvGrwgBSgy9rphKLDm1zyOCz-i9VYBv9nj9vudACJeBiVMkmWWKAK3XQrf8p0f7x-EO_RK-Vdkl-z7Qi4sUV25j_HBv6QQ5tR6yULPfqhyKKcTD89iK6UQ9UhHF6vHM',
    desc: 'Bubur Manado yang kaya akan serat dari jagung, labu kuning, dan beragam sayuran hijau segar.',
    tags: ['Segar', 'Gurih', 'Vegetarian'],
    ingredients: ['Beras', 'Jagung Manis', 'Labu Kuning', 'Bayam', 'Kangkung', 'Kemangi']
  },
  {
    id: 'cakalang',
    name: 'Cakalang Fufu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNho3EX_R6NIw1j5Yzr3ggt5GgBbm0WfzaLeh0FeTqBGuCNwMkBzyDk_0iy2gqVsXJ_p-hV3TpcWlmdTynXpphL63rOyWIfPEsPcf2TdVWm5cO2clSxnWDlW4SFE8b_6ibYasX6KgVN2lKSwTONBX-DX2p2GEPVtcbZLuqAq3C4zmfl9Wd2YacOg6E32CZbi8-GbZy0gN1k2cFIp8tNJrnXMiDjes1CdVhsytDjZQa9PnaKgH_81oqMFSu6NZ5D2S7S-On8mWH0oo',
    desc: 'Ikan cakalang yang diawetkan melalui proses pengasapan tradisional di atas jepitan bambu.',
    tags: ['Asap', 'Gurih', 'Protein'],
    ingredients: ['Ikan Cakalang', 'Garam', 'Bumbu Halus', 'Asap Kayu Bakar']
  },
  {
    id: 'rica',
    name: 'Rica-Rica Ayam',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAp9KlYhesgqaiT4Ok1eCe56KFmc8pJ-jCU-Su7ET49-TULmIRq-NzX7MjlKXC-I3KU6KH41jF0tuVzBsHDL05m_bfAfhTT8qfQBvN7aa_Gj9FFnPxps27pLzj8xqdf8WiU3_cU-aalxjnvUXtC_Xw5Zz0T5639r_ZtmVngi6OBHtoKsBTkOprGSKNe9t5BKuig276bmO5KseIcHx4pnS8zG-RN_x-pduXhZS2mnbBHEeTzURN1fK9F6AoWUsp6IZA7C38Dr0XszY',
    desc: 'Sensasi pedas membara dari cabai rawit yang berpadu dengan keharuman daun kemangi dan jeruk.',
    tags: ['Pedas', 'Aromatik', 'Ikonik'],
    ingredients: ['Ayam', 'Cabai Rawit Merah', 'Bawang Merah', 'Jahe', 'Daun Jeruk', 'Kemangi']
  },
  {
    id: 'woku',
    name: 'Woku Belanga',
    image: 'https://picsum.photos/seed/woku/400/600',
    desc: 'Hidangan berkuah kuning kental yang sarat dengan rempah daun aromatik khas Minahasa.',
    tags: ['Rempah', 'Segar', 'Berkuah'],
    ingredients: ['Ikan/Ayam', 'Kunyit', 'Daun Pandan', 'Daun Kunyit', 'Kemangi', 'Tomat']
  },
  {
    id: 'paniki',
    name: 'Paniki',
    image: 'https://picsum.photos/seed/paniki/400/600',
    desc: 'Sajian eksotis daging kelelawar pemakan buah yang dimasak dalam kuah santan pedas.',
    tags: ['Eksotis', 'Pedas', 'Santan'],
    ingredients: ['Daging Paniki', 'Santan', 'Cabai', 'Jahe', 'Sereh', 'Bumbu Kuning']
  }
];

function DishCard({ dish, onClick }: { dish: Dish, onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 15);
    y.set((e.clientY - centerY) / 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`card-${dish.id}`}
      variants={{
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300 } }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#1a1a1a] p-8 cursor-pointer border border-[#333] hover:border-[#C4522A] transition-colors relative overflow-hidden group"
    >
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ x: useTransform(x, v => -v), y: useTransform(y, v => -v), scale: 1.1 }}
      >
        <Image src={dish.image} alt={dish.name} fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
      </motion.div>
      <div className="relative z-10">
        <motion.h3 layoutId={`title-${dish.id}`} className={`text-3xl italic mb-4 ${playfair.className}`}>{dish.name}</motion.h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {dish.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider bg-[#2a2a2a] px-2 py-1 text-[#aaaaaa]">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#888] line-clamp-2">{dish.desc}</p>
      </div>
    </motion.div>
  );
}

function DishModal({ dish, onClose }: { dish: Dish, onClose: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`card-${dish.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#1a1a1a] p-10 max-w-2xl w-full border border-[#C4522A] pointer-events-auto relative overflow-hidden shadow-2xl"
    >
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ x: useTransform(x, v => -v), y: useTransform(y, v => -v), scale: 1.1 }}
      >
        <Image src={dish.image} alt={dish.name} fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
      </motion.div>

      <div className="relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-0 right-0 text-[#888] hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>

        <motion.h2 layoutId={`title-${dish.id}`} className={`text-5xl italic mb-6 text-[#E8A317] ${playfair.className}`}>
          {dish.name}
        </motion.h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {dish.tags.map((tag: string) => (
            <span key={tag} className="text-xs uppercase tracking-wider bg-[#C4522A]/20 text-[#C4522A] px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-lg text-[#ccc] mb-8 leading-relaxed">{dish.desc}</p>
        
        <div>
          <h4 className="text-sm uppercase tracking-widest text-[#888] mb-4">Bahan Utama</h4>
          <ul className="grid grid-cols-2 gap-3">
            {dish.ingredients.map((ing: string) => (
              <li key={ing} className="flex items-center gap-2 text-sm text-[#aaa]">
                <div className="w-1 h-1 bg-[#E8A317] rounded-full" />
                {ing}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function MapIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map 1: Intro Scaling (0 -> 0.35 -> 0.65) and Outro Shrinking (0.8 -> 1)
  const mapScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.8, 1], [1, 2.8, 7, 7, 0.15]);
  const mapX = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.8, 1], ["0%", "-18%", "-28%", "-28%", "-42vw"]);
  const mapY = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.8, 1], ["0%", "12%", "22%", "22%", "-40vh"]);
  
  // Layer A opacity
  const islandsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  
  // Layer B (Sulawesi) styling
  const sulawesiStrokeWidth = useTransform(scrollYProgress, [0, 0.35], [0.5, 1.5]);
  const sulawesiStroke = useTransform(scrollYProgress, [0, 0.35], ["#3a3a3a", "#C4522A"]);
  const sulawesiLabelOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const sulawesiFillOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 0.6]);
  const sulawesiFill = useTransform(scrollYProgress, [0, 0.35, 0.65], ["#1e1e1e", "#1e1e1e", "#3d1a05"]);

  // Layer C (Manado Dot)
  const dotScale = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  // Phase 3: Pin Ripple
  const pinY = useTransform(scrollYProgress, [0.65, 0.75], [-60, 0]);
  const pinOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const rippleScale = useTransform(scrollYProgress, [0.75, 0.85], [1, 3]);
  const rippleOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0.6, 0]);

  // Background and Headline
  const bgOverlay = useTransform(scrollYProgress, [0.65, 0.8], ["rgba(13,27,42,1)", "rgba(15,15,15,1)"]);
  const headlineY = useTransform(scrollYProgress, [0.8, 0.95], [80, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const headlineBlur = useTransform(scrollYProgress, [0.8, 0.95], ["blur(12px)", "blur(0px)"]);

  // Ambient glow that pulses with scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 0.8], [0.1, 0.3, 0.5, 0.2]);
  const glowScale = useTransform(scrollYProgress, [0, 0.65, 0.8], [1, 1.5, 0.8]);

  return (
    <div className={`bg-[#0a0a0a] text-[#F5F0E8] ${inter.className}`}>
      
      {/* 400vh Container to act as the scroll timeline */}
      <div ref={containerRef} className="h-[400vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0" style={{ backgroundColor: bgOverlay }} />

          {/* Ambient glow behind map */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C4522A]/10 blur-[150px] pointer-events-none"
            style={{ opacity: glowOpacity, scale: glowScale }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#E8A317]/5 blur-[120px] pointer-events-none"
            style={{ opacity: glowOpacity }}
          />
          
          <motion.div 
            className="relative w-[800px] h-[500px] will-change-transform z-0"
            style={{ scale: mapScale, x: mapX, y: mapY }}
          >
            <svg viewBox="0 0 800 500" className="w-full h-full overflow-visible">
              <motion.g fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="0.5" style={{ opacity: islandsOpacity }}>
                <path id="sumatra" d="M 80 100 L 120 120 L 180 200 L 240 300 L 200 320 L 150 250 L 100 150 Z" />
                <path id="jawa" d="M 250 290 L 300 300 L 380 320 L 420 340 L 400 360 L 300 340 L 250 310 Z" />
                <path id="kalimantan" d="M 280 150 L 350 120 L 450 150 L 480 200 L 450 280 L 350 290 L 300 250 Z" />
                <path id="papua" d="M 620 180 L 680 140 L 750 150 L 800 200 L 780 300 L 700 360 L 650 300 L 620 250 Z" />
                <path id="bali" d="M 430 340 L 450 340 L 440 360 Z" />
                <path id="lombok" d="M 460 340 L 480 330 L 470 350 Z" />
                <path id="maluku" d="M 600 150 L 620 160 L 610 180 Z" />
              </motion.g>

              {/* Sulawesi */}
              <motion.path 
                id="sulawesi" 
                d="M 540 140 L 560 130 L 570 145 L 550 170 L 530 200 L 580 210 L 610 200 L 600 240 L 550 240 L 560 290 L 530 310 L 510 270 L 490 240 L 510 210 L 490 170 Z" 
                style={{ strokeWidth: sulawesiStrokeWidth, stroke: sulawesiStroke, fill: sulawesiFill }} 
              />
              <motion.text x="530" y="220" fill="#aaaaaa" fontSize="11" letterSpacing="0.1em" className="font-medium" style={{ opacity: sulawesiLabelOpacity }}>SULAWESI</motion.text>

              {/* Manado */}
              <motion.circle cx="560" cy="145" r="3" fill="#E53935" style={{ scale: dotScale, opacity: dotOpacity, transformOrigin: '560px 145px' }} />
              <motion.text x="568" y="148" fill="#F5F0E8" fontSize="8" className="font-medium" style={{ opacity: dotOpacity }}>Manado</motion.text>

              {/* Pin Drop */}
              <motion.g transform="translate(560, 145)" style={{ y: pinY, opacity: pinOpacity }}>
                <motion.g style={{ scale: rippleScale, opacity: rippleOpacity, transformOrigin: "center" }}>
                  <circle cx="0" cy="0" r="4" fill="none" stroke="#E53935" strokeWidth="1" />
                  <circle cx="0" cy="0" r="8" fill="none" stroke="#E53935" strokeWidth="1" />
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#E53935" strokeWidth="1" />
                </motion.g>
                <path d="M 0 0 C 6 -8 10 -14 10 -20 C 10 -26 6 -30 0 -30 C -6 -30 -10 -26 -10 -20 C -10 -14 -6 -8 0 0 Z" fill="#E53935" />
                <circle cx="0" cy="-20" r="3" fill="#ffffff" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Headline Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className={`text-6xl md:text-8xl font-bold overflow-hidden ${playfair.className}`}>
              <motion.div style={{ y: headlineY, opacity: headlineOpacity, filter: headlineBlur }}>
                <span className="text-shimmer">Dapur Nusantara</span>
              </motion.div>
            </div>
            <motion.div className={`text-xl md:text-2xl mt-4 italic text-[#E8A317] ${playfair.className}`} style={{ y: headlineY, opacity: headlineOpacity, filter: headlineBlur }}>
              Dari Manado, untuk Nusantara
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-10 opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Culinary Content */}
      <div className="min-h-screen bg-[#0f0f0f] py-32 px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {DISHES.map((dish) => (
              <DishCard key={dish.id} dish={dish} onClick={() => setSelectedDish(dish.id)} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDish && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="fixed inset-0 bg-black z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
              {DISHES.filter(d => d.id === selectedDish).map(dish => (
                <DishModal key={dish.id} dish={dish} onClose={() => setSelectedDish(null)} />
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
