import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileUp, Moon, Sun } from 'lucide-react';
import { SharableResume } from '../components/portfolio/SharableResume';

export function PublicResumePage() {
  const { userId } = useParams();
  const [resumeData, setResumeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`https://bm7cr2dasm.ap-south-1.awsapprunner.com/sharable-resume/${userId}`);
        if (!response.ok) throw new Error('Resume not found');
        const data = await response.json();
        setResumeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchResume();
  }, [userId]);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Theme toggle button component
  const ThemeToggle = () => (
    <motion.button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg
                 dark:bg-gray-800/50 dark:border-gray-700/50 hover:scale-110 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </motion.button>
  );

  // Add the "Create Your Own" floating button
  const CreateYourOwnButton = () => (
    <motion.a
      href="https://ats-helper.chumaoruworks.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FileUp className="w-5 h-5" />
      <span className="font-medium">Create Your Own</span>
    </motion.a>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 transition-colors duration-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <CreateYourOwnButton />
        <ThemeToggle />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resume Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">This resume may have been removed or is no longer available.</p>
        </div>
        <CreateYourOwnButton />
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 transition-colors duration-200">
      <SharableResume data={resumeData} isDarkMode={isDarkMode} />
      <CreateYourOwnButton />
      <ThemeToggle />
    </div>
  );
}