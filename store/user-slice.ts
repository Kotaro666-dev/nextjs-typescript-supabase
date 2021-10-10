import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
  },
  reducers: {
    updateUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
