import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function GoldButton({ children, to, onClick, variant = 'filled', size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-[44px] px-6 text-xs',
    md: 'h-[56px] px-10 text-xs',
    lg: 'h-[64px] px-14 text-sm',
  };

  const variants = {
    filled: 'bg-gilt text-obsidian border-gilt hover:bg-transparent hover:text-gilt',
    outline: 'bg-transparent text-gilt border-gilt hover:bg-gilt hover:text-obsidian',
    ghost: 'bg-transparent text-champagne border-champagne/30 hover:border-gilt hover:text-gilt',
  };

  const baseClass = `inline-flex items-center justify-center border font-inter tracking-[0.2em] uppercase font-medium transition-all duration-300 ${sizes[size]} ${variants[variant]} ${className}`;

  const content = (
    <motion.span
      className={baseClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return <button onClick={onClick}>{content}</button>;
}