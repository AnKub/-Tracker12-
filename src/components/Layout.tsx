import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) =>{
  return(
    <div className="min-h-screen bg-gray-50">
      <header className ="bg-white shadow-sm border-b">
        <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-x1 font-semibold text-gray-900">
                Expense Tracker
              </h1>
            </div>

            <nav className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                DashBoard
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Transactions
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7x1 mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>

    </div>
  );
};