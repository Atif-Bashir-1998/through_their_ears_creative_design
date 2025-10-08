import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EndProps {
  onRestart: () => void;
}

// Data for the severity levels
const SEVERITY_LEVELS = [
  { level: 1, type: "No Tinnitus", impact: "Baseline: Normal concentration and quiet perception." },
  { level: 2, type: "Low-Level Tinnitus", impact: "Mild interference, usually only noticeable in quiet environments. Easily masked." },
  { level: 3, type: "Moderate Tinnitus", impact: "Interferes with quiet activities like reading or falling asleep, but manageable." },
  { level: 4, type: "High-Level Tinnitus", impact: "Constant and intrusive; significantly affects concentration and sleep quality." },
  { level: 5, type: "Very High Tinnitus", impact: "Debilitating noise; can lead to severe emotional distress, anxiety, and social withdrawal." },
];

const INTERESTING_FACTS = [
  "Tinnitus is not a disease, but a symptom of an underlying issue, like hearing loss.",
  "It affects an estimated 10% to 15% of the global adult population—that's over 750 million people.",
  "The sound is often the brain's attempt to fill in 'missing' auditory information (like phantom limb pain).",
  "Tinnitus severity is measured by how much it *annoys* you, not just how loud it is.",
  "Treatments focus on habituation and masking techniques, not necessarily a 'cure'."
];

const End = ({ onRestart }: EndProps) => {
  const [displayedFact, setDisplayedFact] = useState('');
  const [showContent, setShowContent] = useState(false); // State to control the visibility of the static content

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let timer: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentIndex < INTERESTING_FACTS.length) {
        if (currentText.length < INTERESTING_FACTS[currentIndex].length) {
          currentText = INTERESTING_FACTS[currentIndex].substring(0, currentText.length + 1);
          setDisplayedFact(currentText);
          timer = setTimeout(typeWriter, 40); // Slightly faster typing
        } else {
          currentIndex++;
          currentText = '';
          if (currentIndex === INTERESTING_FACTS.length) {
             // After the last fact is displayed, show the static content
             setShowContent(true);
             return;
          }
          // Pause before starting the next fact
          timer = setTimeout(typeWriter, 2500); 
        }
      }
    };

    // Start typing after a short initial delay
    timer = setTimeout(typeWriter, 500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <ScreenWrapper className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-4xl py-12">
        <motion.h2
          className="text-5xl font-bold mb-8 text-center text-amber-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Understanding Tinnitus 👂
        </motion.h2>

        {/* Typing Facts Section */}
        <motion.div
          className="bg-gray-800 rounded-xl p-6 mb-10 min-h-32 shadow-xl border-l-4 border-amber-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-3">Key Facts</h3>
          <p className="text-lg font-light text-gray-200">
            {displayedFact}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        {/* Severity Levels Section */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: INTERESTING_FACTS.length * 0.25 + 1 }} // Start showing after typing is done
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-white">
            Severity Levels & Impact
          </h3>
          
          <div className="space-y-4">
            {SEVERITY_LEVELS.map((levelData, index) => (
              <motion.div
                key={levelData.level}
                className="bg-gray-700 p-4 rounded-lg shadow-md border-l-4 border-indigo-500"
                initial={{ opacity: 0, x: -20 }}
                animate={showContent ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index + 0.5 + INTERESTING_FACTS.length * 0.25 + 1}}
              >
                <p className="font-bold text-lg mb-1 flex justify-between items-center">
                  <span>Level {levelData.level}: {levelData.type}</span>
                  <span className="text-sm text-indigo-300">Impact:</span>
                </p>
                <p className="text-gray-300 text-sm">{levelData.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer and Restart Button */}
        <motion.div
          className="text-gray-400 space-y-4 text-center text-lg mt-10"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: INTERESTING_FACTS.length * 0.25 + 2 }}
        >
          <p>A Creative Design Master's Project: **Empathy Through Experience**</p>
          <p>Thank you for participating in the simulation.</p>
        </motion.div>

        <motion.button
          className="mt-10 w-full border-2 border-amber-400 text-amber-400 px-8 py-3 rounded-full font-bold text-xl hover:bg-amber-400 hover:text-black transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: INTERESTING_FACTS.length * 0.25 + 2.5 }}
        >
          Experience Again (Restart)
        </motion.button>
      </div>
    </ScreenWrapper>
  );
};

export default End;