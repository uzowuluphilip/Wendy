import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const newsletterId = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID;
  const newsletterAction = newsletterId ? `https://formspree.io/f/${newsletterId}` : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!newsletterAction) {
      setError('Newsletter form is not configured.');
      return;
    }
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      const response = await fetch(newsletterAction, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        const data = await response.json();
        setError(data.error || 'Unable to subscribe. Please try again later.');
      }
    } catch (err) {
      setError('Unable to subscribe. Please try again later.');
    }
  };

  const links = [
    { labelKey: 'footer_link_services', path: '/services' },
    { labelKey: 'footer_link_gallery', path: '/gallery' },
    { labelKey: 'footer_link_shop', path: '/shop' },
    { labelKey: 'footer_link_about', path: '/about' },
    { labelKey: 'footer_link_booking', path: '/booking' },
    { labelKey: 'footer_link_contact', path: '/contact' },
    { labelKey: 'footer_link_privacy', path: '/privacy' },
    { labelKey: 'footer_link_terms', path: '/terms' },
  ];

  return (
    <footer className="relative bg-obsidian overflow-hidden">
      <div className="relative overflow-hidden py-8 border-t border-gilt-dim">
        <div className="px-8 md:px-16">
          <p className="font-playfair font-bold text-[12vw] leading-none outlined-text whitespace-nowrap select-none tracking-tight opacity-30">
            WENDY BEAUTY
          </p>
        </div>
      </div>

      <div className="px-8 md:px-16 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-gilt-dim pt-12">
          {/* Brand */}
          <div className="max-w-xs">
            <h3 className="font-playfair text-2xl font-bold text-gilt mb-4">Wendy Beauty<br/>Med Spa</h3>
            <p className="font-inter text-sm text-champagne opacity-60 leading-relaxed">{t('footer_desc')}</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="https://www.tiktok.com/@wendybeauty_medspa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gilt-dim flex items-center justify-center text-champagne hover:border-gilt hover:text-gilt transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:grid grid-cols-2 gap-x-16 gap-y-3">
            {links.map((link) => (
              <Link key={link.path} to={link.path} className="font-inter text-xs tracking-[0.15em] uppercase text-champagne opacity-50 hover:opacity-100 hover:text-gilt transition-all duration-300">
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="max-w-sm">
            <p className="font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-50 mb-3">{t('footer_newsletter')}</p>
            {submitted ? (
              <p className="font-playfair italic text-gilt text-lg">{t('footer_welcome')}</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex border border-gilt-dim overflow-hidden">
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent px-4 py-3 font-inter text-sm text-white placeholder-champagne/30 outline-none min-w-0"
                    required
                  />
                  <button type="submit" className="px-4 bg-transparent hover:bg-gilt text-gilt hover:text-obsidian border-l border-gilt-dim transition-all duration-300">
                    <ArrowRight size={16} />
                  </button>
                </div>
                {error && <p className="font-inter text-sm text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-gilt-dim">
          <p className="font-inter text-xs text-champagne opacity-30 tracking-widest">{t('footer_rights')}</p>
          <p className="font-inter text-xs text-champagne opacity-30 tracking-widest">{t('footer_location')}</p>
        </div>
      </div>
    </footer>
  );
}