import React from 'react';
import {useExpenseStore} from '../../store/useExpenseStore';

export const Header: React.FC = () =>{
  const user = useExpenseStore(state => state.user);
  const setUser = useExpenseStore (state => state.setUser);
 
  const handleLogout= () => {
    setUser(null);
  };

return (
  <header className='bg-white shadow-sm border-b border-gray-200'>
    <div className="max-w-7x1 mx auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Логотип та назва */}
        <div className="flex items-center spase-x-4">
          <div className="text-2x1">💰</div>
          <h1 className='text-x1 font-bold text-gray-900'>
            Expense Tracker
          </h1>
        </div>

        {/* Навігаціяяяя*/}
        <nav className="hidden md:flex space-x-8">
            <button className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              📊 Dashboard
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              💳 Transactions
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              📈 Analytics
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm textgray-700">
                  Hello, <span className='font-medium'>{user.displayName || user.email}</span>
                </div>
                <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white px-3  py-1 rounded-md text-sm transition-colors"'>
                  Logout
                </button>
              </div>
            ) : (
             <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Login
                </button>
                <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md text-sm transition-colors">
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