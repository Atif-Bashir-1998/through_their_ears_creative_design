import ScreenWrapper from '../ScreenWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import LoopingAudioPlayer from './../LoopingAudioPlayer';
import Conversation1 from './../../assets/audios/dailylife001.mp3'
import Conversation2 from './../../assets/audios/dailylife002.mp3'
import Conversation3 from './../../assets/audios/dailylife003.mp3'
import Conversation4 from './../../assets/audios/dailylife004.mp3'
import Conversation5 from './../../assets/audios/dailylife005.mp3'
import TinnitusSound from './../../assets/audios/tinnitus_sound_01.mp3'


interface QuizProps {
  onNext: (score: number, level: number) => void;
  currentLevel: number;
}

interface Question {
  question: string;
  options: string[];
  correct: string;
}

interface Conversation {
  script: string;
  audioFile: string;
  questions: Question[];
  tinnitusLevel: number;
  description: string;
}

const Quiz = ({ onNext, currentLevel }: QuizProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [isPlayingConversation, setIsPlayingConversation] = useState(false);
  const [isConversationFinished, setIsConversationFinished] = useState(false); // NEW STATE
  const conversationAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Tinnitus Logic ---
  const tinnitusAudioSrc = TinnitusSound;
  // Tinnitus should be OFF for the first level (currentLevel === 1)
  const tinnitusPlaying = currentLevel > 1;
  // Increase volume from level 2 (e.g., 0.1, 0.2, 0.3, 0.4)
  const tinnitusVolume = Math.min((currentLevel - 1) * 0.3, 1.0);
  // -----------------------

  // Conversation data (updated to use your imported audio files)
  const conversations: Conversation[] = [
    {
      script: "Conversation 1: Car Discussion", audioFile: Conversation1, tinnitusLevel: 1, description: "No Tinnitus Sound", questions: [
        {
          question: "What kind of car does the person have?",
          options: ["Toyota", "Honda", "Ford", "BMW"],
          correct: "Honda"
        },
        {
          question: "When was the car new?",
          options: ["2000", "2003", "2005", "2010"],
          correct: "2003"
        },
        {
          question: "How often does the person wash the car?",
          options: ["Once a week", "Once a month", "Every day", "Never"],
          correct: "Once a week"
        }
      ],
    },
    {
      script: "Conversation 2: Relationship Talk", audioFile: Conversation2, tinnitusLevel: 2, description: "Low-Level Tinnitus", questions: [
        {
          question: "Why does person A think he doesn't have a girlfriend?",
          options: ["Not rich enough", "Not funny", "Too busy", "Not interested"],
          correct: "Not rich enough"
        },
        {
          question: "What do girls like according to the conversation?",
          options: ["Guys with money", "Guys with dogs", "Guys who cook", "Guys who travel"],
          correct: "Guys with money"
        },
        {
          question: "What do they decide to learn?",
          options: ["Cooking", "Good jokes", "Dancing", "Singing"],
          correct: "Good jokes"
        }
      ],
    },
    {
      script: "Conversation 3: Divorce Discussion", audioFile: Conversation3, tinnitusLevel: 3, description: "Moderate Tinnitus", questions: [
        {
          question: "When did person B get divorced?",
          options: ["1 year ago", "2 years ago", "5 years ago", "Last month"],
          correct: "2 years ago"
        },
        {
          question: "Why did the wife leave?",
          options: ["Financial problems", "Didn't love him anymore", "Long distance", "Family issues"],
          correct: "Didn't love him anymore"
        },
        {
          question: "Who did she fall in love with?",
          options: ["His brother", "His best friend", "His coworker", "His neighbor"],
          correct: "His best friend"
        }
      ],
    },
    {
      script: "Conversation 4: Dog Walking", audioFile: Conversation4, tinnitusLevel: 4, description: "High-Level Tinnitus", questions: [
        {
          question: "What kind of dog does person B have?",
          options: ["German Shepherd", "Poodle", "Labrador", "Bulldog"],
          correct: "Poodle"
        },
        {
          question: "What do poodles do a lot according to the conversation?",
          options: ["Sleep", "Eat", "Bark", "Play"],
          correct: "Bark"
        },
        {
          question: "Who actually owns the dog?",
          options: ["His sister", "His mom", "His wife", "His daughter"],
          correct: "His mom"
        }
      ],
    },
    {
      script: "Conversation 5: Borrowing Money", audioFile: Conversation5, tinnitusLevel: 5, description: "Very High Tinnitus", questions: [
        {
          question: "How much money does person A want to borrow?",
          options: ["$5", "$10", "$20", "$50"],
          correct: "$5"
        },
        {
          question: "Why does person A need the money?",
          options: ["To buy lunch", "For gas", "For a movie", "For groceries"],
          correct: "To buy lunch"
        },
        {
          question: "What's important about borrowing from friends?",
          options: ["Pay them back", "Buy them gifts", "Keep it secret", "Tell others"],
          correct: "Pay them back"
        }
      ],
    }
  ];

  const currentConversation = conversations[currentLevel - 1];

  console.log({currentConversation})

  // Reset conversation finished state when level changes
  useEffect(() => {
    setIsConversationFinished(false);
    setSelectedAnswers({}); // Clear answers on level change
  }, [currentLevel]);


  const handleConversationEnded = () => {
    setIsPlayingConversation(false);
    setIsConversationFinished(true); // Enable questions after audio ends
  }

  const playConversation = async () => {
    if (conversationAudioRef.current) {
      // Pause any previous playback and reset
      conversationAudioRef.current.currentTime = 0;

      // Start Tinnitus Sound
      // (The LoopingAudioPlayer component's useEffect handles the play/pause based on `tinnitusPlaying` prop)

      // Start Conversation Audio
      await conversationAudioRef.current.play();
      setIsPlayingConversation(true);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const calculateScore = () => {
    let score = 0;
    currentConversation.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    if (!showResults) {
      setShowResults(true);
    } else {
      const score = calculateScore();
      onNext(score, currentLevel);
      setSelectedAnswers({});
      setShowResults(false);
    }
  };

  const allQuestionsAnswered = currentConversation.questions.every(
    (_, index) => selectedAnswers[index] !== undefined
  );

  const score = calculateScore();

  return (
    <ScreenWrapper className="bg-gradient-to-br from-orange-50 to-red-100">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-full max-w-4xl"
      >

        {/* --- TINNITUS AUDIO PLAYER (Hidden and Looping) --- */}
        <LoopingAudioPlayer
          src={tinnitusAudioSrc}
          volume={tinnitusVolume}
          isPlaying={isPlayingConversation && tinnitusPlaying}
        />
        {/* ---------------------------------------------------- */}

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {currentConversation.script}
          </h2>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-yellow-800 font-semibold">
                Level {currentLevel}/5 - {currentConversation.description}
              </span>
            </div>
          </div>
        </div>

        {/* Conversation Audio Player */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Listen to the Conversation</h3>
            <motion.button
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playConversation}
              disabled={isPlayingConversation} // Disable button while playing
            >
              {isPlayingConversation ? "Playing..." : "Play Conversation"}
            </motion.button>
          </div>
          <audio
            ref={conversationAudioRef}
            key={currentConversation.audioFile}
            // Key change: Use onEnded to set isConversationFinished to true
            onEnded={handleConversationEnded}
            onPlay={() => setIsPlayingConversation(true)}
            // Hide the conversation audio controls
            style={{ display: 'none' }}
          >
            <source src={currentConversation.audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p className="text-gray-600 text-sm mt-2">
            Listen carefully to the conversation (Tinnitus: {tinnitusPlaying ? `Level ${currentLevel - 1} / Volume: ${tinnitusVolume.toFixed(2)}` : 'Off'})
          </p>
        </div>

        {/* Questions - Only display after conversation is finished */}
        {isConversationFinished ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Questions</h3>

            <div className="space-y-6">
              {currentConversation.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <p className="text-lg font-semibold text-gray-700 mb-4">
                    {questionIndex + 1}. {question.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[questionIndex] === option;
                      const isCorrect = option === question.correct;
                      const showCorrect = showResults && isCorrect;
                      const showIncorrect = showResults && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={optionIndex}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${isSelected
                              ? showResults
                                ? showCorrect
                                  ? 'border-green-500 bg-green-50 text-green-700'
                                  : showIncorrect
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-indigo-500 bg-indigo-50'
                                : 'border-indigo-500 bg-indigo-50'
                              : showResults && showCorrect
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          whileHover={{ scale: showResults ? 1 : 1.02 }}
                          whileTap={{ scale: showResults ? 1 : 0.98 }}
                          onClick={() => !showResults && handleAnswerSelect(questionIndex, option)}
                          disabled={showResults}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResults && (
                              <>
                                {showCorrect && <span className="text-green-600">✓</span>}
                                {showIncorrect && <span className="text-red-600">✗</span>}
                              </>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 text-center text-gray-600">
            <p className="text-lg font-medium">Please press "Play Conversation" and listen to the audio completely before the questions appear.</p>
            {isPlayingConversation && (
              <div className="mt-4 text-indigo-600 font-semibold">
                Audio is playing... Questions will appear after it finishes.
              </div>
            )}
          </div>
        )}

        {/* Results and Submit */}
        <div className="text-center">
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className={`inline-flex items-center px-6 py-3 rounded-full ${score === currentConversation.questions.length
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
                }`}>
                <span className="font-bold text-lg">
                  Score: {score}/{currentConversation.questions.length}
                </span>
              </div>
            </motion.div>
          )}

          <motion.button
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: (allQuestionsAnswered && isConversationFinished) ? 1.05 : 1 }}
            whileTap={{ scale: (allQuestionsAnswered && isConversationFinished) ? 0.95 : 1 }}
            onClick={handleSubmit}
            // Button is disabled until questions are visible AND answered
            disabled={!isConversationFinished || !allQuestionsAnswered}
          >
            {showResults ?
              (currentLevel === 5 ? "See Final Results" : "Next Conversation") :
              "Submit Answers"}
          </motion.button>

          {!isConversationFinished && (
            <p className="text-sm text-red-500 mt-2">The conversation must finish before you can submit.</p>
          )}
        </div>
      </motion.div>
    </ScreenWrapper>
  );
};

export default Quiz;