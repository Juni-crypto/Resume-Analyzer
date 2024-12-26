import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Check, X } from 'lucide-react';

interface RoleComparisonProps {
  roles: Array<{
    compared_role: string;
    similarity_index: number;
    key_matches: string[];
    skill_gaps: string[];
  }>;
}

export function RoleComparison({ roles }: RoleComparisonProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-blue-600" />
        Role Compatibility Analysis
      </h3>
      {roles.map((role, index) => (
        <motion.div
          key={role.compared_role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold">{role.compared_role}</h4>
            <div className="relative">
              <svg className="w-24 h-24">
                <circle
                  className="text-gray-200"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="36"
                  cx="48"
                  cy="48"
                />
                <motion.circle
                  className="text-blue-600"
                  strokeWidth="6"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="36"
                  cx="48"
                  cy="48"
                  initial={{ strokeDasharray: "226.2", strokeDashoffset: "226.2" }}
                  animate={{ strokeDashoffset: 226.2 - (226.2 * role.similarity_index) / 100 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{role.similarity_index}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-green-600" />
                <h5 className="font-medium">Key Matches</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.key_matches.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <X className="w-5 h-5 text-red-600" />
                <h5 className="font-medium">Skill Gaps</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.skill_gaps.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}