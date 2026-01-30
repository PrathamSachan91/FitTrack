import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import SideBar from "./SideBar/SideBar1";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setUser, logout, authChecked } from "./redux/authSlice";
import { fetchMe } from "./TanStack/userDetail";

function Static() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !initialized,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      dispatch(setUser(data));
    } else if (isError) {
      dispatch(logout());
    }

    dispatch(authChecked());
  }, [data, isLoading, isError, dispatch]);

  if (!initialized) return null;

  return (
    <div className="layout">
      <Navbar />
      <SideBar />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Static;
