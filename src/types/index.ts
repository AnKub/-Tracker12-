export interface Transaction {
  id: string;
  amount:number;
  description:string;
  category:string;
  type: 'income' | 'expense';
date:Date;
userId:string;
createdAt:Date;
}

export interface Category{
  id:string;
  name:string;
  icon:string;
  color:string;
  type:'income' | 'expense';
}

export interface User {
  uid:string;
  email:string;
  displayName:string;
  photoURL?:string;
  createdAt?:Date;
  phone?:string;
  dateOfBirth?:Date;
  bio?:string;
  emailVerified?:boolean;
  lastLoginAt?:Date;
}

export interface MonthlyStats{
  month:string;
  totalIncome:number;
  totalExpense:number;
  balance:number;
  transactionCount:number;
}


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