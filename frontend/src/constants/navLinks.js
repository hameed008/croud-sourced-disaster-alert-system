export const userNavLinks = [
  { name: "Home", to: "/user" },
  { name: "About", to: "/about" },
  { name: "Request", to: "/user/request-resource" },
  { name: "Report", to: "/user/report-disaster" },
  { name: "Login", to: "/login" },
];

export const userSideBarItems = [
  { name: "Dashboard", to: "/user", icon: <FiHome size={20} /> },
  { name: "Report Disaster", to: "/user/report-disaster", icon: <FiAlertTriangle size={20} /> },
  { name: "Request Resource", to: "/user/request-resource", icon: <FiTool size={20} /> },
  { name: "My Reports", to: "/user/user-reports", icon: <FiFileText size={20} /> },
  { name: "My Requests", to: "/user/user-requests", icon: <FiShoppingCart size={20} /> },
  { name: "Analytics", to: "/user/analytics", icon: <FiBarChart2 size={20} /> },
  { name: "Profile", to: "/user/profile", icon: <FiUser size={20} /> },
  { name: "Logout", to: "/user/logout", icon: <FiLogOut size={20} /> }
];