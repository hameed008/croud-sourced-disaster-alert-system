import AdminNavbar from '../navbar/AdminNavbar';
import VolunteerNavbar from '../navbar/VolunteerNavbar';
//import UserSidebar from '../layout/UserSidebar';
import UserNavbar from '../navbar/UserNavbar';

function Navbar({ isLoggedIn, isSidebarOpen, toggleSidebar, role }) {
  if (role === 'admin') return <AdminNavbar isLoggedIn={isLoggedIn} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
  if (role === 'volunteer') return <VolunteerNavbar isLoggedIn={isLoggedIn} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
  return <UserNavbar isLoggedIn={isLoggedIn} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
  // return <UserSidebar />;
}

export default Navbar;
