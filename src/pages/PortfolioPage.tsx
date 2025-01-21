// src/pages/PortfolioPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Copy, Check } from 'lucide-react';
import { SharableResume } from '../components/portfolio/SharableResume';
import { useSharableResume } from '../hooks/useSharableResume';

export function PortfolioPage() {
  const { resume, hasResume, loadingResume } = useSharableResume();
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = async () => {
    const shareableLink = `${window.location.origin}/resume/${resume?.sharable_resume.user_id}`;
    await navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasResume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Resume Found / Creating Your Portfolio
          </h2>
          <p className="text-gray-600">
            Please analyze your resume first to get your sharable portfolio or wait for some time
          </p>
        </div>
      </div>
    );
  }

  if (loadingResume) {
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
            Creating Your Portfolio
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your sharable resume...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <SharableResume data={resume} />
    </div>
  );
}