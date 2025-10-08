import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EndProps {
  onRestart: () => void;
}

const End = ({ onRestart }: EndProps) => {
  const [displayedText, setDisplayedText] = useState('');

  const facts = [
    "Over 50 million Americans experience tinnitus",
    "Tinnitus can be constant or intermittent",
    "It affects concentration and sleep",
    "There is currently no cure",
    "Support and understanding help"
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let timer: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentIndex < facts.length) {
        if (currentText.length < facts[currentIndex].length) {
          currentText = facts[currentIndex].substring(0, currentText.length + 1);
          setDisplayedText(currentText);
          timer = setTimeout(typeWriter, 50);
        } else {
          currentIndex++;
          currentText = '';
          setTimeout(typeWriter, 2000);
        }
      }
    };

    typeWriter();

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenWrapper className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-4xl">
        <motion.h2
          className="text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Tinnitus Facts
        </motion.h2>

        <motion.div
          className="text-xl mb-12 min-h-32 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </motion.div>

        <motion.div
          className="text-gray-400 space-y-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p>Created for Creative Design Master's Project</p>
          <p>Empathy Through Experience</p>
          <p>Thank you for participating</p>
        </motion.div>

        <motion.button
          className="mt-12 border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          Experience Again
        </motion.button>
      </div>
    </ScreenWrapper>
  );
};

export default End;