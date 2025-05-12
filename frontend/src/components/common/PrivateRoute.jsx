// src/components/common/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {

  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
