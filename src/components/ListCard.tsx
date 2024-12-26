import React from 'react';

interface ListCardProps {
  title: string;
  items: string[];
  className?: string;
}

export function ListCard({ title, items, className = '' }: ListCardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-600" />
            <p className="text-gray-700">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}