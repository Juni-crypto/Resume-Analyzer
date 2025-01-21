import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Copy, Check, Share2, QrCode, X, Eye } from 'lucide-react';
import { SharableResume } from '../components/portfolio/SharableResume';
import { useSharableResume } from '../hooks/useSharableResume';

export function PortfolioPage() {
  const { resume, hasResume, loadingResume } = useSharableResume();
  const [copied, setCopied] = React.useState(false);
  const [showSharePanel, setShowSharePanel] = React.useState(false);

  const shareableLink = `${window.location.origin}/resume/${resume?.sharable_resume.user_id}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: 'linkedin' | 'twitter' | 'email') => {
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}&text=Check out my professional resume!`,
      email: `mailto:?subject=Check out my resume&body=${encodeURIComponent(shareableLink)}`
    };
    window.open(shareUrls[platform], '_blank');
  };


  return (
    <div className="relative">
      <SharableResume data={resume} />
    </div>
  );
}