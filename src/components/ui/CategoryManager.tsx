import React, {useState} from 'react';
import './CategoryManager.scss';
import { useExpenseStore } from '../../store/useExpenseStore';
import type { Category } from '../../types';  

interface CategoryManagerProps{
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
}

interface CategoryFromData{
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

const DEFAULT_CATEGORIES = [
  { name: 'Food', icon: '🍕', color: '#FF6B6B', type: 'expense' as const },
  { name: 'Transport', icon: '🚗', color: '#4ECDC4', type: 'expense' as const },
  { name: 'Entertainment', icon: '🎬', color: '#45B7D1', type: 'expense' as const },
  { name: 'Shopping', icon: '🛒', color: '#96CEB4', type: 'expense' as const },
  { name: 'Salary', icon: '💰', color: '#FFEAA7', type: 'income' as const },
  { name: 'Freelance', icon: '💻', color: '#DDA0DD', type: 'income' as const },
];

export const CategoryManager: React.FC<CategoryManagerProps> =({
  isOpen,
  onClose,
  onCategorySelect
}) => {
  const {user} = useExpenseStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category|null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name:'',
     icon: '📝',
    color: '#FF6B6B',
    type: 'expense'
  });


}
