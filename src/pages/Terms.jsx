import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="px-8 md:px-16 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-inter text-xs tracking-[0.4em] uppercase text-gilt mb-4">Legal</p>
          <h1 className="font-playfair text-5xl font-bold text-white mb-12">Terms of Service</h1>
          <p className="font-inter text-xs tracking-widest uppercase text-champagne opacity-40 mb-16">Last Updated: January 2026</p>

          {[
            { title: '1. Acceptance of Terms', body: 'By accessing and using the Wendy Beauty Med Spa website, booking system, or services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' },
            { title: '2. Appointment Policy', body: 'Appointments must be booked in advance. We require at least 48 hours notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee of up to 50% of the scheduled service value. A deposit may be required to secure certain premium services.' },
            { title: '3. Service Results', body: 'While we strive to achieve the desired results for every client, individual outcomes may vary based on hair type, skin type, existing treatments, and other factors. We provide honest consultations and will advise if a desired result may not be achievable in a single session.' },
            { title: '4. Payment Terms', body: 'Payment is due at the time of service. We accept all major credit cards, cash, and digital payments. All prices listed are starting prices and may vary based on the complexity of the service, hair length, and other factors discussed during consultation.' },
            { title: '5. Products', body: 'All product sales are final. We do not accept returns on opened beauty products for health and safety reasons. Defective products may be exchanged within 7 days of purchase with receipt.' },
            { title: '6. Limitation of Liability', body: 'Wendy Beauty Med Spa shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.' },
          ].map(section => (
            <div key={section.title} className="mb-10 pb-10 border-b border-gilt-dim">
              <h2 className="font-playfair text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="font-inter text-base text-champagne opacity-70 leading-relaxed">{section.body}</p>
            </div>
          ))}

          <div className="mt-8">
            <Link to="/privacy" className="font-inter text-xs tracking-[0.3em] uppercase text-gilt border-b border-gilt pb-1 hover:opacity-70 transition-opacity mr-8">
              Privacy Policy
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