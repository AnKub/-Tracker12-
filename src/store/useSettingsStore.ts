import {create} from 'zustand';
import type {Currency, Language} from '../types';

interface SettingsState {
  currency: Currency;
  language: Language;
}

interface SettingsActions {
setCurrency: (currency: SettingsState['currency'])=> void;
setLanguage: (language: SettingsState['language'])=> void;
loadSettings: () => void;
saveSettings: () => void;
resetSettings:() => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>((set, get)=> ({
  currency: 'UAH',
  language: 'uk',

  setCurrency: (currency) => {
    set({currency});
    get().saveSettings();
}, 

setLanguage: (language) => {
  set({language});
  get().saveSettings();
},

loadSettings: () => {
  try {
      const savedCurrency = localStorage.getItem('settings_currency') as SettingsState['currency'] | null;
      const savedLanguage = localStorage.getItem('settings_language') as SettingsState['language'] | null;
  
  if (savedCurrency && savedLanguage) {
  set({
    currency: savedCurrency,
    language: savedLanguage
  });
  }
  } catch (error) {
    console.error('Failed to load settings', error);
  }
},

 saveSettings: () => {
  try {
     const {currency, language} = get();
  localStorage.setItem('settings_currency', currency);
  localStorage.setItem('settings_language', language);
  } catch (error) {
    console.error('Failed to save settings', error);
  } 
 },

 resetSettings: () => {
  set({
    currency: 'UAH',
    language: 'uk'
  });
  get().saveSettings();
 }
}));