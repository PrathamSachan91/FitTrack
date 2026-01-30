import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RegisterRedirect = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  if (user.userType === 1) {
    return <Navigate to="/student/register" replace />;
  }

  else if(user.userType === 2) {
    return <Navigate to="/trainer/register" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

export default RegisterRedirect;
