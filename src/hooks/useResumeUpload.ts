import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useResumeUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !selectedRole) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('roles', JSON.stringify([selectedRole]));

      // If user is logged in, include their ID
      if (user) {
        formData.append('user_id', user.uid);
      }

      const response = await fetch(
        'https://bm7cr2dasm.ap-south-1.awsapprunner.com/analyze-resume',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze resume. Please try again.');
      }

      const analysisData = await response.json();

      // Store analysis in localStorage
      localStorage.setItem('resumeAnalysis', JSON.stringify(analysisData));
      // If user is logged in, fetch their data
      if (user) {
        const atsResponse = await fetch(
          `https://bm7cr2dasm.ap-south-1.awsapprunner.com/ats-response/${user.uid}`
        );

        if (!atsResponse.ok) {
          throw new Error('Failed to fetch analysis results.');
        }

        const atsData = await atsResponse.json();
        localStorage.setItem(
          'resumeAnalysis',
          JSON.stringify(atsData.response_data)
        );
        localStorage.removeItem('jobsData');
      }

      navigate('/analysis');

      // Show upgrade modal after a delay if user is not logged in
      if (!user) {
        setTimeout(() => {
          setShowUpgradeModal(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error processing resume:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedFile,
    selectedRole,
    isLoading,
    error,
    showUpgradeModal,
    setShowUpgradeModal,
    handleFileUpload,
    handleRoleSelect,
    handleSubmit,
  };
}
