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
    try {
      const storedData = localStorage.getItem('resumeAnalysis');
      if (!storedData) return null;
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing resume data:', error);
      return null;
    }
  }, []);

  const selectedRole = useMemo<SelectedRole | null>(() => {
    if (!resumeData?.ats_feedback?.roles) return null;

    try {
      const [roleName, roleData] = Object.entries(
        resumeData.ats_feedback.roles
      )[0];
      return {
        name: roleName,
        data: roleData,
        profile: {
          name: resumeData.ats_feedback.name,
          email: resumeData.ats_feedback.email,
        },
      };
    } catch (error) {
      console.error('Error processing role data:', error);
      return null;
    }
  }, [resumeData]);

  const metrics = useMemo<Metric[]>(() => {
    if (!selectedRole?.data?.ats_score?.by_role_specific_metrics) return [];

    try {
      return [
        {
          title: 'Technical Skills',
          value:
            selectedRole.data.ats_score.by_role_specific_metrics
              .technical_skills * 10,
        },
        {
          title: 'Industry Knowledge',
          value:
            selectedRole.data.ats_score.by_role_specific_metrics
              .industry_knowledge * 10,
        },
        {
          title: 'Innovation',
          value:
            selectedRole.data.ats_score.by_role_specific_metrics
              .innovation_score * 10,
        },
        {
          title: 'Communication',
          value:
            selectedRole.data.ats_score.by_role_specific_metrics
              .communication_skills * 10,
        },
      ];
    } catch (error) {
      console.error('Error processing metrics:', error);
      return [];
    }
  }, [selectedRole]);

  return {
    selectedRole,
    metrics,
    hasData: !!resumeData,
  };
}
