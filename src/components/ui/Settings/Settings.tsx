import React from 'react';
import './Settings.scss';
import {useTheme} from '../../../hooks/useTheme';
import type {Language, DateFormat} from '../../../types';
import {useSettingsStore} from '../../../store/useSettingsStore';

interface  SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({isOpen, onClose}) => {
  const {theme, toggleTheme} = useTheme();
  const {
    currency,
     language, 
     dateFormat, 
     notifications, 
     showTutorials, 
     setLanguage, 
     resetSettings,
     setDateFormat, 
     setNotifications, 
     setShowTutorials, 
     setCurrency
    } = useSettingsStore();

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

                  <div className="setting-item">
                    <span className="setting-item__label">Notifications</span>
                  <button 
                  onClick={()=> setNotifications(!notifications)}
                  className={`toggle-btn ${notifications ? 'toggle-btn--active': ''}`}>
                    {notifications ? '🔔' : '🔕'}
                    </button>
                  </div>

                  <div className="setting-">
                    <span className='setting-item__label'>Show Tutorials</span>
                  <button
                  onClick= {()=> setShowTutorials(!showTutorials)}
                  className={`toggle-btn ${showTutorials ? 'toggle-btn--active':''}`}
                  >
                    {showTutorials ? '💡 On' : '⚪ Off'}
                  </button>
                  </div>


                  <div className="setting-item">
                    <span className="setting-item__label">Currency</span>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as 'UAH' | 'USD' | 'EUR')}
                      className="setting-select"
                    >
                      <option value="UAH">🇺🇦 UAH (₴)</option>
                      <option value="USD">🇺🇸 USD ($)</option>
                      <option value="EUR">🇪🇺 EUR (€)</option>
                    </select>
                    </div>

                    <div className="setting-">
                      <span className='setting-item__label'>Date Format</span>
                      <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value as DateFormat)}
                         className="setting-select" 
                         >
                        <option value="DD/MM/YYYY">DD/MM/YYYY (15/01/2025)</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY (01/15/2025)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (2025-01-15)</option>
                      </select>
                    </div>

                  <div className="setting-item">
                    <span className="setting-item__label">Language</span>
                    <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="setting-select">
                      <option value="uk">🇺🇦 Українська</option> 
                      <option value="en">🇺🇸 English</option>
                    </select>
                  </div>

                    <div className="setting-item">
                      <button onClick= {resetSettings} className="btn btn--secondary">
                        Reset
                      </button>
                    </div>
          </div> 
        </div>
      </div>
  ) ;
  
  
};