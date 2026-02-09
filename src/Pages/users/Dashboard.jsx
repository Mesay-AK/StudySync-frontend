import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments, faMessage, faBook,  faChartBar, faGear,
  faSearch, faUsers, faClock, faFire, 
  faGlobe, faLock,
faRightFromBracket, 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';
import DashboardCard from '../../components/DashboardCard';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const userMenu = [
  { name: 'Study Rooms', href: '/user/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Messages', href: '/user/messages', icon: <FontAwesomeIcon icon={faMessage} /> },
  { name: 'Materials', href: '/user/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/user/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const mockStudyRooms = [
  {
    id: 1,
    name: "Advanced Calculus Study Group",
    subject: "Mathematics",
    participants: 12,
    maxParticipants: 20,
    type: "public",
    isActive: true,
    nextSession: "Today, 6:00 PM",
    description: "Weekly study group for Calculus II students",
    owner: "Dr. Smith",
    tags: ["Calculus", "Math", "Study Group"]
  },
  {
    id: 2,
    name: "Physics Lab Discussion",
    subject: "Physics",
    participants: 8,
    maxParticipants: 15,
    type: "public",
    isActive: true,
    nextSession: "Tomorrow, 2:00 PM",
    description: "Discussion group for Physics Lab assignments",
    owner: "Prof. Johnson",
    tags: ["Physics", "Lab", "Discussion"]
  },
  {
    id: 3,
    name: "Computer Science Algorithms",
    subject: "Computer Science",
    participants: 15,
    maxParticipants: 25,
    type: "private",
    isActive: false,
    nextSession: "Friday, 4:00 PM",
    description: "Algorithm study group for CS students",
    owner: "Dr. Wilson",
    tags: ["Algorithms", "CS", "Programming"]
  }
];

const mockRecentActivity = [
  {
    id: 1,
    type: "room_joined",
    title: "Joined Advanced Calculus Study Group",
    time: "2 hours ago",
    icon: faComments,
    color: "blue"
  },
  {
    id: 2,
    type: "material_shared",
    title: "Shared 'Calculus Cheat Sheet' in Physics Lab Discussion",
    time: "4 hours ago",
    icon: faBook,
    color: "green"
  },
  {
    id: 3,
    type: "message_received",
    title: "New message from Alex Johnson",
    time: "6 hours ago",
    icon: faMessage,
    color: "purple"
  },
  {
    id: 4,
    type: "study_session",
    title: "Completed 2-hour study session in Physics Lab Discussion",
    time: "Yesterday",
    icon: faClock,
    color: "orange"
  }
];

const mockStudyStats = {
  totalStudyTime: "24h 30m",
  roomsJoined: 5,
  materialsShared: 12,
  studyStreak: 7
};

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredRooms = mockStudyRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || room.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['all', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology'];

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={userMenu} />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md py-4 px-5 border-b border-white/10 mb-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mr-5">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                <input 
                  type="text"
                  placeholder="Search study rooms, materials, or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-blue-200 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>
            <div className="flex items-center gap-4 mr-12">
              <Link to="/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></Link>
              <NotificationsDropdown />
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-500 bg-clip-text text-transparent">Welcome back, Student!</h1>
            
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="Study Time This Week" 
              value={mockStudyStats.totalStudyTime} 
              change="+2h 15m from last week"
              icon={<FontAwesomeIcon icon={faClock} />}
              color="blue"
              link="/user/analytics"
            />
            <DashboardCard 
              title="Rooms Joined" 
              value={mockStudyStats.roomsJoined} 
              change="+1 this week"
              icon={<FontAwesomeIcon icon={faUsers} />}
              color="green"
              link="/user/study-rooms"
            />
            <DashboardCard 
              title="Materials Shared" 
              value={mockStudyStats.materialsShared} 
              change="+3 this week"
              icon={<FontAwesomeIcon icon={faBook} />}
              color="purple"
              link="/user/materials"
            />
            <DashboardCard 
              title="Study Streak" 
              value={`${mockStudyStats.studyStreak} days`} 
              change="Keep it up!"
              icon={<FontAwesomeIcon icon={faFire} />}
              color="orange"
              link="/user/analytics"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ">
            <div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Discover Study Rooms</h2>
                <Link to="/user/study-rooms" className="text-blue-300 hover:text-blue-200 text-sm">
                  View All →
                </Link>
              </div>

              {/* Subject Filter */}
              <div className="mb-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-gray-600/20 text-black boarder-b border-white/10">
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rooms List */}
              <div className="space-y-3">
                {filteredRooms.slice(0, 3).map(room => (
                  <div key={room.id} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-white">{room.name}</h3>
                        <p className="text-sm text-blue-200">{room.subject} • {room.owner}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          room.type === 'public' 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-purple-900/30 text-purple-300'
                        }`}>
                          <FontAwesomeIcon icon={room.type === 'public' ? faGlobe : faLock} className="mr-1" />
                          {room.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          room.isActive 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-gray-900/30 text-gray-300'
                        }`}>
                          {room.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-blue-200 mb-3">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-blue-200">
                        <span><FontAwesomeIcon icon={faUsers} className="mr-1" /> {room.participants}/{room.maxParticipants}</span>
                        <span><FontAwesomeIcon icon={faClock} className="mr-1" /> {room.nextSession}</span>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Join Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {mockRecentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.color === 'blue' ? 'bg-blue-900/30' :
                      activity.color === 'green' ? 'bg-green-900/30' :
                      activity.color === 'purple' ? 'bg-purple-900/30' :
                      'bg-orange-900/30'
                    }`}>
                      <FontAwesomeIcon 
                        icon={activity.icon} 
                        className={`text-sm ${
                          activity.color === 'blue' ? 'text-blue-300' :
                          activity.color === 'green' ? 'text-green-300' :
                          activity.color === 'purple' ? 'text-purple-300' :
                          'text-orange-300'
                        }`} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-blue-200">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/user/activity" className="block text-center text-blue-300 hover:text-blue-200 text-sm mt-4">
                View All Activity →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/user/study-rooms" className="bg-blue-900/30 hover:bg-blue-800/40 p-4 rounded-lg border border-blue-900/50 transition-colors">
                <FontAwesomeIcon icon={faComments} className="text-blue-300 text-2xl mb-2" />
                <h3 className="font-medium text-white">Join Study Room</h3>
                <p className="text-sm text-blue-200">Find and join study groups</p>
              </Link>
              <Link to="/user/messages" className="bg-green-900/30 hover:bg-green-800/40 p-4 rounded-lg border border-green-900/50 transition-colors">
                <FontAwesomeIcon icon={faMessage} className="text-green-300 text-2xl mb-2" />
                <h3 className="font-medium text-white">Send Message</h3>
                <p className="text-sm text-green-200">Chat with study partners</p>
              </Link>
              <Link to="/user/materials" className="bg-purple-900/30 hover:bg-purple-800/40 p-4 rounded-lg border border-purple-900/50 transition-colors">
                <FontAwesomeIcon icon={faBook} className="text-purple-300 text-2xl mb-2" />
                <h3 className="font-medium text-white">Share Materials</h3>
                <p className="text-sm text-purple-200">Upload study resources</p>
              </Link>
              <Link to="/user/analytics" className="bg-orange-900/30 hover:bg-orange-800/40 p-4 rounded-lg border border-orange-900/50 transition-colors">
                <FontAwesomeIcon icon={faChartBar} className="text-orange-300 text-2xl mb-2" />
                <h3 className="font-medium text-white">View Progress</h3>
                <p className="text-sm text-orange-200">Track your study stats</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;