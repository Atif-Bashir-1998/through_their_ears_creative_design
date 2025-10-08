import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';
import type { ScoreEntry } from './../../interfaces/index';

interface ResultsProps {
  // Now accepts an array of scores from all levels
  scores: ScoreEntry[];
  onNext: () => void; // This will now typically trigger a restart/end screen
}

const TINNITUS_DESCRIPTIONS = [
  'No Tinnitus',
  'Low-Level Tinnitus',
  'Moderate Tinnitus',
  'High-Level Tinnitus',
  'Very High Tinnitus'
];


const Results = ({ scores, onNext }: ResultsProps) => {
  // Calculate the total score
  const totalScore = scores.reduce((sum, entry) => sum + entry.score, 0);
  const maxTotalScore = scores.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <ScreenWrapper className="bg-gradient-to-br from-yellow-50 to-amber-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Final Results Summary 🏆
        </h2>

        {/* Overall Score Card */}
        <motion.div
          className="bg-indigo-600 text-white rounded-2xl p-8 shadow-2xl mb-8 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <p className="text-xl font-semibold mb-2">Total Score</p>
          <div className="text-7xl font-extrabold">
            {totalScore}/{maxTotalScore}
          </div>
          <p className="text-lg mt-4">
            {totalScore / maxTotalScore > 0.7
              ? "Excellent concentration! You performed well even at higher tinnitus levels."
              : "A valuable learning experience. The noise levels significantly increased the difficulty."}
          </p>
        </motion.div>

        {/* Level-by-Level Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Level Breakdown</h3>
          <div className="space-y-4">
            {scores.map((entry, index) => {
              const levelDescription = TINNITUS_DESCRIPTIONS[index] || `Level ${entry.level}`;
              const success = entry.score === entry.total;

              return (
                <motion.div
                  key={entry.level}
                  className={`p-4 rounded-lg border-l-4 ${success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-700">
                      <span className="text-lg">Level {entry.level}:</span> {levelDescription}
                    </div>
                    <div className={`text-xl font-extrabold ${success ? 'text-green-700' : 'text-red-700'}`}>
                      {entry.score}/{entry.total}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {success
                      ? "Perfect score! You focused completely."
                      : `You missed ${entry.total - entry.score} question(s).`}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>


        <motion.button
          className="w-full bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          Finish & View Facts
        </motion.button>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Results;