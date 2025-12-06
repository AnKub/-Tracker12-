import React, {useState} from 'react';
import {useExpenseStore} from '../../store/useExpenseStore';
import './TransactionForm.scss';

interface TransactionsForms {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialType?: 'income' | 'expense';
}

const CATEGORIES = {
  income: [
    {value: 'salary', label:'Salary'},
    {value: 'freelance', label:'Freelance'},
    {value: 'investment', label: 'Investment'},
    {value: 'bonus', label: 'Bonus'},
    {value: 'other-income', label: 'Other income'}
  ],
  expense:[]
}