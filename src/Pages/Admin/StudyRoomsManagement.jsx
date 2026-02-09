import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, 
  faUsers,
  faLock,
  faGlobe,
  faTrashAlt,
  faCircleCheck,
  faHouse,
  faFlag,
  faBook,
  faRightFromBracket,
  faChartBar,
  faGear,
  faUser, 
  faInfoCircle,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';
import { useNavigate, Link } from 'react-router-dom';
import RoomDetailPage from './RoomDetailPage';
import NotificationsDropdown from '../../components/NotificationsDropdown';
import DashboardCard from '../../components/DashboardCard';

const adminMenu = [
  { name: 'Home', href: '/admin/home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Users', href: '/admin/users', icon: <FontAwesomeIcon icon={faUsers} /> },
  // { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const mockParticipants = [
  { id: 1, name: 'Alex Johnson', joined: '2023-06-10T09:15:00', lastActive: '2023-06-10T14:30:00' },
  { id: 2, name: 'Maria Garcia', joined: '2023-06-10T10:30:00', lastActive: '2023-06-10T14:25:00' },
  { id: 3, name: 'James Wilson', joined: '2023-06-09T15:45:00', lastActive: '2023-06-10T13:10:00' },
];

const mockResources = [
  { id: 1, name: 'Calculus Cheat Sheet', type: 'pdf', uploaded: '2023-06-08', size: '2.4 MB' },
  { id: 2, name: 'Lecture Notes Week 5', type: 'doc', uploaded: '2023-06-05', size: '1.1 MB' },
  { id: 3, name: 'Practice Problems', type: 'pdf', uploaded: '2023-06-03', size: '3.2 MB' },
];

const StudyRoomsManagement = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Advanced Calculus",
      description: "Weekly study group for Calculus II students",
      type: "public",
      participants: mockParticipants,
      maxCapacity: 20,
      owner: "Dr. Smith",
      created: "2023-06-01",
      isActive: true,
      resources: mockResources,
      schedule: "Mon, Wed, Fri 6-8 PM",
      rules: "No late submissions. Respect all participants."
    },
    {
      id: 2,
      name: "Quantum Physics I",
      description: "Exploring the fundamentals of quantum mechanics",
      type: "private",
      participants: [
        { id: 4, name: 'John Doe', joined: '2023-05-20T10:00:00', lastActive: '2023-06-07T11:00:00' },
        { id: 5, name: 'Jane Smith', joined: '2023-05-22T11:30:00', lastActive: '2023-06-08T12:00:00' },
      ],
      maxCapacity: 10,
      owner: "Prof. Higgs",
      created: "2023-05-15",
      isActive: true,
      resources: [
        { id: 4, name: 'Schrödinger Eq.', type: 'pdf', uploaded: '2023-05-25', size: '1.8 MB' },
      ],
      schedule: "Tue, Thu 3-5 PM",
      rules: "Strictly confidential."
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         room.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' ? room.isActive : !room.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Toggle room status
  const toggleRoomStatus = (id) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, isActive: !room.isActive } : room
    ));
  };

  // Delete room
  const deleteRoom = (id) => {
    if (window.confirm('Are you sure you want to delete this room? All associated data will be lost.')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  // View room details
  const viewRoomDetails = (roomId) => {
    navigate(`/admin/study-rooms/${roomId}`);
  };

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={adminMenu} title="StudyPlatform" />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                <input 
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>
            <ul className="flex items-center gap-8 mr-12">
              <li><a href="/admin/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></a></li>
              <li>
                <NotificationsDropdown />
              </li>
              <li><a href="/admin/user-profile" className="hover:text-blue-400"><FontAwesomeIcon icon={faUser} /></a></li>
            </ul>
          </div>
        </header>

          <section className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard 
                  title="Public Rooms" 
                  value={rooms.filter(r => r.type === 'public').length} 
                  change='+ All public Rooms'
                  icon={<FontAwesomeIcon icon={faGlobe} />}
                  color="blue"
                  link="/admin/dashboard"
                />

                <DashboardCard 
                  title="Private Rooms" 
                  value={rooms.filter(r => r.type === 'private').length} 
                  change='+ All private Rooms'
                  icon={<FontAwesomeIcon icon={faLock} />}
                  color="purple"
                  link="/admin/dashboard"
                />


                <DashboardCard 
                  title="Active Rooms" 
                  value={rooms.filter(r => r.isActive).length}
                  change='+ Active Rooms'
                  icon={<FontAwesomeIcon icon={faCircleCheck} />}
                  color="green"
                  link="/admin/study-rooms"
                />

                <DashboardCard 
                  title="Inactive Rooms" 
                  value={rooms.filter(r => !r.isActive).length}
                  change='+ Inactive Rooms'
                  icon={<FontAwesomeIcon icon={faTimes} />}
                  color="red"
                  link="/admin/study-rooms"
                />
          </div>

          <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex flex-wrap gap-3 md:gap-6 mb-7 bg-white/5 rounded-lg p-5 border border-white/10">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button
                className="ml-auto bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add New Room
              </button>
            </div>

          

      <div className="bg-white/5 p-3 rounded-xl mb-6 border border-white/10 shadow-sm">
      <table className="w-full text-left border-collapse">
    <thead className="bg-stone-800/70 text-gray-300 text-sm tracking-wide" >
          <tr>
            <th scope="col" className="px-1 py-3 font-semibold text-gray-300 tracking-wider">Room Name</th>
            <th scope="col" className="px-1 py-3 font-semibold text-gray-300 tracking-wider">Owner</th>
            <th scope="col" className="hidden md:table-cell px-1 py-3  font-semibold text-gray-300 tracking-wider">Participants</th>
            <th scope="col" className="hidden md:table-cell px-1 py-3  font-semibold text-gray-300 tracking-wider">Status</th>
            <th scope="col" className="hidden md:table-cell px-1 py-3  font-semibold text-gray-300 tracking-wider">Created At</th>
            <th scope="col" className="px-1 py-3  font-semibold text-gray-300 tracking-wider text-right">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-stone-700/50 text-sm text-gray-300">
      {currentRooms.map((room) => (
        <tr
          key={room.id}
          className="hover:bg-stone-800/30 transition-colors cursor-pointer"
          onClick={() => viewRoomDetails(room.id)}
        >
          <td className="px-1 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-white">{room.name}</div>
            <div className="hidden md:table-cell text-sm text-gray-400">{room.description}</div>
          </td>

          <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-300">
            {room.owner}
          </td>

          <td className="hidden md:table-cell px-1 py-4 whitespace-nowrap text-sm text-gray-300 text-center">
            {room.participants.length}
          </td>

          <td className="hidden md:table-cell px-1 py-4 whitespace-nowrap">
            <span
              className={`px-1 py-1 inline-flex text-xs font-medium rounded-full 
                ${room.isActive ? "bg-green-900/40 text-green-300" : "bg-red-900/40 text-red-300"}`}
            >
              {room.isActive ? "Active" : "Inactive"}
            </span>
          </td>

          <td className="hidden md:table-cell px-1 py-4 whitespace-nowrap text-sm text-gray-300">
            {room.created}
          </td>

          <td className="px-1 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => viewRoomDetails(room.id)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                title="View Details"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
              <button
                onClick={() => toggleRoomStatus(room.id)}
                className={`transition-colors ${
                  room.isActive
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-green-400 hover:text-green-300"
                }`}
                title={room.isActive ? "Deactivate Room" : "Activate Room"}
              >
                <FontAwesomeIcon icon={room.isActive ? faTimes : faCircleCheck} />
              </button>
              <button
                onClick={() => deleteRoom(room.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="Delete Room"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
                  onClick={() => {/* Handle previous */}}
                >
                  Previous
                </button>
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
                  onClick={() => {/* Handle next */}}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-300">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                    onClick={() => {/* Handle previous */}}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                    onClick={() => {/* Handle next */}}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          
        </section>
      </main>
    </div>
  );
};

export default StudyRoomsManagement;