import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

if ("login" in localStorage) {
  const login = JSON.parse(localStorage.getItem("login"));
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${login.accessToken}`;
}
const baseURL = "http://localhost:5000";

export const getPostsFromAdmin = createAsyncThunk(
  "post/getPostsFromAdmin",
  async () => {
    let { data } = await axios.get(`${baseURL}/admin/posts`);
    console.log(data);
    return data;
  }
);

export const getDetailPost = createAsyncThunk(
  "post/getDetailPostFromAdmin",
  async (prop) => {
    let post = await axios.get(`${baseURL}/admin/posts/${prop}`);
    return post.data.posts[0];
  }
);

export const deletePostFromAdmin = createAsyncThunk(
  "post/deletePostFromAdmin",
  async (postId, ThunkAPI) => {
    await axios.delete(`${baseURL}/admin/posts/${postId}`);
    ThunkAPI.dispatch(getPostsFromAdmin());
    return postId;
  }
);

export const getUsersFromAdmin = createAsyncThunk(
  "post/getUsersFromAdmin",
  async () => {
    let { data } = await axios.get(`${baseURL}/admin/users`);
    return data;
  }
);

export const deleteUserFromAdmin = createAsyncThunk(
  "post/deleteUserFromAdmin",
  async (userId, ThunkAPI) => {
    await axios.delete(`${baseURL}/admin/users/${userId}`);
    ThunkAPI.dispatch(getUsersFromAdmin());
    return userId;
  }
);
