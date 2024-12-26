import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

const stats = [
  {
    icon: TrendingUp,
    value: 85,
    label: "Success Rate",
    description: "of our users land interviews"
  },
  {
    icon: Users,
    value: 50000,
    label: "Active Users",
    description: "trust our platform"
  },
  {
    icon: Clock,
    value: 95,
    label: "Time Saved",
    description: "average time reduction in job search"
  },
  {
    icon: Award,
    value: 92,
    label: "Match Rate",
    description: "accurate job recommendations"
  }
];

export function StatisticsSection() {
  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  <AnimatedCounter end={stat.value} />
                  {typeof stat.value === 'number' && stat.value <= 100 ? '%' : '+'}
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}