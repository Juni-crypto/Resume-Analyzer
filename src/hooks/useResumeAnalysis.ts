import { useMemo } from 'react';
import { ResumeData } from '../types/resume';

interface SelectedRole {
  name: string;
  data: any;
  profile: {
    name: string;
    email: string;
  };
}

interface Metric {
  title: string;
  value: number;
}

export function useResumeAnalysis() {
  const resumeData = useMemo<ResumeData | null>(() => {
    const storedData = localStorage.getItem('resumeAnalysis');
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  const selectedRole = useMemo<SelectedRole | null>(() => {
    if (!resumeData?.ats_feedback?.roles) return null;

    const [roleName, roleData] = Object.entries(resumeData.ats_feedback.roles)[0];
    return {
      name: roleName,
      data: roleData,
      profile: {
        name: resumeData.ats_feedback.name,
        email: resumeData.ats_feedback.email
      }
    };
  }, [resumeData]);

  const metrics = useMemo<Metric[]>(() => {
    if (!selectedRole) return [];

    return [
      { 
        title: "Technical Skills", 
        value: selectedRole.data.ats_score.by_role_specific_metrics.technical_skills * 10 
      },
      { 
        title: "Industry Knowledge", 
        value: selectedRole.data.ats_score.by_role_specific_metrics.industry_knowledge * 10 
      },
      { 
        title: "Innovation", 
        value: selectedRole.data.ats_score.by_role_specific_metrics.innovation_score * 10 
      },
      { 
        title: "Communication", 
        value: selectedRole.data.ats_score.by_role_specific_metrics.communication_skills * 10 
      }
    ];
  }, [selectedRole]);

  return {
    selectedRole,
    metrics,
    hasData: !!resumeData
  };
}