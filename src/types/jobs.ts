export interface Job {
  date_posted: string;
  company_logo?: string;
  is_remote: boolean;
  company: string;
  location: string;
  company_url?: string;
  title: string;
  job_url: string;
}

export interface JobsData {
  jobs: Job[];
}