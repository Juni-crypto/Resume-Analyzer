export interface ResumeMetric {
  metric_name: string;
  score: number;
  category: string;
  importance: number;
}

export interface RoleComparison {
  compared_role: string;
  similarity_index: number;
  key_matches: string[];
  skill_gaps: string[];
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface MarketInsights {
  demand_score: number;
  salary_range: SalaryRange;
  growth_potential: number;
  required_certifications: string[];
  emerging_skills: string[];
}

export interface RoleSpecificMetrics {
  technical_skills: number;
  soft_skills: number;
  experience_match: number;
  education_match: number;
  industry_knowledge: number;
  leadership_potential: number;
  innovation_score: number;
  communication_skills: number;
  project_execution: number;
  domain_expertise: number;
}

export interface ATSScore {
  overall: number;
  by_role_specific_metrics: RoleSpecificMetrics;
}

export interface InfographicData {
  metric_distribution: ResumeMetric[];
  role_comparison: RoleComparison[];
  skill_radar: Record<string, number>;
  experience_timeline: Record<string, string[]>;
  keyword_cloud: Record<string, number>;
  industry_alignment: Record<string, number>;
}

export interface RoleAnalysis {
  ats_score: ATSScore;
  strengths: string[];
  weaknesses: string[];
  optimization_tips: string[];
  detailed_report: {
    sections: Record<string, number>;
    overall_recommendation: number;
    section_improvements: Record<string, string[]>;
    priority_actions: string[];
  };
  top_keywords: string[];
  suitable_roles: string[];
  enhancement_tips: string[];
  highlighted_companies: string[];
  infographic_data: InfographicData;
  market_insights: MarketInsights;
}

export interface ResumeData {
  random_id: string;
  datetime: string;
  ats_feedback: {
    name: string;
    email: string;
    roles: Record<string, RoleAnalysis>;
  };
}