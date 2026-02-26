import React from 'react';
import {BarChart, Bar, XAxis,YAxis, Tooltip, ResponsiveContainer, LabelList} from 'recharts';
import type {Transaction} from '../../types';

interface CategoryBarData{
  category:string;
  amount:number;
}

interface BarChartStatsProps{
transactions: Transaction[];
type?: 'income' | 'expense';
}

const BarChartStats: React.FC<BarChartStatsProps> = ({
  transactions,
  type = 'expense',
}) => {
  const filtered = transactions.filter(tx => tx.type ===type);

  const data: CategoryBarData[] = filtered.reduce((acc, tx)=> {
    const found = acc.find(item => item.category === tx.category);

    if(found){
      found.amount += tx.amount;
    }else{
      acc.push({category:tx.category, amount: tx.amount});
    }
    return acc;
  }, [] as CategoryBarData[]);

  return (
  <div className="bar-chart-stats">
    <h3>
      {type === 'expense' ? 'Витрати по категоріях' : 'Доходи по категоріях'}
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
        <XAxis type="number" />
        <YAxis dataKey="category" type="category" width={100} />
        <Tooltip
  formatter={(value: number | undefined) => value !== undefined ? `${value} грн` : ''}
/>
        <Bar dataKey="amount" fill="#8884d8" radius={[10, 10, 10, 10]}>
          <LabelList dataKey="amount" position="right" formatter={v => `${v} грн`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
};
export default BarChartStats;