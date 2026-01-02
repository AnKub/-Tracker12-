export type Currency = 'UAH' | 'USD' | 'EUR';
export type Language = 'uk' | 'en';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';

export interface AppSettings {
  currency: Currency;
  language: Language;
  dateFormat: DateFormat;
  notifications: boolean;
  showTutorials: boolean;
}

