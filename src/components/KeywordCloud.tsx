import React from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

interface KeywordCloudProps {
  keywords: Record<string, number>;
}

export function KeywordCloud({ keywords }: KeywordCloudProps) {
  const maxCount = Math.max(...Object.values(keywords));
  const sortedKeywords = Object.entries(keywords)
    .sort((a, b) => b[1] - a[1]);
  
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Hash className="w-5 h-5 text-blue-600" />
        Keyword Frequency
      </h3>
      <div className="space-y-4">
        {sortedKeywords.map(([keyword, count], index) => {
          const percentage = (count / maxCount) * 100;
          
          return (
            <motion.div
              key={keyword}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{keyword}</span>
                <span className="text-sm font-medium text-blue-600">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-2.5 rounded-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}