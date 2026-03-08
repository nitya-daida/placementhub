import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Bell, LogOut, User as UserIcon, Moon, Sun } from 'lucide-react';
import './Layout.css';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="header">
      <div style={{ flex: 1 }} />
      <div className="header-right">
        <button 
          className="notification-btn" 
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="notification-wrapper">
          <button 
            className="notification-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
              </div>
              <div className="dropdown-list">
                <div className="dropdown-item unread">
                  <p className="dropdown-text">Your question <strong>Google SDE</strong> was approved!</p>
                  <span className="dropdown-time">2h ago</span>
                </div>
                <div className="dropdown-item unread">
                  <p className="dropdown-text"><strong>5 new resources</strong> were added in Coding Prep.</p>
                  <span className="dropdown-time">5h ago</span>
                </div>
                <div className="dropdown-item">
                  <p className="dropdown-text">Welcome to Placement Hub 👋</p>
                  <span className="dropdown-time">1d ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="profile-wrapper">
          <div 
            className="header-user-badge"
            onClick={() => setShowProfile(!showProfile)}
            style={{ cursor: 'pointer' }}
          >
            <div className="user-avatar">
              <UserIcon size={16} />
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-role">{user?.role}</p>
            </div>
          </div>

          {showProfile && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <h3>{user?.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</p>
              </div>
              <div className="dropdown-list">
                <div className="dropdown-item profile-detail">
                  <span className="detail-label">Roll Number:</span>
                  <span className="detail-value">{user?.rollNumber || 'N/A'}</span>
                </div>
                <div className="dropdown-item profile-detail">
                  <span className="detail-label">Branch:</span>
                  <span className="detail-value">{user?.branch || 'N/A'}</span>
                </div>
                <div className="dropdown-item profile-detail">
                  <span className="detail-label">Batch:</span>
                  <span className="detail-value">{user?.year || 'N/A'}</span>
                </div>
                <div className="dropdown-item profile-detail">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value" style={{textTransform: 'capitalize'}}>{user?.role || 'Student'}</span>
                </div>
              </div>
              <div className="dropdown-footer">
                <button onClick={logout} className="dropdown-logout-btn">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
