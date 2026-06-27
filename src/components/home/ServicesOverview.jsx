import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Wind, Zap, Droplets, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import { SERVICES_OVERVIEW } from '../../lib/images';

export default function ServicesOverview() {
  const { t } = useLanguage();

  const iconMap = {
    Sparkles,
    Wind,
    Zap,
    Droplets,
    Eye,
    Heart,
  };

  const services = SERVICES_OVERVIEW.map((item) => ({
    ...item,
    icon: iconMap[item.icon] || Sparkles,
  }));

  return (
    <section className="py-24 px-8 md:px-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('so_eyebrow')}</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight">
            {t('so_title')}<br/><span className="italic">{t('so_title_italic')}</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Link to="/services" className="font-inter text-xs tracking-[0.3em] uppercase text-gilt border-b border-gilt pb-1 hover:opacity-70 transition-opacity">
            {t('so_view_all')}
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gilt-dim">
        {services.map((service, i) => (
          <motion.div
            key={service.titleKey}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
            className="group relative overflow-hidden bg-obsidian cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={service.img} alt={t(service.titleKey)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
            </div>
            <div className="p-8">
              <service.icon size={20} className="text-gilt mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-white mb-2 group-hover:text-gilt transition-colors duration-300">
                {t(service.titleKey)}
              </h3>
              <p className="font-inter text-sm text-champagne opacity-60">{t(service.subKey)}</p>
              <div className="mt-6 h-px bg-gilt scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}