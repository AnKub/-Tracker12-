import React, {useState} from 'react';
import { authService } from '../../services/firebase';
import {useExpenseStore} from '../../store/useExpenseStore';
import './AuthModal.scss';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });

  const setUser = useExpenseStore(state => state.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const {name, value} = e.target;
    setFormData(prev=> ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    setError('');
    if(!formData.email){
      setError('Email is required.');
      return false;
    }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (mode!== 'reset'){
      if(!formData.password){
        setError('Password is required');
        return false;
      }
      if(formData.password.length < 6){
        setError('Password must be at least 6 characters');
        return false;
      }
    }
     if (mode === 'register') {
      if (!formData.displayName) {
        setError('Name is required');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    return true; 
  };

  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    if(!validateForm())return;

    setLoading(true);
    setError('');

    try{
      if(mode === 'login'){
        const result = await authService.login(
          formData.email, 
          formData.password);

        const user = {
          uid: result.user.uid,
          email:result.user.email!,
          displayName: result.user.displayName || 'User',
          photoURL: result.user.photoURL || undefined,
          emailVerified: result.user.emailVerified 
          };
          setUser(user);

          onClose();
        
      }else if(mode === 'register') {
        const result = await authService.register(
          formData.email,
          formData.password,
          formData.displayName
        );

        const user = {
          uid:result.user.uid,
          email: result.user.email!,
          displayName: result.user.displayName || formData.displayName,
          photoURL: result.user.photoURL || undefined,
          emailVerified: result.user.emailVerified
        };
        setUser(user);
        onClose();
      } else if (mode === 'reset') {
        await authService.resetPassword(formData.email);
        setError('Password reset email sent. Check your inbox');
        setTimeout(() => {
          setMode('login');
          setError('');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Email is already registered');
      } else {
        setError(error.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
   const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    });
  };


  return (
    <div>AuthModal Component</div>
  );
};