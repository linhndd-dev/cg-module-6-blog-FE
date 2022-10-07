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
    return data;
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
  "user/getUsersFromAdmin",
  async () => {
    let { data } = await axios.get(`${baseURL}/admin/users`);
    return data;
  }
);

export const changeUserStatusFromAdmin = createAsyncThunk(
  "user/changeUserStatusFromAdmin",
  async (prop) => {
    await axios.put(`${baseURL}/admin/users/status/${prop.id}`, {
      currentStatus: prop.currentStatus,
    });
    const { data } = await axios.get(`${baseURL}/admin/users/${prop.id}`);
    console.log(data);
    return data;
  }
);

export const searchUsersByUsername = createAsyncThunk(
  "user/searchUsersByUsername",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/admin/users/search?searchQuery=${searchQuery}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchPostsByTitle = createAsyncThunk(
  "post/searchPostsByTitle",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/admin/posts/search?searchQuery=${searchQuery}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
