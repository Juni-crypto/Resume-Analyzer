import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';

interface BlogNavigationProps {
  currentSlug: string;
}

export function BlogNavigation({ currentSlug }: BlogNavigationProps) {
  const navigate = useNavigate();
  const currentIndex = blogPosts.findIndex(post => post.slug === currentSlug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="mt-8 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prevPost && (
          <Link
            to={`/blog/${prevPost.slug}`}
            className="p-4 bg-white/80 backdrop-blur-lg rounded-xl hover:shadow-lg transition-all"
          >
            <span className="text-sm text-gray-500">Previous</span>
            <p className="font-medium text-gray-900 line-clamp-2">{prevPost.title}</p>
          </Link>
        )}
        {nextPost && (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="p-4 bg-white/80 backdrop-blur-lg rounded-xl hover:shadow-lg transition-all text-right"
          >
            <span className="text-sm text-gray-500">Next</span>
            <p className="font-medium text-gray-900 line-clamp-2">{nextPost.title}</p>
          </Link>
        )}
      </div>
    </div>
  );
}