import React from 'react';
import { Clock, Calendar } from 'lucide-react';

interface BlogHeaderProps {
  title: string;
  publishDate: string;
  readTime: string;
}

export function BlogHeader({ title, publishDate, readTime }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="flex items-center gap-4 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time>{publishDate}</time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{readTime}</span>
        </div>
      </div>
    </header>
  );
}