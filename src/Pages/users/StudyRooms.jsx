import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments, faMessage, faBook,faChartBar, faGear,
  faSearch, faPlus, faUsers, faClock, faGlobe, faLock, faPlay,
  faHouse, faRightFromBracket, faFilter, faSort, faEye, faTimes
} from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';
import DashboardCard from '../../components/DashboardCard';
import { Link } from 'react-router-dom';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const userMenu = [
  { name: 'Dashboard', href: '/user/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
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
    description: "Weekly study group for Calculus II students. We focus on derivatives, integrals, and applications.",
    owner: "Dr. Smith",
    tags: ["Calculus", "Math", "Study Group"],
    created: "2023-06-01",
    lastActivity: "2 hours ago",
    isJoined: true
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
    description: "Discussion group for Physics Lab assignments and problem-solving sessions.",
    owner: "Prof. Johnson",
    tags: ["Physics", "Lab", "Discussion"],
    created: "2023-05-28",
    lastActivity: "4 hours ago",
    isJoined: true
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
    description: "Algorithm study group for CS students focusing on data structures and algorithms.",
    owner: "Dr. Wilson",
    tags: ["Algorithms", "CS", "Programming"],
    created: "2023-05-20",
    lastActivity: "1 day ago",
    isJoined: false
  },
  {
    id: 4,
    name: "Chemistry Study Session",
    subject: "Chemistry",
    participants: 6,
    maxParticipants: 12,
    type: "public",
    isActive: true,
    nextSession: "Wednesday, 7:00 PM",
    description: "Organic chemistry study group for midterm preparation.",
    owner: "Dr. Brown",
    tags: ["Chemistry", "Organic", "Midterm"],
    created: "2023-06-05",
    lastActivity: "6 hours ago",
    isJoined: false
  },
  {
    id: 5,
    name: "Biology Research Group",
    subject: "Biology",
    participants: 10,
    maxParticipants: 15,
    type: "public",
    isActive: true,
    nextSession: "Thursday, 3:00 PM",
    description: "Research discussion group for biology students working on projects.",
    owner: "Dr. Davis",
    tags: ["Biology", "Research", "Projects"],
    created: "2023-05-15",
    lastActivity: "3 hours ago",
    isJoined: true
  }
];

const subjects = ['all', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology'];
const roomTypes = ['all', 'public', 'private'];
const sortOptions = ['name', 'participants', 'created', 'activity'];

function StudyRooms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('activity');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomForm, setRoomForm] = useState({
    name: '',
    description: '',
    type: 'public',
    maxParticipants: 10,
    schedule: '',
    rules: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRoomForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log('Create room:', roomForm);
    setShowCreateRoom(false);
    setRoomForm({ name: '', description: '', type: 'public', maxParticipants: 10, schedule: '', rules: '' });
  };

  const handleCloseModal = () => setShowCreateRoom(false);

  // Filter and sort rooms
  const filteredRooms = mockStudyRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || room.subject === selectedSubject;
    const matchesType = selectedType === 'all' || room.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'participants':
        return b.participants - a.participants;
      case 'created':
        return new Date(b.created) - new Date(a.created);
      case 'activity':
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = sortedRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handleJoinRoom = (roomId) => {
    // This would typically make an API call
    console.log(`Joining room ${roomId}`);
  };

  const handleLeaveRoom = (roomId) => {
    // This would typically make an API call
    console.log(`Leaving room ${roomId}`);
  };

  const joinedRooms = mockStudyRooms.filter(room => room.isJoined);
  const availableRooms = mockStudyRooms.filter(room => !room.isJoined);

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={userMenu} />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md py-4 px-5 border-b border-white/10 mb-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-5">
            <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Study Rooms</h1>
          </div>

            <div className="flex items-center gap-4 mr-12">
              <button 
                onClick={() => setShowCreateRoom(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} />
                Create Room
              </button>
              <Link to="/user/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></Link>
              <NotificationsDropdown />


          </div>
          </div>
        </header>

        {showCreateRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={handleCloseModal}></div>
            <div className="relative w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Create Study Room</h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-white/10 rounded-lg">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-200 mb-2">Room Name</label>
                  <input name="name" value={roomForm.name} onChange={handleFormChange} required className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-blue-200 mb-2">Description</label>
                  <textarea name="description" value={roomForm.description} onChange={handleFormChange} rows="3" className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm text-blue-200 mb-2">Type</span>
                    <select name="type" value={roomForm.type} onChange={handleFormChange} className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2">
                      <option value="public" className="bg-stone-800">Public</option>
                      <option value="private" className="bg-stone-800">Private</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-sm text-blue-200 mb-2">Max Participants</span>
                    <input type="number" min="2" max="100" name="maxParticipants" value={roomForm.maxParticipants} onChange={handleFormChange} className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm text-blue-200 mb-2">Schedule</span>
                    <input name="schedule" value={roomForm.schedule} onChange={handleFormChange} placeholder="e.g. Mon, Wed 6-8 PM" className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2" />
                  </label>
                  <label className="block">
                    <span className="block text-sm text-blue-200 mb-2">Rules</span>
                    <input name="rules" value={roomForm.rules} onChange={handleFormChange} placeholder="e.g. Be respectful" className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2" />
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="max-w-7xl mx-auto p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="My Rooms" 
              value={joinedRooms.length} 
              change="Rooms you've joined"
              icon={<FontAwesomeIcon icon={faComments} />}
              color="blue"
              link="/user/study-rooms"
            />
            <DashboardCard 
              title="Available Rooms" 
              value={availableRooms.length} 
              change="Rooms you can join"
              icon={<FontAwesomeIcon icon={faGlobe} />}
              color="green"
              link="/user/study-rooms"
            />
            <DashboardCard 
              title="Active Sessions" 
              value={mockStudyRooms.filter(r => r.isActive).length} 
              change="Currently active"
              icon={<FontAwesomeIcon icon={faPlay} />}
              color="purple"
              link="/user/study-rooms"
            />
            <DashboardCard 
              title="Total Participants" 
              value={mockStudyRooms.reduce((sum, room) => sum + room.participants, 0)} 
              change="Across all rooms"
              icon={<FontAwesomeIcon icon={faUsers} />}
              color="orange"
              link="/user/study-rooms"
            />
          </div>

          {/* Filters */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-blue-300" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-blue-800">
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-blue-300" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roomTypes.map(type => (
                    <option key={type} value={type} className="bg-blue-800">
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSort} className="text-blue-300" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option} className="bg-blue-800">
                      Sort by {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                <input 
                  type="text"
                  placeholder="Search study rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-blue-200 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentRooms.map(room => (
              <div key={room.id} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{room.name}</h3>
                    <p className="text-sm text-blue-200 mb-2">{room.subject} • {room.owner}</p>
                    <p className="text-sm text-blue-300 mb-3">{room.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
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

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-blue-200">
                    <span><FontAwesomeIcon icon={faUsers} className="mr-1" /> {room.participants}/{room.maxParticipants}</span>
                    <span><FontAwesomeIcon icon={faClock} className="mr-1" /> {room.nextSession}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {room.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {room.isJoined ? (
                    <button
                      onClick={() => handleLeaveRoom(room.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      Leave Room
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinRoom(room.id)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      Join Room
                    </button>
                  )}
                  <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-sm transition-colors">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Previous
            </button>
            <span className="text-blue-200">
              Page {currentPage} of {Math.ceil(sortedRooms.length / roomsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(sortedRooms.length / roomsPerPage)))}
              disabled={currentPage === Math.ceil(sortedRooms.length / roomsPerPage)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudyRooms;
