export interface BlogSection {
  title?: string;
  content?: string[];
  list?: string[];
}

export interface BlogContent {
  sections: BlogSection[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  content?: BlogContent;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedPosts?: string[];
  keywords?: string[];
  metaDescription?: string;
}