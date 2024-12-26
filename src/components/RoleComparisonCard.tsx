import React from 'react';
import { motion } from 'framer-motion';

interface RoleComparisonProps {
  role: {
    compared_role: string;
    similarity_index: number;
    key_matches: string[];
    skill_gaps: string[];
  };
}

export function RoleComparisonCard({ role }: RoleComparisonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{role.compared_role}</h3>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold text-blue-600"
        >
          {role.similarity_index}%
        </motion.div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Key Matches</h4>
          <div className="flex flex-wrap gap-2">
            {role.key_matches.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Skill Gaps</h4>
          <div className="flex flex-wrap gap-2">
            {role.skill_gaps.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}