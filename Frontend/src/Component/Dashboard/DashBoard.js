import "./Home.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardStats} from "../redux/dashboardSlice";
import { fetchDashboardData } from "../TanStack/dashboard";
import { useQuery } from "@tanstack/react-query";

function Home() {
  // const dispatch = useDispatch();
  // const { totalUsers, activeUsers, revenue, loading, newUser, enrolledCount } = useSelector(
  //   (state) => state.dashboard
  // );

  // useEffect(() => {
  //   dispatch(fetchDashboardStats());
  // }, [dispatch]);

  // if (loading) {
  //   return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  // }

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 60*1000,
  });

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }

  if (isError) {
    return (
      <p style={{ padding: "20px", color: "red" }}>
        Failed to load dashboard: {error.message}
      </p>
    );
  }

  return (
    <div className="home">
      <p className="home-subtitle">Track performance, members & growth
        {isFetching && <span style={{ marginLeft: 10 }}>🔄 Refreshing…</span>}
      </p>
      <div className="stats">
        <div className="card">
          <h3>Total Members</h3>
          <p>{data.totalUsers}</p>
          <span className="card-note">+2 this month</span>
        </div>

        <div className="card">
          <h3>Active Members</h3>
          <p>{data.activeUsers}</p>
          <span className="card-note">Currently training</span>
        </div>

        <div className="card">
          <h3>Monthly Revenue</h3>
          <p>{data.revenue}</p>
          <span className="card-note">Subscriptions</span>
        </div>

        <div className="card">
          <h3>Enrolled Members</h3>
          <p>{data.enrolledCount}</p>
          <span className="card-note">Certified coaches</span>
        </div>
      </div>

      <div className="section">
        <h2>Today’s Attendance</h2>
        <div className="attendance">
          <div className="attendance-card">
            <h4>Morning Batch</h4>
            <p>124 Members</p>
          </div>
          <div className="attendance-card">
            <h4>Evening Batch</h4>
            <p>176 Members</p>
          </div>
          <div className="attendance-card">
            <h4>Personal Training</h4>
            <p>42 Sessions</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Recent Gym Activity</h2>
        <ul className="activity-list">
          <li>💪 New member joined: {data.newUser}</li>
          <li>🏋️ Trainer assigned to 5 members</li>
          <li>🔥 HIIT batch fully booked</li>
          <li>💳 Monthly subscription renewed</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
