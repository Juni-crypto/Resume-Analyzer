import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface ExperienceTimelineProps {
  timeline: Record<string, string[]>;
}

export function ExperienceTimeline({ timeline }: ExperienceTimelineProps) {
  const years = Object.keys(timeline).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        Experience Timeline
      </h3>
      <div className="space-y-8">
        {years.map((year, yearIndex) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: yearIndex * 0.1 }}
            className="relative pl-8"
          >
            <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full" />
            {yearIndex !== years.length - 1 && (
              <div className="absolute left-2 top-4 w-0.5 h-full -ml-px bg-blue-200" />
            )}
            <div className="mb-4">
              <span className="text-lg font-bold text-blue-600">{year}</span>
            </div>
            <ul className="space-y-4">
              {timeline[year].map((event, eventIndex) => (
                <motion.li
                  key={eventIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: yearIndex * 0.1 + eventIndex * 0.05 }}
                  className="text-gray-700"
                >
                  {event}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}