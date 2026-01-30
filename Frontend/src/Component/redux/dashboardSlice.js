import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardStats = createAsyncThunk(
  "fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/dashboard/stats",
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Stats fetch failed");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    enrolledCount: 0,
    newUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload.totalUsers;
        state.activeUsers = action.payload.activeUsers;
        state.newUser=action.payload.newUser;
        state.enrolledCount=action.payload.enrolledCount;
        state.revenue=action.payload.revenue;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default dashboardSlice.reducer;
