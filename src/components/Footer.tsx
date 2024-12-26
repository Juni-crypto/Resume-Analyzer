import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Developed By ChumaOruWorks
          </h3>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            © {new Date().getFullYear()} ChumaOruWorks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}