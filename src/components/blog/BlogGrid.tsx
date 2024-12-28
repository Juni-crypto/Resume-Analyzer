import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';

export function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogPosts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={`/blog/${post.slug}`}
            className="block bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 h-full"
          >
            <div className="text-sm text-blue-600 font-medium mb-2">
              {post.category}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between text-sm mt-auto">
              <span className="text-gray-500">{post.publishDate}</span>
              <span className="text-blue-600">{post.readTime}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}