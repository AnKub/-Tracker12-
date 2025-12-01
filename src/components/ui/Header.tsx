import React from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { useTheme } from '../../hooks/useTheme';
import './Header.scss';

export const Header: React.FC = () => {
  const user = useExpenseStore(state => state.user);
  const setUser = useExpenseStore(state => state.setUser);
  const { theme, toggleTheme } = useTheme();
 
  const handleLogout = () => {
    setUser(null);
  };

return (
  <header className="header">
    <div className="header__container">
      <div className="header__content">
        <div className="header__brand">
          <div className="header__logo">💰</div>
          <h1 className="header__title">
            Expense Tracker
          </h1>
        </div>

        <nav className="header__nav">
            <button className="nav-btn">
              📊 Dashboard
            </button>
            <button className="nav-btn">
              💳 Transactions
            </button>
            <button className="nav-btn">
              📈 Analytics
            </button>
          </nav>

          <div className="header__actions">
            <button 
              onClick={toggleTheme}
              className="theme-toggle"
              title="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {user ? (
              <div className="user-section">
                <div className="user-greeting">
                  👋 Hello, <span className="user-name">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="btn btn--error btn--sm"
                >
                  Logout
                </button>
              </div>
            ) : (
             <div className="auth-buttons">
                <button className="btn btn--primary btn--sm">
                  Login
                </button>
                <button className="btn btn--outline btn--sm">
                  Sign Up
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  </header>
);
};