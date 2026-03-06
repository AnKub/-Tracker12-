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
  },
  fuchsia: {
    primary: 'bg-pink-600 text-white',
    primaryHover: 'hover:bg-pink-700',
    background: 'bg-pink-50',
    card: 'bg-pink-100',
    text: 'text-fuchsia-900',
    textSecondary: 'text-fuchsia-600',
    border: 'border-fuchsia-300',
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    income: 'text-green-500',
    expense: 'text-red-500',
  },
  pastel: {
    primary: 'bg-blue-200 text-purple-900',
    primaryHover: 'hover:bg-blue-300',
    background: 'bg-yellow-50',
    card: 'bg-purple-50',
    text: 'text-purple-700',
    textSecondary: 'text-pink-400',
    border: 'border-blue-100',
    success: 'text-green-400',
    error: 'text-red-300',
    warning: 'text-yellow-300',
    income: 'text-green-400',
    expense: 'text-red-300',
  },
} as const;


export type ThemeName = keyof typeof themes;
export type ThemeColors = typeof themes.light;

export const getCurrentTheme = (): ThemeName => {
  return (localStorage.getItem('theme') as ThemeName) || 'light';
};


export const setTheme = (themeName: ThemeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.classList.remove('dark', 'fuchsia', 'pastel');
  if (themeName === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (themeName === 'fuchsia') {
    document.documentElement.classList.add('fuchsia');
  } else if (themeName === 'pastel') {
    document.documentElement.classList.add('pastel');
  }
};

export const getThemeColors = (themeName?: ThemeName) => {
  return themes[themeName || getCurrentTheme()];
};