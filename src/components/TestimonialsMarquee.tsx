import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Landed my dream role in just 3 weeks!",
    name: "Sarah Chen",
    role: "Senior Developer @ TechCorp"
  },
  {
    text: "Perfect match for what we look for in candidates",
    name: "James Wilson",
    role: "Engineering Director @ InnovateLabs"
  },
  {
    text: "AI matching is incredibly accurate",
    name: "Maria Garcia",
    role: "Product Lead @ DesignHub"
  },
  {
    text: "Negotiated 30% higher compensation",
    name: "Alex Kumar",
    role: "Data Science Manager @ DataWorks"
  }
];

export function TestimonialsMarquee() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden w-full py-4">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#f8fafc] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#f8fafc] to-transparent z-10"></div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-8"
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="flex items-center gap-6 px-8 py-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 w-[500px] group hover:bg-blue-50/80 transition-colors duration-300"
          >
            <div className="shrink-0">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 text-lg font-medium mb-2 truncate">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-2 overflow-hidden">
                <p className="font-semibold text-gray-800 truncate">{testimonial.name}</p>
                <span className="text-blue-600 shrink-0">•</span>
                <p className="text-blue-600 truncate">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}