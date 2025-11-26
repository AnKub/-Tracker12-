import { useEffect, useState } from "react";
import {getCurrentTheme, setTheme as saveTheme, type ThemeName} from '../constants/theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeName>(getCurrentTheme);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);


const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setThemeState(newTheme);  
};  

const setTheme = (newTheme: ThemeName) =>{
  setThemeState(newTheme);
};

return {theme,toggleTheme, setTheme};

}
