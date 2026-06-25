import { motion } from 'framer-motion';

const PageShell = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`page-fade ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageShell;
