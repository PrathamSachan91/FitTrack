import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthPublicRoute = () => {
  const { isLoggedIn, initialized } = useSelector((state) => state.auth);

  if (!initialized || isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthPublicRoute;
