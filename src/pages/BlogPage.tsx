import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BlogHeader } from '../components/blog/BlogHeader';
import { BlogContent } from '../components/blog/BlogContent';
import { BlogFAQ } from '../components/blog/BlogFAQ';
import { RelatedPosts } from '../components/blog/RelatedPosts';
import { ShareButtons } from '../components/blog/ShareButtons';
import { BlogNavigation } from '../components/blog/BlogNavigation';
import { blogPosts } from '../data/blogPosts';

export function BlogPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post || !slug) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <BlogHeader 
            title={post.title}
            publishDate={post.publishDate}
            readTime={post.readTime}
          />
          <BlogContent slug={slug} />
          <ShareButtons />
          <BlogFAQ />
        </article>
        <BlogNavigation currentSlug={slug} />
        <RelatedPosts />
      </div>
    </div>
  );
}