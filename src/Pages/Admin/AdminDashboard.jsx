import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faComments, faFlag, 
  faChartBar, faBook, faExclamationTriangle,
  faSearch, faGear, faUser, faRightFromBracket, faBullhorn, faTimes, faPlus, faCircleCheck, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';
import ActivityChart from '../../components/ActivityChart';
import DashboardCard from '../../components/DashboardCard';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const adminMenu = [
  // { name: 'Home', href: '/admin/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Users', href: '/admin/users', icon: <FontAwesomeIcon icon={faUsers} /> },
  { name: 'Study Rooms', href: '/admin/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faFlag} /> },
  { name: 'Materials', href: '/admin/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/admin/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
    { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const stats = {
  totalUsers: { value: "2,451", change: "+12.5%" },
  activeRooms: { value: "28", change: "+3.2%" },
  pendingReports: { value: "9", change: "Urgent" },
  newMaterials: { value: "15", change: "+5.7%" }
};


function AdminDashboard() {

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "System Maintenance",
      content: "Platform will be down for maintenance on June 15th from 2-4 AM",
      date: "2023-06-10",
      isActive: true
    },
    {
      id: 2,
      title: "New Feature Released",
      content: "Study room recording feature now available for instructors",
      date: "2023-06-08",
      isActive: true
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: ""
  });
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: Date.now(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().split('T')[0],
        isActive: true
      };
      
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: "", content: "" });
      setShowAnnouncementForm(false);
    }
  };

  // Toggle announcement status
  const toggleAnnouncement = (id) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
    ));
  };

  // Delete announcement
  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };


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
                  placeholder="Search across platform..."
                  className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none" 
                />
                <FontAwesomeIcon icon={faSearch} className="ml-2 h-5 w-5 text-blue-300" />
              </div>
            </div>
            <ul className="flex items-center gap-8 mr-12">
              <li><a href="/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></a></li>
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
              value={stats.totalUsers.value} 
              change={stats.totalUsers.change}
              icon={<FontAwesomeIcon icon={faUsers} />}
              color="blue"
              link="/admin/dashboard"
            />
            <DashboardCard 
              title="Active Rooms" 
              value={stats.activeRooms.value} 
              change={stats.activeRooms.change}
              icon={<FontAwesomeIcon icon={faComments} />}
              color="green"
              link="/admin/study-rooms"
            />
            <DashboardCard 
              title="Pending Reports" 
              value={stats.pendingReports.value} 
              change={stats.pendingReports.change}
              icon={<FontAwesomeIcon icon={faExclamationTriangle} />}
              color="red"
              link="/admin/reports"
            />
            <DashboardCard 
              title="New Materials" 
              value={stats.newMaterials.value} 
              change={stats.newMaterials.change}
              icon={<FontAwesomeIcon icon={faBook} />}
              color="purple"
              link="/admin/materials"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            <div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Platform Activity</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-white/10 rounded hover:bg-blue-500/30">
                    Today
                  </button>
                  <button className="px-3 py-1 text-xs bg-white/10 rounded hover:bg-blue-500/30">
                    Week
                  </button>
                </div>
              </div>
              <ActivityChart />
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Requires Attention</h2>
              <div className="space-y-4">
                <div className="p-3 bg-red-900/30 rounded-lg border border-red-900/50">
                  <div className="flex justify-between">
                    <span className="font-medium">Content Report</span>
                    <span className="text-xs bg-red-500 px-2 py-1 rounded">High</span>
                  </div>
                  <p className="text-sm text-stone-300 mt-1">Explicit content in Math 101</p>
                  <button className="mt-2 text-xs bg-red-500 hover:bg-red-400 px-3 py-1 rounded">
                    Review Now
                  </button>
                </div>
                <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-900/50">
                  <div className="flex justify-between">
                    <span className="font-medium">User Report</span>
                    <span className="text-xs bg-orange-500 px-2 py-1 rounded">Medium</span>
                  </div>
                  <p className="text-sm text-stone-300 mt-1">Harassment complaint</p>
                  <button className="mt-2 text-xs bg-orange-500 hover:bg-orange-400 px-3 py-1 rounded">
                    Investigate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl mb-8 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Link to="/admin/analytics" className="text-blue-500 hover:text-blue-300 text-sm">
                View Full Analytics →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-900/30">
                <h3 className="font-medium mb-2 text-blue-300">New Study Room</h3>
                <p className="text-sm text-stone-300">"Advanced Physics" created by Dr. Smith</p>
                <p className="text-xs text-stone-400 mt-2">15 minutes ago</p>
              </div>
              <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-900/30">
                <h3 className="font-medium mb-2 text-purple-300">Material Upload</h3>
                <p className="text-sm text-stone-300">"Calculus Cheat Sheet" uploaded</p>
                <p className="text-xs text-stone-400 mt-2">1 hour ago</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl mb-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FontAwesomeIcon icon={faBullhorn} className="text-yellow-300" />
                Platform Announcements
              </h2>
              <button 
                onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}
                className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
              >
                <FontAwesomeIcon icon={showAnnouncementForm ? faTimes : faPlus} />
                {showAnnouncementForm ? 'Cancel' : 'New Announcement'}
              </button>
            </div>

            {showAnnouncementForm && (
              <div className="mb-6 bg-blue-900/10 p-4 rounded-lg border border-blue-900/30">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-blue-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newAnnouncement.title}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="Enter announcement title"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-blue-400 mb-1">Content</label>
                  <textarea
                    name="content"
                    value={newAnnouncement.content}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-300"
                    rows="3"
                    placeholder="Enter announcement details"
                  ></textarea>
                </div>
                <button
                  onClick={addAnnouncement}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Publish Announcement
                </button>
              </div>
            )}

            {/* Announcements List */}
            <div className="space-y-3">
              {announcements.length > 0 ? (
                announcements.map(announcement => (
                  <div 
                    key={announcement.id} 
                    className={`p-4 rounded-lg border ${announcement.isActive ? 'bg-blue-800/10 border-blue-900/40' : 'bg-white/5 border-white/10 opacity-70'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          {announcement.title}
                          {!announcement.isActive && (
                            <span className="text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded">
                              Inactive
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">{announcement.content}</p>
                        <p className="text-xs text-gray-400 mt-2">Posted: {announcement.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleAnnouncement(announcement.id)}
                          className={`p-2 rounded ${announcement.isActive ? 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-600/20' : 'bg-green-500/10 text-green-300 hover:bg-green-600/20'}`}
                          title={announcement.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <FontAwesomeIcon icon={announcement.isActive ? faTimes : faCircleCheck} />
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(announcement.id)}
                          className="p-2 rounded bg-red-500/10 text-red-300 hover:bg-red-600/20"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No announcements yet. Create your first announcement!
                </div>
              )}
            </div>
          </div>



        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;