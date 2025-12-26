import React from 'react';
import './Settings.scss';
import {useTheme} from '../../../hooks/useTheme';

interface  SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({isOpen, onClose}) => {
  const {theme, toggleTheme} = useTheme();

  if (!isOpen) return null;

  return (
    <div className="settings">
      <div className="settings__content">
        <div className="settings__header">
          <h2>Settings</h2>
          <button onClick={onClose} className='settings__close'>x</button>
        </div>
        <div className="settings__body">
          <div className="setting-item">
            <span className="setting-item__label">Dark Theme</span>
            <button onClick={toggleTheme}
            className={`toggle-btn ${theme === 'dark'? 'toggle-btn--active': ''}`}
            >
                 {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) ;
  
  
};