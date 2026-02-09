import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faComments,
  faBook,
  faChartLine,
  faUser,
  faGear,
  faFlag,
  faHouse,
  faRightFromBracket,
  faArrowUp

} from '@fortawesome/free-solid-svg-icons';
import DSideBar from '../../components/DSideBar';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,

} from 'chart.js';
import NotificationsDropdown from '../../components/NotificationsDropdown';


const adminMenu = [
  { name: 'Home', href: '/admin/home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Users', href: '/admin/users', icon: <FontAwesomeIcon icon={faUsers} /> },
  { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },

    { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  // State for date range selection
  const [dateRange, setDateRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data - replace with actual API calls
  const [analyticsData, setAnalyticsData] = useState({
    userMetrics: {
      totalUsers: 1250,
      activeUsers: 850,
      newUsers: 45,
      churnedUsers: 12,
      userGrowth: 2.8,
      activeUserGrowth: 1.5,
      userRetention: 92,
      averageSessionDuration: 45, // minutes
      peakHours: ['14:00', '19:00', '21:00'],
      userDistribution: {
        students: 95,
        admins: 5
      },
      roleBreakdown: {
        students: {
          active: 750,
          new: 40,
          churned: 10
        },
        admins: {
          active: 2,
          new: 0,
          churned: 0
        }
      }
    },
    studyRoomMetrics: {
      totalRooms: 320,
      activeRooms: 180,
      totalParticipants: 2500,
      averageParticipants: 8.5,
      roomUtilization: 78,
      roomOwners: {
        total: 280,
        active: 150,
        averageRoomsPerOwner: 1.14,
        topOwners: [
          { name: 'John Doe', rooms: 3, activeParticipants: 45 },
          { name: 'Jane Smith', rooms: 2, activeParticipants: 38 },
          { name: 'Mike Johnson', rooms: 2, activeParticipants: 35 }
        ]
      },
      popularSubjects: [
        { subject: 'Mathematics', count: 45 },
        { subject: 'Physics', count: 38 },
        { subject: 'Computer Science', count: 35 },
        { subject: 'Chemistry', count: 30 },
        { subject: 'Biology', count: 28 }
      ],
      roomRatings: {
        average: 4.5,
        distribution: [5, 15, 30, 35, 15] // 1-5 stars
      }
    },
    contentMetrics: {
      totalMaterials: 1500,
      newMaterials: 85,
      downloads: 4500,
      uploads: 120,
      popularTypes: [
        { type: 'PDF', count: 45 },
        { type: 'Video', count: 30 },
        { type: 'Quiz', count: 15 },
        { type: 'Other', count: 10 }
      ],
      subjectDistribution: [
        { subject: 'Mathematics', percentage: 30 },
        { subject: 'Physics', percentage: 25 },
        { subject: 'Computer Science', percentage: 20 },
        { subject: 'Chemistry', percentage: 15 },
        { subject: 'Biology', percentage: 10 }
      ]
    },
    engagementMetrics: {
      totalInteractions: 12500,
      messagesSent: 8500,
      reactions: 2500,
      comments: 1500,
      averageResponseTime: 5, // minutes
      peakEngagementHours: ['15:00', '20:00', '22:00'],
      userActivity: {
        daily: 65,
        weekly: 85,
        monthly: 92
      }
    },
    performanceMetrics: {
      systemUptime: 99.9,
      averageResponseTime: 200, // ms
      errorRate: 0.1,
      activeConnections: 850,
      resourceUtilization: {
        cpu: 45,
        memory: 60,
        storage: 75
      }
    },
    timeSeriesData: {
      userGrowth: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [800, 850, 900, 950, 1000, 1050]
      },
      engagement: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [1200, 1300, 1250, 1400, 1350, 1100, 1000]
      },
      roomActivity: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        data: [100, 50, 200, 300, 400, 350]
      }
    }
  });

  // Chart configurations
  const userGrowthChart = {
    labels: analyticsData.timeSeriesData.userGrowth.labels,
    datasets: [
      {
        label: 'User Growth',
        data: analyticsData.timeSeriesData.userGrowth.data,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  };

  const engagementChart = {
    labels: analyticsData.timeSeriesData.engagement.labels,
    datasets: [
      {
        label: 'Daily Engagement',
        data: analyticsData.timeSeriesData.engagement.data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  const roomActivityChart = {
    labels: analyticsData.timeSeriesData.roomActivity.labels,
    datasets: [
      {
        label: 'Room Activity',
        data: analyticsData.timeSeriesData.roomActivity.data,
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.4
      }
    ]
  };

  const userDistributionChart = {
    labels: ['Students', 'Admins'],
    datasets: [
      {
        data: [
          analyticsData.userMetrics.userDistribution.students,
          analyticsData.userMetrics.userDistribution.admins
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  const contentDistributionChart = {
    labels: analyticsData.contentMetrics.popularTypes.map(item => item.type),
    datasets: [
      {
        data: analyticsData.contentMetrics.popularTypes.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
      <DSideBar menuItems={adminMenu} title="StudyPlatform"/>
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">

      <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md py-4 px-5 border-b border-white/10 mb-3">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-5 ">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Analytics Management</h1>
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
    
        <div className="max-w-6xl mx-auto p-4">
          <div className="mb-4">
            
            <div className="flex gap-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm"
              >
                <option value="all">All Metrics</option>
                <option value="users">User Metrics</option>
                <option value="rooms">Study Room Metrics</option>
                <option value="content">Content Metrics</option>
                <option value="engagement">Engagement Metrics</option>
                <option value="performance">Performance Metrics</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* User Metrics */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">User Metrics</h3>
                <FontAwesomeIcon icon={faUsers} className="text-blue-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Total Users</p>
                  <p className="text-lg font-bold text-white">{analyticsData.userMetrics.totalUsers}</p>
                  <p className="text-xs text-green-400">
                    <FontAwesomeIcon icon={faArrowUp} /> {analyticsData.userMetrics.userGrowth}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Active Users</p>
                  <p className="text-lg font-bold text-white">{analyticsData.userMetrics.activeUsers}</p>
                  <p className="text-xs text-green-400">
                    <FontAwesomeIcon icon={faArrowUp} /> {analyticsData.userMetrics.activeUserGrowth}%
                  </p>
                </div>
              </div>
            </div>

            {/* Study Room Metrics */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Study Room Metrics</h3>
                <FontAwesomeIcon icon={faComments} className="text-purple-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Active Rooms</p>
                  <p className="text-lg font-bold text-white">{analyticsData.studyRoomMetrics.activeRooms}</p>
                  <p className="text-xs text-gray-400">of {analyticsData.studyRoomMetrics.totalRooms} total</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Room Owners</p>
                  <p className="text-lg font-bold text-white">{analyticsData.studyRoomMetrics.roomOwners.active}</p>
                  <p className="text-xs text-gray-400">active of {analyticsData.studyRoomMetrics.roomOwners.total}</p>
                </div>
              </div>
            </div>

            {/* Content Metrics */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Content Metrics</h3>
                <FontAwesomeIcon icon={faBook} className="text-green-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Total Materials</p>
                  <p className="text-lg font-bold text-white">{analyticsData.contentMetrics.totalMaterials}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Downloads</p>
                  <p className="text-lg font-bold text-white">{analyticsData.contentMetrics.downloads}</p>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Engagement Metrics</h3>
                <FontAwesomeIcon icon={faChartLine} className="text-yellow-400 text-lg" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Total Interactions</p>
                  <p className="text-lg font-bold text-white">{analyticsData.engagementMetrics.totalInteractions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Messages Sent</p>
                  <p className="text-lg font-bold text-white">{analyticsData.engagementMetrics.messagesSent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
            {/* User Growth Chart */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">User Growth</h3>
              <div className="h-48">
                <Line data={userGrowthChart} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                        font: {
                          size: 11
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: 'white',
                        font: {
                          size: 10
                        }
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    },
                    x: {
                      ticks: {
                        color: 'white',
                        font: {
                          size: 10
                        }
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    }
                  }
                }} />
              </div>
            </div>

            {/* Engagement Chart */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Daily Engagement</h3>
              <div className="h-48">
                <Bar data={engagementChart} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                        font: {
                          size: 11
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: 'white',
                        font: {
                          size: 10
                        }
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    },
                    x: {
                      ticks: {
                        color: 'white',
                        font: {
                          size: 10
                        }
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    }
                  }
                }} />
              </div>
            </div>

            {/* Room Activity Chart */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Room Activity by Hour</h3>
              <div className="h-48">
                <Line data={roomActivityChart} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                        font: {
                          size: 11
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: 'white',
                        font: {
                          size: 10
                        }
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    },
                    x: {
                      ticks: {
                        color: 'white',
                        font: {
                          size: 10
                        }
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    }
                  }
                }} />
              </div>
            </div>

            {/* User Distribution Chart */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">User Distribution</h3>
              <div className="h-48">
                <Doughnut data={userDistributionChart} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: 'white',
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }} />
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Popular Subjects */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Popular Subjects</h3>
              <div className="space-y-2">
                {analyticsData.studyRoomMetrics.popularSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-white">{subject.subject}</span>
                    <span className="text-gray-400">{subject.count} rooms</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Distribution */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Content Distribution</h3>
              <div className="h-48">
                <Pie data={contentDistributionChart} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: 'white',
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }} />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">System Performance</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-white">System Uptime</span>
                    <span className="text-white">{analyticsData.performanceMetrics.systemUptime}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${analyticsData.performanceMetrics.systemUptime}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-white">CPU Usage</span>
                    <span className="text-white">{analyticsData.performanceMetrics.resourceUtilization.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${analyticsData.performanceMetrics.resourceUtilization.cpu}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-white">Memory Usage</span>
                    <span className="text-white">{analyticsData.performanceMetrics.resourceUtilization.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${analyticsData.performanceMetrics.resourceUtilization.memory}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-white">Storage Usage</span>
                    <span className="text-white">{analyticsData.performanceMetrics.resourceUtilization.storage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${analyticsData.performanceMetrics.resourceUtilization.storage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
