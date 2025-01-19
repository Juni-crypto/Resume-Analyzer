import React from 'react';
import { motion } from 'framer-motion';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function InitialsAvatar({ name, size = 'md' }: InitialsAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-3xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold`}
    >
      {getInitials(name)}
    </motion.div>
  );
}