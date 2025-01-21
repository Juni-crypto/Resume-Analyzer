import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileUp } from 'lucide-react';
import { SharableResume } from '../components/portfolio/SharableResume';

export function PublicResumePage() {
  const { userId } = useParams();
  const [resumeData, setResumeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <CreateYourOwnButton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h1>
          <p className="text-gray-600">This resume may have been removed or is no longer available.</p>
        </div>
        <CreateYourOwnButton />
      </div>
    );
  }

  return (
    <>
      <SharableResume data={resumeData} />
      <CreateYourOwnButton />
    </>
  );
}