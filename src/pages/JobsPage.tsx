import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Info } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { JobCard } from '../components/jobs/JobCard';

export function JobsPage() {
  const { jobs, hasJobs, findingYourJobs } = useJobs();

  if (!hasJobs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Jobs Found
          </h2>
          <p className="text-gray-600">
            Please analyze your resume first to get job recommendations.
          </p>
        </div>
      </div>
    );
  }

  if (findingYourJobs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Finding Your Jobs
          </h2>
          <p className="text-gray-600">
            Please wait while we match jobs to your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Featured Jobs</h1>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg">
              <span className="text-gray-600">{jobs.length} jobs found</span>
            </div>
          </div>
          
          <div className="bg-blue-50/80 backdrop-blur-lg rounded-xl p-4 flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-blue-700">
              The last resume processed will be used to curate the job list.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={`${job.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}