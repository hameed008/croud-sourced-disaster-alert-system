import AdminSidebar from './AdminSidebar';
import VolunteerSidebar from './VolunteerSidebar';
import UserSidebar from './UserSidebar';

function Sidebar({ role }) {
  switch (role) {
    case 'admin':
      return <AdminSidebar />;
    case 'volunteer':
      return <VolunteerSidebar />;
    case 'user':
    default:
      return <UserSidebar />;
  }
}

export default Sidebar;