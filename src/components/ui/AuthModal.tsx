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
    <div className="auth-modal" onClick={onClose}>
      <div className="auth-modal__content" onClick={(e) => e.stopPropagation()}>
        
        <div className="auth-modal__header">
          <h2>
            {mode === 'login' && 'Sign In'}
            {mode === 'register' && 'Create Account'}
            {mode === 'reset' && 'Reset Password'}
          </h2>
          <button onClick={onClose} className="auth-modal__close">
            ×
          </button>
        </div>

        {error && (
          <div className="auth-modal__error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-modal__form">
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="displayName">Name:</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          {mode !== 'reset' && (
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="auth-modal__submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : (
              <>
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Create Account'}
                {mode === 'reset' && 'Send Reset Email'}
              </>
            )}
          </button>

        </form>

        <div className="auth-modal__links">
          {mode === 'login' && (
            <>
              <button 
                type="button"
                onClick={() => switchMode('register')}
                className="auth-modal__link"
              >
                Don't have an account? Sign up
              </button>
              <button 
                type="button"
                onClick={() => switchMode('reset')}
                className="auth-modal__link"
              >
                Forgot password?
              </button>
            </>
          )}
          
          {mode === 'register' && (
            <button 
              type="button"
              onClick={() => switchMode('login')}
              className="auth-modal__link"
            >
              Already have an account? Sign in
            </button>
          )}
          
          {mode === 'reset' && (
            <button 
              type="button"
              onClick={() => switchMode('login')}
              className="auth-modal__link"
            >
              Back to sign in
            </button>
          )}
        </div>

      </div>
    </div>
  );
};