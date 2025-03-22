import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { themes } from './themes';
import { ThemeName } from './themes';

interface SharableResumeProps {
  data: any;
  theme?: ThemeName;
  isDarkMode?: boolean;
}

export function SharableResume({ data, theme: propTheme, isDarkMode }: SharableResumeProps) {
  const [searchParams] = useSearchParams();
  const urlTheme = searchParams.get('theme') as ThemeName;
  const selectedTheme = propTheme || urlTheme || 'modern';
  
  const ThemeComponent = themes[selectedTheme] || themes.modern;
  
  return <ThemeComponent data={data} isDarkMode={isDarkMode} />;
}