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
}

export interface MonthlyStats{
  month:string;
  totalIncome:number;
  totalExpense:number;
  balance:number;
  transactionCount:number;
}