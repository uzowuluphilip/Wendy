import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import GoldButton from '../GoldButton';
import { useLanguage } from '../../lib/LanguageContext';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const { t } = useLanguage();
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 bg-[#0a0a0a] border border-gilt-dim max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all duration-300 z-10"
          >
            <X size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <div className="absolute top-6 left-6 bg-gilt text-obsidian font-inter text-[10px] tracking-widest uppercase px-3 py-1">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-10 flex flex-col justify-center">

              {/* Details */}
              {product.color && (
                <div className="mb-6 pb-6 border-b border-gilt-dim">
                  <p className="font-inter text-xs tracking-widest uppercase text-champagne opacity-40 mb-1">Available in</p>
                  <p className="font-inter text-sm text-white">{product.color}</p>
                </div>
              )}
              {product.weight && (
                <div className="mb-8 pb-6 border-b border-gilt-dim">
                  <p className="font-inter text-xs tracking-widest uppercase text-champagne opacity-40 mb-1">Weight & Length</p>
                  <p className="font-inter text-sm text-white">{product.weight}</p>
                </div>
              )}

              <GoldButton onClick={() => { onAddToCart(product); onClose(); }} size="lg" variant="filled">
                {t('pm_add_btn')}
              </GoldButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}