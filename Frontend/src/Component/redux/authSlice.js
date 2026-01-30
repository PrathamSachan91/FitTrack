import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.initialized = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.initialized = true;
    },
    authChecked(state, action) {
      state.initialized = true;
    },
  },
});

export const { setUser, logout, authChecked } = authSlice.actions;
export default authSlice.reducer;
