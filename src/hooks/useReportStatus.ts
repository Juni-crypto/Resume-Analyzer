import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useReportStatus() {
  const [hasReport, setHasReport] = useState(false);
  const [hasJobs, setHasJobs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const checkReportStatus = async () => {
    if (!user) return;
    
    try {
      const storedAnalysis = localStorage.getItem('resumeAnalysis');
      const storedJobs = localStorage.getItem('jobsData');
      
      setHasReport(!!storedAnalysis);
      setHasJobs(!!storedJobs);
    } catch (error) {
      setHasReport(false);
      setHasJobs(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkReportStatus();
    } else {
      setHasReport(false);
      setHasJobs(false);
      setIsLoading(false);
    }
  }, [user]);

  return { hasReport, hasJobs, isLoading, checkReportStatus };
}