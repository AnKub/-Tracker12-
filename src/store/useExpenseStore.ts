import {create} from 'zustand';
import type {Transaction, User} from '../types';
import { transactionStorage, userStorage } from '../services/storage';

interface ExpenseStore {
  transactions: Transaction[];
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface ExpenseStoreActions {
  loadTransactions: () => void;
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
    const currentTransactions = get().transactions;
    set({
      transactions: [...currentTransactions, newTransaction],
      error: null,
    });
  }catch (error){
    set({error: 'Error adding transaction'});
  }
},
updateTransaction: (id, updates) => {
  try {
    const updatedTransaction = transactionStorage.update(id,updates);
    if(!updatedTransaction){
      set({error: 'Transaction not found'});
      return;
    }

    const currentTransactions = get().transactions;
    const newTransactions = currentTransactions.map(t => 
      t.id === id ? updatedTransaction : t
    );
    set({ transactions: newTransactions, error: null });
  }catch(error){
    set({error: 'Error updating transaction'});
  }
},

deleteTransaction : (id)=> {
  try{
    transactionStorage.delete(id); 
    const currentTransactions = get().transactions;
    set({
      transactions: currentTransactions.filter(t => t.id !== id),
      error: null
    });
  }catch (error) {
    set({error : 'Error deleting transaction'});
  }
},

setUser: (user) => {
  set({user});
  if(user){
    userStorage.setCurrent(user);
  } else{
    userStorage.clear();
  }
},

clearError: () => {
  set({error: null});
},
}));