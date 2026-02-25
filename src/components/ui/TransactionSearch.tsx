import React, {useState} from 'react';
import './TransactionSearch.scss'

type TransactionSearchProps = {
  onSearch:(query: string) => void;
};

export const TransactionSearch: React.FC<TransactionSearchProps> = ({onSearch}) => {
   const [query, setQuery] = useState('');

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
   } 
   return (
    <div className="transaction-search">
      <input type="text"
      placeholder='Search transactions...'
      value={query}
      onChange={handleInputChange}
      className="transaction-search__input"
      />
    </div>
   )
   
};
