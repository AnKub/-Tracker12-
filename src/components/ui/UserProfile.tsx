import React, {useState} from 'react';
import './UserProfile.scss';
import {useExpenseStore} from '../../store/useExpenseStore';

interface UserProfile{
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC <UserProfile> = ({isOpen, onClose})=> {
  const {user, updateUser}= useExpenseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState ({
    name: user?.name ||'',
    email: user?.email ||'',
    currency: user?.currency ||'UAH'
  });

  const hndleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleSave = () => {
    if (user){
      updateUser({...user, formData});
      setIsEditing(false); 
    }
  };

  const handleCancel = () => {
    
  }
}