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
  updateUser: (updates: Partial<User>) => void;
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
  set({error: 'Failed to load transactions'});
 }
},
addTransaction: (transaction)=>{
  try {
    const user = get().user;
    if(!user){
      set({error: 'Please log in first'});
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
    set({error: 'Failed to add transaction'});
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
    set({error: 'Failed to update transaction'});
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
    set({error : 'Failed to delete transaction'});
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

updateUser: (updates) => {
  const currentUser = get().user;
  if (!currentUser) {
    set({error: 'No user to update'});
    return;
  }

  const updatedUser = { ...currentUser, ...updates };
  set({ user: updatedUser, error: null });
  userStorage.setCurrent(updatedUser);
},

clearError: () => {
  set({error: null});
},
}));

const initializeStore = () => {
  const currentUser = userStorage.getCurrent();
  if (!currentUser) {
    const testUser: User = {
      uid: 'test-user-123',
      email: 'test@example.com',
      displayName: 'Demo User'
    };
    useExpenseStore.getState().setUser(testUser);
  } else {
    useExpenseStore.getState().setUser(currentUser);
  }
};

initializeStore();