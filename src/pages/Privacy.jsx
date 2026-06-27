import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="px-8 md:px-16 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">Legal</p>
          <h1 className="font-playfair text-5xl font-bold text-white mb-12">Privacy Policy</h1>
          <p className="font-inter text-xs tracking-widest uppercase text-champagne opacity-40 mb-16">Last Updated: January 2026</p>

          {[
            { title: '1. Information We Collect', body: 'We collect information you provide directly to us, such as when you book an appointment, create an account, make a purchase, or contact us. This includes your name, email address, phone number, payment information, and any other information you choose to provide. We also collect information about your beauty preferences and treatment history to provide personalized services.' },
            { title: '2. How We Use Your Information', body: 'We use the information we collect to provide, maintain, and improve our services; process transactions; send transactional and promotional communications (with your consent); respond to your comments and questions; and comply with legal obligations. We never sell your personal information to third parties.' },
            { title: '3. Information Sharing', body: 'We do not sell, trade, or transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. Your privacy is sacred to us.' },
            { title: '4. Data Security', body: 'We implement industry-standard security measures to protect your personal information. All payment data is encrypted via SSL. We maintain physical, electronic, and procedural safeguards that comply with federal regulations to guard your personal information.' },
            { title: '5. Your Rights', body: 'You have the right to access, update, or delete your personal information at any time. You may opt out of marketing communications at any time. For California residents, you have additional rights under the CCPA. To exercise any of these rights, please contact us at privacy@wendybeauty.com.' },
          ].map(section => (
            <div key={section.title} className="mb-10 pb-10 border-b border-gilt-dim">
              <h2 className="font-playfair text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="font-inter text-base text-champagne opacity-70 leading-relaxed">{section.body}</p>
            </div>
          ))}

          <div className="mt-8">
            <Link to="/terms" className="font-inter text-xs tracking-[0.3em] uppercase text-gilt border-b border-gilt pb-1 hover:opacity-70 transition-opacity mr-8">
              Terms of Service
            </Link>
            <Link to="/contact" className="font-inter text-xs tracking-[0.3em] uppercase text-champagne opacity-50 hover:text-gilt hover:opacity-100 transition-all">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}