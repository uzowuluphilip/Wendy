import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import GoldButton from '../components/GoldButton';
import { useLanguage } from '../lib/LanguageContext';
import { BOOKING_STYLIST_IMAGES } from '../lib/images';

const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'];

export default function Booking() {
  const { t } = useLanguage();

  const services = [
    { id: 1, nameKey: 'bk_svc_s1', durationKey: 'bk_svc_d1', price: 600, categoryKey: 'bk_svc_hair' },
    { id: 2, nameKey: 'bk_svc_s2', durationKey: 'bk_svc_d2', price: 320, categoryKey: 'bk_svc_hair' },
    { id: 3, nameKey: 'bk_svc_s3', durationKey: 'bk_svc_d3', price: 380, categoryKey: 'bk_svc_medspa' },
    { id: 4, nameKey: 'bk_svc_s4', durationKey: 'bk_svc_d4', price: 150, categoryKey: 'bk_svc_medspa' },
    { id: 5, nameKey: 'bk_svc_s5', durationKey: 'bk_svc_d5', price: 450, categoryKey: 'bk_svc_body' },
    { id: 6, nameKey: 'bk_svc_s6', durationKey: 'bk_svc_d6', price: 1200, categoryKey: 'bk_svc_bridal' },
    { id: 7, nameKey: 'bk_svc_s7', durationKey: 'bk_svc_d7', price: 220, categoryKey: 'bk_svc_lash' },
    { id: 8, nameKey: 'bk_svc_s8', durationKey: 'bk_svc_d8', price: 180, categoryKey: 'bk_svc_hair' },
  ];

  const stylists = [
    { id: 1, nameKey: 'bk_sp1_name', roleKey: 'bk_sp1_role', specKey: 'bk_sp1_spec', img: BOOKING_STYLIST_IMAGES[0] },
    { id: 2, nameKey: 'bk_sp2_name', roleKey: 'bk_sp2_role', specKey: 'bk_sp2_spec', img: BOOKING_STYLIST_IMAGES[1] },
    { id: 3, nameKey: 'bk_sp3_name', roleKey: 'bk_sp3_role', specKey: 'bk_sp3_spec', img: BOOKING_STYLIST_IMAGES[2] },
    { id: 4, nameKey: 'bk_sp4_name', roleKey: 'bk_sp4_role', specKey: 'bk_sp4_spec', img: BOOKING_STYLIST_IMAGES[3] },
  ];

  const STEPS = [t('bk_step0'), t('bk_step2'), t('bk_step3'), t('bk_step4')];

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState({ service: null, stylist: null, date: null, time: null });
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [confirmed, setConfirmed] = useState(false);

  const canProceed = [
    !!selected.service,
    !!selected.date && !!selected.time,
    !!form.name && !!form.email, true,
  ][step];

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  }).filter(d => d.getDay() !== 0);

  if (confirmed) {
    return (
      <div className="min-h-screen bg-obsidian pt-20 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl"
        >
          <div className="w-20 h-20 border border-gilt rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={32} className="text-gilt" />
          </div>
          <h1 className="font-playfair text-5xl font-bold text-white mb-4">{t('bk_confirmed_title')}</h1>
          <p className="font-inter text-base text-champagne opacity-70 mb-8">
            {t('bk_confirmed_sub')} <span className="text-gilt">{form.email}</span>. {t('bk_confirmed_sub2')}
          </p>
          <div className="border border-gilt-dim p-8 text-left mb-8">
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-6">{t('bk_summary')}</p>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-champagne opacity-60 font-inter text-sm">{t('bk_label_service')}</span><span className="text-white font-inter text-sm">{selected.service ? t(selected.service.nameKey) : ''}</span></div>
              <div className="flex justify-between"><span className="text-champagne opacity-60 font-inter text-sm">{t('bk_label_date')}</span><span className="text-white font-inter text-sm">{selected.date?.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })} · {selected.time}</span></div>

            </div>
          </div>
          <GoldButton to="/" variant="outline">{t('bk_return_home')}</GoldButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Header */}
      <div className="px-8 md:px-16 py-16 border-b border-gilt-dim">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">{t('bk_eyebrow')}</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white">
            {t('bk_title')} <span className="italic text-gilt">{t('bk_title_italic')}</span>
          </h1>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mt-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 transition-all duration-300 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-inter text-xs font-bold transition-all duration-300 ${
                  i < step ? 'bg-gilt border-gilt text-obsidian' : i === step ? 'border-gilt text-gilt' : 'border-gilt-dim text-champagne opacity-30'
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`font-inter text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  i === step ? 'text-gilt' : i < step ? 'text-champagne' : 'text-champagne opacity-30'
                }`}>{s}</span>
              </button>
              {i < STEPS.length - 1 && <ChevronRight size={12} className="text-gilt-dim opacity-50 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-300px)]">
        {/* Main Content */}
        <div className="flex-1 px-8 md:px-16 py-12">
          <AnimatePresence mode="wait">
            {/* Step 0: Service */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <h2 className="font-playfair text-3xl font-bold text-white mb-8">{t('bk_choose_service')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => setSelected(s => ({ ...s, service }))}
                      className={`p-6 border text-left transition-all duration-300 ${selected.service?.id === service.id ? 'border-gilt bg-gilt/5' : 'border-gilt-dim hover:border-gilt/50'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-inter text-[10px] tracking-widest uppercase text-gilt opacity-70">{t(service.categoryKey)}</p>
                        {selected.service?.id === service.id && <Check size={14} className="text-gilt" />}
                      </div>
                      <p className="font-playfair text-lg font-bold text-white mb-1">{t(service.nameKey)}</p>

                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <h2 className="font-playfair text-3xl font-bold text-white mb-8">{t('bk_choose_datetime')}</h2>
                <div className="mb-8">
                  <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-4">{t('bk_select_date')}</p>
                  <div className="flex gap-2 flex-wrap">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(s => ({ ...s, date: d }))}
                        className={`flex flex-col items-center p-3 border min-w-[64px] transition-all duration-300 ${selected.date?.toDateString() === d.toDateString() ? 'border-gilt bg-gilt/5' : 'border-gilt-dim hover:border-gilt/50'}`}
                      >
                        <span className="font-inter text-[10px] uppercase text-champagne opacity-50">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="font-playfair text-xl font-bold text-white mt-1">{d.getDate()}</span>
                        <span className="font-inter text-[10px] uppercase text-champagne opacity-50">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {selected.date && (
                  <div>
                    <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-4">{t('bk_available_times')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelected(s => ({ ...s, time }))}
                          className={`py-3 px-4 border font-inter text-sm transition-all duration-300 ${selected.time === time ? 'border-gilt bg-gilt text-obsidian font-medium' : 'border-gilt-dim text-champagne hover:border-gilt hover:text-gilt'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <h2 className="font-playfair text-3xl font-bold text-white mb-8">{t('bk_your_details')}</h2>
                <div className="max-w-lg space-y-4">
                  {[
                    { field: 'name', labelKey: 'bk_field_name', type: 'text', phKey: 'bk_ph_name' },
                    { field: 'email', labelKey: 'bk_field_email', type: 'email', phKey: 'bk_ph_email' },
                    { field: 'phone', labelKey: 'bk_field_phone', type: 'tel', phKey: 'bk_ph_phone' },
                  ].map(({ field, labelKey, type, phKey }) => (
                    <div key={field}>
                      <label className="block font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-60 mb-2">{t(labelKey)}</label>
                      <input
                        type={type} value={form[field]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        placeholder={t(phKey)}
                        className="w-full h-[52px] bg-transparent border border-gilt-dim px-5 font-inter text-sm text-white placeholder-champagne/30 focus:border-gilt focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-inter text-xs tracking-[0.2em] uppercase text-champagne opacity-60 mb-2">{t('bk_field_requests')}</label>
                    <textarea
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder={t('bk_ph_requests')} rows={4}
                      className="w-full bg-transparent border border-gilt-dim px-5 py-4 font-inter text-sm text-white placeholder-champagne/30 focus:border-gilt focus:outline-none transition-colors duration-300 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <h2 className="font-playfair text-3xl font-bold text-white mb-8">{t('bk_review')}</h2>
                <div className="max-w-lg border border-gilt-dim p-8 space-y-5">
                  {[
                    { labelKey: 'bk_label_service', value: selected.service ? t(selected.service.nameKey) : '' },
                    { labelKey: 'bk_label_date', value: selected.date?.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' }) },
                    { labelKey: 'bk_label_time', value: selected.time },
                    { labelKey: 'bk_label_client', value: form.name },
                    { labelKey: 'bk_label_contact', value: form.email },
                  ].map(({ labelKey, value }) => (
                    <div key={labelKey} className="flex justify-between border-b border-gilt-dim pb-4">
                      <span className="font-inter text-xs uppercase tracking-widest text-champagne opacity-50">{t(labelKey)}</span>
                      <span className="font-inter text-sm text-white">{value}</span>
                    </div>
                  ))}

                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-12">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="h-[56px] px-8 border border-gilt-dim text-champagne font-inter text-xs tracking-[0.2em] uppercase hover:border-gilt hover:text-gilt transition-all duration-300"
              >
                {t('bk_back')}
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => canProceed && setStep(s => s + 1)}
                disabled={!canProceed}
                className={`h-[56px] px-12 font-inter text-xs tracking-[0.2em] uppercase transition-all duration-300 ${canProceed ? 'bg-gilt text-obsidian hover:bg-champagne cursor-pointer' : 'bg-gilt/20 text-champagne/30 cursor-not-allowed'}`}
              >
                {t('bk_continue')}
              </button>
            ) : (
              <button
                onClick={async () => {
                  const serviceName = selected.service ? t(selected.service.nameKey) : '';
                  const dateStr = selected.date?.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' });
                  const message = `🌟 NEW BOOKING — Wendy Beauty Med Spa\n\n👤 Client: ${form.name}\n📧 Email: ${form.email}\n📞 Phone: ${form.phone || 'N/A'}\n\n💆 Service: ${serviceName}\n📅 Date: ${dateStr}\n⏰ Time: ${selected.time}\n\n📝 Notes: ${form.notes || 'None'}`;

                  // Send WhatsApp booking request
                  window.open(`https://wa.me/22997148372?text=${encodeURIComponent(message)}`, '_blank');
                  setConfirmed(true);
                }}
                className="h-[56px] px-12 bg-gilt text-obsidian font-inter text-xs tracking-[0.2em] uppercase hover:bg-champagne transition-all duration-300"
              >
                {t('bk_confirm_btn')}
              </button>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:w-80 xl:w-96 px-8 md:px-10 py-12 border-t lg:border-t-0 lg:border-l border-gilt-dim">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-gilt mb-6">{t('bk_your_selection')}</p>
          <div className="space-y-4">
            {selected.service && (
              <div className="p-4 border border-gilt/30 bg-gilt/5">
                <p className="font-inter text-[10px] uppercase tracking-widest text-gilt opacity-70 mb-1">{t('bk_label_service')}</p>
                <p className="font-playfair text-lg font-bold text-white">{t(selected.service.nameKey)}</p>

              </div>
            )}
            {selected.date && (
              <div className="p-4 border border-gilt-dim">
                <p className="font-inter text-[10px] uppercase tracking-widest text-champagne opacity-50 mb-1">{t('bk_label_date')}</p>
                <p className="font-playfair text-sm font-bold text-white">{selected.date.toLocaleDateString('fr-FR', { weekday: 'short', month: 'long', day: 'numeric' })}</p>
                {selected.time && <p className="font-inter text-sm text-gilt mt-1">{selected.time}</p>}
              </div>
            )}
            {!selected.service && (
              <p className="font-playfair italic text-champagne opacity-30 text-lg">{t('bk_journey_note')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}