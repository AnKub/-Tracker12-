import React from 'react';
import {useExpenseStore} from '../../store/expenseStore';

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

        {/* Навігація */}
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


      </div>
    </div>
  </header>
)
}