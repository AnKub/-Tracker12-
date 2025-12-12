import React, {useState, useMemo} from 'react';
import './TransactionsList.scss';
import {useExpenseStore} from '../../store/useExpenseStore';
import type {Transaction} from '../../types';

interface TransactionListProps {
limit?: number;
showFilters?: boolean;
className?: string;
}

type FilterType = 'all' | 'income' | 'expense';
type SortType = 'date' | 'amount' | 'category';
type SortOrder = 'asc' | 'desc';

export const TransactionList: React.FC<TransactionListProps> =({
  limit,
  showFilters = false,
  className = ''
}) => {
  const {transactions} = useExpenseStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions]
    if(filter !== 'all') {
      result = result.filter(transaction => transaction.type === filter);
    }

    result.sort((a, b) => {
      let compareValue = 0;

      switch(sortBy) {
        case 'date':
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
        case 'amount':
          compareValue = a.amount- b.amount;
          break;
          case 'category':
            compareValue = a.category.localeCompare(b.category);
            break;
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return limit? result.slice(0, limit) : result;
  }, [transactions, filter, sortBy, sortOrder, limit]);
}
