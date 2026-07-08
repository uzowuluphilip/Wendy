// @ts-nocheck
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import GoldButton from '../components/GoldButton';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import { useLanguage } from '../lib/LanguageContext';
import { SERVICE_CATEGORIES, SERVICES_HERO_IMAGE } from '../lib/images';

function ServiceAccordion({ nameKey, descKey }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gilt-dim">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-5 text-left">
        <span className="font-playfair text-lg font-bold text-white">{t(nameKey)}</span>
        <div className="w-7 h-7 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all flex-shrink-0">
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-inter text-sm text-champagne opacity-70 pb-5 max-w-2xl leading-relaxed">{t(descKey)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryCarousel({ images, alt }) {
  const [carouselApi, setCarouselApi] = useState(null);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="relative overflow-hidden h-48 lg:h-64">
      <Carousel setApi={setCarouselApi} opts={{ loop: true }} className="h-full">
        <CarouselContent className="h-full">
          {images.map((src, index) => (
            <CarouselItem key={src} className="h-full">
              <img src={src} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="outline" className="hidden md:block" />
        <CarouselNext variant="outline" className="hidden md:block" />
      </Carousel>
      <div className="absolute inset-0 bg-obsidian/20" />
    </div>
  );
}

export default function Services() {
  const { t } = useLanguage();

  const lipBlushCategory = {
    titleKey: 'svc_cat10',
    img: '/images/services/lips.jpeg',
    images: [
      '/images/services/lip.jpeg',
      '/images/services/lips.jpeg',
    ],
    services: [
      { nameKey: 'svc_s40_name', descKey: 'svc_s40_desc' },
      { nameKey: 'svc_s41_name', descKey: 'svc_s41_desc' },
      { nameKey: 'svc_s42_name', descKey: 'svc_s42_desc' },
    ],
  };

  const lipBlushVariant = {
    titleKey: 'svc_cat11',
    img: '/images/services/pink.jpeg',
    images: [
      '/images/services/pinklips.jpeg',
      '/images/services/pink.jpeg',
    ],
    services: [
      { nameKey: 'svc_s43_name', descKey: 'svc_s43_desc' },
      { nameKey: 'svc_s44_name', descKey: 'svc_s44_desc' },
      { nameKey: 'svc_s45_name', descKey: 'svc_s45_desc' },
    ],
  };

  const serviceCategories = [...SERVICE_CATEGORIES, lipBlushCategory, lipBlushVariant];

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden flex items-center">
        <img src={SERVICES_HERO_IMAGE} alt="Services" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        <div className="relative px-8 md:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('svc_eyebrow')}</p>
            <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white">
              {t('svc_title')} <span className="italic text-gilt">{t('svc_title_italic')}</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="px-8 md:px-16 py-16">
        {serviceCategories.map((cat, i) => (
          <motion.div
            key={cat.titleKey}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
            className="mb-20"
          >
            <div className="flex flex-col lg:flex-row gap-16 mb-10">
              <div className="lg:w-72 flex-shrink-0">
                {cat.images ? (
                  <CategoryCarousel images={cat.images} alt={t(cat.titleKey)} />
                ) : (
                  <div className="relative overflow-hidden h-48 lg:h-64">
                    <img src={cat.img} alt={t(cat.titleKey)} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-obsidian/20" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-playfair text-4xl font-bold text-white mb-8">{t(cat.titleKey)}</h2>
                <div>
                  {cat.services.map(service => (
                    <ServiceAccordion key={service.nameKey} nameKey={service.nameKey} descKey={service.descKey} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-8 md:px-16 py-20 border-t border-gilt-dim text-center">
        <h2 className="font-playfair text-4xl font-bold text-white mb-6">{t('svc_cta_title')}</h2>
        <p className="font-inter text-base text-champagne opacity-60 mb-10 max-w-md mx-auto">{t('svc_cta_sub')}</p>
        <GoldButton to="/booking" size="lg" variant="filled">{t('svc_cta_btn')}</GoldButton>
      </div>
    </div>
  );
}