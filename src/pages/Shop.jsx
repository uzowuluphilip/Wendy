// @ts-nocheck
// @ts-nocheck
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import ProductModal from '../components/shop/ProductModal';
import CartSidebar from '../components/shop/CartSidebar';
import { useLanguage } from '../lib/LanguageContext';
import { SHOP_PRODUCTS } from '../lib/images';

const products = SHOP_PRODUCTS;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  componentDidCatch(error) {
    this.setState({ error });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{background:'white',color:'red',padding:'2rem',margin:'2rem',fontSize:'14px',whiteSpace:'pre-wrap'}}>
          <strong>RENDER ERROR:</strong>{'\n'}{this.state.error.toString()}{'\n'}{this.state.error.stack}
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Shop() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [t('shop_cat_all'), 'Extensions', 'Hair Care', 'Tools', 'Wigs', 'Treatments'];
  const filtered = activeCategory === t('shop_cat_all') || activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Header */}
      <div className="px-8 md:px-16 py-20 border-b border-gilt-dim">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('shop_eyebrow')}</p>
            <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white">
              {t('shop_title1')} <span className="italic text-gilt">{t('shop_title2')}</span>
            </h1>
            <p className="font-inter text-base text-champagne opacity-60 mt-4 max-w-lg">{t('shop_sub')}</p>
          </motion.div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-3 h-[56px] px-7 border border-gilt-dim text-champagne hover:border-gilt hover:text-gilt transition-all duration-300"
          >
            <ShoppingBag size={18} />
            <span className="font-inter text-sm">{t('shop_bag')}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gilt text-obsidian text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-0 mt-12 border border-gilt-dim overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-3 font-inter text-xs tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === cat ? 'bg-gilt text-obsidian' : 'text-champagne hover:text-gilt'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gilt-dim">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="product-card bg-obsidian cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.img} alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onClick={() => setSelectedProduct(product)}
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-gilt text-obsidian font-inter text-[10px] tracking-widest uppercase px-3 py-1">
                      {product.badge}
                    </div>
                  )}
                  <div className="quick-add">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-gilt text-obsidian font-inter text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne transition-colors duration-200"
                    >
                      {t('shop_quick_add')}
                    </button>
                  </div>
                </div>
                <div className="p-5" onClick={() => setSelectedProduct(product)}></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
      <CartSidebar cart={cart} setCart={setCart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
    </ErrorBoundary>
  );
}