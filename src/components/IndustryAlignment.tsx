import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

interface IndustryAlignmentProps {
  alignment: Record<string, number>;
}

export function IndustryAlignment({ alignment }: IndustryAlignmentProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-blue-600" />
        Industry Alignment
      </h3>
      <div className="space-y-6">
        {Object.entries(alignment).map(([industry, score], index) => (
          <motion.div
            key={industry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700">{industry}</h4>
              <span className="text-blue-600 font-semibold">{score}%</span>
            </div>
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}