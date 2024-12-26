import React from 'react';
import { motion } from 'framer-motion';

interface SkillRadarProps {
  skills: Record<string, number>;
}

export function SkillRadar({ skills }: SkillRadarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold mb-4">Skill Radar</h3>
      <div className="space-y-3">
        {Object.entries(skills).map(([skill, value], index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span>{skill}</span>
              <span className="font-semibold">{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-blue-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}