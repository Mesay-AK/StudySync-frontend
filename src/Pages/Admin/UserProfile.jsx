import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faUser,
  faEnvelope,
  // faPhone,
  faCalendarAlt,
  // faMapMarkerAlt,
  faGraduationCap,
  faBook,
  faClock,
  faChartLine,
  faEdit,
  faCamera,
  // faBell,
  faShieldAlt,
  faLock,
  faSignOutAlt,
  faCog,
  // faHistory,
  faStar,
  faUsers,
  faDoorOpen,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    joinDate: '2023-09-15',
    bio: 'Passionate about learning and sharing knowledge with others.',
    education: 'Bachelor of Computer Science',
    interests: ['Programming', 'Mathematics', 'Physics'],
    stats: {
      studyHours: 156,
      completedCourses: 12,
      activeRooms: 3,
      uploadedMaterials: 8
    },
    recentActivity: [
      { type: 'room', name: 'Math Study Group', date: '2024-03-15', duration: '2h 30m' },
      { type: 'material', name: 'Calculus Notes', date: '2024-03-14', action: 'uploaded' },
      { type: 'course', name: 'Advanced Physics', date: '2024-03-13', progress: '75%' }
    ],
    achievements: [
      { name: 'Early Bird', description: 'Studied for 7 consecutive days', date: '2024-03-10' },
      { name: 'Knowledge Sharer', description: 'Shared 5 study materials', date: '2024-03-05' },
      { name: 'Team Player', description: 'Participated in 10 study rooms', date: '2024-02-28' }
    ]
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900">
      <DSideBar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Profile Header */}
          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white/20"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 hover:bg-blue-600">
                    <FontAwesomeIcon icon={faCamera} className="text-white" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                  <p className="text-gray-300">{profileData.role}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-gray-400">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      {profileData.email}
                    </span>
                    <span className="text-gray-400">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Joined {new Date(profileData.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleEditProfile}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="col-span-2 space-y-6">
              {/* Navigation Tabs */}
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'overview'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'activity'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    Activity
                  </button>
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'achievements'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    Achievements
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white/10 rounded-lg p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                      <p className="text-gray-300">{profileData.bio}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-4">Education</h2>
                      <div className="flex items-center text-gray-300">
                        <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                        {profileData.education}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-4">Interests</h2>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-4">
                    {profileData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={
                                activity.type === 'room'
                                  ? faDoorOpen
                                  : activity.type === 'material'
                                  ? faFileAlt
                                  : faBook
                              }
                              className="text-white"
                            />
                          </div>
                          <div>
                            <p className="text-white font-medium">{activity.name}</p>
                            <p className="text-gray-400 text-sm">
                              {activity.type === 'room'
                                ? `Studied for ${activity.duration}`
                                : activity.type === 'material'
                                ? `Uploaded on ${new Date(activity.date).toLocaleDateString()}`
                                : `Progress: ${activity.progress}`}
                            </p>
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="grid grid-cols-2 gap-4">
                    {profileData.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 flex items-start space-x-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{achievement.name}</h3>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Stats and Quick Actions */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="bg-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Study Hours</p>
                        <p className="text-white text-2xl font-semibold">
                          {profileData.stats.studyHours}
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faClock} className="text-blue-400 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Courses</p>
                        <p className="text-white text-2xl font-semibold">
                          {profileData.stats.completedCourses}
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faBook} className="text-green-400 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Active Rooms</p>
                        <p className="text-white text-2xl font-semibold">
                          {profileData.stats.activeRooms}
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faDoorOpen} className="text-purple-400 text-xl" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Materials</p>
                        <p className="text-white text-2xl font-semibold">
                          {profileData.stats.uploadedMaterials}
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faFileAlt} className="text-orange-400 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    Join Study Room
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    Upload Material
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                    View Progress
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Security</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Change Password
                  </button>
                  <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                    Privacy Settings
                  </button>
                  <button className="w-full px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;

