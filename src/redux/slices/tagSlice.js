import { createSlice } from "@reduxjs/toolkit";
import { getAllTags } from "../tagApi";

const initialState = {
  tags: [],
  tag: {
    postId: "",
  },
  status: "idle",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.status = "successful";
        state.tags = action.payload.tags;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default tagSlice.reducer;
