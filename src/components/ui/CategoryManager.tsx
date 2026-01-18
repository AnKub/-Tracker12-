// import React, { useState } from 'react';
// import './CategoryManager.scss';
// import { useExpenseStore } from '../../store/useExpenseStore';
// import type { Category } from '../../types';

// interface CategoryManagerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCategorySelect?: (category: string) => void;
// }

// interface CategoryFormData {
//   name: string;
//   icon: string;
//   color: string;
//   type: 'income' | 'expense';
// }

// const DEFAULT_CATEGORIES = [
//   { name: 'Food', icon: '🍕', color: '#FF6B6B', type: 'expense' as const },
//   { name: 'Transport', icon: '🚗', color: '#4ECDC4', type: 'expense' as const },
//   { name: 'Entertainment', icon: '🎬', color: '#45B7D1', type: 'expense' as const },
//   { name: 'Shopping', icon: '🛒', color: '#96CEB4', type: 'expense' as const },
//   { name: 'Salary', icon: '💰', color: '#FFEAA7', type: 'income' as const },
//   { name: 'Freelance', icon: '💻', color: '#DDA0DD', type: 'income' as const },
// ];

// export const CategoryManager: React.FC<CategoryManagerProps> = ({ 
//   isOpen, 
//   onClose, 
//   onCategorySelect 
// }) => {
//   const { user } = useExpenseStore();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);
//   const [formData, setFormData] = useState<CategoryFormData>({
//     name: '',
//     icon: '📝',
//     color: '#FF6B6B',
//     type: 'expense'
//   });

//   React.useEffect(() => {
//     if (isOpen && user) {
//       const savedCategories = localStorage.getItem(`categories_${user.uid}`);
//       if (savedCategories) {
//         setCategories(JSON.parse(savedCategories));
//       } else {
//         const defaultWithIds = DEFAULT_CATEGORIES.map((cat, index) => ({
//           ...cat,
//           id: `default_${index}_${Date.now()}`
//         }));
//         setCategories(defaultWithIds);
//         localStorage.setItem(`categories_${user.uid}`, JSON.stringify(defaultWithIds));
//       }
//     }
//   }, [isOpen, user]);

//   React.useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && isOpen) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);


//   React.useEffect(() => {
//     if (!isOpen) {
//       setShowForm(false);
//       setEditingCategory(null);
//       setFormData({
//         name: '',
//         icon: '📝',
//         color: '#FF6B6B',
//         type: 'expense'
//       });
//     }
//   }, [isOpen]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user || !formData.name.trim()) return;

//     const newCategory: Category = {
//       ...formData,
//       name: formData.name.trim(),
//       id: editingCategory?.id || `category_${Date.now()}_${Math.random()}`
//     };

//     let updatedCategories;
//     if (editingCategory) {
//       updatedCategories = categories.map(cat => 
//         cat.id === editingCategory.id ? newCategory : cat
//       );
//     } else {
//       updatedCategories = [...categories, newCategory];
//     }

//     setCategories(updatedCategories);
//     localStorage.setItem(`categories_${user.uid}`, JSON.stringify(updatedCategories));
    
//     resetForm();
//   };

//   const handleEdit = (category: Category) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       icon: category.icon,
//       color: category.color,
//       type: category.type
//     });
//     setShowForm(true);
//   };

//   const handleDelete = (categoryId: string) => {
//     if (!user) return;
    
//     const updatedCategories = categories.filter(cat => cat.id !== categoryId);
//     setCategories(updatedCategories);
//     localStorage.setItem(`categories_${user.uid}`, JSON.stringify(updatedCategories));
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       icon: '📝',
//       color: '#FF6B6B',
//       type: 'expense'
//     });
//     setEditingCategory(null);
//     setShowForm(false);
//   };

//   if (!isOpen) return null;

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       if (showForm && (formData.name.trim() || editingCategory)) {
//         if (window.confirm('Unsaved changes will be lost. Are you sure?')) {
//           onClose();
//         }
//       } else {
//         onClose();
//       }
//     }
//   };

//   return (
//     <div className="category-manager" onClick={handleBackdropClick}>
//       <div className="category-manager__content" onClick={(e) => e.stopPropagation()}>
//         <div className="category-manager__header">
//           <h2>Manage Categories</h2>
//           <button onClick={onClose} className="category-manager__close-btn">×</button>
//         </div>

//         <div className="category-manager__body">
//           <div className="category-manager__actions">
//             <button 
//               onClick={() => setShowForm(true)} 
//               className="category-manager__add-btn"
//             >
//               + Add Category
//             </button>
//           </div>

//           {showForm && (
//             <form onSubmit={handleSubmit} className="category-form">
//               <h3>{editingCategory ? 'Edit Category' : 'New Category'}</h3>
              
//               <div className="form-field">
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Category name"
//                   required
//                 />
//               </div>

//               <div className="form-field">
//                 <label>Icon:</label>
//                 <input
//                   type="text"
//                   name="icon"
//                   value={formData.icon}
//                   onChange={handleInputChange}
//                   placeholder="🍕"
//                 />
//               </div>

//               <div className="form-field">
//                 <label>Color:</label>
//                 <input
//                   type="color"
//                   name="color"
//                   value={formData.color}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="form-field">
//                 <label>Type:</label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                 >
//                   <option value="expense">Expense</option>
//                   <option value="income">Income</option>
//                 </select>
//               </div>

//               <div className="form-actions">
//                 <button type="submit" className="save-btn">
//                   {editingCategory ? 'Update' : 'Create'}
//                 </button>
//                 <button type="button" onClick={resetForm} className="cancel-btn">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}

//           <div className="categories-grid">
//             {categories.map(category => (
//               <div 
//                 key={category.id} 
//                 className="category-card"
//                 style={{ borderLeft: `4px solid ${category.color}` }}
//                 onClick={() => onCategorySelect?.(category.name)}
//               >
//                 <div className="category-card__icon">{category.icon}</div>
//                 <div className="category-card__info">
//                   <h4>{category.name}</h4>
//                   <span className={`category-type category-type--${category.type}`}>
//                     {category.type}
//                   </span>
//                 </div>
//                 <div className="category-card__actions">
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEdit(category);
//                     }}
//                     className="edit-btn"
//                   >
//                     ✏️
//                   </button>
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(category.id);
//                     }}
//                     className="delete-btn"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };