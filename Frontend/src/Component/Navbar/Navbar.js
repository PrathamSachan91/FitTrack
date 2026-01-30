import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout  } from "../redux/authSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchMe } from "../TanStack/userDetail";

function Navbar() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

const { data: user } = useQuery({
  queryKey: ["me"],
  queryFn: fetchMe,
  enabled: isLoggedIn,
  retry: false,
});

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3001/api/logout",
      {},
      { withCredentials: true }
    );
    dispatch(logout());
    queryClient.clear(["me"],["enroll-status"]);
  };

  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/profile":
        return "Profile";
      case "/Enroll":
        return "Enroll";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="navbar">
      <h3>{getPageTitle()}</h3>

      <div className="nav-actions">
        <span>{user ? user?.username : "Guest"}</span>

        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}

      </div>
    </header>
  );
}

export default Navbar;
