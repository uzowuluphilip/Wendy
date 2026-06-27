import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { CONTACT_MAP_IMAGE, CONTACT_MAP_FALLBACK } from '../lib/images';

const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const contactFormId = import.meta.env.VITE_FORMSPREE_CONTACT_ID;
  const contactFormAction = contactFormId ? `https://formspree.io/f/${contactFormId}` : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!contactFormAction) {
      setError('Contact form is not configured.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('subject', form.subject);
    formData.append('message', form.message);

    try {
      const response = await fetch(contactFormAction, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'Unable to send message. Please try again later.');
      }
    } catch (err) {
      setError('Unable to send message. Please try again later.');
    }
  };

  const contactInfo = [
    { icon: MapPin, labelKey: 'contact_addr_label', valueKey: 'contact_addr_val' },
    { icon: Phone, labelKey: 'contact_phone_label', value: '+229 0197148372' },
    { icon: Mail, labelKey: 'contact_email_info_label', value: 'wendybeautymedspa@gmail.com' },
    { icon: Clock, labelKey: 'contact_hours_label', valueKey: 'contact_hours_val' },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Header */}
      <div className="px-8 md:px-16 py-20 border-b border-gilt-dim">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('contact_eyebrow')}</p>
          <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white">
            {t('contact_title')} <span className="italic text-gilt">{t('contact_title2')}</span>
          </h1>
          <p className="font-inter text-base text-champagne opacity-60 mt-4 max-w-lg">{t('contact_sub')}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Form */}
        <div className="px-8 md:px-16 py-16 border-r border-gilt-dim">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-16 h-16 border border-gilt flex items-center justify-center mb-6">
                <Mail size={24} className="text-gilt" />
              </div>
              <h2 className="font-playfair text-3xl font-bold text-white mb-3">{t('contact_received_title')}</h2>
              <p className="font-inter text-base text-champagne opacity-60 max-w-sm">{t('contact_received_sub')}</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              onSubmit={handleSubmit} className="space-y-5 max-w-lg"
            >
              <h2 className="font-playfair text-3xl font-bold text-white mb-8">{t('contact_send_title')}</h2>
              {[
                { field: 'name', labelKey: 'contact_name_label', type: 'text', phKey: 'contact_name_ph' },
                { field: 'email', labelKey: 'contact_email_label', type: 'email', phKey: 'contact_email_ph' },
                { field: 'subject', labelKey: 'contact_subject_label', type: 'text', phKey: 'contact_subject_ph' },
              ].map(({ field, labelKey, type, phKey }) => (
                <div key={field}>
                  <label className="block font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-60 mb-2">{t(labelKey)}</label>
                  <input
                    type={type} value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={t(phKey)} required
                    className="w-full h-[52px] bg-transparent border border-gilt-dim px-5 font-inter text-sm text-white placeholder-champagne/30 focus:border-gilt focus:outline-none transition-colors duration-300"
                  />
                </div>
              ))}
              <div>
                <label className="block font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-60 mb-2">{t('contact_message_label')}</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder={t('contact_message_ph')} rows={5} required
                  className="w-full bg-transparent border border-gilt-dim px-5 py-4 font-inter text-sm text-white placeholder-champagne/30 focus:border-gilt focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>
              {error && (
                <p className="font-inter text-sm text-red-400 mb-2">{error}</p>
              )}
              <button type="submit" className="w-full h-[56px] bg-gilt text-obsidian font-inter text-xs tracking-[0.2em] uppercase font-medium hover:bg-champagne transition-colors duration-300">
                {t('contact_send_btn')}
              </button>
            </motion.form>
          )}
        </div>

        {/* Info */}
        <div className="px-8 md:px-16 py-16">
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }} className="space-y-10"
          >
            <div>
              <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-6">{t('contact_find_us')}</p>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, labelKey, value, valueKey }) => (
                  <div key={labelKey} className="flex gap-5">
                    <div className="w-10 h-10 border border-gilt-dim flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gilt" />
                    </div>
                    <div>
                      <p className="font-inter text-[10px] tracking-widest uppercase text-champagne opacity-50 mb-1">{t(labelKey)}</p>
                      <p className="font-inter text-sm text-white whitespace-pre-line">{valueKey ? t(valueKey) : value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-6">{t('contact_follow')}</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Instagram, label: '@wendybeauty' },
                  { icon: Facebook, label: 'Wendy Beauty' },
                  { icon: TikTokIcon, label: '@wendybeauty_medspa' },
                ].map(({ icon: Icon, label }) => (
                  <a key={label} href="#" className="flex items-center gap-3 px-5 py-3 border border-gilt-dim text-champagne hover:border-gilt hover:text-gilt transition-all duration-300">
                    <Icon size={16} />
                    <span className="font-inter text-xs">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="border border-gilt-dim overflow-hidden">
              <div className="relative h-56 bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src={CONTACT_MAP_IMAGE}
                  alt="Hotel Mavilla Cotonou"
                  className="w-full h-full object-cover opacity-50"
                  onError={e => { e.target.src = CONTACT_MAP_FALLBACK; }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPin size={28} className="text-gilt mb-2" />
                  <p className="font-inter text-xs tracking-widest uppercase text-champagne opacity-60">Hotel Mavilla, Cotonou</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}