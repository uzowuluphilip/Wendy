// @ts-nocheck
import { motion } from 'framer-motion';
import GoldButton from '../components/GoldButton';
import { useLanguage } from '../lib/LanguageContext';
import { ABOUT_BG_IMAGE } from '../lib/images';

export default function About() {
  const { t } = useLanguage();

  const values = [
    { titleKey: 'ab_v1_title', descKey: 'ab_v1_desc' },
    { titleKey: 'ab_v2_title', descKey: 'ab_v2_desc' },
    { titleKey: 'ab_v3_title', descKey: 'ab_v3_desc' },
    { titleKey: 'ab_v4_title', descKey: 'ab_v4_desc' },
  ];

  const stats = [
    { numKey: 'ab_stat1_num', labelKey: 'ab_stat1_label' },
    { numKey: 'ab_stat2_num', labelKey: 'ab_stat2_label' },
    { numKey: 'ab_stat3_num', labelKey: 'ab_stat3_label' },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero / Story */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2">
          <img src={ABOUT_BG_IMAGE} alt="Wendy Beauty" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/20" />
        </div>
        <div className="relative px-8 md:px-16 max-w-2xl py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-6">{t('ab_eyebrow')}</p>
            <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white leading-tight mb-8">
              {t('ab_title')} <span className="italic text-gilt">{t('ab_title_italic')}</span>
            </h1>
            <p className="font-inter text-base text-champagne opacity-80 leading-relaxed mb-6">{t('ab_p1')}</p>
            <p className="font-inter text-base text-champagne opacity-60 leading-relaxed mb-10">{t('ab_p2')}</p>
            <GoldButton to="/booking" variant="outline" size="md">{t('ab_cta')}</GoldButton>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 md:px-16 bg-[#080808]">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('ab_val_eyebrow')}</p>
          <h2 className="font-playfair text-5xl font-bold text-white">{t('ab_val_title')} <span className="italic">{t('ab_val_title_italic')}</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gilt-dim">
          {values.map((v, i) => (
            <motion.div
              key={v.titleKey}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
              className="bg-obsidian p-10"
            >
              <p className="font-playfair text-4xl font-bold text-gilt mb-2">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">{t(v.titleKey)}</h3>
              <p className="font-inter text-sm text-champagne opacity-60 leading-relaxed">{t(v.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-b border-gilt-dim">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gilt-dim">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.numKey}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center py-10 px-6"
            >
              <p className="font-playfair text-5xl md:text-6xl font-bold text-gilt mb-2">{t(stat.numKey)}</p>
              <p className="font-inter text-xs tracking-[0.25em] uppercase text-champagne opacity-50">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}