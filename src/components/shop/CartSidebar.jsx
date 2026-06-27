import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export default function CartSidebar({ cart, setCart, open, onClose }) {
  const { t } = useLanguage();
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/60 z-40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#080808] border-l border-gilt-dim z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gilt-dim">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gilt" />
                <span className="font-playfair text-xl font-bold text-white">{t('cart_title')}</span>
                <span className="font-inter text-xs text-champagne opacity-50">({cart.length})</span>
              </div>
              <button onClick={onClose} className="w-9 h-9 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <ShoppingBag size={40} className="text-gilt opacity-20" />
                  <p className="font-playfair italic text-xl text-champagne opacity-40">{t('cart_empty')}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div></div>
                        <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} className="text-champagne opacity-40 hover:opacity-100 hover:text-gilt transition-all mt-1">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all">
                          <Minus size={12} />
                        </button>
                        <span className="font-inter text-sm text-white w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 pb-8 border-t border-gilt-dim pt-6">
  
                <a
                  href={`https://wa.me/22997148372?text=${encodeURIComponent(
                    cart.map(i => `• ${i.name} x${i.qty}`).join('\n')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[56px] bg-gilt text-obsidian font-inter text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne transition-colors duration-300 mb-3 flex items-center justify-center"
                >
                  {t('cart_checkout')}
                </a>
                  <button onClick={onClose} className="w-full h-[48px] border border-gilt-dim text-champagne font-inter text-xs tracking-[0.2em] uppercase hover:border-gilt hover:text-gilt transition-all duration-300">
                  {t('cart_continue')}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}