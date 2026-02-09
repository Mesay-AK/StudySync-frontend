
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from './Pages/Landing/Hero';
import Description from './Pages/Landing/Description';
import ContactUs from './Pages/Landing/ContactUs';
import LogIn from './Pages/Landing/Login';
import SignUp from './Pages/Landing/SignUp';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UsersPage from './Pages/Admin/UsersPage';
import StudyRoomsManagement from './Pages/Admin/StudyRoomsManagement';
import ReportsManagement from './Pages/Admin/ReportsManagement';
import MaterialsManagement from './Pages/Admin/MaterialsManagement';
import Analytics from './Pages/Admin/Analytics';
import AnalyticsManagement from './Pages/Admin/AnalyticsManagement';
import UserProfile from './Pages/Admin/UserProfile';
import Settings from './Pages/Admin/Settings';
import RoomDetailPage from './Pages/Admin/RoomDetailPage';
import User from './Pages/Admin/User';

// User Pages
import UserDashboard from './Pages/users/Dashboard';
import UserStudyRooms from './Pages/users/StudyRooms';
import UserMessages from './Pages/users/Messages';
import UserMaterials from './Pages/users/Materials';
import UserProfilePage from './Pages/users/Profile';
import UserAnalytics from './Pages/users/Analytics';
import UserSettings from './Pages/users/Settings';
import UserActivity from './Pages/users/Activity';
import UserRoomDetail from './Pages/users/RoomDetail';

// Common
import Logout from './Pages/Landing/Logout';

function App() {
  return (

    <>
<BrowserRouter>
  <Routes>
    <Route path="/" element={
      <>
        <Hero />
        <Description />
        <ContactUs />
      </>
    } />

    <Route path="/login" element={<LogIn />} />
    <Route path="/signup" element={<SignUp />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/study-rooms" element={<StudyRoomsManagement />} />
      <Route path="/admin/reports" element={<ReportsManagement />} />
      <Route path="/admin/materials" element={<MaterialsManagement />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/analytics-management" element={<AnalyticsManagement />} />
      <Route path="/admin/user-profile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/room-detail" element={<RoomDetailPage />} />
      <Route path="/admin/user" element={<User />} />

      {/* User Routes */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/study-rooms" element={<UserStudyRooms />} />
      <Route path="/user/messages" element={<UserMessages />} />
      <Route path="/user/materials" element={<UserMaterials />} />
      <Route path="/user/profile" element={<UserProfilePage />} />
      <Route path="/user/analytics" element={<UserAnalytics />} />
      <Route path="/settings" element={<UserSettings />} />
      <Route path="/user/activity" element={<UserActivity />} />
      <Route path="/user/room/:id" element={<UserRoomDetail />} />

      {/* Common */}
      <Route path="/logout" element={<Logout />} />
  </Routes>
</BrowserRouter>


    </>


  )
}

export default App
