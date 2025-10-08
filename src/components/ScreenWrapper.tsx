import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScreenWrapperProps {
  children: ReactNode;
  className?: string;
}

const ScreenWrapper = ({ children, className = '' }: ScreenWrapperProps) => {
  return (
    <motion.div
      className={`min-h-screen w-full flex items-center justify-center p-8 ${className}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="max-w-2xl w-full text-center">
        {children}
      </div>
    </motion.div>
  );
};

export default ScreenWrapper;