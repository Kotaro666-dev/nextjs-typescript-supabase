import { createSlice } from "@reduxjs/toolkit";

const localStorageIdTokenKey = "idToken";
const initialIdTokenValue = localStorage.getItem(localStorageIdTokenKey);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    idToken: initialIdTokenValue ?? "",
    isLoggedIn: "1" ? true : false,
  },
  reducers: {
    signup(state, action) {
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
