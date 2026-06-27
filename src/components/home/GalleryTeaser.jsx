import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../lib/LanguageContext';
import { GALLERY_TEASER_IMAGES } from '../../lib/images';

const images = GALLERY_TEASER_IMAGES;

export default function GalleryTeaser() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-8 md:px-16 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('gt_eyebrow')}</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white">{t('gt_title')}</h2>
        </motion.div>
        <Link to="/gallery" className="font-inter text-xs tracking-[0.3em] uppercase text-gilt border-b border-gilt pb-1 hover:opacity-70 transition-opacity whitespace-nowrap">
          {t('gt_view_all')}
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="horizontal-gallery pb-4"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
            className="gallery-item group relative cursor-pointer"
            style={{ width: i === 0 ? '420px' : '320px', height: '480px' }}
          >
            <img
              src={img.src} alt={img.label}
              className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="font-inter text-xs tracking-[0.2em] uppercase text-gilt mb-1">{t('gt_client_work')}</p>
              <p className="font-playfair text-lg font-bold text-white">{img.label}</p>
            </div>
            <div className="absolute inset-0 border border-gilt opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}