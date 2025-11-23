import {Transaction, User} from '../types';

const STORAGE_KEYS = {
TRANSACTIONS: 'expense_tracker_transactions',
USER: 'expense_tracker_user',
CATEGORIES: 'expense_tracker_categories',
} as const; 

export const transactionStorage = {
getAll: (): Transaction[]=>{
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return data ? JSON.parse(data):[];
},

add: (transaction: Omit<Transaction, 'id'|'createdAt'>): Transaction =>{
  const transactions = transactionStorage.getAll();
  const newTransaction : Transaction = {
    ...transaction,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    date: new Date (transaction.date),
  };
  transactions.push(newTransaction);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  return newTransaction;
},

delete: (id:string): void =>{
  const transactions = transactionStorage.getAll().filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
},

update: (id:string, updates:Partial<Transaction>): Transaction | null => {
  const transactions = transactionStorage.getAll();
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) return null;

  transactions[index]= {...transactions[index], ...updates};
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  return transactions[index];
}};

export const userStorage = {
  getCurrent: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrent: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};