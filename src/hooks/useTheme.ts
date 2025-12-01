import { useEffect, useState } from "react";
import { getCurrentTheme, setTheme as saveTheme, type ThemeName, getThemeColors } from '../constants/theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeName>(getCurrentTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Встановлюємо початкову тему
    saveTheme(theme);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveTheme(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme: ThemeName = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);  
  };  

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const colors = getThemeColors(theme);

  return { 
    theme, 
    toggleTheme, 
    setTheme, 
    colors,
    mounted 
  };
};
