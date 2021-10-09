import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    idToken: "",
    isLoggedIn: false,
  },
  reducers: {
    signUp(state, action) {
      state.idToken = action.payload;
      state.isLoggedIn = true;
    },
    signIn(state, action) {
      state.idToken = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.idToken = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
