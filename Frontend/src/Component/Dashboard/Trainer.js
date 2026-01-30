import "./Home.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainerDashboard } from "../TanStack/dashboard";

const TrainerDashboard = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["trainer-dashboard"],
    queryFn: fetchTrainerDashboard,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading trainer dashboard...</p>;
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
      <p className="trainer-subtitle">
        Manage your profile & training activities
        {isFetching && <span> 🔄 Refreshing…</span>}
      </p>

      {/* STATUS BANNER */}
      {data.status === "PENDING" && (
        <div className="status pending">
          ⏳ Verification Pending (Awaiting Admin Approval)
        </div>
      )}

      {data.status === "ACTIVE" && (
        <div className="status active">
          ✅ Verified Trainer
        </div>
      )}

      {/* PROFILE CARDS */}
      <div className="stats">
        <div className="card">
          <h3>Experience</h3>
          <p>{data.experienceYears} Years</p>
          <span className="card-note">{data.experienceLabel}</span>
        </div>

        <div className="card">
          <h3>Specializations</h3>
          <p>{data.specializations}</p>
          <span className="card-note">Expertise</span>
        </div>

        <div className="card">
          <h3>Training Mode</h3>
          <p>{data.trainingMode}</p>
          <span className="card-note">Preferred</span>
        </div>

        <div className="card">
          <h3>Availability</h3>
          <p>{data.availability}</p>
          <span className="card-note">Schedule</span>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="section">
        <h2>Profile Details</h2>

        <ul className="details-list">
          <li>📞 Phone: {data.phone}</li>
          <li>⚧ Gender: {data.gender}</li>
          <li>🎂 Date of Birth: {new Date(data.dateOfBirth).toDateString()}</li>
          <li>🎓 Certifications: {data.certifications}</li>
          <li>📝 Bio: {data.bio || "Not provided"}</li>
        </ul>
      </div>
    </div>
  );
};

export default TrainerDashboard;
