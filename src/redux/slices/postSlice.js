import { createSlice } from "@reduxjs/toolkit";
import {
  createMyPost,
  deletePost,
  editPost,
  getAllMyPost,
  getDetailPost,
  getPostsByGuest,
  searchMyPosts,
} from "../apis";
import { getPostsFromAdmin, getPostDetailFromAdmin } from "../adminApi";

const initialState = {
  posts: [],
  status: "idle",
  post: {
    author: {
      username : ''
    }
  }
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsFromAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPostsFromAdmin.fulfilled, (state, action) => {
        state.status = "successful";
        state.posts = action.payload.posts;
      })
      .addCase(getPostsFromAdmin.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getPostDetailFromAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPostDetailFromAdmin.fulfilled, (state, action) => {
        state.status = "successful";
        state.post = action.payload;
      })
      .addCase(getPostDetailFromAdmin.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getPostsByGuest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPostsByGuest.fulfilled, (state, action) => {
        state.status = "successful";
        state.posts = action.payload.posts;
      })
      .addCase(getPostsByGuest.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllMyPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllMyPost.fulfilled, (state, action) => {
        state.status = "successful";
        state.posts = action.payload.posts;
      })
      .addCase(getAllMyPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createMyPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts.map((item) => {
          if (item._id == action.payload.id) {
            item = action.payload.values;
            item._id = action.payload.id;
          }
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((item) => item._id !== action.payload);
      })
      .addCase(getDetailPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(searchMyPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchMyPosts.fulfilled, (state, action) => {
        state.status = "successful";
        state.posts = action.payload.posts;
      })
      .addCase(searchMyPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default postSlice.reducer;
