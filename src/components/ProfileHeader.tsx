import React from 'react';
import { User, Mail, Briefcase } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
}

export function ProfileHeader({ name, email, role }: ProfileHeaderProps) {
  // Convert name to sentence case
  const formatName = (name: string) => {
    return name.toLowerCase().split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-xl">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{formatName(name)}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors">
                {email}
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-700">{role}</span>
        </div>
      </div>
    </div>
  );
}