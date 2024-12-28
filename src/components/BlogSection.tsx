import React from 'react';
import { motion } from 'framer-motion';
import { Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCarousel } from './blog/BlogCarousel';
import { BlogGrid } from './blog/BlogGrid';

export function BlogSection() {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <section className="mb-32">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Latest from Our Blog
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          {showAll ? 'Show Less' : 'View All'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {showAll ? <BlogGrid /> : <BlogCarousel />}
    </section>
  );
}