import { IconType } from 'lucide-react';

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
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <Mail className={`w-16 h-16 mb-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
      </motion.div>
      <h2 className="text-2xl font-bold mb-4">Let's Work Together!</h2>
      <p className="mb-8 text-sm opacity-75">Ready to discuss your next project or opportunity?</p>
      <motion.a
        href={`mailto:${email}?subject=Interested in Working Together&body=Hi ${name},%0D%0A%0D%0AI came across your profile and would love to discuss potential opportunities.`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-8 py-4 rounded-full w-full max-w-xs
          ${isDarkMode 
            ? 'bg-purple-600 hover:bg-purple-500 text-white'
            : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
          }
          transition-all duration-300
          flex items-center justify-center gap-2
          font-medium text-lg
          shadow-lg hover:shadow-xl
        `}
      >
        Contact Me
        <ChevronRight className="w-5 h-5" />
      </motion.a>
    </div>
  );
};
