import React from 'react';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import './CurrencyRatesWidget.scss';

const CurrencyRatesWidget: React.FC=()=> {
  const {rates, loading, error} = useExchangeRates();  
  if(loading) return <div className='currency-widget'>Loading...</div>;
  if(error) return <div className='currency-widget error'>{error}</div>;

return (
<div className="currency-widget">
      <span>₴1 = ${rates.USD} | €{rates.EUR}</span>
    </div>
)
};

export default CurrencyRatesWidget;