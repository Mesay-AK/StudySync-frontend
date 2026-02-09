import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine, faChartPie, faChartBar, faUsers, 
  faBook, faComments, faCalendarAlt, faDownload, faArrowUp, faArrowDown, faUserClock,
  faGraduationCap, faLayerGroup, faFlag
} from '@fortawesome/free-solid-svg-icons';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [startDate, endDate] = dateRange;

  // Sample data - replace with API calls
  const analyticsData = {
    userGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'New Users',
          data: [65, 59, 80, 81, 56, 72],
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.2)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Active Users',
          data: [28, 48, 40, 59, 36, 55],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    engagementMetrics: {
      labels: ['Study Time', 'Materials Viewed', 'Messages Sent'],
      datasets: [{
        data: [75, 58, 92],
        backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981'],
        borderWidth: 0
      }]
    },
    hourlyActivity: {
      labels: Array(24).fill().map((_, i) => `${i}:00`),
      datasets: [{
        label: 'Platform Activity',
        data: Array(24).fill().map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1
      }]
    },
    userRetention: {
      labels: ['Day 1', 'Day 7', 'Day 30'],
      datasets: [{
        label: 'Retention Rate',
        data: [85, 62, 45],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1
      }]
    }
  };

  const metrics = [
    { 
      title: "Active Users", 
      value: "1,842", 
      change: "+8.3%", 
      icon: faUsers,
      color: "text-blue-400",
      trend: "up"
    },
    { 
      title: "Study Rooms", 
      value: "143", 
      change: "+3.2%", 
      icon: faComments,
      color: "text-green-400",
      trend: "up"
    },
    { 
      title: "Materials", 
      value: "215", 
      change: "+18.7%", 
      icon: faBook,
      color: "text-purple-400",
      trend: "up"
    },
    { 
      title: "Avg Session", 
      value: "32m", 
      change: "-2.1%", 
      icon: faUserClock,
      color: "text-pink-400",
      trend: "down"
    },
    { 
      title: "Courses", 
      value: "48", 
      change: "+5.6%", 
      icon: faGraduationCap,
      color: "text-yellow-400",
      trend: "up"
    },
    { 
      title: "Reports", 
      value: "12", 
      change: "-3.4%", 
      icon: faFlag,
      color: "text-red-400",
      trend: "down"
    }
  ];

  const topRooms = [
    { name: 'Mathematics 101', users: 142, activity: 'High' },
    { name: 'Computer Science', users: 98, activity: 'High' },
    { name: 'Literature Club', users: 76, activity: 'Medium' },
    { name: 'Physics Study', users: 65, activity: 'Medium' },
    { name: 'Chemistry Lab', users: 58, activity: 'Low' }
  ];

  const activeUsers = [
    { name: 'Alex Johnson', hours: 4.5, lastActive: '2 min ago' },
    { name: 'Maria Garcia', hours: 3.8, lastActive: '5 min ago' },
    { name: 'Sam Wilson', hours: 3.2, lastActive: '15 min ago' },
    { name: 'Taylor Swift', hours: 2.9, lastActive: '1 hour ago' },
    { name: 'James Smith', hours: 2.7, lastActive: '2 hours ago' }
  ];

  const recentActivities = [
    { user: 'Alex Johnson', action: 'created study room', room: 'Advanced Calculus', time: '5 min ago' },
    { user: 'Maria Garcia', action: 'uploaded material', room: 'Data Structures', time: '12 min ago' },
    { user: 'Sam Wilson', action: 'reported content', room: 'Physics 101', time: '25 min ago' },
    { user: 'Taylor Swift', action: 'joined room', room: 'Literature Club', time: '1 hour ago' },
    { user: 'James Smith', action: 'completed course', room: 'Web Development', time: '2 hours ago' }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0'
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 to-stone-900 text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FontAwesomeIcon icon={faChartLine} className="text-purple-400" />
            Platform Analytics
          </h1>
          <p className="text-stone-400">Comprehensive insights and metrics</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={setDateRange}
              placeholderText="Select date range"
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none w-full"
            />
            <FontAwesomeIcon 
              icon={faCalendarAlt} 
              className="absolute right-3 top-3 text-white/50 pointer-events-none"
            />
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-2 rounded-lg ${timeRange === 'day' ? 'bg-blue-600' : 'bg-white/10'} hover:bg-blue-500/30`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-600' : 'bg-white/10'} hover:bg-blue-500/30`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-600' : 'bg-white/10'} hover:bg-blue-500/30`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faDownload} />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        {['overview', 'users', 'engagement', 'content', 'reports'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium capitalize ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-white/70">{metric.title}</p>
                <p className="text-xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={`bg-${metric.color.split('-')[1]}-900/30 p-2 rounded-full`}>
                <FontAwesomeIcon icon={metric.icon} className={`${metric.color} text-lg`} />
              </div>
            </div>
            <p className={`text-xs mt-2 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'} flex items-center`}>
              <FontAwesomeIcon 
                icon={metric.trend === 'up' ? faArrowUp : faArrowDown} 
                className="mr-1" 
              />
              {metric.change} {metric.trend === 'up' ? 'increase' : 'decrease'}
            </p>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faUsers} className="text-blue-400" />
              User Growth
            </h2>
            <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-80">
            <Line data={analyticsData.userGrowth} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faChartPie} className="text-purple-400" />
              Engagement Breakdown
            </h2>
            <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-80">
            <Doughnut 
              data={analyticsData.engagementMetrics} 
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faChartBar} className="text-pink-400" />
              Hourly Activity Pattern
            </h2>
            <div className="flex gap-2">
              <button className={`px-2 py-1 text-xs rounded ${timeRange === 'day' ? 'bg-blue-600' : 'bg-white/10'}`}>
                Today
              </button>
              <button className={`px-2 py-1 text-xs rounded ${timeRange === 'week' ? 'bg-blue-600' : 'bg-white/10'}`}>
                Week
              </button>
              <button className={`px-2 py-1 text-xs rounded ${timeRange === 'month' ? 'bg-blue-600' : 'bg-white/10'}`}>
                Month
              </button>
            </div>
          </div>
          <div className="h-64">
            <Bar 
              data={analyticsData.hourlyActivity} 
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    ticks: {
                      maxTicksLimit: 12
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faLayerGroup} className="text-yellow-400" />
              User Retention
            </h2>
            <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <Bar 
              data={analyticsData.userRetention} 
              options={{
                ...chartOptions,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Study Rooms */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Study Rooms</h2>
            <a href="/admin/study-rooms" className="text-blue-400 hover:text-blue-300 text-sm">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {topRooms.map((room, index) => (
              <div key={index} className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg">
                <span className="truncate">{room.name}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    room.activity === 'High' ? 'bg-green-900/50 text-green-300' :
                    room.activity === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-red-900/50 text-red-300'
                  }`}>
                    {room.activity}
                  </span>
                  <span className="text-sm bg-blue-900/50 px-2 py-1 rounded-full whitespace-nowrap">
                    {room.users} users
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Most Active Users */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Most Active Users</h2>
            <a href="/admin/users" className="text-blue-400 hover:text-blue-300 text-sm">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {activeUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center p-3 hover:bg-white/10 rounded-lg">
                <span className="truncate">{user.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/60">{user.lastActive}</span>
                  <span className="text-sm bg-green-900/50 px-2 py-1 rounded-full whitespace-nowrap">
                    {user.hours}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <a href="/admin/activity" className="text-blue-400 hover:text-blue-300 text-sm">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-3 hover:bg-white/10 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-xs text-white/60">{activity.time}</span>
                </div>
                <p className="text-sm text-white/80 mt-1">
                  {activity.action} in <span className="text-blue-300">{activity.room}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">CPU Usage</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-500" 
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
          <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Memory Usage</span>
              <span className="text-sm font-medium">48%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-purple-500" 
                style={{ width: '48%' }}
              ></div>
            </div>
          </div>
          <div className="bg-green-900/10 p-4 rounded-lg border border-green-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Active Connections</span>
              <span className="text-sm font-medium">342</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-500" 
                style={{ width: '68%' }}
              ></div>
            </div>
          </div>
          <div className="bg-yellow-900/10 p-4 rounded-lg border border-yellow-900/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Uptime</span>
              <span className="text-sm font-medium">12 days</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-yellow-500" 
                style={{ width: '90%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;