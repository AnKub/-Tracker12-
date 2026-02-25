import React, {useState} from 'react';
import './UserProfile.scss';
import {useExpenseStore} from '../../store/useExpenseStore';

interface UserProfileProps{
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC <UserProfileProps> = ({isOpen, onClose})=> {
  const {user, updateUser}= useExpenseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleSave = () => {
    if (user){
      updateUser({ ...user, ...formData });
      setIsEditing(false); 
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };
  if (!isOpen || !user) return null;

   return (
    <div className="user-profile" onClick={onClose}>
      <div className="user-profile__content" onClick={(e) => e.stopPropagation()}>
        <div className="user-profile__header">
          <h2>User Profile</h2>
          <button onClick={onClose} className="user-profile__close-btn">×</button>
        </div>

        <div className="user-profile__body">
          <div className="user-profile__avatar">
            <div className="user-profile__avatar-circle">
              {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>

          {!isEditing ? (
            <div className="user-profile__info">
              <div className="user-profile__field">
                <label>Name:</label>
                <span>{user.displayName}</span>
              </div>
              <div className="user-profile__field">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>

              <button 
                onClick={() => setIsEditing(true)}
                className="user-profile__edit-btn"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="user-profile__form">
              <div className="user-profile__field">
                <label>Name:</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="user-profile__field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="user-profile__actions">
                <button onClick={handleSave} className="user-profile__save-btn">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="user-profile__cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};