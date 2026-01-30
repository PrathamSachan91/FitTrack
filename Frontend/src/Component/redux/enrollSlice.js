import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnrollStatus = createAsyncThunk(
  "enroll/fetchStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/enroll/status",
        { withCredentials: true },
      );

      return res.data.enrolled;
    } catch (err) {
      return rejectWithValue(false);
    }
  }
);

const enrollSlice = createSlice({
  name: "enroll",
  initialState: {
    isEnrolled: false,
    status: "idle",
  },
  reducers: {
    setEnrolled: (state) => {
      state.isEnrolled = true;
    },
    resetEnroll: (state) => {
      state.isEnrolled = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrollStatus.fulfilled, (state, action) => {
        state.status = "success";
        state.isEnrolled = action.payload;
      })
      .addCase(fetchEnrollStatus.rejected, (state) => {
        state.status = "error";
        state.isEnrolled = false;
      });
  },
});

export const { setEnrolled, resetEnroll } = enrollSlice.actions;
export default enrollSlice.reducer;
