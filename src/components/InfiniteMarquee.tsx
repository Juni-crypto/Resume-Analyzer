import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Clock, Award, Brain, Briefcase } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get detailed insights in seconds"
  },
  {
    icon: Target,
    title: "Perfect Match",
    description: "AI-powered job matching"
  },
  {
    icon: Clock,
    title: "Time Saver",
    description: "75% faster job search"
  },
  {
    icon: Award,
    title: "ATS Optimized",
    description: "Beat applicant tracking systems"
  },
  {
    icon: Brain,
    title: "AI Powered",
    description: "Advanced ML algorithms"
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    description: "Actionable insights"
  }
];

export function InfiniteMarquee() {
  const duplicatedItems = [...features, ...features];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#f8fafc] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#f8fafc] to-transparent z-10"></div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-8"
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex items-center gap-8 px-8 py-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 w-[400px] group hover:bg-blue-50/80 transition-colors duration-300"
          >
            <div className="p-4 bg-blue-100 rounded-xl shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
              <item.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xl text-gray-800 mb-1 whitespace-nowrap">{item.title}</h3>
              <p className="text-gray-600 whitespace-nowrap">{item.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}