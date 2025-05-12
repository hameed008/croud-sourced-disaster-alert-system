
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import VolunteerLayout from './VolunteerLayout';




const Layout = ({ children, role }) => {
  if (role === 'admin') return <AdminLayout children={children} role={role} />;
  if (role === 'volunteer') return <VolunteerLayout children={children} role={role} />;
  if (role === 'user') return <UserLayout children={children} role={role} />;
  return <UserLayout />
};

export default Layout;
