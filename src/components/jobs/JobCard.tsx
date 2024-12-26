import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { Job } from '../../types/jobs';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {job.company_logo ? (
          <img 
            src={job.company_logo} 
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-lg object-contain bg-white p-1"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {job.title}
          </h3>
          {job.company_url ? (
            <a 
              href={job.company_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {job.company}
            </a>
          ) : (
            <span className="text-gray-700 font-medium">{job.company}</span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {job.location} {job.is_remote && '(Remote Available)'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Posted {formatDate(job.date_posted)}</span>
        </div>
      </div>

      <div className="mt-4">
        <a
          href={job.job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Job
        </a>
      </div>
    </motion.div>
  );
}