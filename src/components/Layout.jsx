import ScrollToTop from './ScrollToTop';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import GoldCursor from './GoldCursor';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <GoldCursor />
      <Navbar />
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  );
}