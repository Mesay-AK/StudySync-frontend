import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments, faMessage, faBook, faUser, faChartBar, faGear,
  faUsers, faClock, faFire,
  faCalendar, faTrophy, faHouse,
  faRightFromBracket,faEye, faEdit, faSave,
  faCamera,faMapMarkerAlt,
  faUniversity, faGraduationCap as faGradCap,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';

const userMenu = [
  { name: 'Dashboard', href: '/user/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Study Rooms', href: '/user/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Messages', href: '/user/messages', icon: <FontAwesomeIcon icon={faMessage} /> },
  { name: 'Materials', href: '/user/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/user/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Settings', href: '/user/settings', icon: <FontAwesomeIcon icon={faGear} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const mockUserProfile = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@university.edu",
  username: "johndoe",
  role: "Student",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Computer Science student passionate about algorithms and machine learning. Love collaborating on study projects!",
  location: "New York, NY",
  university: "New York University",
  major: "Computer Science",
  year: "Junior",
  joinDate: "2023-01-15",
  lastActive: "2 hours ago",
  studyTime: "156 hours",
  roomsJoined: 8,
  materialsShared: 15,
  studyStreak: 12,
  achievements: [
    { id: 1, name: "Study Streak Master", description: "Studied for 10 consecutive days", icon: faFire, color: "orange" },
    { id: 2, name: "Collaborator", description: "Shared 10+ study materials", icon: faBook, color: "green" },
    { id: 3, name: "Room Explorer", description: "Joined 5+ study rooms", icon: faComments, color: "blue" }
  ],
  interests: ["Programming", "Mathematics", "Physics", "Machine Learning", "Data Science"],
  studyPreferences: {
    subjects: ["Computer Science", "Mathematics", "Physics"],
    studyTime: "Evening",
    groupSize: "Small (2-5 people)",
    communication: "Text and Voice"
  }
};

const mockStudyHistory = [
  {
    id: 1,
    roomName: "Advanced Calculus Study Group",
    subject: "Mathematics",
    duration: "2h 30m",
    date: "2023-06-10",
    participants: 8
  },
  {
    id: 2,
    roomName: "Physics Lab Discussion",
    subject: "Physics",
    duration: "1h 45m",
    date: "2023-06-09",
    participants: 6
  },
  {
    id: 3,
    roomName: "Computer Science Algorithms",
    subject: "Computer Science",
    duration: "3h 15m",
    date: "2023-06-08",
    participants: 12
  }
];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(mockUserProfile);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // This would typically make an API call
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: faUser },
    { id: 'activity', name: 'Activity', icon: faChartBar },
    { id: 'achievements', name: 'Achievements', icon: faTrophy },
    { id: 'settings', name: 'Settings', icon: faGear }
  ];

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={userMenu} />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Profile</h1>
            <div className="flex items-center gap-4">
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FontAwesomeIcon icon={faSave} />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Profile Header */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="relative">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white/20"
                  />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-blue-200 mb-2">@{profileData.username}</p>
                <p className="text-blue-300 mb-4">{profileData.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                  <span><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> {profileData.location}</span>
                  <span><FontAwesomeIcon icon={faUniversity} className="mr-1" /> {profileData.university}</span>
                  <span><FontAwesomeIcon icon={faGradCap} className="mr-1" /> {profileData.major} - {profileData.year}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{profileData.studyStreak}</div>
                  <div className="text-sm text-blue-200">Day Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/5 rounded-xl border border-white/10 mb-6">
            <div className="flex border-b border-white/10">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-300 border-b-2 border-blue-300'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stats */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Study Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FontAwesomeIcon icon={faClock} className="text-blue-300 text-xl" />
                          <div>
                            <div className="text-2xl font-bold text-white">{profileData.studyTime}</div>
                            <div className="text-sm text-blue-200">Total Study Time</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FontAwesomeIcon icon={faComments} className="text-green-300 text-xl" />
                          <div>
                            <div className="text-2xl font-bold text-white">{profileData.roomsJoined}</div>
                            <div className="text-sm text-blue-200">Rooms Joined</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FontAwesomeIcon icon={faBook} className="text-purple-300 text-xl" />
                          <div>
                            <div className="text-2xl font-bold text-white">{profileData.materialsShared}</div>
                            <div className="text-sm text-blue-200">Materials Shared</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Study Preferences */}
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Study Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-200">Preferred Subjects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profileData.studyPreferences.subjects.map(subject => (
                              <span key={subject} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-blue-200">Study Time:</span>
                          <p className="text-white">{profileData.studyPreferences.studyTime}</p>
                        </div>
                        <div>
                          <span className="text-blue-200">Group Size:</span>
                          <p className="text-white">{profileData.studyPreferences.groupSize}</p>
                        </div>
                        <div>
                          <span className="text-blue-200">Communication:</span>
                          <p className="text-white">{profileData.studyPreferences.communication}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interests & Achievements */}
                  <div className="space-y-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map(interest => (
                          <span key={interest} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Recent Achievements</h4>
                      <div className="space-y-3">
                        {profileData.achievements.slice(0, 3).map(achievement => (
                          <div key={achievement.id} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              achievement.color === 'orange' ? 'bg-orange-900/30' :
                              achievement.color === 'green' ? 'bg-green-900/30' :
                              'bg-blue-900/30'
                            }`}>
                              <FontAwesomeIcon 
                                icon={achievement.icon} 
                                className={`text-sm ${
                                  achievement.color === 'orange' ? 'text-orange-300' :
                                  achievement.color === 'green' ? 'text-green-300' :
                                  'text-blue-300'
                                }`} 
                              />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">{achievement.name}</div>
                              <div className="text-xs text-blue-200">{achievement.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Study Activity</h3>
                  <div className="space-y-4">
                    {mockStudyHistory.map(session => (
                      <div key={session.id} className="bg-white/5 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-white">{session.roomName}</h4>
                            <p className="text-sm text-blue-200">{session.subject}</p>
                            <div className="flex items-center gap-4 text-xs text-blue-300 mt-2">
                              <span><FontAwesomeIcon icon={faClock} className="mr-1" /> {session.duration}</span>
                              <span><FontAwesomeIcon icon={faUsers} className="mr-1" /> {session.participants} participants</span>
                              <span><FontAwesomeIcon icon={faCalendar} className="mr-1" /> {session.date}</span>
                            </div>
                          </div>
                          <button className="text-blue-300 hover:text-blue-200">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">All Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profileData.achievements.map(achievement => (
                      <div key={achievement.id} className="bg-white/5 p-4 rounded-lg text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          achievement.color === 'orange' ? 'bg-orange-900/30' :
                          achievement.color === 'green' ? 'bg-green-900/30' :
                          'bg-blue-900/30'
                        }`}>
                          <FontAwesomeIcon 
                            icon={achievement.icon} 
                            className={`text-xl ${
                              achievement.color === 'orange' ? 'text-orange-300' :
                              achievement.color === 'green' ? 'text-green-300' :
                              'text-blue-300'
                            }`} 
                          />
                        </div>
                        <h4 className="font-medium text-white mb-1">{achievement.name}</h4>
                        <p className="text-sm text-blue-200">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows="3"
                        className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
