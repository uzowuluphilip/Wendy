import { motion } from 'framer-motion';
import GoldButton from '../GoldButton';
import { useLanguage } from '../../lib/LanguageContext';
import { SIGNATURE_TREATMENTS } from '../../lib/images';

export default function SignatureTreatments() {
  const { t } = useLanguage();

  const treatments = SIGNATURE_TREATMENTS;

  return (
    <section className="py-24 bg-[#080808] overflow-hidden">
      <div className="px-8 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('st_eyebrow')}</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight">
            {t('st_title')}<br/><span className="italic text-gilt">{t('st_title_italic')}</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-0">
        {treatments.map((tr, i) => (
          <motion.div
            key={tr.number}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[420px] border-b border-gilt-dim group`}
          >
            <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
              <img
                src={tr.img} alt={t(tr.titleKey)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-obsidian/10 transition-all duration-700" />
              <div className="absolute top-8 left-8 font-playfair text-6xl font-bold text-white opacity-20 select-none">{tr.number}</div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 bg-obsidian">
              <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-2">{t('st_tag')} {tr.number}</p>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{t(tr.titleKey)}</h3>
              <p className="font-inter text-base text-champagne opacity-70 mb-8 leading-relaxed max-w-lg">{t(tr.descKey)}</p>
              <GoldButton to="/booking" variant="outline" size="md">{t('st_book_btn')}</GoldButton>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}