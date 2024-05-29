import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
  },
  reducers: {
    login(state) {
      state.loggedIn = true
    },
    logout(state) {
      state.loggedIn = false
    }
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
