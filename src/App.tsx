import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Instructions from './components/screens/Instructions';
import Ready from './components/screens/Ready';
import Conversation from './components/screens/Conversation';
import Quiz from './components/screens/Quiz';
import Results from './components/screens/Results';
import End from './components/screens/End';

type Screen = 
  | 'instructions' 
  | 'ready' 
  | 'conversation' 
  | 'quiz' 
  | 'results' 
  | 'end';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('quiz');
  // const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [scores, setScores] = useState<{ level: number; score: number; total: number }[]>([]);

  const handleNext = (newScore?: number) => {
    if (newScore !== undefined) {
      setScore(newScore);
    }

    const screens: Screen[] = ['instructions', 'ready', 'conversation', 'quiz', 'results', 'end'];
    const currentIndex = screens.indexOf(currentScreen);
    
    if (currentIndex < screens.length - 1) {
      setCurrentScreen(screens[currentIndex + 1]);
    }
  };

  const handleRestart = () => {
    setCurrentScreen('instructions');
    setScores([]);
  };

  const handleQuizNext = (score: number, level: number) => {
    setScores(prev => [...prev, { level, score, total: 3 }]);
    
    if (level < 5) {
      setCurrentLevel(level + 1);
      setCurrentScreen('quiz');
    } else {
      setCurrentScreen('results');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'instructions':
        return <Instructions onNext={() => handleNext()} />;
      case 'ready':
        return <Ready onNext={() => handleNext()} />;
      case 'conversation':
        return <Conversation onNext={() => handleNext()} />;
      case 'quiz':
        // return <Quiz onNext={(newScore) => handleNext(newScore)} />;
        return <Quiz onNext={handleQuizNext} currentLevel={currentLevel} />
      // case 'results':
        // return <Results score={score} onNext={() => handleNext()} />;
      case 'end':
        return <End onRestart={handleRestart} />;
      default:
        return <Instructions onNext={() => handleNext()} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </div>
  );
}

export default App;