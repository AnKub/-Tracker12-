import React, {useMemo} from 'react';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';

type CategoryStatsProps ={
  transactions: {category: string, amount:number, type: 'income'|'expense' }[];
  
};

export const CategoryStats: React.FC<CategoryStatsProps> = ({transactions}) => {
   const expenseData = useMemo(()=>{
    const stats: {name: string, value:number}[] = [];
    transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const found = stats.find(s => s.name === t.category);
      if(found){
        found.value += t.amount;
      }else{
        stats.push({name: t/category, value: t.amount});
      }
    });
    return stats;
   }, [transactions]);
   const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

return (
  <div className="category-stats">
    <h3>Статистика витрат по категоріях</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={expenseData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
};