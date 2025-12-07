// import React, { useState } from 'react';
// import { useExpenseStore } from '../../store/useExpenseStore';
// import './TransactionForm.scss';

// interface TransactionFormProps {
//   onSuccess?: () => void;
//   onCancel?: () => void;
//   initialType?: 'income' | 'expense';
// }

// const CATEGORIES = {
//   income: [
//     { value: 'salary', label: '💼 Salary' },
//     { value: 'freelance', label: '💻 Freelance' },
//     { value: 'investment', label: '📈 Investment' },
//     { value: 'bonus', label: '🎁 Bonus' },
//     { value: 'other-income', label: '💰 Other Income' }
//   ],
//   expense: [
//     { value: 'food', label: '🍕 Food' },
//     { value: 'transport', label: '🚗 Transport' },
//     { value: 'housing', label: '🏠 Housing' },
//     { value: 'entertainment', label: '🎬 Entertainment' },
//     { value: 'healthcare', label: '⚕️ Healthcare' },
//     { value: 'shopping', label: '🛍️ Shopping' },
//     { value: 'education', label: '📚 Education' },
//     { value: 'utilities', label: '💡 Utilities' },
//     { value: 'other-expense', label: '💸 Other Expense' }
//   ]
// };

// export const TransactionForm: React.FC<TransactionFormProps> = ({
//   onSuccess,
//   onCancel,
//   initialType = 'expense'
// }) => {
//   const addTransaction = useExpenseStore(state => state.addTransaction);
//   const user = useExpenseStore(state => state.user);
  
//   const [formData, setFormData] = useState({
//     type: initialType,
//     amount: '',
//     description: '',
//     category: '',
//     date: new Date().toISOString().split('T')[0]
//   });
  
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.amount || parseFloat(formData.amount) <= 0) {
//       newErrors.amount = 'Amount must be greater than 0';
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
    
//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }
    
//     if (!formData.date) {
//       newErrors.date = 'Date is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     if (!user) {
//       setErrors({ general: 'Please log in first' });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await addTransaction({
//         type: formData.type as 'income' | 'expense',
//         amount: parseFloat(formData.amount),
//         description: formData.description.trim(),
//         category: formData.category,
//         date: new Date(formData.date)
//       });

//       setFormData({
//         type: initialType,
//         amount: '',
//         description: '',
//         category: '',
//         date: new Date().toISOString().split('T')[0]
//       });

//       onSuccess?.();
//     } catch (error) {
//       setErrors({ general: 'Failed to add transaction' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const currentCategories = CATEGORIES[formData.type as keyof typeof CATEGORIES];

//   return (
//     <div className="transaction-form">
//       <div className="transaction-form__header">
//         <h2 className="transaction-form__title">
//           {formData.type === 'income' ? '💰 Add Income' : '💸 Add Expense'}
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="transaction-form__form">
//         <div className="form-group">
//           <label className="form-label">Transaction Type</label>
//           <div className="radio-group">
//             <label className="radio-option">
//               <input
//                 type="radio"
//                 name="type"
//                 value="income"
//                 checked={formData.type === 'income'}
//                 onChange={(e) => {
//                   handleInputChange('type', e.target.value);
//                   handleInputChange('category', '');
//                 }}
//               />
//               <span className="radio-label income-color">💰 Income</span>
//             </label>
//             <label className="radio-option">
//               <input
//                 type="radio"
//                 name="type"
//                 value="expense"
//                 checked={formData.type === 'expense'}
//                 onChange={(e) => {
//                   handleInputChange('type', e.target.value);
//                   handleInputChange('category', '');
//                 }}
//               />
//               <span className="radio-label expense-color">💸 Expense</span>
//             </label>
//           </div>
//           {errors.type && <span className="form-error">{errors.type}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label">Amount (₴)</label>
//           <input
//             type="number"
//             step="0.01"
//             min="0"
//             className={`form-input ${errors.amount ? 'form-input--error' : ''}`}
//             placeholder="Enter amount"
//             value={formData.amount}
//             onChange={(e) => handleInputChange('amount', e.target.value)}
//           />
//           {errors.amount && <span className="form-error">{errors.amount}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label">Description</label>
//           <input
//             type="text"
//             className={`form-input ${errors.description ? 'form-input--error' : ''}`}
//             placeholder="Describe the transaction"
//             value={formData.description}
//             onChange={(e) => handleInputChange('description', e.target.value)}
//           />
//           {errors.description && <span className="form-error">{errors.description}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label">Category</label>
//           <select
//             className={`form-input ${errors.category ? 'form-input--error' : ''}`}
//             value={formData.category}
//             onChange={(e) => handleInputChange('category', e.target.value)}
//           >
//             <option value="">Select category</option>
//             {currentCategories.map(cat => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//           {errors.category && <span className="form-error">{errors.category}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label">Date</label>
//           <input
//             type="date"
//             className={`form-input ${errors.date ? 'form-input--error' : ''}`}
//             value={formData.date}
//             max={new Date().toISOString().split('T')[0]}
//             onChange={(e) => handleInputChange('date', e.target.value)}
//           />
//           {errors.date && <span className="form-error">{errors.date}</span>}
//         </div>

//         {errors.general && (
//           <div className="form-error form-error--general">
//             {errors.general}
//           </div>
//         )}

//         <div className="form-actions">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`btn btn--${formData.type === 'income' ? 'success' : 'error'} btn--block`}
//           >
//             {isSubmitting ? (
//               <>⏳ Adding...</>
//             ) : (
//               <>{formData.type === 'income' ? '💰 Add Income' : '💸 Add Expense'}</>
//             )}
//           </button>
          
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="btn btn--outline btn--block"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };