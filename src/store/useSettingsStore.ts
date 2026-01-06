import {create} from 'zustand';
import type {Currency, Language, DateFormat} from '../types';

interface SettingsState {
  currency: Currency;
  language: Language;
  dateFormat: DateFormat;
  notifications: boolean;
  showTutorials: boolean;
}

interface SettingsActions {
setCurrency: (currency: Currency)=> void;
setLanguage: (language: Language)=> void;
setDateFormat: (dateFormat: DateFormat) => void;
setNotifications: (enabled: boolean) => void;
setShowTutorials: (enabled: boolean) => void;
loadSettings: () => void;
saveSettings: () => void;
resetSettings:() => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>((set, get)=> ({
  currency: 'UAH',
  language: 'uk',
  dateFormat: 'DD/MM/YYYY',
  notifications: true,
  showTutorials: true,

  setCurrency: (currency) => {
    set({currency});
    get().saveSettings();
}, 

setLanguage: (language) => {
  set({language});
  get().saveSettings();
},

setDateFormat: (dateFormat) =>{
  set({dateFormat});
  get().saveSettings();
},

setNotifications: (notifications) => {
 set({notifications});
 get().saveSettings();
},

setShowTutorials: (showTutorials) => {
  set({showTutorials});
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
    language: 'uk',
    dateFormat: 'DD/MM/YYYY',
    notifications: true,
    showTutorials: true
  });
  get().saveSettings();
 }
}));