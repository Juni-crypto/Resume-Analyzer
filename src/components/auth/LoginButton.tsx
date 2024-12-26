import React from 'react';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginButtonProps {
  onClick: () => void;
}

export function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
    >
      <LogIn className="w-5 h-5 text-blue-600" />
      <span className="font-medium text-gray-800">Sign In</span>
    </motion.button>
  );
}