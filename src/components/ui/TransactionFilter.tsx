import React, {useState} from 'react';
import './TransactionFilter.scss';

type TransactionFilterProps = {
  categories: string[];
  onFilter: (filters: { 
    category: string;
    minAmount: string;
    maxAmount: string;  
  }) => void;
};

export const TransactionFilter: React.FC<TransactionFilterProps> = ({categories, onFilter})=>{
  const [selectedCategory, setSelectedCategory]= useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    onFilter({category: e.target.value, minAmount, maxAmount});
  };

  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinAmount(e. target.value);
    onFilter({
      category:selectedCategory,
      minAmount: e.target.value,
      maxAmount
});
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAmount(e.target.value);
    onFilter ({
      category: selectedCategory,
      minAmount, 
      maxAmount: e.target.value
    });
  }

  return(
    <div className="transaction-filter">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option> 
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
       </select>
          <input
              type="number"
              placeholder="Мін. сума"
              value={minAmount}
              onChange={handleMinAmountChange}
              min="0"
          />
          <input
            type="number"
            placeholder="Макс. сума"
            value={maxAmount}
            onChange={handleMaxAmountChange}
            min="0"
          />
      </div>
  );
};