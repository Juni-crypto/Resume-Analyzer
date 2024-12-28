import React from 'react';
import { ArrowRight } from 'lucide-react';

export function RelatedPosts() {
  const posts = [
    {
      title: "Top 10 ATS-Friendly Resume Templates",
      excerpt: "Discover the best resume templates that will help you pass ATS screening.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "How to Optimize Your Resume for ATS",
      excerpt: "Learn the best practices for making your resume ATS-friendly.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="group bg-white/80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}