import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, FileText, Check } from 'lucide-react';

interface LoadingProgressProps {
  onComplete: () => void;
}

export function LoadingProgress({ onComplete }: LoadingProgressProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Check if data already exists in localStorage
    const jobsData = localStorage.getItem('jobsData');
    const sharableResume = localStorage.getItem('sharableResume');

    // If both data exist, complete immediately
    if (jobsData && sharableResume) {
      setIsCompleted(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 1000); // Show completion state briefly
      return;
    }

    // Only start timer if data doesn't exist
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          // Wait 5 seconds after completion before hiding
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onComplete();
            }, 500);
          }, 5000);
          return 0;
        }
        return prev - 1;
      });
      setProgress((prev) => Math.min(prev + (100 / 60), 100));
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 right-4 w-full max-w-md z-[9999]"
        >
          <div className={`bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 hover:shadow-2xl transition-all ${isCompleted ? 'border-green-500/20' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.div
                  animate={isCompleted ? { rotate: 0 } : { rotate: 360 }}
                  transition={{ duration: 2, repeat: isCompleted ? 0 : Infinity, ease: "linear" }}
                  className="w-12 h-12"
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-green-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  ) : (
                    <Briefcase className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">
                    {isCompleted 
                      ? "Your jobs and portfolio are ready!" 
                      : "Creating Your Portfolio & Finding Jobs"
                    }
                  </span>
                  {!isCompleted && (
                    <span className="text-blue-600 font-medium">{timeLeft}s</span>
                  )}
                </div>
                {isCompleted ? (
                  <span className="text-sm text-green-600">
                    Please refresh the page to view them
                  </span>
                ) : (
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}