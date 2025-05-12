import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";

import AppLayout from "./ui/AppLayout";
//import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from './components/auth/Login';
import Register from './components/auth/Register'
//import Profile from "./pages/Profile";
import VolunteerDashboard from "./pages/VolunteerDashboard";
//import AdminDashborad from "./pages/AdminDashborad";
import About from "./pages/About"
import ReportForm from "./components/forms/ReportForm";
import RequestForm from "./components/forms/RequestForm";
import DisasterReportCard from "./components/DesignTest";
import ReportFormWithMap from "./components/user/ReportFormWithMap";
import UserReports from "./pages/UserReports";
import UserRequests from "./pages/UserRequests";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // { path: "/home", element: <Home /> },
      // { path: "/", element: <Dashboard /> },
      { path: "/volunteerdashboard", element: <VolunteerDashboard /> },
      //{ path: "/admindashboard", element: <AdminDashboard /> },

      {
        path: "/",
        element: (
          // <PrivateRoute>
          <Dashboard />
          // </PrivateRoute>
        ),
      },
      { path: "/report", element: <ReportForm /> },
      { path: "/request", element: <RequestForm /> },
      { path: "/design", element: <DisasterReportCard /> },
      { path: "/about", element: <About /> },
      // { path: "/login", element: <Login /> },
      // { path: "/register", element: <Register /> },
      { path: "/userreports", element: <UserReports /> },
      { path: "/userrequests", element: <UserRequests /> },
      { path: "/analytics", element: <AnalyticsDashboard /> }
    ],
  },
  // { path: "/report", element: <ReportFormWithMap /> },
  // { path: "/request", element: <RequestForm /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  //{ path: "/about", element: <About /> },
  { path: "/admin", element: <AdminDashboard /> },
  //{ path: "/recent", element: <RecentReports /> },
  //{ path: "/resources", element: <ResourceRequests /> },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
