import { IconType } from 'lucide-react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export const getSocialLink = (url: string | undefined, Icon: IconType, label: string) => {
  if (!url) return null;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 transition-colors flex items-center gap-2"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};

export const getContactLink = (value: string | undefined, Icon: IconType, type: 'email' | 'phone' | 'location') => {
  if (!value) return null;

  const href = 
    type === 'email' ? `mailto:${value}` :
    type === 'phone' ? `tel:${value}` :
    `https://maps.google.com/?q=${encodeURIComponent(value)}`;

  return (
    <a
      href={href}
      className="flex items-center gap-2 hover:text-blue-500 transition-colors"
      target={type === 'location' ? '_blank' : undefined}
      rel={type === 'location' ? 'noopener noreferrer' : undefined}
    >
      <Icon className="w-4 h-4" />
      <span>{value}</span>
    </a>
  );
};

export const getWorkTogetherSection = (email: string, name: string, isDarkMode: boolean) => {
  if (!email) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-2xl text-center ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}
    >
      <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Let's Work Together
      </h2>
      <p className="mb-6">
        I'm always open to discussing new opportunities and interesting projects.
      </p>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
      >
        <Mail className="w-5 h-5" />
        Contact Me
      </a>
    </motion.div>
  );
};
