import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConversationProps {
  onNext: () => void;
}

const Conversation = ({ onNext }: ConversationProps) => {
  const [showTinnitus, setShowTinnitus] = useState(false);

  useEffect(() => {
    // Simulate tinnitus starting after 3 seconds
    const timer = setTimeout(() => {
      setShowTinnitus(true);
    }, 3000);

    // Auto-progress after 8 seconds total
    const progressTimer = setTimeout(() => {
      onNext();
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, [onNext]);

  return (
    <ScreenWrapper className="bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Group Conversation
        </h2>
        
        <motion.div
          className="mb-6 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-gray-700">
            "So we're meeting at the park tomorrow around 2 PM? Don't forget to bring the snacks!"
          </p>
        </motion.div>

        <motion.div
          className="mb-6 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-lg text-gray-700">
            "Yes, and I'll bring the frisbee and some drinks. Should we invite Sarah too?"
          </p>
        </motion.div>

        {showTinnitus && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl animate-pulse">🔊</div>
          </motion.div>
        )}

        <motion.p
          className="text-red-500 font-semibold mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: showTinnitus ? 1 : 0 }}
        >
          Tinnitus simulation activated...
        </motion.p>
      </div>
    </ScreenWrapper>
  );
};

export default Conversation;