
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import VolunteerPage from "./pages/VolunteerPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./components/common/PrivateRoute";
import Login from "./pages/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Register from './pages/Register'
import NotFoundPage from './components/common/NotFoundPage';
import About from "./pages/About";
import IntroductionGuide from "./pages/IntroductionGuide";
import { useLocation } from 'react-router-dom';
import PaymentSuccess from "./components/PaymentSuccess";
import AlertBanner from "./components/AlertBanner";
import { useAuth } from './contexts/AuthContext';
//import NotificationTab from "./components/NotificationTab";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // console.log('yes')
  //console.log(useAuth())

  return (
    <>

      <AlertBanner />
      {/* <NotificationTab /> */}
      <Router>
        <ScrollToTop />
        <Routes>

          {/* Protected Admin route */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />

          {/* Protected Volunteer route */}
          <Route
            path="/volunteer/*"
            element={
              <PrivateRoute allowedRoles={["volunteer"]}>
                <VolunteerPage />
              </PrivateRoute>
            }
          />
          {/* User Route */}
          <Route path="/user/*" element={<UserPage />} />

          {/* Public route */}
          <Route path="/" element={<IntroductionGuide />} />

          {/* Optional Login route */}
          {/* <Route path="/intro" element={<IntroductionGuide />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFoundPage />} />



        </Routes>
      </Router>
    </>
  );
}

export default App;
