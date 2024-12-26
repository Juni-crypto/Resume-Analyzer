import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

interface EnhancementTimelineProps {
  items: string[];
}

export function EnhancementTimeline({ items }: EnhancementTimelineProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Enhancement Timeline
      </h3>
      <div className="space-y-6">
        {items.map((item, index) => {
          const [timeline, content] = item.split(':');
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="relative">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-2" />
                {index !== items.length - 1 && (
                  <div className="absolute top-4 left-1.5 w-0.5 h-full -ml-px bg-blue-200" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-600">{timeline.replace('*', '')}</h4>
                <p className="text-gray-600 mt-1">{content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}