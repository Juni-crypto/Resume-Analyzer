import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';

export function BlogCarousel() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const postsPerPage = 4;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentPosts = blogPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={prevPage}
          className="absolute left-0 z-10 p-2 bg-white/80 rounded-full shadow-lg hover:bg-blue-50 transition-colors -translate-x-1/2"
        >
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </button>

        <div className="overflow-hidden mx-8">
          <motion.div
            className="flex gap-6"
            initial={false}
            animate={{ x: `${-currentPage * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {currentPosts.map((post) => (
              <div key={post.slug} className="w-full flex-shrink-0">
                <Link
                  to={`/blog/${post.slug}`}
                  className="block bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{post.publishDate}</span>
                    <span className="text-blue-600">{post.readTime}</span>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={nextPage}
          className="absolute right-0 z-10 p-2 bg-white/80 rounded-full shadow-lg hover:bg-blue-50 transition-colors translate-x-1/2"
        >
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}