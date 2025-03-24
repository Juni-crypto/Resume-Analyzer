import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';
import { resumeThemes, ThemeName } from './themes';

interface ThemeSelectorProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [showThemes, setShowThemes] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowThemes(!showThemes)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <Layout className="w-5 h-5 text-blue-600" />
        <span className="font-medium">{resumeThemes[currentTheme].name} Theme</span>
      </button>

      {showThemes && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
        >
          <div className="grid grid-cols-2 gap-2 p-2">
            {Object.entries(resumeThemes).map(([key, theme]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onThemeChange(key as ThemeName);
                  setShowThemes(false);
                }}
                className={`relative group rounded-lg overflow-hidden ${
                  currentTheme === key ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2 text-left">
                  <p className="text-white font-medium">{theme.name}</p>
                  <p className="text-white/80 text-xs line-clamp-2">
                    {theme.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}