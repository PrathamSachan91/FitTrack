import "./Home.css";
import { fetchDashboardData } from "../TanStack/dashboard";
import { useQuery } from "@tanstack/react-query";

function SubAdminHome() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["subadmin-dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 60 * 1000,
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
      <p className="home-subtitle">
        Manage assigned members & daily operations
        {isFetching && <span style={{ marginLeft: 10 }}>🔄 Refreshing…</span>}
      </p>

      <div className="stats">
        <div className="card">
          <h3>Assigned Members</h3>
          <p>{data.assignedUsers}</p>
          <span className="card-note">Under supervision</span>
        </div>

        <div className="card">
          <h3>Active Members</h3>
          <p>{data.activeUsers}</p>
          <span className="card-note">Currently training</span>
        </div>

        <div className="card">
          <h3>Pending Requests</h3>
          <p>{data.pendingRequests}</p>
          <span className="card-note">Approvals required</span>
        </div>

        <div className="card">
          <h3>Today’s Attendance</h3>
          <p>{data.todayAttendance}</p>
          <span className="card-note">Checked-in</span>
        </div>
      </div>

      <div className="section">
        <h2>Operational Updates</h2>
        <ul className="activity-list">
          <li>📋 {data.newAssignment} new members assigned</li>
          <li>✅ {data.approvalsDone} approvals completed</li>
          <li>⏳ {data.pendingRequests} requests pending</li>
          <li>🏋️ Batch capacity monitored</li>
        </ul>
      </div>
    </div>
  );
}

export default SubAdminHome;
