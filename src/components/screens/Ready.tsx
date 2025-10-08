import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';

interface ReadyProps {
  onNext: () => void;
}

const Ready = ({ onNext }: ReadyProps) => {
  return (
    <ScreenWrapper className="bg-gradient-to-br from-green-50 to-emerald-100">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Get Ready
        </h2>
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎧
          </motion.div>
          <p className="text-lg text-gray-600 mb-4">
            Please put on your headphones now.
          </p>
          <p className="text-gray-500">
            Make sure they're comfortable and the volume is at a reasonable level.
          </p>
        </div>
        <motion.button
          className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-emerald-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          I'm Ready
        </motion.button>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Ready;