'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const REGIONS = [
  {
    id: 'manado',
    name: 'Manado',
    desc: 'PEDAS & AROMATIK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDybIxQvimobfFsKtVvBiyQF6lAZtj8bvYkd3whDBcR0eO5i0rATFvaN3Simoi2ropFMxbWy3wUa3C9yH5b-V48AxivqG-FFNaf-sWpulTvfPpio5QA0I3NQCNmX_OJZ1HF1DQs_FXlELKSHKori62TgbxNXl0YZ-ejfOCiqRB_ejf4BgnasJXxrnrNLfGbFJH-3v3E55-jSgfydb67cOhXEPjH3xoT2xglBQjRrfBsWIenO-FyxI5BEr-BclIIDQDDRzWfNzkGd38',
    accent: '#E53935'
  },
  {
    id: 'padang',
    name: 'Padang',
    desc: 'PEKAT & REMPAH',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAauIoXBybEuPKTw6q0ODvEMXZ3i6nx-TMIz-lZAoZb8iR8pUx0eJJ8l6L1r2eVGeL6rF3fYQCRw4KR0DlthbcwxwV3xVtBn1Ujd2USZLvDMJVB65qaHWOuf-Zu0yloiW8594yaG2dDD0ZM_r63GoOJPizHu6DWIObpb_WVXI2mLoqJh-O3_qBTv9TgDj7p33v3HyxtZKzxj3ocsLXsoSBmaNrkCLTlyzg8Y1Ru4rT7vwJ2o0aeDwx3IjtjfFlkHkUfvSuP7V4ZhGw',
    accent: '#FF8F00'
  },
  {
    id: 'solo',
    name: 'Solo',
    desc: 'MANIS & ELEGAN',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdp3unWALk9BFjXwI6ElFwEvZLAoZrU1AegL91lLL8MuOYO5hnHnBuHk8kFz9F-FjiLj-kJdCOHMnVDKufWUumrM4cGgDzUCNRForTYaHSaM5NHinmS066f9gbRJoJbWA6Nfo9Z7wKqMxmX_lhIV8JTK707I05IhmGxKG6zb0sa8ZYCaJTNahmaySfRWuWLQArO3J5qn8DSZjIAWBKwAxiEuMfkx9zIlcKYeYBFi4-maAoq52Uox5DeeI4AJ6OV0Mb9vnl-QkUPB4',
    accent: '#8D6E63'
  },
  {
    id: 'bali',
    name: 'Bali',
    desc: 'EKSOTIS & BERANI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAdlCuAMrQieuetjZAykJNRd8kVJ_E80EFKsESn06XlqXDgZZ8gPG_-2KbI7Xam_jl90CtNj07WTQtFcuY4ORBRE4Dqk74Qp-EobTEcGj75PDbyHXLeQy9G6BctsiLdaLxD7Ul6xfwdy1oPjAA6Zgg9Si-4W3DZT7oxl8srRVTpY_hlT3_UIGdc4Ly9wCWU1jl6k2h3usr1-dqyT8VZKOuNuRtARj6SwVOYq-xyUbu8e0AW1Ds3wpCkoU63_pAPLWYl-UjQFKqW0Y',
    accent: '#43A047'
  },
  {
    id: 'makassar',
    name: 'Makassar',
    desc: 'GURIH & KUAT',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7TG4dgOnVRll_r02BJSJSsmyk2VQROL4tCYOrMuYrr-FPOl0bmZd1_1hzsGmohIVwQqEQLbRjZ_zEW0UvrGpbStgHuGT6NXygCiwJNj_APDaRd3S3A5nKJpIOu1ERa8fioe4h3EddgZkKEngEcWzRU8rSOFPJd_n--imdt-Ufkew1iAPVIG_tKJn4T1FTZp6bm1II7_F_MU-jF3QJthgdusDZW46uocU3zRBxY28GyxUfpzW_GiiTvPEmdy2Apgd7Ref-YshlUwc',
    accent: '#C4522A'
  },
  {
    id: 'betawi',
    name: 'Betawi',
    desc: 'AKULTURASI & KRIMY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZRuYiGZ454CcJ3u8kLWiG6n_CZz3A9Ze5Tm1UOxb7WvzsyXZr4HOi3H2u6RnpZS1JcVnp1_iSZQ852vDv-JGQ0-0kzn994A28NT8ylXxScgIm7C7rwbcB9Pylq2fyQc1LpoTft5FXQ_npCU_orfFe8E0ub1YhRzCtKFL6QRKxPI97psnhMLmATpODiyMTFgRwXwnpVZNAssWUIyS8M_KpJpZUb8bnYMQI89Bceg3BKetUXf1Yfu0hEdwz1sFVdnuwHVYDvVC2Fk8',
    accent: '#FFB300'
  }
];

export function RegionalGrid() {
  const containerVariants: import('motion/react').Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: import('motion/react').Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-surface-container-lowest px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <p className="font-label text-secondary tracking-[0.3em] uppercase text-xs mb-4">Lintas Daerah</p>
          <h2 className="font-headline text-7xl text-on-surface">Peta Kuliner <span className="text-shimmer">Nusantara</span></h2>
          <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto">
            Menelusuri warisan rasa dari setiap sudut kepulauan, dari aroma Padang yang pekat hingga manisnya Solo yang elegan.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-outline-variant/15"
        >
          {REGIONS.map((region, idx) => (
            <motion.div 
              variants={itemVariants}
              key={region.id} 
              whileHover={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative aspect-square group overflow-hidden bg-surface-container-lowest cursor-pointer"
            >
              <Image 
                src={region.image} 
                alt={region.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
                className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-surface-container-lowest/60 group-hover:bg-transparent transition-all duration-700" />
              
              {/* Accent corner line on hover */}
              <motion.div 
                className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: region.accent }}
              />
              <motion.div 
                className="absolute top-0 left-0 h-0 w-[2px] group-hover:h-full transition-all duration-700 delay-100"
                style={{ backgroundColor: region.accent }}
              />

              {/* Number */}
              <div className="absolute top-6 right-6 font-label text-[11px] tracking-widest text-on-surface/20 group-hover:text-on-surface/60 transition-colors duration-500">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <motion.h4 
                  className="font-headline text-3xl italic text-cream"
                >
                  {region.name}
                </motion.h4>
                <p className="text-[10px] font-label tracking-widest mt-2 transition-colors duration-500" style={{ color: region.accent }}>
                  {region.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
