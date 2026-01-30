import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import authReducer from "./authSlice"
import enrollReducer from "./enrollSlice"

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    enroll: enrollReducer,
  },
});
