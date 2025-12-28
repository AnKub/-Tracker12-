import {create} from 'zustand';

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
}))