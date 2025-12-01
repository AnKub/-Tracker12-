import React, { useEffect } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';

export const Dashboard: React.FC = () => {
  const { transactions, loadTransactions, user } = useExpenseStore(state => ({
    transactions: state.transactions,
    loadTransactions: state.loadTransactions,
    user: state.user
  }));

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // cтати 
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Останні 5 
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            👋 Welcome 
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Log in to view your dashboard and manage your expenses.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
            Overview of your financial activities
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Income
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                +₴{totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        {/* Витрати */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Expense</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                -₴{totalExpense.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl">💸</div>
          </div>
        </div>

       
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                {balance >= 0 ? '+' : ''}₴{balance.toLocaleString()}
              </p>
            </div>
            <div className="text-3xl">{balance >= 0 ? '📈' : '📉'}</div>
          </div>
        </div>
      </div>

    
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
            <span>➕</span>
            <span>Add Income</span>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
            <span>➖</span>
            <span>Add Expense</span>
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
            <span>📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>

    
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Recent Transactions
        </h2>
        
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400">
              No transactions yet. Add your first one!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {transaction.type === 'income' ? '💰' : '💸'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-50">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}₴{transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};