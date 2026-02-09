import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheck,
  faTrash,
  faExclamationTriangle,
  faUser,
  faDoorOpen,
  faFileAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Study Room Warning',
      message: 'You have been warned for inappropriate behavior in Math Study Group',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'user',
      title: 'New Follower',
      message: 'Sarah Johnson started following you',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'room',
      title: 'Study Room Invitation',
      message: 'You have been invited to join Physics Study Group',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'material',
      title: 'New Study Material',
      message: 'New Calculus notes have been shared in your group',
      time: '3 hours ago',
      read: true
    }
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
      case 'user':
        return <FontAwesomeIcon icon={faUser} className="text-blue-500" />;
      case 'room':
        return <FontAwesomeIcon icon={faDoorOpen} className="text-purple-500" />;
      case 'material':
        return <FontAwesomeIcon icon={faFileAlt} className="text-green-500" />;
      default:
        return <FontAwesomeIcon icon={faBell} className="text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:text-blue-400 transition-colors"
      >
        <FontAwesomeIcon icon={faBell} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-stone-800 rounded-lg shadow-lg border border-white/10 overflow-hidden z-50">
          <div className="p-4 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Notifications</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Mark all as read
                </button>
                <button
                  onClick={handleClearAll}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-white/10 hover:bg-white/5 ${
                    !notification.read ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-gray-400 hover:text-white"
                          title="Mark as read"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-400"
                        title="Delete notification"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
