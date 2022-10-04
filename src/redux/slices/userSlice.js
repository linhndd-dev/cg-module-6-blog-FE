import { createSlice } from "@reduxjs/toolkit";
import { getUsersFromAdmin } from "../adminApi";

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
        state.posts = action.payload.posts;
      })
      .addCase(getUsersFromAdmin.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
