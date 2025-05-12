import { useLayout } from '../../contexts/LayoutContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const VolunteerLayout = ({ children, role }) => {

  const { isLoggedIn } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <div className='w-full fixed top-0 left-0 z-50'>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          role={role}
        />
      </div>

      {/* Main Content Area - flex-1 makes it grow to push footer down */}
      <div className="flex flex-1 pt-16"> {/* pt-16 for navbar height */}
        {/* Sidebar */}
        {isLoggedIn && (
          <div
            className={`
              hidden lg:block fixed top-20 left-0 min-h-[calc(100vh-4rem-4rem)] shadow-lg z-40
              transform transition-transform duration-300 ease-in-out 
              ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
            `}
          >
            <Sidebar role={role} />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`
            flex-1 px-6 lg:px-10 transition-all duration-300 ease-in-out 
            bg-gradient-to-br from-violet-50 to-blue-10 
            ${isLoggedIn && isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}
            pb-20 /* Space for footer */
          `}
        >
          <div className="flex-1 pt-4">{children}</div>
        </main>
      </div>

    </div>
  );
};

export default VolunteerLayout;
