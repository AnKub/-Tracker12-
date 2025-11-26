export const themes = {
  light: {
    primary: 'blue-500',
    primaryHover: 'blue-600', 
    background: 'gray-50',
    card: 'white',
    text: 'gray-900',
    textSecondary: 'gray-600',
    border: 'gray-200',
    success: 'green-500',
    error: 'red-500',
    warning: 'yellow-500',
  },
  dark: {
    primary: 'blue-400',
    primaryHover: 'blue-300',
    background: 'gray-900', 
    card: 'gray-800',
    text: 'gray-50',
    textSecondary: 'gray-300',
    border: 'gray-700',
    success: 'green-400',
    error: 'red-400', 
    warning: 'yellow-400',
  }
} as const;

export type ThemeName = keyof typeof themes;
export type ThemeColors = typeof themes.light;

export const getCurrentTheme = (): ThemeName => {
  return (localStorage.getItem('theme') as ThemeName) || 'light';
};

export const setTheme = (themeName: ThemeName) => {
  localStorage.setItem('theme', themeName);
  document.body.className = `theme-${themeName}`;
};

export const getThemeColors = (themeName?: ThemeName) => {
  return themes[themeName || getCurrentTheme()];
};