import { useMemo } from 'react';
import { JobsData } from '../types/jobs';

export function useJobs() {
  const jobsData = useMemo<JobsData | null>(() => {
    const storedData = localStorage.getItem('jobsData');
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  const findingYourJobs = useMemo(() => {
    const resumeAnalysis = localStorage.getItem('resumeAnalysis');
    const jobsData = localStorage.getItem('jobsData');
    return resumeAnalysis !== null && jobsData === null;
  }, []);

  return {
    jobs: jobsData?.jobs.response_data || [],
    hasJobs: !!jobsData?.jobs?.response_data.length,
    findingYourJobs,
  };
}
