import axios from "axios";

export const fetchDashboardData = async() => {
    const res=await axios.get(
        "http://localhost:3001/api/dashboard/student",
        { withCredentials: true },
    );
    return res.data;
};

export const fetchTrainerDashboard = async () => {
  const res = await axios.get(
    "http://localhost:3001/api/dashboard/trainer",
    { withCredentials: true }
  );
  return res.data;
};
