import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';

interface ResultsProps {
  score: number;
  onNext: () => void;
}

const Results = ({ score, onNext }: ResultsProps) => {
  return (
    <ScreenWrapper className="bg-gradient-to-br from-yellow-50 to-amber-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Your Results
        </h2>
        
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <div className="text-6xl mb-4 text-indigo-600 font-bold">
            {score}/1
          </div>
          <p className="text-lg text-gray-600">
            {score === 1 
              ? "Great job! You managed to focus despite the tinnitus."
              : "See how difficult it can be to concentrate with constant noise?"}
          </p>
        </motion.div>

        <motion.button
          className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          Continue
        </motion.button>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Results;