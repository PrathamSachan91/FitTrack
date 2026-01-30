import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchRegisterStatus } from "../TanStack/fetchRegister";

const RegisterProtectedRoute = () => {
  const { user, initialized } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: ["register-status"],
    queryFn: fetchRegisterStatus,
    enabled: initialized && !!user,
    retry: false,
  });

  if (!initialized || isLoading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (data?.enrolled === true) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RegisterProtectedRoute;
