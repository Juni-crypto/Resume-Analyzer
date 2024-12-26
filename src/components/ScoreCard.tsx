import React from 'react';
import { CircleProgress } from './CircleProgress';

interface ScoreCardProps {
  score: number;
  title: string;
  subtitle?: string;
}

export function ScoreCard({ score, title, subtitle }: ScoreCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <CircleProgress value={score} />
      </div>
    </div>
  );
}