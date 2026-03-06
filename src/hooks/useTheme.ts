import { useEffect, useState } from "react";
import { getCurrentTheme, setTheme as saveTheme, type ThemeName, getThemeColors } from '../constants/theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeName>(getCurrentTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    saveTheme(theme);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveTheme(theme);
    }
  }, [theme, mounted]);

  // Перемикає тему циклічно: light → dark → fuchsia → pastel → light ...
  const themeOrder: ThemeName[] = ['light', 'dark', 'fuchsia', 'pastel'];
  const toggleTheme = () => {
    const currentIdx = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIdx + 1) % themeOrder.length];
    setThemeState(nextTheme);
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
