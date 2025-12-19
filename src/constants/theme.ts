export const themes = {
  light: {
    primary: 'bg-blue-500 text-white',
    primaryHover: 'hover:bg-blue-600',
    background: 'bg-gray-50',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    income: 'text-green-500',
    expense: 'text-red-500',
  },
  dark: {
    primary: 'bg-blue-500 text-white',
    primaryHover: 'hover:bg-blue-400',
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-gray-50',
    textSecondary: 'text-gray-300',
    border: 'border-gray-700',
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    income: 'text-green-400',
    expense: 'text-red-400',
  }
} as const;

export type ThemeName = keyof typeof themes;
export type ThemeColors = typeof themes.light;

export const getCurrentTheme = (): ThemeName => {
  return (localStorage.getItem('theme') as ThemeName) || 'light';
};

export const setTheme = (themeName: ThemeName) => {
  localStorage.setItem('theme', themeName);
  if (themeName === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const getThemeColors = (themeName?: ThemeName) => {
  return themes[themeName || getCurrentTheme()];
};