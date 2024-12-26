import React from 'react';

interface TimelineCardProps {
  year: string;
  events: string[];
}

export function TimelineCard({ year, events }: TimelineCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-bold text-blue-600 mb-3">{year}</h3>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-600" />
            <p className="text-gray-700">{event}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}