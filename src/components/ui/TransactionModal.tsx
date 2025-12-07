import React from 'react';
import './TransactionModal.scss';
import {TransactionForm} from '../forms/TransactionForm';

interface TransactionModalProps{

  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget){
      onClose();
    }
  };
  const handleFormSuccess = () => {
    onClose();
    onSuccess?.();
  };
  if(!isOpen) return null;

  return (
    <div className="transaction-modal" onClick={handleBackdropClick}>
      <div className="transaction-modal__content">
        <div className="transaction-modal__header">
          <h2>Add Transaction</h2>
          <button className="transaction-modal__close-btn" 
          onClick={onClose}
          type="button"
          > x 
          </button>
        </div>
        <div className="transaction-modal__body">
          <TransactionForm onSuccess= {handleFormSuccess}/>
      </div>
    </div>
  </div>
  );
 };