import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const navKeys = [
  { key: 'nav_home', path: '/' },
  { key: 'nav_services', path: '/services' },
  { key: 'nav_gallery', path: '/gallery' },
  { key: 'nav_shop', path: '/shop' },
  { key: 'nav_about', path: '/about' },
  { key: 'nav_contact', path: '/contact' },
];

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="font-inter text-xs tracking-[0.2em] text-champagne opacity-60">{time}</span>;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark border-b border-gilt-dim' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16 h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-playfair text-lg font-bold tracking-wide text-gilt">WENDY</span>
            <span className="font-inter text-[9px] tracking-[0.35em] text-champagne uppercase opacity-70">Beauty Med Spa</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navKeys.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-inter text-xs tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                  location.pathname === link.path ? 'text-gilt' : 'text-champagne hover:text-white'
                }`}
              >
                {t(link.key)}
                <span className={`absolute -bottom-1 left-0 h-px bg-gilt transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Book Button + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 h-[36px] px-3 border border-gilt-dim text-champagne hover:border-gilt hover:text-gilt transition-all duration-300"
              title={lang === 'en' ? 'Passer en Français' : 'Switch to English'}
            >
              <span className="text-base leading-none">{lang === 'en' ? '🇫🇷' : '🇬🇧'}</span>
              <span className="font-inter text-[10px] tracking-[0.15em] uppercase">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>
            <Link
              to="/booking"
              className="hidden md:flex items-center justify-center h-[48px] px-7 border border-gilt text-gilt font-inter text-xs tracking-[0.2em] uppercase hover:bg-gilt hover:text-obsidian transition-all duration-300"
            >
              {t('nav_book')}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-[5px] group p-2"
              aria-label="Open menu"
            >
              <span className="block w-6 h-px bg-gilt transition-all duration-300 group-hover:w-8" />
              <span className="block w-4 h-px bg-champagne transition-all duration-300 group-hover:w-8 group-hover:bg-gilt" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overlay-menu"
          >
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center border border-gilt-dim text-gilt hover:bg-gilt hover:text-obsidian transition-all duration-300"
            >
              <X size={18} />
            </button>

            {/* Clock */}
            <div className="absolute top-8 left-16">
              <Clock />
            </div>

            {/* Nav Items */}
            <div className="flex flex-col gap-2 mt-8">
              {navKeys.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`block font-playfair text-5xl md:text-7xl font-bold transition-all duration-300 leading-tight hover:text-gilt ${
                      location.pathname === link.path ? 'text-gilt' : 'text-white opacity-60 hover:opacity-100'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ delay: navKeys.length * 0.07, duration: 0.5 }}
              >
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center mt-6 h-[56px] px-10 bg-gilt text-obsidian font-inter text-sm tracking-[0.2em] uppercase font-medium hover:bg-champagne transition-all duration-300"
                >
                  {t('nav_book_full')}
                </Link>
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-10 left-16 right-16 flex justify-between items-end">
              <div>
                <p className="font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-50 mb-1">{t('nav_location_label')}</p>
                <p className="font-inter text-sm text-champagne opacity-80">Hotel Mavilla, Cotonou</p>
              </div>
              <div className="text-right">
                <p className="font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-50 mb-1">{t('nav_hours_label')}</p>
                <p className="font-inter text-sm text-champagne opacity-80">{t('nav_hours')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}