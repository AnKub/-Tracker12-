import React, {useState} from 'react';
import './QuickActions.scss';
import { TransactionModal} from './TransactionModal';

interface QuickActions{
className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({className = ''}) => {
  const [isModalOpen, setIsModalOpen]= useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income'); 
  
  const handleAddIncome = () => {
    setTransactionType('income');
    setIsModalOpen(true);
  };

  const handleAddExpense = () => {
    setTransactionType('expense');
    setIsModalOpen(true);
  };

  const handleModalClose= () => {
    setIsModalOpen(false);
  };

  const handleTransactionSuccess= () => {
    console.log(`${transactionType} added successfully!`);
  }
  return (
    <div className={`quick-actions ${className}`}>
      <h3 className="quick-actions__title">Quick Actions</h3>
      
      <div className="quick-actions__buttons">
        <button 
          className="quick-actions__btn quick-actions__btn--income"
          onClick={handleAddIncome}
          type="button"
        >
          <span className="quick-actions__btn-icon">+</span>
          <span className="quick-actions__btn-text">Add Income</span>
        </button>

        <button 
          className="quick-actions__btn quick-actions__btn--expense"
          onClick={handleAddExpense}
          type="button"
        >
          <span className="quick-actions__btn-icon">-</span>
          <span className="quick-actions__btn-text">Add Expense</span>
        </button>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleTransactionSuccess}
      />
    </div>
  );
};