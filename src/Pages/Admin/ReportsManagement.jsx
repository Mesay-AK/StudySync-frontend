import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faUser,
  faSearch,
  // faFilter,
  faExclamationTriangle,
  // faCheck,
  faBan,
  faTrash,
  faWarning,
  // faEnvelope,
  faEye,
  // faTimes,
  // faFileAlt,
  faUsers,
  faDoorOpen,
  faFile,
  faFlag,
  faShieldAlt,
//   faHistory,
  faClock,
//   faCalendarAlt,
  faHouse,
  // faUsers,
  faComments,
  faBook,
  faChartBar,
  faRightFromBracket,
  faGear,
  faTimes,
  // faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';
import NotificationsDropdown from '../../components/NotificationsDropdown';
// import { adminMenu } from '../../Data/menuData';


const adminMenu = [
  { name: 'Home', href: '/admin/home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Users', href: '/admin/users', icon: <FontAwesomeIcon icon={faUsers} /> },
  { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
    { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];


// const mockParticipants = [
//   { id: 1, name: 'Alex Johnson', joined: '2023-06-10T09:15:00', lastActive: '2023-06-10T14:30:00' },
//   { id: 2, name: 'Maria Garcia', joined: '2023-06-10T10:30:00', lastActive: '2023-06-10T14:25:00' },
//   { id: 3, name: 'James Wilson', joined: '2023-06-09T15:45:00', lastActive: '2023-06-10T13:10:00' },
// ];


// Mock data for reports
const mockReports = [
  {
    id: 1,
    type: 'user',
    reportedItem: {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    reportedBy: {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    reason: 'Inappropriate behavior in study room',
    description: 'User was disrupting the study session and using offensive language',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00',
    severity: 'high',
    evidence: ['chat_logs.txt', 'screenshot1.png'],
    previousReports: 2,
  },
  {
    id: 2,
    type: 'room',
    reportedItem: {
      id: 'room1',
      name: 'Math Study Group',
      owner: 'Alice Johnson',
      type: 'Group Study',
    },
    reportedBy: {
      id: 'user3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
    },
    reason: 'Inappropriate content shared',
    description: 'Room contains unauthorized study materials',
    status: 'investigating',
    createdAt: '2024-03-14T15:45:00',
    severity: 'medium',
    evidence: ['material1.pdf'],
    previousReports: 0,
  },
  {
    id: 3,
    type: 'material',
    reportedItem: {
      id: 'material1',
      name: 'Calculus Notes',
      type: 'PDF',
      uploadedBy: 'Charlie Brown',
    },
    reportedBy: {
      id: 'user4',
      name: 'Diana Ross',
      email: 'diana@example.com',
    },
    reason: 'Copyright violation',
    description: 'Material appears to be copied from a textbook without permission',
    status: 'resolved',
    createdAt: '2024-03-13T09:15:00',
    severity: 'high',
    evidence: ['original_textbook.pdf'],
    previousReports: 1,
    resolution: 'Material removed, user warned',
  },
];

const ReportsManagement = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [banDuration, setBanDuration] = useState('7'); // days
  const [banReason, setBanReason] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter reports based on search term and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.reportedItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity;

    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  // Statistics
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const highSeverityReports = reports.filter(r => r.severity === 'high').length;
  const userReports = reports.filter(r => r.type === 'user').length;
  const roomReports = reports.filter(r => r.type === 'room').length;
  const materialReports = reports.filter(r => r.type === 'material').length;

  // Handle report actions
  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  const handleSendWarning = (report) => {
    setSelectedReport(report);
    setShowWarningModal(true);
  };

  const handleBanUser = (report) => {
    setSelectedReport(report);
    setShowBanModal(true);
  };

  const handleDeleteItem = (report) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setReports(reports.filter(r => r.id !== report.id));
    }
  };

  const handleResolveReport = (report) => {
    setReports(reports.map(r => 
      r.id === report.id ? { ...r, status: 'resolved' } : r
    ));
  };

  const handleSubmitWarning = () => {
    if (warningMessage.trim()) {
      // Here you would typically send the warning to the user
      console.log('Warning sent:', {
        to: selectedReport.reportedItem.id,
        message: warningMessage,
        reportId: selectedReport.id
      });
      setShowWarningModal(false);
      setWarningMessage('');
    }
  };

  const handleSubmitBan = () => {
    if (banReason.trim()) {
      // Here you would typically implement the ban
      console.log('Ban implemented:', {
        userId: selectedReport.reportedItem.id,
        duration: banDuration,
        reason: banReason,
        reportId: selectedReport.id
      });
      setShowBanModal(false);
      setBanDuration('7');
      setBanReason('');
    }
  };

  return (
    <div className="flex h-full">
      <DSideBar menuItems={adminMenu} />
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10">
        
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between ml-12">
            <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Reports Management</h1>
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
        <div className="p-6">
          <div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white-500">Total Reports</p>
                  <p className="text-2xl font-semibold">{totalReports}</p>
                </div>
                <div className="p-3 bg-[#E3F2FD] rounded-full">
                  <FontAwesomeIcon icon={faFlag} className="text-[#2196F3] text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white-500">Pending Reports</p>
                  <p className="text-2xl font-semibold">{pendingReports}</p>
                </div>
                <div className="p-3 bg-[#FFF3E0] rounded-full">
                  <FontAwesomeIcon icon={faClock} className="text-[#FF9800] text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 p-4 rounded-xl border border-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">High Severity</p>
                  <p className="text-2xl font-semibold">{highSeverityReports}</p>
                </div>
                <div className="p-3 bg-[#FFEBEE] rounded-full">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-[#F44336] text-xl" />
                </div>
              </div>
            </div>


            <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white-500">Report Types</p>
                  <div className="flex space-x-2">
                    <span className="text-sm font-bold text-[#2196F3] px-2 py-1 rounded">
                      {userReports} Users
                    </span>
                    <span className="text-sm font-bold text-[#4CAF50] px-2 py-1 rounded">
                      {roomReports} Rooms
                    </span>
                    <span className="text-sm font-bold text-[#9C27B0] px-2 py-1 rounded">
                      {materialReports} Materials
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[#E3F2FD] rounded-full">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-[#2196F3] text-xl" />
                </div>
              </div>
            </div>

      </div>

    <div className='flex flex-column gap-4 mb-6 items-center'>
    <div className="bg-white/10 p-4 rounded-xl border border-blue-500/20">
      <div className="p-2">
        <div className="flex gap-5">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-white/10 text-white border border-white/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="all">All Types</option>
            <option value="user">User Reports</option>
            <option value="room">Room Reports</option>
            <option value="material">Material Reports</option>
          </select>

          <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-white/10 text-white border border-white/20 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-white/10 text-white border border-white/20 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>

    <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-white/10 p-3 rounded-lg shadow">
                <input 
                  type="text"
                  placeholder="Search across reports..."
                  className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>

    </div>


      {/* Reports Table */}
      <div className="bg-white/10 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Report Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Reported By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Target
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/5 divide-y divide-gray-700">
            {currentReports.map((report) => (
              <tr key={report.id} className="hover:bg-white/5 cursor-pointer" onClick={() => handleViewDetails(report)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <FontAwesomeIcon 
                        icon={report.type === 'user' ? faUser : report.type === 'room' ? faDoorOpen : faFile} 
                        className="h-6 w-6 text-gray-300"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{report.reportedItem.name}</div>
                      <div className="text-sm text-gray-400">{report.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{report.reportedBy.name}</div>
                  <div className="text-sm text-gray-400">{report.reportedBy.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{report.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${report.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : ''}
                    ${report.status === 'investigating' ? 'bg-blue-900/50 text-blue-300' : ''}
                    ${report.status === 'resolved' ? 'bg-green-900/50 text-green-300' : ''}
                  `}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(report);
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendWarning(report);
                    }}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FontAwesomeIcon icon={faWarning} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBanUser(report);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(report);
                    }}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
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
      </div>


      {showWarningModal && selectedReport && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900">Send Warning</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Sending warning to {selectedReport.reportedItem.name}
            </p>
            <textarea
              className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              rows="4"
              placeholder="Enter warning message..."
              value={warningMessage}
              onChange={(e) => setWarningMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowWarningModal(false)}
              className="px-4 py-2 bg-[#F5F5F5] text-gray-700 rounded-lg hover:bg-[#E0E0E0]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitWarning}
              className="px-4 py-2 bg-[#FF9800] text-white rounded-lg hover:bg-[#F57C00]"
            >
              Send Warning
            </button>
          </div>
        </div>
      </div>
    </div>
  )}


{showBanModal && selectedReport && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900">Ban User</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Banning {selectedReport.reportedItem.name}
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Ban Duration (days)</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                value={banDuration}
                onChange={(e) => setBanDuration(e.target.value)}
              >
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Ban Reason</label>
              <textarea
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                rows="3"
                placeholder="Enter ban reason..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowBanModal(false)}
              className="px-4 py-2 bg-[#F5F5F5] text-gray-700 rounded-lg hover:bg-[#E0E0E0]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitBan}
              className="px-4 py-2 bg-[#F44336] text-white rounded-lg hover:bg-[#D32F2F]"
            >
              Ban User
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

          </div>

          </div>
          
        </section>

        {/* Report Details Modal */}
        {showDetailsModal && selectedReport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-stone-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white">Report Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Report Type and Status */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon 
                      icon={selectedReport.type === 'user' ? faUser : selectedReport.type === 'room' ? faDoorOpen : faFile} 
                      className="h-5 w-5 text-gray-300"
                    />
                    <span className="text-white capitalize">{selectedReport.type} Report</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${selectedReport.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : ''}
                    ${selectedReport.status === 'investigating' ? 'bg-blue-900/50 text-blue-300' : ''}
                    ${selectedReport.status === 'resolved' ? 'bg-green-900/50 text-green-300' : ''}
                  `}>
                    {selectedReport.status}
                  </span>
                </div>

                {/* Reported Item */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Reported Item</h3>
                  <div className="text-white">
                    <p className="font-medium">{selectedReport.reportedItem.name}</p>
                    {selectedReport.type === 'user' && (
                      <p className="text-sm text-gray-400">{selectedReport.reportedItem.email}</p>
                    )}
                    {selectedReport.type === 'room' && (
                      <p className="text-sm text-gray-400">Owner: {selectedReport.reportedItem.owner}</p>
                    )}
                    {selectedReport.type === 'material' && (
                      <p className="text-sm text-gray-400">Type: {selectedReport.reportedItem.type}</p>
                    )}
                  </div>
                </div>

                {/* Reporter */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Reported By</h3>
                  <div className="text-white">
                    <p className="font-medium">{selectedReport.reportedBy.name}</p>
                    <p className="text-sm text-gray-400">{selectedReport.reportedBy.email}</p>
                  </div>
                </div>

                {/* Report Details */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Report Details</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-300">Reason</p>
                      <p className="text-white">{selectedReport.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Description</p>
                      <p className="text-white">{selectedReport.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Severity</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${selectedReport.severity === 'low' ? 'bg-green-900/50 text-green-300' : ''}
                        ${selectedReport.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-300' : ''}
                        ${selectedReport.severity === 'high' ? 'bg-red-900/50 text-red-300' : ''}
                      `}>
                        {selectedReport.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Evidence</h3>
                    <div className="space-y-2">
                      {selectedReport.evidence.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faFile} className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resolution (if resolved) */}
                {selectedReport.status === 'resolved' && selectedReport.resolution && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Resolution</h3>
                    <p className="text-white">{selectedReport.resolution}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    Close
                  </button>
                  {selectedReport.status !== 'resolved' && (
                    <button
                      onClick={() => {
                        handleResolveReport(selectedReport);
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportsManagement;