import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { GALLERY_ITEMS } from '../lib/images';

const galleryItems = GALLERY_ITEMS;

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [t('shop_cat_all'), 'Hair Extensions', 'Color & Gloss', 'Bridal', 'Med Spa', 'Keratin'];
  const filtered = activeCategory === t('shop_cat_all') || activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory);

  const prev = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIndex(i => (i + 1) % filtered.length);

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Header */}
      <div className="px-8 md:px-16 py-20 border-b border-gilt-dim">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('gal_eyebrow')}</p>
          <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white">
            {t('gal_title1')} <span className="italic text-gilt">{t('gal_title2')}</span>
          </h1>
          <p className="font-inter text-base text-champagne opacity-60 mt-4 max-w-lg">{t('gal_sub')}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 font-inter text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeCategory === cat ? 'bg-gilt text-obsidian border-gilt' : 'border-gilt-dim text-champagne hover:border-gilt hover:text-gilt'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-8 md:px-16 py-16">
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="break-inside-avoid group relative cursor-pointer overflow-hidden mb-4"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={item.src} alt={item.after}
                  className="w-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ aspectRatio: item.size === 'tall' ? '3/4' : item.size === 'wide' ? '4/3' : '1/1' }}
                />
                <div className="absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gilt mb-2">{item.category}</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="font-inter text-champagne opacity-50 mb-1">{t('gal_before')}</p>
                        <p className="font-inter text-white">{item.before}</p>
                      </div>
                      <div>
                        <p className="font-inter text-champagne opacity-50 mb-1">{t('gal_after')}</p>
                        <p className="font-inter text-gilt">{item.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <ZoomIn size={14} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center"
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 w-12 h-12 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all z-10">
              <X size={18} />
            </button>
            <button onClick={prev} className="absolute left-6 w-12 h-12 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all z-10">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-6 w-12 h-12 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all z-10">
              <ChevronRight size={18} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl max-h-[80vh] relative"
            >
              <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].after} className="max-h-[75vh] max-w-[90vw] object-contain" />
              <div className="absolute bottom-0 left-0 right-0 p-6 glass-dark border-t border-gilt-dim">
                <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-2">{filtered[lightboxIndex].category}</p>
                <div className="flex gap-8">
                  <div>
                    <p className="font-inter text-[10px] uppercase text-champagne opacity-50 mb-1">{t('gal_before')}</p>
                    <p className="font-inter text-sm text-white">{filtered[lightboxIndex].before}</p>
                  </div>
                  <div>
                    <p className="font-inter text-[10px] uppercase text-champagne opacity-50 mb-1">{t('gal_after')}</p>
                    <p className="font-inter text-sm text-gilt">{filtered[lightboxIndex].after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}