import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GoldButton from '../components/GoldButton';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServicesOverview from '../components/home/ServicesOverview';
import SignatureTreatments from '../components/home/SignatureTreatments';
import GalleryTeaser from '../components/home/GalleryTeaser';
import { useLanguage } from '../lib/LanguageContext';
import { HOME_HERO_IMAGE, HOME_CTA_BG_IMAGE } from '../lib/images';

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="bg-obsidian">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img
            src={HOME_HERO_IMAGE}
            alt="Luxury beauty"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 px-8 md:px-16 max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-6"
          >
            {t('hero_eyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-[clamp(3.5rem,9vw,8rem)] font-bold leading-[0.95] mb-4 text-shadow-gold"
          >
            <span className="block text-white">{t('hero_title_1')}</span>
            <span className="block gold-shimmer">{t('hero_title_2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-inter text-base text-champagne opacity-80 max-w-md mb-10 leading-relaxed"
          >
            {t('hero_sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <GoldButton to="/booking" size="lg" variant="filled">{t('hero_cta1')}</GoldButton>
            <GoldButton to="/services" size="lg" variant="outline">{t('hero_cta2')}</GoldButton>
          </motion.div>
        </motion.div>

        {/* Floating stat badges */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
        >
          {[
            { num: t('hero_stat1_num'), label: t('hero_stat1_label') },
            { num: t('hero_stat2_num'), label: t('hero_stat2_label') },
            { num: t('hero_stat3_num'), label: t('hero_stat3_label') },
          ].map((stat) => (
            <div key={stat.label} className="border border-gilt-dim glass-dark p-4 text-right min-w-[140px]">
              <p className="font-playfair text-2xl font-bold text-gilt">{stat.num}</p>
              <p className="font-inter text-xs text-champagne opacity-60 tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-champagne opacity-40">{t('hero_scroll')}</span>
          <ChevronDown size={16} className="text-gilt opacity-60" />
        </motion.div>

        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gilt to-transparent opacity-20" />
      </section>

      <ServicesOverview />
      <SignatureTreatments />
      <GalleryTeaser />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="relative py-32 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HOME_CTA_BG_IMAGE}
            alt="Spa atmosphere"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-obsidian/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
          >
            <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('home_cta_eyebrow')}</p>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              {t('home_cta_title1')}<br/><span className="italic text-gilt">{t('home_cta_title2')}</span>
            </h2>
            <p className="font-inter text-base text-champagne opacity-70 mb-10 max-w-lg mx-auto">
              {t('home_cta_sub')}
            </p>
            <GoldButton to="/booking" size="lg" variant="filled">{t('home_cta_btn')}</GoldButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}