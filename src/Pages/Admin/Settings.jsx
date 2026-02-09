import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faLock,
  faShieldAlt,
  faPalette,
  faLanguage,
  faMoon,
  faSun,
  faEye,
  faEyeSlash,
  faSave,
  faUser,
  faEnvelope,
  faPhone,
  faDownload,
  faTrash,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    studyReminders: true,
    newMessages: true,
    achievements: true,
    updates: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showActivity: true,
    showAchievements: true,
    allowMessages: true,
    showEmail: false,
    showPhone: false
  });
  const [language, setLanguage] = useState('en');
  const [display, setDisplay] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    animations: true,
    reducedMotion: false
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDisplayChange = (key, value) => {
    setDisplay(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900">
      <DSideBar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="col-span-1">
              <div className="bg-white/10 rounded-lg p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('account')}
                    className={`w-full px-4 py-2 rounded-lg flex items-center ${
                      activeSection === 'account'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                    Account
                  </button>
                  <button
                    onClick={() => setActiveSection('notifications')}
                    className={`w-full px-4 py-2 rounded-lg flex items-center ${
                      activeSection === 'notifications'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faBell} className="mr-3" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveSection('privacy')}
                    className={`w-full px-4 py-2 rounded-lg flex items-center ${
                      activeSection === 'privacy'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faShieldAlt} className="mr-3" />
                    Privacy
                  </button>
                  <button
                    onClick={() => setActiveSection('appearance')}
                    className={`w-full px-4 py-2 rounded-lg flex items-center ${
                      activeSection === 'appearance'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faPalette} className="mr-3" />
                    Appearance
                  </button>
                  <button
                    onClick={() => setActiveSection('language')}
                    className={`w-full px-4 py-2 rounded-lg flex items-center ${
                      activeSection === 'language'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faLanguage} className="mr-3" />
                    Language
                  </button>
                  <button
                    onClick={() => setActiveSection('data')}
                    className={`w-full px-4 py-2 rounded-lg flex items-center ${
                      activeSection === 'data'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-3" />
                    Data & Privacy
                  </button>
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="col-span-3">
              <div className="bg-white/10 rounded-lg p-6">
                {/* Account Settings */}
                {activeSection === 'account' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3" />
                          <input
                            type="email"
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-3" />
                          <input
                            type="tel"
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            placeholder="+1 (234) 567-8900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            placeholder="••••••••"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeSection === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {key === 'email' && 'Receive email notifications'}
                              {key === 'push' && 'Receive push notifications'}
                              {key === 'studyReminders' && 'Get reminded about study sessions'}
                              {key === 'newMessages' && 'Notify about new messages'}
                              {key === 'achievements' && 'Get notified about achievements'}
                              {key === 'updates' && 'Receive platform updates'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleNotificationChange(key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeSection === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Privacy Settings</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={privacy.profileVisibility}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                        </select>
                      </div>

                      {Object.entries(privacy).map(([key, value]) => {
                        if (key === 'profileVisibility') return null;
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h3 className="text-white font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {key === 'showActivity' && 'Show your activity to others'}
                                {key === 'showAchievements' && 'Display your achievements'}
                                {key === 'allowMessages' && 'Allow others to message you'}
                                {key === 'showEmail' && 'Show your email address'}
                                {key === 'showPhone' && 'Show your phone number'}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handlePrivacyChange(key, !value)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeSection === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Appearance Settings</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Theme
                        </label>
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setTheme('light')}
                            className={`p-4 rounded-lg flex items-center space-x-2 ${
                              theme === 'light'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <FontAwesomeIcon icon={faSun} />
                            <span>Light</span>
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`p-4 rounded-lg flex items-center space-x-2 ${
                              theme === 'dark'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <FontAwesomeIcon icon={faMoon} />
                            <span>Dark</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Font Size
                        </label>
                        <select
                          value={display.fontSize}
                          onChange={(e) => handleDisplayChange('fontSize', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Contrast
                        </label>
                        <select
                          value={display.contrast}
                          onChange={(e) => handleDisplayChange('contrast', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Animations</h3>
                          <p className="text-gray-400 text-sm">Enable interface animations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={display.animations}
                            onChange={() => handleDisplayChange('animations', !display.animations)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Language Settings */}
                {activeSection === 'language' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Language Settings</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Interface Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="zh">中文</option>
                          <option value="ja">日本語</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data & Privacy Settings */}
                {activeSection === 'data' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Data & Privacy</h2>
                    
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Download Your Data</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Get a copy of your data including your profile, activity, and content.
                        </p>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center">
                          <FontAwesomeIcon icon={faDownload} className="mr-2" />
                          Download Data
                        </button>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Delete Account</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Permanently delete your account and all associated data.
                        </p>
                        <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center">
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete Account
                        </button>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Activity History</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          View and manage your activity history.
                        </p>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center">
                          <FontAwesomeIcon icon={faHistory} className="mr-2" />
                          View History
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;