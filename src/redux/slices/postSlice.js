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
import { getPostsFromAdmin, searchPostsByTitle, deletePostFromAdmin } from "../adminApi";

const initialState = {
  posts: [],
  status: "idle",
  post: {
    author: {
      username: "",
    },
  },
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
      .addCase(deletePostFromAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePostFromAdmin.fulfilled, (state, action) => {
        state.posts = state.posts.filter((item) => item._id !== action.payload);
      })
      .addCase(deletePostFromAdmin.rejected, (state, action) => {
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
        console.log(action.payload);
        state.posts.push(action.payload.post);
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
        
      })
      .addCase(searchPostsByTitle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchPostsByTitle.fulfilled, (state, action) => {
        state.status = "successful";
        state.posts = action.payload.posts;
      })
      .addCase(searchPostsByTitle.rejected, (state, action) => {
        state.status = "failed";
        
      });
  },
});

export default postSlice.reducer;
