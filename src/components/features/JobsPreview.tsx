import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Clock } from 'lucide-react';

export const JobsPreview = ({ onSignInClick }: { onSignInClick: () => void }) => {
  const jobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      postedAt: '2 days ago',
      matchScore: 95,
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupX',
      location: 'Remote',
      postedAt: '1 day ago',
      matchScore: 92,
    },
    {
      title: 'Frontend Engineer',
      company: 'InnovateHub',
      location: 'New York, NY',
      postedAt: '3 days ago',
      matchScore: 88,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {job.matchScore}% Match
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{job.postedAt}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignInClick}
            className="mt-4 w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          >
            View Details
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};
