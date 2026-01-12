import React, {useState} from 'react';
import { authService } from '../../services/firebase';
import {useExpenseStore} from '../../store/useExpenseStore';
import './AuthModaal.scss';

interface AuthModalProps{
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'reset';
}
type AuthMode = 'login' | 'register'|'reset';

export const AuthModal: React.FC<AuthModalProps> =({
  isOpen,
  onClose,
  initialMode = 'login'
})=> {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loading,seiLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });

  const setUser = useExpenseStore(state => state.setUser);

  


}