import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { useTheme } from '../../hooks/useTheme';

export const Header: React.FC = () => {
  const user = useExpenseStore(state => state.user);
  const setUser = useExpenseStore(state => state.setUser);
  const { theme, toggleTheme } = useTheme();
 
  const handleLogout = () => {
    setUser(null);
  };

return (
  <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Логотип та назва */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl">💰</div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Expense Tracker
          </h1>
        </div>

        {/* Навігація */}
        <nav className="hidden md:flex space-x-8">
            <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              📊 Dashboard
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              💳 Transactions
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              📈 Analytics
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  👋 Hello, <span className="font-medium">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
             <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Login
                </button>
                <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 px-4 py-2 rounded-md text-sm transition-colors">
                  Sign Up
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  </header>
);
};