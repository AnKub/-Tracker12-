import {useState, useEffect} from 'react';

type Rates = {UAH: number, USD: number, EUR: number};

const RATES_KEY = 'exchangeRates';
const RATES_TIMESTAMP_KEY = 'exchangeRatesTimestamp';
const DEFAULT_RATES: Rates = {UAH: 1, USD: 0.025, EUR: 0.023};
const DAY = 24*60*60*1000;

function getStoredRates(): {rates:Rates; timestamp:number} | null {
const rates = localStorage.getItem(RATES_KEY);
const timestamp = localStorage.getItem(RATES_TIMESTAMP_KEY);
if(rates && timestamp){
  return {rates: JSON.parse(rates), timestamp: Number(timestamp)};
}
return null;
}

function saveRates(rates: Rates){
  localStorage.setItem(RATES_KEY, JSON.stringify(rates));
  localStorage.setItem(RATES_TIMESTAMP_KEY, Date.now().toString());
}

export function useExchangeRates(){
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=> {
    const stored = getStoredRates();
    const now = Date.now();

    if(stored && now - stored.timestamp < DAY){
      setRates(stored.rates);
      setLoading(false);
    } else {
      fetch('https://api.exchangerate-api.com/v4/latest/UAH')
        .then(res => res.json())
        .then(data => {
          const newRates: Rates = {
            UAH: 1,
            USD: data.rates.USD,
            EUR: data.rates.EUR,
          };
          setRates(newRates);
          saveRates(newRates);
          setLoading(false);
        })
        .catch(() => {
          setRates(DEFAULT_RATES);
          setError('Не вдалося отримати курс валют. Використано стандартні значення.');
          setLoading(false);
        });
    }
  }, []);

  return { rates, loading, error };
}