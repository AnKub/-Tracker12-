import React, { useMemo } from 'react';
import { PieChart, Pie, Sector, LabelList } from 'recharts';
import type { PieSectorShapeProps } from 'recharts';

type CategoryStatsProps = {
  transactions: { category: string; amount: number; type: 'income' | 'expense' }[];
};

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const CustomPieSector = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
);

const CustomLabel = (props: any) => (
  <text
    x={props.x}
    y={props.y}
    fill={COLORS[(props.index ?? 0) % COLORS.length]}
    textAnchor={props.textAnchor}
    dominantBaseline={props.dominantBaseline}
    fontSize={14}
  >
    {props.value}
  </text>
);

export const CategoryStats: React.FC<CategoryStatsProps> = ({ transactions }) => {
  const expenseData = useMemo(() => {
    const stats: { name: string; value: number }[] = [];
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const found = stats.find(s => s.name === t.category);
        if (found) {
          found.value += t.amount;
        } else {
          stats.push({ name: t.category, value: t.amount });
        }
      });
    return stats;
  }, [transactions]);

  return (
    <div className="category-stats">
      <h3>Статистика витрат по категоріях</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={expenseData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          shape={CustomPieSector}
        >
          <LabelList content={CustomLabel} />
        </Pie>
      </PieChart>
    </div>
  );
};