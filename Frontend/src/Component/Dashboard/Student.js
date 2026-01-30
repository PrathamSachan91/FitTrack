import "./Home.css";
import { fetchDashboardData } from "../TanStack/dashboard";
import { useQuery } from "@tanstack/react-query";

function StudentDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["student-dashboard"],
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
        Your Fitness Overview
        {isFetching && <span style={{ marginLeft: 10 }}>🔄 Refreshing…</span>}
      </p>

      {/* ===== TOP STATS ===== */}
      <div className="stats">
        <div className="card">
          <h3>Membership Plan</h3>
          <p>{data.plan}</p>
          <span className={`card-note ${data.status === "ACTIVE" ? "green" : "red"}`}>
            {data.status}
          </span>
        </div>

        <div className="card">
          <h3>Remaining Days</h3>
          <p>{data.remainingDays}</p>
          <span className="card-note">Till expiry</span>
        </div>

        <div className="card">
          <h3>Fitness Goal</h3>
          <p>{data.fitnessGoal}</p>
          <span className="card-note">{data.experienceLevel}</span>
        </div>

        <div className="card">
          <h3>Payment</h3>
          <p>₹{data.amountPaid}</p>
          <span className="card-note">{data.paymentMode}</span>
        </div>
      </div>

      {/* ===== BODY STATS ===== */}
      <div className="section">
        <h2>Body Metrics</h2>
        <div className="stats">
          <div className="card small">
            <h4>Height</h4>
            <p>{data.height} cm</p>
          </div>

          <div className="card small">
            <h4>Weight</h4>
            <p>{data.weight} kg</p>
          </div>

          <div className="card small">
            <h4>Age</h4>
            <p>{data.age} yrs</p>
          </div>

          <div className="card small">
            <h4>Gender</h4>
            <p>{data.gender}</p>
          </div>
        </div>
      </div>

      {/* ===== HEALTH INFO ===== */}
      <div className="section">
        <h2>Health Information</h2>
        <ul className="activity-list">
          <li>🩺 Medical Conditions: {data.medicalConditions || "None"}</li>
          <li>⚠️ Injuries: {data.injuries || "None"}</li>
        </ul>
      </div>

      {/* ===== MEMBERSHIP INFO ===== */}
      <div className="section">
        <h2>Membership Details</h2>
        <ul className="activity-list">
          <li>📅 Start Date: {data.startDate}</li>
          <li>⏳ Expiry Date: {data.expiryDate}</li>
          <li>💳 Payment Mode: {data.paymentMode}</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;
