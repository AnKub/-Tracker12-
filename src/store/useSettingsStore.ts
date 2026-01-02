import {create} from 'zustand';
import type {AppSettings, Currency, Language, DateFormat} from '../types/Settings';

interface SettingsState {
  currency: 'UAH' |'USD'|'EUR';
  language: 'en' | 'ua';
}

interface SettingsActions {
setCurrency: (currency: SettingsState['currency'])=> void;
setLanguage: (language: SettingsState['language'])=> void;
loadSettings: () => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>((set)=> ({
  currency: 'UAH',
  language: 'en',

  setCurrency: (currency) => {set({currency});
},

setLanguage: (language) => {set({language});
},

loadSettings: () => {
  const savedCurrency = localStorage.getItem('settings_currency') as SettingsState['currency'] | null;
  const savedLanguage = localStorage.getItem('settings_language') as SettingsState['language'] | null;
}));