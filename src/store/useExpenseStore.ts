import {create} from 'zustand';
import type {Transaction, User} from '../types';
import { transactionStorage, userStorage } from '../services/storage';

interface ExpenseStore {
  transaction: Transaction[];
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface ExpenseStoreActions {
  loadTransitions: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'|'createdAt'|'userId'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setUser: (user: User | null) => void;
  clearError: () => void;
}
type ExpenseStoreState = ExpenseStore & ExpenseStoreActions;

export const useExpenseStore = create<ExpenseStoreState>()((set, get) => ({
  transactions: [],
  user: null,
  isLoading: false,
  error: null,

loadTransactions: () => {
  try {
    const transactions = transactionStorage.getAll();
    set({transactions});

 }catch (error) {
  set({error: 'Transactions loading error'});
 }
},
addTransaction: (transaction)=>{
  try {
    const user = get().user;
    if(!user){
      set({error: 'Need to log in'});
      return;
    }
    const transactionWithUser = {
      ...transaction,
      userId:user.uid,
    };
    const newTransaction = transactionStorage.add(transactionWithUser);
    const currentTransactions = get().transaction;
    set({
      transactions: [...currentTransactions, newTransaction],
      error: null,
    });
  }catch (error){
    set({error: 'Error adding transaction'});
  }
},


}))