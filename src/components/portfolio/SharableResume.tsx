import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { themes } from './themes';
import { ThemeName } from './themes';

interface SharableResumeProps {
  data: any;
  theme?: ThemeName;
  isDarkMode?: boolean;
}

export function SharableResume({ data, theme: propTheme, isDarkMode: propIsDarkMode }: SharableResumeProps) {
  const [searchParams] = useSearchParams();
  const urlTheme = searchParams.get('theme') as ThemeName;
  const theme = propTheme || urlTheme || 'modern';
  const isDarkMode = propIsDarkMode ?? false;
  
  const ThemeComponent = themes[theme] || themes.modern;
  
  return <ThemeComponent data={data} isDarkMode={isDarkMode} />;
}