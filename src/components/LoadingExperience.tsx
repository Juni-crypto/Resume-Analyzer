import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Target, Zap } from 'lucide-react';

const loadingMessages = [
  {
    icon: Brain,
    message: "AI is analyzing your resume structure..."
  },
  {
    icon: Target,
    message: "Matching your skills with industry requirements..."
  },
  {
    icon: Sparkles,
    message: "Identifying your unique strengths..."
  },
  {
    icon: Zap,
    message: "Generating personalized recommendations..."
  }
];

const inspirationalQuotes = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  'Success is not final, failure is not fatal. - Winston Churchill',
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  'The future depends on what you do today. - Mahatma Gandhi',
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
];

export function LoadingExperience() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => {
        const currentIndex = inspirationalQuotes.indexOf(prev);
        return inspirationalQuotes[(currentIndex + 1) % inspirationalQuotes.length];
      });
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const CurrentIcon = loadingMessages[currentMessageIndex].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Spinner */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-200 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <CurrentIcon className="w-6 h-6 text-blue-600" />
              </motion.div>
            </div>

            {/* Current Action Message */}
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-lg font-medium text-gray-800"
            >
              {loadingMessages[currentMessageIndex].message}
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </div>

            {/* Inspirational Quote */}
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-gray-600 italic"
            >
              {currentQuote}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}