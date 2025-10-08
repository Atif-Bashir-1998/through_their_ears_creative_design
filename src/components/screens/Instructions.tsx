import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';
import Conversation1 from './../../assets/audios/dailylife001.mp3'
import AudioPlayer from '../AudioPlayer';

interface InstructionsProps {
  onNext: () => void;
}

const Instructions = ({ onNext }: InstructionsProps) => {

  console.log(Conversation1)
  return (
    <ScreenWrapper className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Tinnitus Empathy Experience
        </h1>

        <AudioPlayer src={Conversation1} />
        {/* <AudioPlayer src={TinnitusSound1} /> */}


        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Welcome to this empathy experience. You're about to understand what it's like to live with tinnitus.
          </p>
          <ul className="text-left space-y-3 text-gray-600 mb-6">
            <li>• Wear headphones for the full experience</li>
            <li>• Find a quiet space</li>
            <li>• Pay attention to the conversation</li>
            <li>• You'll be asked questions later</li>
          </ul>
        </div>
        <motion.button
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
        >
          I Understand
        </motion.button>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Instructions;