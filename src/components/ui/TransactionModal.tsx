import React from 'react';
import './TransactionModal.scss';
import {TransactionForm} from '../forms/TransactionForm';

interface TransactionModalProps{

  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}
