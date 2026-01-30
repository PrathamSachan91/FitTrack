import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized) return null;

  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};


export default DashboardProtectedRoute;
