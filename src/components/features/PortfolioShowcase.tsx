import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, Palette, Share2, Globe, Code, Smartphone, Building2, PenTool } from 'lucide-react';

export const PortfolioShowcase = ({ onSignInClick }: { onSignInClick: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  const templates = [
    {
      name: 'Modern',
      icon: <Code className="w-8 h-8 text-blue-600" />,
      features: ['Clean layout', 'Minimalist design', 'Perfect for tech roles'],
    },
    {
      name: 'Creative',
      icon: <PenTool className="w-8 h-8 text-blue-600" />,
      features: ['Bold colors', 'Unique layout', 'Great for designers'],
    },
    {
      name: 'Professional',
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      features: ['Traditional style', 'Corporate feel', 'Ideal for business'],
    },
  ];

  const features = [
    {
      icon: <Layout className="w-6 h-6" />,
      text: 'Multiple Templates',
      description: 'Choose from various professional designs',
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: 'Project showcases',
      description: 'Highlight your best work with rich media support',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: 'Custom domain support',
      description: 'Use your own domain name',
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      text: 'Mobile responsive',
      description: 'Looks great on all devices',
    },
    {
      icon: <Palette className="w-5 h-5" />,
      text: 'Customizable themes',
      description: 'Match your personal brand',
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      text: 'Easy sharing',
      description: 'Share with recruiters instantly',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-60 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Hero Section */}
        <div className="text-center py-20 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Craft Your Digital Identity
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Transform your experience into a compelling story that captivates employers
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={onSignInClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Building Now →
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Template Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                translateZ: 20,
              }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {template.icon}
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-4">{template.name}</h3>
              <ul className="space-y-3">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-fit mb-4">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{feature.text}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Ready to Stand Out?</h3>
          <motion.button
            onClick={onSignInClick}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Your Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
