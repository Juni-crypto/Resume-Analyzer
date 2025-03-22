import React from 'react';
import { motion } from 'framer-motion';

interface SkillsChartProps {
  skills: string[];
  isDarkMode: boolean;
}

export function SkillsChart({ skills, isDarkMode }: SkillsChartProps) {
  // Split skills into two rows for staggered animation
  const topRow = skills.slice(0, Math.ceil(skills.length / 2));
  const bottomRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <div className="relative overflow-hidden py-8">
      {/* Background effects */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-purple-900/20'
            : 'from-purple-100/50 via-indigo-100/50 to-purple-100/50'
        }`}
      />

      {/* Gradient overlays */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r ${
          isDarkMode
            ? 'from-gray-800 to-transparent'
            : 'from-white to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l ${
          isDarkMode
            ? 'from-gray-800 to-transparent'
            : 'from-white to-transparent'
        }`}
      />

      {/* Skills rows */}
      <div className="flex flex-col gap-4">
        {/* Top row - moves left */}
        <motion.div
          animate={{
            x: [-1000, -2000],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-4 py-2"
        >
          {[...topRow, ...topRow, ...topRow].map((skill, idx) => (
            <motion.div
              key={`${skill}-${idx}`}
              whileHover={{
                scale: 1.1,
                rotate: [-1, 1],
                transition: { duration: 0.2 },
              }}
              className={`
                px-6 py-3 rounded-xl whitespace-nowrap
                transform hover:rotate-2
                ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-purple-900/60 to-indigo-900/60 text-purple-100 hover:from-purple-800/80 hover:to-indigo-800/80'
                    : 'bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-900 hover:from-purple-200 hover:to-indigo-200'
                }
                backdrop-blur-sm
                shadow-lg hover:shadow-xl
                border border-transparent hover:border-purple-400/20
                transition-all duration-300
                cursor-default font-medium
              `}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row - moves right */}
        <motion.div
          animate={{
            x: [-2000, -1000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-4 py-2"
        >
          {[...bottomRow, ...bottomRow, ...bottomRow].map((skill, idx) => (
            <motion.div
              key={`${skill}-${idx}`}
              whileHover={{
                scale: 1.1,
                rotate: [1, -1],
                transition: { duration: 0.2 },
              }}
              className={`
                px-6 py-3 rounded-xl whitespace-nowrap
                transform hover:rotate-2
                ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-indigo-900/60 to-purple-900/60 text-purple-100 hover:from-indigo-800/80 hover:to-purple-800/80'
                    : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-purple-900 hover:from-indigo-200 hover:to-purple-200'
                }
                backdrop-blur-sm
                shadow-lg hover:shadow-xl
                border border-transparent hover:border-purple-400/20
                transition-all duration-300
                cursor-default font-medium
              `}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
