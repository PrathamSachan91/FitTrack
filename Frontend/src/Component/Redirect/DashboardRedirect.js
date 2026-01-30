import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  const { user, initialized } = useSelector((state) => state.auth);

  if (!initialized) return null;
  if (!user) return <Navigate to="/" replace />;

  if (user.userType === 1) return <Navigate to="/student/dashboard" replace />;
  if (user.userType === 2) return <Navigate to="/trainer/dashboard" replace />;
  if (user.userType === 3) return <Navigate to="/admin/dashboard" replace />;

  return <Navigate to="/" replace />;
};


export default DashboardRedirect;
