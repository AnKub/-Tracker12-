import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import type { Transaction } from '../../types';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import './BarChartStats.scss';

interface CategoryBarData {
  category: string;
  amount: number;
}

interface BarChartStatsProps {
  transactions: Transaction[];
  type?: 'income' | 'expense';
}



const BarChartStats: React.FC<BarChartStatsProps> = ({
  transactions,
  type = 'expense',
}) => {
  const [currency, setCurrency] = useState<'UAH' | 'USD' | 'EUR'>('UAH');
const { rates, loading, error } = useExchangeRates();
if (loading) return <div>Завантажуємо валюту...</div>;
if (error) return <div>{error}</div>;

  const filtered = transactions.filter(tx => tx.type === type);

  const data: CategoryBarData[] = filtered.reduce((acc, tx) => {
    const found = acc.find(item => item.category === tx.category);
    if (found) {
      found.amount += tx.amount;
    } else {
      acc.push({ category: tx.category, amount: tx.amount });
    }
    return acc;
  }, [] as CategoryBarData[]).map(item => ({
    ...item,
    amount: Number((item.amount * rates[currency]).toFixed(2)),
  }));

  return (
    <div className="bar-chart-stats">
      <div className="bar-chart-stats__header">
        <h3>
          {type === 'expense' ? 'Витрати по категоріях' : 'Доходи по категоріях'}
        </h3>
        <select
          className="bar-chart-stats__currency"
          value={currency}
          onChange={e => setCurrency(e.target.value as 'UAH' | 'USD' | 'EUR')}
        >
          <option value="UAH">₴ UAH</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={100} />
          <Tooltip
            formatter={(value?: number) =>
              value !== undefined ? `${value} ${currency}` : ''
            }
            labelFormatter={label => `Категорія: ${label}`}
          />
          <Bar dataKey="amount" fill="#8884d8" radius={[10, 10, 10, 10]}>
            <LabelList dataKey="amount" position="right" formatter={v => `${v} ${currency}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartStats;