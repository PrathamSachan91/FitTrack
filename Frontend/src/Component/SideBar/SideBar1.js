import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRegisterStatus } from "../TanStack/fetchRegister";
import axios from "axios";
import { Dumbbell } from "lucide-react";

// function SideBar({ isLoggedIn, onLogout, isEnrolled }) {
function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userType = useSelector((state) => state.auth.user?.userType);

  const { data, isLoading } = useQuery({
    queryKey: ["enroll-status"],
    queryFn: fetchRegisterStatus,
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
  });

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3001/api/logout",
      {},
      { withCredentials: true },
    );
    dispatch(logout());
    queryClient.clear();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Dumbbell />
        <span>FitTrack</span>
      </div>
      <h2 className="logo">MyApp</h2>

      <ul className="menu">
        <li onClick={() => navigate("/")}>Home</li>
        {isLoggedIn && data?.enrolled && (
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        )}
        <li>Profile</li>
        <li>Settings</li>

        {!isLoggedIn ? (
          <>
            <li onClick={() => navigate("/login")}>Login</li>
            <li onClick={() => navigate("/signin")}>Sign Up</li>
          </>
        ) : (
          <>
            {!isLoading && userType === 2 && data?.status === "PENDING" && (
              <li className="pending">Verification Pending⏳</li>
            )}

            {!isLoading && !data?.enrolled && (
              <li onClick={() => navigate("/register")}>Register Now</li>
            )}

            <li onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
