import { createSlice } from "@reduxjs/toolkit";
import { getUsersFromAdmin, searchUsersByUsername } from "../adminApi";

const initialState = {
  users: [],
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersFromAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsersFromAdmin.fulfilled, (state, action) => {
        state.status = "successful";
        state.users = action.payload.users;
      })
      .addCase(getUsersFromAdmin.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(searchUsersByUsername.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchUsersByUsername.fulfilled, (state, action) => {
        state.status = "successful";
        state.users = action.payload.users;
      })
      .addCase(searchUsersByUsername.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
