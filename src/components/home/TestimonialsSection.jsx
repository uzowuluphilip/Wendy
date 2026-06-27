import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import { TESTIMONIALS } from '../../lib/images';

const testimonials = TESTIMONIALS;

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-8 md:px-16 bg-[#080808] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('tst_eyebrow')}</p>
        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white">
          {t('tst_title')} <span className="italic text-gilt">{t('tst_title_italic')}</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gilt text-gilt" />)}
            </div>
            <blockquote className="font-playfair text-xl md:text-2xl italic text-white leading-relaxed mb-10 max-w-3xl mx-auto">
              "{testimonials[current].text}"
            </blockquote>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gilt-dim">
                <img src={testimonials[current].img} alt={testimonials[current].name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-playfair font-bold text-gilt">{testimonials[current].name}</p>
                <p className="font-inter text-xs tracking-widest uppercase text-champagne opacity-50">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all duration-300">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`transition-all duration-300 h-px ${i === current ? 'w-8 bg-gilt' : 'w-3 bg-gilt/30'}`} />
            ))}
          </div>
          <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} className="w-10 h-10 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all duration-300">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
