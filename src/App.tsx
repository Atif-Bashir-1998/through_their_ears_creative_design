import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Instructions from './components/screens/Instructions';
import Ready from './components/screens/Ready';
import Quiz from './components/screens/Quiz';
import Results from './components/screens/Results';
import End from './components/screens/End';
import type { ScoreEntry } from './interfaces/index';

type Screen = 
  | 'instructions' 
  | 'ready' 
  | 'conversation' 
  | 'quiz' 
  | 'results' 
  | 'end';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('instructions');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  const handleNext = () => {
    const screens: Screen[] = ['instructions', 'ready', 'quiz', 'results', 'end'];
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
    
    // Logic to either go to the next quiz level or the final results screen
    if (level < 5) {
      setCurrentLevel(level + 1);
      setCurrentScreen('quiz');
    } else {
      // All 5 levels are complete, show the final results screen
      setCurrentScreen('results'); 
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'instructions':
        return <Instructions onNext={() => handleNext()} />;
      case 'ready':
        return <Ready onNext={() => handleNext()} />;
      case 'quiz':
        return <Quiz onNext={handleQuizNext} currentLevel={currentLevel} />
      case 'results':
        return <Results scores={scores} onNext={() => handleNext()} />;
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