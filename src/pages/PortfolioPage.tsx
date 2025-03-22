import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Copy, Check, Moon, Sun, Layout } from 'lucide-react';
import { SharableResume } from '../components/portfolio/SharableResume';
import { useSharableResume } from '../hooks/useSharableResume';
import { themes } from '../components/portfolio/themes';

export function PortfolioPage() {
  const { resume, hasResume, loadingResume } = useSharableResume();
  const [copied, setCopied] = React.useState(false);
  const [currentTheme, setCurrentTheme] = useState('modern');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const handleCopyLink = async () => {
    const shareableLink = `${window.location.origin}/resume/${resume?.sharable_resume.user_id}?theme=${currentTheme}`;
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
            No Resume Found
          </h2>
          <p className="text-gray-600">
            Please analyze your resume first to get your sharable portfolio
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
      {/* Theme Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg hover:bg-white/90 transition-colors"
          >
            <Layout className="w-5 h-5 text-blue-600" />
            <span className="capitalize">{currentTheme} Theme</span>
          </button>

          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-200"
            >
              {Object.keys(themes).map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    setCurrentTheme(theme);
                    setShowThemeSelector(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                    currentTheme === theme ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
                </button>
              ))}
            </motion.div>
          )}
        </div>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Share
            </>
          )}
        </button>
      </div>

      {/* Resume Content */}
      <SharableResume 
        data={resume} 
        theme={currentTheme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}