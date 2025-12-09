// import React, {useMemo} from 'react';
// import './ExpenseChart.scss';
// import {useExpenseStore} from '../../store/useExpenseStore';

// interface ChartData {
//   category: string;
//   amount: number;
//   percentage: number;
//   color: string;
// }
// const CATEGORY_COLORS = [
//   '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
//   '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
// ];

// export const ExpenseChart: React.FC = () => {
//   const {transactions} = useExpenseStore();

//   const expenseData = useMemo(() => {
//     const expenseTransactions = transactions.filter(t => t.type === 'expense');
//     const categoryTotals = new Map<string, number>();

//     expenseTransactions.forEach(transaction => {
//       const current = categoryTotals.get(transaction.category)||0;
//       categoryTotals.set(transaction.category, current + transaction.amount);
//     });

//     const totalExpenses = Array.from(categoryTotals.values()).reduce((sum, amount) => sum + amount, 0);
//     if(totalExpenses === 0) return [];

//     return Array.from(categoryTotals.entries())
//     .map(([category, amount], index): ChartData => ({
//       category,
//       amount,
//       percentage: (amount / totalExpenses) * 100,
//       color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
//     }))
//     .sort((a, b)=> b.amount - a.amount);
//   }, [transactions]);
//   if (expenseData.length === 0) {
//     return (
//       <div className="expense-chart">
//         <h3 className="expense-chart__title">Expense Breakdown</h3>
//         <div className="expense-chart__empty">
//           <p>No expenses recorded yet</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="expense-chart">
//       <h3 className="expense-chart__title">Expense Breakdown</h3>
      
//       <div className="expense-chart__content">
//         <div className="expense-chart__bars">
//           {expenseData.map((item) => (
//             <div key={item.category} className="expense-chart__bar-container">
//               <div className="expense-chart__bar-info">
//                 <span className="expense-chart__category">{item.category}</span>
//                 <span className="expense-chart__amount">${item.amount.toFixed(2)}</span>
//               </div>
//               <div className="expense-chart__bar">
//                 <div 
//                   className="expense-chart__bar-fill"
//                   style={{ 
//                     width: `${item.percentage}%`, 
//                     backgroundColor: item.color 
//                   }}
//                 />
//               </div>
//               <span className="expense-chart__percentage">{item.percentage.toFixed(1)}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };