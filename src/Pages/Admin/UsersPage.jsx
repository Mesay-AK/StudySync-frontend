import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBook,
  // faChartLine,
  faFlag,
  faGear,
  faUser,
  faSearch,
  faHouse,
  // faEllipsisV,
  // faCheck,
  // faTimes,
  faBan,
  faComments,
  faEdit,
  faTrash,
  faFilter,
  faUserCheck,
  faRightFromBracket,
  faChartBar,
  faUserClock

} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const adminMenu = [
  { name: 'Home', href: '/admin/home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Users', href: '/admin/users', icon: <FontAwesomeIcon icon={faUsers} /> },
  { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const UsersPage = () => {
  // Sample user data matching your platform
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'student',
      status: 'active',
      lastActive: '2023-06-10T14:30:00',
      resourcesAccessed: 24,
      studyRoomsJoined: 5,
      isBanned: false
    },
    {
      id: 2,
      name: 'Dr. Sarah Smith',
      email: 'sarah@example.com',
      role: 'instructor',
      status: 'active',
      lastActive: '2023-06-10T09:15:00',
      resourcesAccessed: 42,
      studyRoomsJoined: 12,
      isBanned: false
    },
    {
      id: 3,
      name: 'Mark Wilson',
      email: 'mark@example.com',
      role: 'student',
      status: 'inactive',
      lastActive: '2023-05-28T18:45:00',
      resourcesAccessed: 8,
      studyRoomsJoined: 2,
      isBanned: true
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [selectedRole] = useState('all');
  const [selectedStatus] = useState('all');
  const [filters, setFilters] = useState({
    status: '',
    role: '',
    sortBy: 'name'
  });

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort users based on selected sort option
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.lastActive) - new Date(a.lastActive);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Toggle ban status
  const toggleBan = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBanned: !user.isBanned } : user
    ));
    // In real app, you would call API here
  };

  // Format last active date
  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Mock user statistics - replace with actual API data
  const [userStats] = useState({
    totalUsers: 1250,
    activeUsers: 850,
    bannedUsers: 45,
    pendingUsers: 12,
    newUsersToday: 25,
    newUsersThisWeek: 78
  });

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={adminMenu} title="StudyPlatform" />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        
          {/* Header */}
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10">
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

          {/* Filters Panel */}
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Role</label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value="">All</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value="name">Name</option>
                  <option value="date">Join Date</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* Total Users Card */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Total Users</h3>
                <FontAwesomeIcon icon={faUsers} className="text-blue-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-lg font-bold text-white">{userStats.totalUsers}</p>
                  <p className="text-xs text-gray-400">All registered users</p>
                </div>
              </div>
            </div>

            {/* Active Users Card */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Active Users</h3>
                <FontAwesomeIcon icon={faUserCheck} className="text-green-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-lg font-bold text-white">{userStats.activeUsers}</p>
                  <p className="text-xs text-gray-400">Currently active</p>
                </div>
              </div>
            </div>

            {/* Banned Users Card */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Banned Users</h3>
                <FontAwesomeIcon icon={faBan} className="text-red-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-lg font-bold text-white">{userStats.bannedUsers}</p>
                  <p className="text-xs text-gray-400">Restricted accounts</p>
                </div>
              </div>
            </div>

            {/* Pending Users Card */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Pending Users</h3>
                <FontAwesomeIcon icon={faUserClock} className="text-yellow-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-lg font-bold text-white">{userStats.pendingUsers}</p>
                  <p className="text-xs text-gray-400">Awaiting approval</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/10 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-gray-700">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                            <FontAwesomeIcon icon={faUser} className="text-blue-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-300">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-900/30 text-green-300' :
                          user.status === 'inactive' ? 'bg-gray-900/30 text-gray-300' :
                          'bg-red-900/30 text-red-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatLastActive(user.lastActive)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex flex-col">
                          <span>Resources: {user.resourcesAccessed}</span>
                          <span>Rooms: {user.studyRoomsJoined}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button 
                          onClick={() => toggleBan(user.id)}
                          className={`p-2 rounded-lg ${user.isBanned ? 'bg-green-900/30 hover:bg-green-800/50 text-green-300' : 'bg-red-900/30 hover:bg-red-800/50 text-red-300'}`}
                          title={user.isBanned ? 'Unban User' : 'Ban User'}
                        >
                          <FontAwesomeIcon icon={user.isBanned ? faUserCheck : faBan} />
                        </button>
                        <button className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/50 text-blue-300" title="Edit">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="p-2 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300" title="Delete">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-300">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-300">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-white/10 text-white disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage)))}
                disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                className="px-3 py-1 rounded-lg bg-white/10 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
  
      </main>
    </div>
  );
};

export default UsersPage;