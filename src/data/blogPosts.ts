export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-ats',
    title: 'What Is an ATS? How It Works and Why It\'s Crucial for Your Job Search in 2024',
    category: 'ATS Basics',
    excerpt: 'Learn how Applicant Tracking Systems (ATS) work and why understanding them is key to getting noticed by recruiters in today’s competitive job market.',
    publishDate: '2024-02-20',
    readTime: '8 min read'
  },
  {
    slug: 'ats-friendly-resume',
    title: 'How to Create an ATS-Friendly Resume That Lands Interviews in 2024',
    category: 'Resume Tips',
    excerpt: 'Discover step-by-step tips on creating a resume that bypasses Applicant Tracking Systems and boosts your chances of landing the job.',
    publishDate: '2024-02-18',
    readTime: '6 min read'
  },
  {
    slug: 'top-ats-systems',
    title: 'Top 10 Applicant Tracking Systems (ATS) in 2024: Features & Pricing Comparison',
    category: 'ATS Tools',
    excerpt: 'Explore the best ATS software for 2024, including key features, pros, cons, and pricing to help you choose the right tool for your recruitment needs.',
    publishDate: '2024-02-15',
    readTime: '10 min read'
  },
  {
    slug: 'how-to-beat-ats',
    title: 'How to Beat ATS: 7 Common Mistakes to Avoid in Your Job Application',
    category: 'ATS Tips & Tricks',
    excerpt: 'Learn the top mistakes job seekers make when submitting resumes and how to avoid them to increase your chances of passing ATS screening.',
    publishDate: '2024-02-22',
    readTime: '7 min read'
  },
  {
    slug: 'ats-vs-human-recruiters',
    title: 'ATS vs. Human Recruiters: What You Need to Know to Stand Out',
    category: 'Job Search Strategies',
    excerpt: 'Understand the key differences between ATS and human recruiters, and how to optimize your resume for both to maximize your job opportunities.',
    publishDate: '2024-02-25',
    readTime: '9 min read'
  },
  {
    slug: 'ats-friendly-templates',
    title: 'ATS-Friendly Resume Templates for 2024: Get Your Dream Job Faster',
    category: 'Resume Tips',
    excerpt: 'Download the latest ATS-friendly resume templates designed to help you stand out in 2024’s competitive job market.',
    publishDate: '2024-02-28',
    readTime: '5 min read'
  },
  {
    slug: 'keywords-for-ats',
    title: 'How to Use Keywords Effectively for ATS: A Comprehensive Guide',
    category: 'Resume Optimization',
    excerpt: 'Discover the best strategies for incorporating the right keywords into your resume, increasing the chances of passing ATS screenings.',
    publishDate: '2024-03-02',
    readTime: '8 min read'
  },
  {
    slug: 'future-of-ats',
    title: 'The Future of ATS: Trends to Watch in Recruitment Technology',
    category: 'ATS Tools & Tech',
    excerpt: 'Stay ahead of the curve with an overview of the latest trends in ATS technology and how they are shaping recruitment in 2024.',
    publishDate: '2024-03-05',
    readTime: '7 min read'
  },
  {
    slug: 'tailor-resume-ats',
    title: 'How to Tailor Your Resume for Different ATS Platforms: A Step-by-Step Guide',
    category: 'Resume Tips',
    excerpt: 'Learn how to customize your resume for various ATS platforms, ensuring it’s compatible with multiple software systems and improves your chances of being noticed.',
    publishDate: '2024-03-08',
    readTime: '10 min read'
  },
  {
    slug: 'ats-cover-letters',
    title: 'ATS-Friendly Cover Letters: How to Write One That Passes the Screen',
    category: 'Cover Letter Tips',
    excerpt: 'A step-by-step guide on crafting ATS-friendly cover letters that complement your resume and boost your job application’s success rate.',
    publishDate: '2024-03-12',
    readTime: '6 min read'
  },
  {
    slug: 'linkedin-for-ats',
    title: 'How to Optimize Your LinkedIn Profile for ATS: The Ultimate Guide',
    category: 'Career Optimization',
    excerpt: 'Discover how to optimize your LinkedIn profile for ATS, making it easier for recruiters to find you and improving your chances of landing an interview.',
    publishDate: '2024-03-15',
    readTime: '9 min read'
  }
];
