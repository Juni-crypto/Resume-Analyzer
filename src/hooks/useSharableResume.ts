// src/hooks/useSharableResume.ts
import { useMemo } from 'react';

interface SharableResumeData {
  sharable_resume: {
    resume_id: string;
    user_id: string;
    name: string;
    email: string;
    contact_information: {
      phone: string;
      linkedin: string;
      github: string;
      address: string;
    };
    summary: string;
    skills: string[];
    experience: Array<{
      company: string;
      role: string;
      duration: string;
      responsibilities: string[];
      technologies_used: string[];
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
      gpa?: string;
    }>;
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
      role: string;
      outcome: string;
    }>;
    additional_sections: {
      awards: Array<{
        title: string;
        description: string;
      }>;
    };
    created_at: string;
  };
}

export function useSharableResume() {
  const resumeData = useMemo<SharableResumeData | null>(() => {
    const storedData = localStorage.getItem('sharableResume');
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  const loadingResume = useMemo(() => {
    const resumeAnalysis = localStorage.getItem('resumeAnalysis');
    const sharableResume = localStorage.getItem('sharableResume');
    return resumeAnalysis !== null && sharableResume === null;
  }, []);

  return {
    resume: resumeData,
    hasResume: !!resumeData?.sharable_resume,
    loadingResume,
  };
}