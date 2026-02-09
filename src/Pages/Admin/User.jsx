import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBook,
  faFlag,
  faGear,
  faUser,
  faSearch,
  faBan,
  faComments,
  faEdit,
  faTrash,
  faUserCheck,
  faRightFromBracket,
  faChartBar,
  faUserClock
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';
import ActivityChart from '../../components/ActivityChart';
import DashboardCard from '../../components/DashboardCard';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const adminMenu = [

  { name: 'Home', href: '/admin/dashboard', icon: <FontAwesomeIcon icon={faUsers} /> },
  { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
    { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];



function User() {

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const toggleBan = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBanned: !user.isBanned } : user
    ));

  };

  const formatLastActive = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

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
          <DSideBar  menuItems={adminMenu} title="StudyPlatform" />
          
          <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
            {/* Top Navigation */}
            <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 max-w-2xl">
                  <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                    <input 
                      type="text"
                      placeholder="Search Users..."
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
                  title="Total Users" 
                  value={userStats.totalUsers} 
                  change='+ All registered Users'
                  icon={<FontAwesomeIcon icon={faUsers} />}
                  color="blue"
                  link="/admin/dashboard"
                />
                <DashboardCard 
                  title="Active Users" 
                  value={userStats.activeUsers} 
                  change="+ Currently Active"
                  icon={<FontAwesomeIcon icon={faUserCheck} />}
                  color="green"
                  link="/admin/study-rooms"
                />
                <DashboardCard 
                  title="Banned Users" 
                  value={userStats.bannedUsers} 
                  change="Needs Review"
                  icon={<FontAwesomeIcon icon={faBan} />}
                  color="orange"
                  link="/admin/reports"
                />
                <DashboardCard 
                  title="Pending Users" 
                  value={userStats.pendingUsers} 
                  change="+ Awaiting Approval"
                  icon={<FontAwesomeIcon icon={faUserClock} />}
                  color="purple"
                  link="/admin/materials"
                /> 
              </div>
    
            <div>
              <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex flex-wrap gap-3 md:gap-6 mb-7 bg-white/5 rounded-lg p-5 border border-white/10">

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="bg-white/10 border border-stone-600 text-gray-200 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                </select>
                <select
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                    className="bg-white/10 border border-stone-600 text-gray-200 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All Roles</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                </select>
                <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="bg-white/10 border border-stone-600 text-gray-200 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All</option>
                    <option value="name">Name</option>
                    <option value="date">Join Date</option>
                    <option value="status">Status</option>
                </select>

            </div>

          </div>





      <div className="bg-white/5 p-3 rounded-xl mb-6 border border-white/10 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-stone-800/70 text-gray-300 text-sm uppercase tracking-wide">
          <tr>
            <th scope="col" className="px-1 py-3">User</th>
            <th scope="col" className="px-1 py-3">Role</th>
            <th scope="col" className="px-1 py-3">Status</th>
            <th scope="col" className="hidden md:table-cell px-1 py-3">Last Active</th>
            <th scope="col" className="hidden md:table-cell px-1 py-3">Activity</th>
            <th scope="col" className="px-1 py-3 text-right">Actions</th>
          </tr>
        </thead>

    <tbody className="divide-y divide-stone-700/50 text-sm text-gray-300">
      {currentUsers.length > 0 ? (
        currentUsers.map((user) => (
          <tr key={user.id} className="hover:bg-stone-800/30 transition-colors cursor-pointer">
            <td className="px-1 py-4">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="text-blue-300 w-5 h-5" />
                <div>
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
              </div>
            </td>

            <td className="px-1 py-4 capitalize">{user.role}</td>

            <td className="px-1 py-4">
              <span
                className={`px-1 py-1 rounded-md text-xs font-semibold ${
                  user.status === "active"
                    ? "bg-green-900/30 text-green-300"
                    : user.status === "inactive"
                    ? "bg-gray-900/30 text-gray-400"
                    : "bg-red-900/30 text-red-300"
                }`}
              >
                {user.status}
              </span>
            </td>

            <td className="hidden md:table-cell px-1 py-4 whitespace-nowrap text-gray-400">
              {formatLastActive(user.lastActive)}
            </td>

            <td className="hidden md:table-cell px-1 py-4">
              <div className="flex flex-col text-gray-400 text-xs">
                <span>Resources: {user.resourcesAccessed}</span>
                <span>Rooms: {user.studyRoomsJoined}</span>
              </div>
            </td>

            <td className="px-1 py-4 whitespace-nowrap text-right space-x-2">
              <button
                onClick={() => toggleBan(user.id)}
                className={`rounded-lg transition ${
                  user.isBanned
                    ? "bg-green-900/30 hover:bg-green-800/50 text-green-300"
                    : "bg-red-900/30 hover:bg-red-800/50 text-red-300"
                }`}
                title={user.isBanned ? "Unban User" : "Ban User"}
              >
                <FontAwesomeIcon icon={user.isBanned ? faUserCheck : faBan} />
              </button>
              <button
                className="rounded-lg hover:bg-blue-900/30 text-blue-300 transition"
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="rounded-lg hover:bg-red-900/30 text-red-400 transition"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="px-1 py-6 text-center text-gray-400">
            No users found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


        <div className="mt-4 px-7 flex justify-between items-center">
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
    
    
            </section>
          </main>
        </div>
      );


    };


export default User;